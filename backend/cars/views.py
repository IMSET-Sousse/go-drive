from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.db.models import Q, Avg
from .models import Car, CarCategory, Location, Review
from .forms import ReviewForm
from bookings.forms import BookingForm


def car_list(request):
    """View for listing all cars with filtering options."""
    cars = Car.objects.filter(is_available=True)
    categories = CarCategory.objects.all()
    locations = Location.objects.all()
    
    # Get filter parameters from request
    category = request.GET.get('category')
    location = request.GET.get('location')
    min_price = request.GET.get('min_price')
    max_price = request.GET.get('max_price')
    transmission = request.GET.get('transmission')
    fuel_type = request.GET.get('fuel_type')
    search_query = request.GET.get('q')
    
    # Apply filters
    if category:
        cars = cars.filter(category__id=category)
    
    if location:
        cars = cars.filter(locations__id=location)
    
    if min_price:
        cars = cars.filter(daily_rate__gte=min_price)
    
    if max_price:
        cars = cars.filter(daily_rate__lte=max_price)
    
    if transmission:
        cars = cars.filter(transmission=transmission)
    
    if fuel_type:
        cars = cars.filter(fuel_type=fuel_type)
    
    if search_query:
        cars = cars.filter(
            Q(name__icontains=search_query) |
            Q(make__icontains=search_query) |
            Q(model__icontains=search_query) |
            Q(description__icontains=search_query)
        )
    
    return render(request, 'cars/car_list.html', {
        'cars': cars,
        'categories': categories,
        'locations': locations,
        'selected_category': category,
        'selected_location': location,
        'min_price': min_price,
        'max_price': max_price,
        'transmission': transmission,
        'fuel_type': fuel_type,
        'search_query': search_query,
    })


def car_detail(request, slug):
    """View for displaying car details and booking form."""
    car = get_object_or_404(Car, slug=slug, is_available=True)
    booking_form = BookingForm(initial={'car': car})
    reviews = car.reviews.all().order_by('-created_at')
    review_form = ReviewForm()
    
    # Calculate average rating
    avg_rating = reviews.aggregate(Avg('rating'))['rating__avg'] or 0
    
    # Check if user has already booked and can review
    can_review = False
    has_reviewed = False
    
    if request.user.is_authenticated:
        # Check if user has completed bookings for this car
        from bookings.models import Booking
        completed_bookings = Booking.objects.filter(
            car=car, 
            user=request.user,
            status='completed'
        ).exists()
        
        can_review = completed_bookings
        has_reviewed = Review.objects.filter(car=car, user=request.user).exists()
    
    return render(request, 'cars/car_detail.html', {
        'car': car,
        'booking_form': booking_form,
        'reviews': reviews,
        'review_form': review_form,
        'avg_rating': avg_rating,
        'can_review': can_review,
        'has_reviewed': has_reviewed,
    })


def car_list_by_category(request, category_id):
    """View for listing cars by category."""
    category = get_object_or_404(CarCategory, id=category_id)
    cars = Car.objects.filter(category=category, is_available=True)
    categories = CarCategory.objects.all()
    
    return render(request, 'cars/car_list.html', {
        'cars': cars,
        'categories': categories,
        'selected_category': category_id,
        'category_name': category.name,
    })


def car_list_by_location(request, location_id):
    """View for listing cars by location."""
    location = get_object_or_404(Location, id=location_id)
    cars = Car.objects.filter(locations=location, is_available=True)
    locations = Location.objects.all()
    
    return render(request, 'cars/car_list.html', {
        'cars': cars,
        'locations': locations,
        'selected_location': location_id,
        'location_name': location.name,
    })


@login_required
def add_review(request, slug):
    """View for adding a review for a car."""
    car = get_object_or_404(Car, slug=slug)
    
    # Check if user has already reviewed this car
    if Review.objects.filter(car=car, user=request.user).exists():
        messages.error(request, 'You have already reviewed this car.')
        return redirect('car_detail', slug=slug)
    
    # Check if user has completed a booking for this car
    from bookings.models import Booking
    if not Booking.objects.filter(car=car, user=request.user, status='completed').exists():
        messages.error(request, 'You can only review cars that you have rented.')
        return redirect('car_detail', slug=slug)
    
    if request.method == 'POST':
        form = ReviewForm(request.POST)
        if form.is_valid():
            review = form.save(commit=False)
            review.car = car
            review.user = request.user
            review.save()
            messages.success(request, 'Your review has been submitted!')
            return redirect('car_detail', slug=slug)
    else:
        form = ReviewForm()
    
    return render(request, 'cars/add_review.html', {
        'form': form,
        'car': car,
    })