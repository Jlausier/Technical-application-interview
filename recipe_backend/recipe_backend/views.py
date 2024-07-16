
from django.http import JsonResponse
import requests

def get_random_drink(request):
    try:
        url = 'https://www.thecocktaildb.com/api/json/v1/1/random.php'
        response = requests.get(url)
        response.raise_for_status()
        drink_data = response.json()
        return JsonResponse(drink_data)
    except requests.exceptions.RequestException as e:
        print(f"Error fetching random drink: {e}")
        return JsonResponse({'error': 'Failed to fetch random drink'}, status=500)

def get_mealme_data(city, drink_data):
    url = "https://api.mealme.ai/search/store/v3"
    
    # Extract drink name from drink_data
    drink_name = drink_data['drinks'][0]['strDrink']

    # Prepare parameters for MealMe API
    params = {
        'user_city': city,
        'store_type': 'restaurant',  # Default store type
        'maximum_miles': '3',  # Default maximum distance
        'sort': 'relevance',  # Default sorting criteria
        'use_new_db': 'true',  # Default database flag
        'search_focus': 'store',
        'name': drink_name  # Use drink name for name search
    }

    headers = {
        "accept": "application/json",
    "Authorization": f"Bearer {MEALME_API_KEY}"
    }

    try:
        response = requests.get(url, params=params, headers=headers)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        return {'error': str(e)}
