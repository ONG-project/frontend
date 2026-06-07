from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/auth/', include('authentication.urls')),
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('verification.urls')),
]
