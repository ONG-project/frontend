from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include, re_path
from django.views.static import serve

from .spa import frontend_index

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/auth/', include('authentication.urls')),
    path('api/v1/donors/', include('authentication.donor_urls')),
    path('api/v1/financial/', include('financial.urls')),
    path('api/v1/transparency/', include('transparency.urls')),
    path('api/v1/admin/', include('verification.admin_urls')),
    path('api/', include('verification.urls')),
    re_path(r'^media/(?P<path>.*)$', serve, {'document_root': settings.MEDIA_ROOT}),
    re_path(r'^(?!static/).*$', frontend_index, name='frontend-index'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
