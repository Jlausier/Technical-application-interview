
from django.urls import path
from . import views

urlpatterns = [
    path('api/get_random_drink/', views.get_random_drink, name='get_random_drink'),
     path('api/search_for_drink_place/<str:city>/', views.search_for_drink_place, name='search_for_drink_place'),
]