# backend/myapp/views.py

from django.http import JsonResponse
import requests

def get_random_taco():
    try:
        url = 'http://taco-randomizer.herokuapp.com/random/'
        response = requests.get(url)
        response.raise_for_status()
        taco_data = response.json()
        return taco_data
    except requests.exceptions.RequestException as e:
        print(f"Error fetching random taco: {e}")
        return None

def get_mealme_data(city, taco_data):
    url = "https://api.mealme.ai/search/store/v3"
    
    # Extract ingredients from taco_data
    ingredients = []
    for category, ingredient in taco_data.items():
        if category in ['base_layer', 'mixin', 'condiment', 'seasoning', 'shell']:
            ingredients.append(ingredient)
    
    # Prepare parameters for MealMe API
    params = {
        'user_city': city,
        'store_type': 'restaurant',  # Default store type
        'maximum_miles': '3',  # Default maximum distance
        'sort': 'relevance',  # Default sorting criteria
        'use_new_db': 'true',  # Default database flag
        'search_focus': 'store',
        'name': ' '.join(ingredients)  # Concatenate ingredients for name search
    }

    headers = {"accept": "application/json"}

    try:
        response = requests.get(url, params=params, headers=headers)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        return {'error': str(e)}