from django.urls import path
from . import views

urlpatterns = [
    path('create/', views.booking_create, name='booking_create'),
    path('checkout/<str:reference>/', views.booking_checkout, name='booking_checkout'),
    path('confirmation/<str:reference>/', views.booking_confirmation, name='booking_confirmation'),
    path('cancel/<str:reference>/', views.booking_cancel, name='booking_cancel'),
    path('list/', views.booking_list, name='booking_list'),
    path('detail/<str:reference>/', views.booking_detail, name='booking_detail'),
]