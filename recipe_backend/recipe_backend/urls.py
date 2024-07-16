
from django.urls import path
from . import views

urlpatterns = [
    path('get_random_taco/', views.get_random_taco, name='get_random_taco'),
    path('get_mealme_data/', views.get_mealme_data, name='get_mealme_data'),
    # Other paths...
]