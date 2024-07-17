import requests
from django.http import JsonResponse
import hmac
import hashlib
import base64

API_KEY = "AIzaSyAFjFByBWkV08Sw1TaD5Jhxyp4X3e2dFoE"
SECRET = "LK1FkKakaWZUc872f8rvl9TSxJM="

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

def generate_signature(endpoint):
    string_to_sign = f"{API_KEY}{endpoint}"
    signature = hmac.new(SECRET.encode(), string_to_sign.encode(), hashlib.sha256)
    return base64.b64encode(signature.digest()).decode()

def search_nearby_bars(request, city):
    try:
        location_data = get_city_coordinates(city)
        if not location_data:
            return JsonResponse({'error': 'City not found'}, status=404)

        lat, lng = location_data
        radius = 5000  # Set the radius for the nearby search in meters

        # Prepare the request endpoint
        endpoint = f"/maps/api/place/nearbysearch/json?location={lat},{lng}&radius={radius}&type=bar"
        signature = generate_signature(endpoint)

        # Use the Google Places API to search for nearby bars
        url = f"https://maps.googleapis.com{endpoint}&key={API_KEY}&signature={signature}"
        
        response = requests.get(url)
        response.raise_for_status()
        places_data = response.json()

        # Get a random drink
        drink_data = get_random_drink(request).content

        return JsonResponse({
            'bars': places_data.get('results', []),
            'drink': drink_data  # Include the random drink data
        })

    except requests.exceptions.HTTPError as http_err:
        print(f"HTTP error occurred: {http_err}")
        return JsonResponse({'error': 'HTTP error occurred'}, status=500)
    except requests.exceptions.RequestException as e:
        print(f"Error fetching nearby bars: {e}")
        return JsonResponse({'error': 'Failed to fetch nearby bars'}, status=500)

def get_city_coordinates(city):
    url = f"https://maps.googleapis.com/maps/api/geocode/json?address={city}&key={API_KEY}"
    response = requests.get(url)
    
    if response.status_code == 200:
        results = response.json().get('results')
        if results:
            location = results[0]['geometry']['location']
            return location['lat'], location['lng']
    
    return None
