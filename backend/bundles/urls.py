from django.urls import path
from bundles.views import list_bundles_view, bundle_detail_view

urlpatterns = [
    path('v1/bundles/', list_bundles_view, name='list_bundles'),
    path('v1/bundles/<uuid:pk>/', bundle_detail_view, name='bundle-detail'),
]
