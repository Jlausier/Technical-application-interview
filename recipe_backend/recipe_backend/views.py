import requests
from django.http import JsonResponse

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

def search_nearby_breweries(request, city):
    try:
        url = f'https://api.openbrewerydb.org/breweries?by_city={city}'
        response = requests.get(url)
        response.raise_for_status()
        breweries_data = response.json()
        return JsonResponse({
            'breweries': breweries_data
        })
    except requests.exceptions.RequestException as e:
        print(f"Error fetching nearby breweries: {e}")
        return JsonResponse({'error': 'Failed to fetch nearby breweries'}, status=500)
