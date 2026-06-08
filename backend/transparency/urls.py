from django.urls import path
from .views import (
    global_metrics_view,
    recent_transfers_view,
    financial_data_view,
    change_history_view,
    pending_requests_view,
    submit_change_request_view,
    approve_change_request_view,
    reject_change_request_view,
)

urlpatterns = [
    path('global-metrics/', global_metrics_view, name='global-metrics'),
    path('recent-transfers/', recent_transfers_view, name='recent-transfers'),
    path('ngos/<uuid:pk>/financial-data/', financial_data_view, name='financial-data'),
    path('ngos/<uuid:pk>/change-history/', change_history_view, name='change-history'),
    path('ngos/<uuid:pk>/pending-requests/', pending_requests_view, name='pending-requests'),
    path('ngos/<uuid:pk>/requests/', submit_change_request_view, name='submit-change-request'),
    path('requests/<uuid:pk>/approve/', approve_change_request_view, name='approve-change-request'),
    path('requests/<uuid:pk>/reject/', reject_change_request_view, name='reject-change-request'),
]
