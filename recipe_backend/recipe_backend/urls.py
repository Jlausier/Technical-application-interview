from django.urls import path
from . import views

urlpatterns = [
    path('api/random_drink/', views.get_random_drink, name='random_drink'),
    path('api/search_nearby_breweries/<str:city>/', views.search_nearby_breweries, name='search_nearby_breweries'),
]
