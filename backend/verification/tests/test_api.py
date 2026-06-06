import json
from unittest.mock import patch
from django.test import TestCase, Client
from django.urls import reverse
from verification.exceptions import CnpjNotFound, ExternalApiError

class ApiTests(TestCase):
    """
    Integration tests for the ong-validation API endpoint.
    """
    def setUp(self):
        self.client = Client()
        self.url = reverse('ong-validation')

    def test_valid_request(self):
        payload = {"cnpj": "12345678000199"}
        
        with patch('verification.views.validate_ngo') as mock_validate:
            mock_validate.return_value = {
                "score": 75,
                "cnpj_ativo": True,
                "endereco_valido": True,
                "anos_atuacao": 10
            }
            
            response = self.client.post(
                self.url,
                data=json.dumps(payload),
                content_type='application/json'
            )
            
            self.assertEqual(response.status_code, 200)
            res_data = response.json()
            self.assertEqual(res_data["score"], 75)
            self.assertTrue(res_data["cnpj_ativo"])
            self.assertTrue(res_data["endereco_valido"])
            self.assertEqual(res_data["anos_atuacao"], 10)

    def test_invalid_cnpj_format(self):
        # CNPJ is too short (13 digits instead of 14)
        payload = {"cnpj": "1234567800019"}
        
        response = self.client.post(
            self.url,
            data=json.dumps(payload),
            content_type='application/json'
        )
        
        self.assertEqual(response.status_code, 400)
        self.assertIn("cnpj", response.json())

    def test_missing_cnpj(self):
        payload = {}
        
        response = self.client.post(
            self.url,
            data=json.dumps(payload),
            content_type='application/json'
        )
        
        self.assertEqual(response.status_code, 400)
        self.assertIn("cnpj", response.json())

    def test_cnpj_not_found(self):
        payload = {"cnpj": "00000000000000"}
        
        with patch('verification.views.validate_ngo') as mock_validate:
            mock_validate.side_effect = CnpjNotFound("CNPJ not found in external registry.")
            
            response = self.client.post(
                self.url,
                data=json.dumps(payload),
                content_type='application/json'
            )
            
            self.assertEqual(response.status_code, 404)
            self.assertIn("error", response.json())

    def test_external_api_failure(self):
        payload = {"cnpj": "12345678000199"}
        
        with patch('verification.views.validate_ngo') as mock_validate:
            mock_validate.side_effect = ExternalApiError("External service unavailable.")
            
            response = self.client.post(
                self.url,
                data=json.dumps(payload),
                content_type='application/json'
            )
            
            self.assertEqual(response.status_code, 502)
            self.assertIn("error", response.json())
