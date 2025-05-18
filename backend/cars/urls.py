from django.urls import path
from . import views

urlpatterns = [
    path('', views.car_list, name='car_list'),
    path('<slug:slug>/', views.car_detail, name='car_detail'),
    path('category/<int:category_id>/', views.car_list_by_category, name='car_list_by_category'),
    path('location/<int:location_id>/', views.car_list_by_location, name='car_list_by_location'),
    path('<slug:slug>/add_review/', views.add_review, name='add_review'),
]