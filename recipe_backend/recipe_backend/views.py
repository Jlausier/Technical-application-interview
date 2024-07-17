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

def get_foursquare_data(city, drink_data):
    # Foursquare API endpoint for searching venues
    url = "https://api.foursquare.com/v3/places/search"
    
    # Extract drink name from drink_data
    drink_name = drink_data['drinks'][0]['strDrink']

    # Prepare parameters for Foursquare API
    params = {
        'near': city,
        'query': drink_name,
        'categories': '13035,13040',  # Category IDs for bars and restaurants
        'limit': 10  # Limit the number of results
    }

    headers = {
        "accept": "application/json",
        "Authorization": "fsq3ocgotiMEtwwS/d1mmPjGLh995Lu2pnlh7yXx42D+R4E="  
    }

    try:
        response = requests.get(url, params=params, headers=headers)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error fetching Foursquare data: {e}")
        return {'error': str(e)}


def search_for_drink_place(request, city):
    drink_data = get_random_drink(request)
    if 'error' in drink_data:
        return JsonResponse({'error': 'Failed to fetch random drink'}, status=500)
    
    foursquare_data = get_foursquare_data(city, drink_data)
    if 'error' in foursquare_data:
        return JsonResponse({'error': 'Failed to fetch places data'}, status=500)
    
    return JsonResponse({
        'drink': drink_data,
        'places': foursquare_data
    })
