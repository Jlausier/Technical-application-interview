# backend/myapp/views.py

from django.http import JsonResponse
import requests

def get_tacos(request):
    try:
        response = requests.get('http://taco-randomizer.herokuapp.com/random/')
        response.raise_for_status()
        data = response.json()
        # Process data as needed
        return JsonResponse(data)
    except requests.exceptions.RequestException as e:
        return JsonResponse({'error': str(e)}, status=500)

def get_meals(request):
    try:
        response = requests.get('http://mealme.ai/api/meals/')
        response.raise_for_status()
        data = response.json()
        # Process data as needed
        return JsonResponse(data)
    except requests.exceptions.RequestException as e:
        return JsonResponse({'error': str(e)}, status=500)
