from django.shortcuts import render
from cars.models import Car


def home(request):
    """View for the home page."""
    featured_cars = Car.objects.filter(is_featured=True)[:6]
    return render(request, 'core/home.html', {
        'featured_cars': featured_cars,
    })


def about(request):
    """View for the about page."""
    return render(request, 'core/about.html')


def contact(request):
    """View for the contact page."""
    return render(request, 'core/contact.html')