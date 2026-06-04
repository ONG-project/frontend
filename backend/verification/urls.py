from django.urls import path
from verification.views import validate_ong_view

urlpatterns = [
    path('ong-validation/', validate_ong_view, name='ong-validation'),
]
