from datetime import date
import logging
from verification.services.cnpj_service import get_cnpj_data
from verification.services.address_service import get_address_by_cep
from verification.services.score_service import calculate_reliability_score
from verification.models import NGO
from verification.exceptions import InvalidAddressError

logger = logging.getLogger(__name__)

def calculate_years_of_operation(data_abertura_str: str) -> int:
    """
    Calculates the years of operation of the NGO based on the opening date string.
    Expected format: YYYY-MM-DD
    """
    if not data_abertura_str:
        return 0
    try:
        # Try splitting by hyphen or slash
        parts = data_abertura_str.replace("/", "-").split("-")
        # Ensure the first part is a 4-digit year
        if len(parts) >= 1 and len(parts[0]) == 4 and parts[0].isdigit():
            founded_year = int(parts[0])
            current_year = date.today().year
            years = current_year - founded_year
            return max(0, years)
    except Exception as e:
        logger.warning(f"Failed to parse opening date '{data_abertura_str}': {e}")
    return 0

def compare_addresses(cnpj_data: dict, cep_data: dict) -> bool:
    """
    Compares the address data returned by the CNPJ API with the address data 
    returned by the CEP API to determine if the address is valid.
    """
    if not cnpj_data or not cep_data:
        return False
        
    # 1. Compare Zip Codes
    cnpj_zip = ''.join(filter(str.isdigit, str(cnpj_data.get('cep', ''))))
    cep_zip = ''.join(filter(str.isdigit, str(cep_data.get('cep', ''))))
    
    if not cnpj_zip or not cep_zip or cnpj_zip != cep_zip:
        return False
        
    # 2. Compare States
    cnpj_state = str(cnpj_data.get('estado', '')).strip().upper()
    cep_state = str(cep_data.get('estado', '')).strip().upper()
    
    if not cnpj_state or not cep_state or cnpj_state != cep_state:
        return False
        
    # 3. Compare Cities (case-insensitive)
    cnpj_city = str(cnpj_data.get('cidade', '')).strip().lower()
    cep_city = str(cep_data.get('cidade', '')).strip().lower()
    
    if not cnpj_city or not cep_city or cnpj_city != cep_city:
        return False
        
    return True

def validate_ngo(cnpj: str) -> dict:
    """
    Orchestrates the entire validation flow for an NGO:
    1. Queries CNPJá API.
    2. Checks if CNPJ is active.
    3. Calculates years of operation.
    4. Queries official CEP API to validate address.
    5. Calculates reliability score.
    6. Persists the score and active status in the database NGO model.
    7. Returns consolidated result.
    """
    # Normalize CNPJ
    cnpj_digits = ''.join(filter(str.isdigit, str(cnpj)))
    
    # 1. Consult CNPJ API
    cnpj_data = get_cnpj_data(cnpj_digits)
    
    # 2. Verify active status
    cnpj_ativo = cnpj_data.get("situacao") == "ATIVA"
    
    # 3. Calculate years of operation
    data_abertura = cnpj_data.get("data_abertura", "")
    anos_atuacao = calculate_years_of_operation(data_abertura)
    
    # 4. Query Address API using CEP from CNPJ data
    cep = cnpj_data.get("cep", "")
    endereco_valido = False
    
    if cep:
        try:
            cep_digits = ''.join(filter(str.isdigit, str(cep)))
            cep_data = get_address_by_cep(cep_digits)
            if cep_data:
                endereco_valido = compare_addresses(cnpj_data, cep_data)
        except Exception as e:
            logger.warning(f"Error validating address for CEP {cep}: {e}")
            
    # 5. Calculate reliability score
    score = calculate_reliability_score(cnpj_ativo, endereco_valido, anos_atuacao)
    
    # 6. Persist to database
    formatted_cnpj = f"{cnpj_digits[:2]}.{cnpj_digits[2:5]}.{cnpj_digits[5:8]}/{cnpj_digits[8:12]}-{cnpj_digits[12:]}"
    
    # Check if NGO already exists (by raw or formatted CNPJ)
    ngo = NGO.objects.filter(cnpj=cnpj_digits).first() or NGO.objects.filter(cnpj=formatted_cnpj).first()
    
    if ngo:
        ngo.current_score = score
        ngo.is_active = cnpj_ativo
        ngo.save()
        logger.info(f"Updated score ({score}) and status ({cnpj_ativo}) for existing NGO CNPJ {cnpj_digits}.")
    else:
        # Create a new NGO record
        name = cnpj_data.get("razao_social") or cnpj_data.get("nome_fantasia") or f"NGO {cnpj_digits}"
        ngo = NGO.objects.create(
            cnpj=cnpj_digits,
            name=name,
            current_score=score,
            is_active=cnpj_ativo,
            description=f"Automated verification for {name}"
        )
        logger.info(f"Created new NGO '{name}' with score {score} and status {cnpj_ativo} for CNPJ {cnpj_digits}.")
        
    return {
        "score": score,
        "cnpj_ativo": cnpj_ativo,
        "endereco_valido": endereco_valido,
        "anos_atuacao": anos_atuacao
    }
