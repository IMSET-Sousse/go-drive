"""
URL configuration for carrental project.
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('core.urls')),
    path('cars/', include('cars.urls')),
    path('bookings/', include('bookings.urls')),
    path('accounts/', include('users.urls')),
    path('api/', include('cars.urls')),  # Include the API URLs
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)