"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
"""

from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse
from accounts.views import MyTokenObtainPairView
from rest_framework_simplejwt.views import TokenRefreshView
from dashboard.views import ActivitiesView


def root_view(request):
    return JsonResponse({"status": "ok", "api": "/api/"})


urlpatterns = [
    path('', root_view),
    path('admin/', admin.site.urls),

            
    path('api/auth/', include('accounts.urls')),                                               
    path('api/auth/refresh/', TokenRefreshView.as_view()),

                     
    path('api/activities/', ActivitiesView.as_view()),
    path('api/products/', include('products.urls')),
    path('api/orders/', include('orders.urls')),
    path('api/dashboard/', include('dashboard.urls')),
    path('api/messages/', include('user_messages.urls')),
]

                                      
from django.conf import settings
from django.conf.urls.static import static

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

