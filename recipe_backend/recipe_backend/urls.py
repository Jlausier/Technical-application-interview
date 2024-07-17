from django.urls import path
from .views import get_random_drink, search_nearby_bars

urlpatterns = [
    path('api/get_random_drink/', get_random_drink, name='get_random_drink'),
    path('api/search_nearby_bars/<str:city>/', search_nearby_bars, name='search_nearby_bars'),
]
