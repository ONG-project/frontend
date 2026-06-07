import json

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_GET, require_POST
from django.shortcuts import get_object_or_404

from verification.serializers import OngValidationSerializer
from verification.services.validation_service import validate_ngo
from verification.exceptions import CnpjNotFound, ExternalApiError, InvalidAddressError
from verification.models import NGO
from verification.ngo_response import (
    serialize_ngo_detail,
    serialize_ngo_list_item,
    build_verification_payload,
    get_allocation_criteria,
)


@require_GET
def health_check_view(request):
    return JsonResponse({"status": "ok", "service": "ong-plus-api"})


@require_GET
def list_ngos_view(request):
    ngos = NGO.objects.all().order_by('-current_score', 'name')
    return JsonResponse([serialize_ngo_list_item(ngo) for ngo in ngos], safe=False)


@require_GET
def ngo_detail_view(request, pk):
    ngo = get_object_or_404(NGO, pk=pk)
    return JsonResponse(serialize_ngo_detail(ngo))


@require_GET
def ngo_verification_view(request, pk):
    ngo = get_object_or_404(NGO, pk=pk)
    payload = build_verification_payload(ngo)
    payload['score'] = payload['criteria']['score']
    return JsonResponse(payload)


@require_GET
def allocation_criteria_view(request):
    return JsonResponse(get_allocation_criteria(), safe=False)


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
        return JsonResponse(
            {"error": f"An unexpected error occurred: {str(e)}"},
            status=500,
        )
