from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/auth/', include('authentication.urls')),
    path('api/v1/financial/', include('financial.urls')),
    path('api/v1/transparency/', include('transparency.urls')),
    path('api/', include('verification.urls')),
]
