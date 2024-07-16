
from django.urls import path
from . import views

urlpatterns = [
    path('api/get_random_drink/', views.get_random_drink, name='get_random_drink'),
    path('get_mealme_data/', views.get_mealme_data, name='get_mealme_data'),
    # Other paths...
]