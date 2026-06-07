import json
from django.utils import timezone
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_GET, require_POST
from django.db.models import Sum

from .models import ChangeRequest
from .serializers import ChangeRequestSerializer
from verification.models import NGO, Campaign
from financial.models import FinancialRecord


CAUSE_LABELS = {
    'meio-ambiente': 'Meio Ambiente',
    'saude': 'Saúde',
    'educacao': 'Educação',
    'direitos-humanos': 'Direitos Humanos',
}


@require_GET
def global_metrics_view(request):
    now = timezone.now()
    week_ago = now - timezone.timedelta(days=7)
    month_ago = now - timezone.timedelta(days=30)

    week_transfers = FinancialRecord.objects.filter(
        record_type=FinancialRecord.RecordType.TRANSFER,
        created_at__gte=week_ago,
    )
    month_transfers = FinancialRecord.objects.filter(
        record_type=FinancialRecord.RecordType.TRANSFER,
        created_at__gte=month_ago,
    )

    week_raised_agg = Campaign.objects.filter(
        updated_at__gte=week_ago,
        is_active=True,
    ).aggregate(total=Sum('raised_amount'))
    month_raised_agg = Campaign.objects.filter(
        is_active=True,
    ).aggregate(total=Sum('raised_amount'))

    week_raised = float(week_raised_agg['total'] or 0)
    month_raised = float(month_raised_agg['total'] or 0)

    week_distributed = float(week_transfers.aggregate(total=Sum('amount'))['total'] or 0)
    month_distributed = float(month_transfers.aggregate(total=Sum('amount'))['total'] or 0)

    week_ongs = week_transfers.values('ong').distinct().count()
    month_ongs = month_transfers.values('ong').distinct().count()

    def compat(distributed, raised):
        if raised <= 0:
            return 0
        return min(round((distributed / raised) * 100), 100)

    return JsonResponse({
        "week": {
            "raised": week_raised,
            "distributed": week_distributed,
            "ongsCount": week_ongs,
            "compatibility": compat(week_distributed, week_raised),
        },
        "month": {
            "raised": month_raised,
            "distributed": month_distributed,
            "ongsCount": month_ongs,
            "compatibility": compat(month_distributed, month_raised),
        }
    })


@require_GET
def recent_transfers_view(request):
    now = timezone.now()
    month_ago = now - timezone.timedelta(days=30)

    records = (
        FinancialRecord.objects
        .filter(record_type=FinancialRecord.RecordType.TRANSFER, created_at__gte=month_ago)
        .select_related('ong')
        .order_by('-created_at')[:50]
    )

    result = []
    for rec in records:
        ngo = rec.ong
        days_old = (now - rec.created_at).days
        period = 'week' if days_old <= 7 else 'month'
        score = int(ngo.current_score or 0)

        raw_cnpj = ngo.cnpj.replace('.', '').replace('/', '').replace('-', '')
        if len(raw_cnpj) == 14:
            cnpj_display = f"{raw_cnpj[:2]}.{raw_cnpj[2:5]}.{raw_cnpj[5:8]}/{raw_cnpj[8:12]}-{raw_cnpj[12:]}"
        else:
            cnpj_display = ngo.cnpj

        focus_area = ngo.focus_area or ''
        cause_label = CAUSE_LABELS.get(focus_area, focus_area.replace('-', ' ').title())

        result.append({
            "id": str(rec.id),
            "ong": ngo.name,
            "cnpj": cnpj_display,
            "cause": cause_label,
            "amount": float(rec.amount),
            "date": rec.created_at.isoformat(),
            "period": period,
            "reason": rec.description,
            "docType": "receipt",
            "docLabel": f"Recibo #{str(rec.id)[:8].upper()}",
            "criteria": {
                "score": score,
                "yearsActive": ngo.years_operating or 0,
                "addressConsistency": ngo.address_valid,
                "cnpjValidated": ngo.verification_status == 'verified',
                "lastAudit": ngo.last_external_audit.strftime('%b/%Y') if ngo.last_external_audit else "N/D",
                "auditStatus": "Sem Ressalvas" if ngo.verification_status == 'verified' else "Em Análise",
                "documentationComplete": ngo.verification_status in ('verified', 'analysis'),
            },
        })

    return JsonResponse(result, safe=False)


@require_GET
def financial_data_view(request, pk):
    ngo = get_object_or_404(NGO, pk=pk)

    total_transfers = FinancialRecord.objects.filter(
        ong=ngo, record_type=FinancialRecord.RecordType.TRANSFER
    ).aggregate(total=Sum('amount'))['total'] or 0
    total_donations = FinancialRecord.objects.filter(
        ong=ngo, record_type=FinancialRecord.RecordType.DONATION
    ).aggregate(total=Sum('amount'))['total'] or 0

    budget_utilization = 0
    if total_donations > 0:
        budget_utilization = min(round((float(total_transfers) / float(total_donations)) * 100), 100)

    last_audit = ngo.last_external_audit.strftime('%b/%Y') if ngo.last_external_audit else "N/D"
    audit_status = "Sem Ressalvas" if ngo.verification_status == 'verified' else "Em Análise"

    return JsonResponse({
        "budgetUtilization": budget_utilization,
        "lastAudit": last_audit,
        "auditStatus": audit_status,
    })


@require_GET
def change_history_view(request, pk):
    ong = get_object_or_404(NGO, pk=pk)
    requests = ChangeRequest.objects.filter(ong=ong, status=ChangeRequest.Status.APPROVED).order_by('-updated_at')
    history = [
        {
            "id": str(req.id),
            "field": req.field_name,
            "oldValue": req.old_value,
            "newValue": req.new_value,
            "date": req.updated_at.isoformat(),
            "reason": req.reason,
            "approvedBy": "Auditoria ONG+"
        }
        for req in requests
    ]
    if not history:
        history.append({
            "id": "initial",
            "field": "Registro Inicial",
            "oldValue": "",
            "newValue": "Dados confirmados",
            "date": ong.created_at.isoformat(),
            "reason": "Cadastro na plataforma",
            "approvedBy": "Sistema"
        })
    return JsonResponse(history, safe=False)


@require_GET
def pending_requests_view(request, pk):
    ong = get_object_or_404(NGO, pk=pk)
    requests = ChangeRequest.objects.filter(ong=ong, status=ChangeRequest.Status.PENDING)
    serializer = ChangeRequestSerializer(requests, many=True)
    return JsonResponse(serializer.data, safe=False)


@csrf_exempt
@require_POST
def submit_change_request_view(request, pk):
    ong = get_object_or_404(NGO, pk=pk)
    try:
        data = json.loads(request.body)
        change_request = ChangeRequest.objects.create(
            ong=ong,
            field_name=data.get('field_name', 'Update'),
            old_value=data.get('old_value', ''),
            new_value=data.get('new_value', ''),
            reason=data.get('reason', '')
        )
        serializer = ChangeRequestSerializer(change_request)
        return JsonResponse(serializer.data, status=201)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)


@csrf_exempt
@require_POST
def approve_change_request_view(request, pk):
    change_request = get_object_or_404(ChangeRequest, pk=pk)
    change_request.status = ChangeRequest.Status.APPROVED
    change_request.save()
    serializer = ChangeRequestSerializer(change_request)
    return JsonResponse(serializer.data)


@csrf_exempt
@require_POST
def reject_change_request_view(request, pk):
    change_request = get_object_or_404(ChangeRequest, pk=pk)
    change_request.status = ChangeRequest.Status.REJECTED
    change_request.save()
    serializer = ChangeRequestSerializer(change_request)
    return JsonResponse(serializer.data)
