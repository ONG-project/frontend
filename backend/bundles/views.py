from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.views.decorators.http import require_GET

from bundles.models import Bundle
from bundles.serializers import serialize_bundle_list_item, serialize_bundle_detail


@require_GET
def list_bundles_view(request):
    bundles = Bundle.objects.filter(is_active=True).prefetch_related('ngos').order_by('-created_at')
    return JsonResponse([serialize_bundle_list_item(b) for b in bundles], safe=False)


@require_GET
def bundle_detail_view(request, pk):
    bundle = get_object_or_404(Bundle, pk=pk, is_active=True)
    return JsonResponse(serialize_bundle_detail(bundle))
