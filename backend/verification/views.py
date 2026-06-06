import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from verification.serializers import OngValidationSerializer
from verification.services.validation_service import validate_ngo
from verification.exceptions import CnpjNotFound, ExternalApiError, InvalidAddressError

@csrf_exempt
@require_POST
def validate_ong_view(request):
    """
    Endpoint POST /api/ong-validation/
    Receives CNPJ, validates input, calls the verification orchestrator,
    and returns computed score, status, and validation flags.
    """
    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({"error": "Malformed JSON payload."}, status=400)

    serializer = OngValidationSerializer(data=data)
    if not serializer.is_valid():
        return JsonResponse(serializer.errors, status=400)

    cnpj = serializer.validated_data["cnpj"]

    try:
        result = validate_ngo(cnpj)
        return JsonResponse(result, status=200)
    except CnpjNotFound as e:
        return JsonResponse({"error": str(e)}, status=404)
    except InvalidAddressError as e:
        return JsonResponse({"error": str(e)}, status=400)
    except ExternalApiError as e:
        return JsonResponse({"error": str(e)}, status=502)
    except Exception as e:
        return JsonResponse({"error": f"An unexpected error occurred: {str(e)}"}, status=500)
