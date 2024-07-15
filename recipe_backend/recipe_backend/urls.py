# urls.py

from django.urls import path
from . import views

urlpatterns = [
    path('api/get_tacos/', views.get_tacos, name='get_tacos'),
    path('api/get_meals/', views.get_meals, name='get_meals'),
]
