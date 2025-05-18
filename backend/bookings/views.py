from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.utils import timezone
from django.db.models import Q
from .models import Booking, Payment
from .forms import BookingForm, PaymentForm
from cars.models import Car


@login_required
def booking_create(request):
    """View for creating a new booking."""
    if request.method == 'POST':
        form = BookingForm(request.POST)
        if form.is_valid():
            booking = form.save(commit=False)
            booking.user = request.user
            
            # Check if car is available for the selected dates
            car = booking.car
            pickup_date = booking.pickup_date
            dropoff_date = booking.dropoff_date
            
            # Check for overlapping bookings
            overlapping_bookings = Booking.objects.filter(
                car=car,
                status__in=['pending', 'confirmed', 'active'],
                pickup_date__lt=dropoff_date,
                dropoff_date__gt=pickup_date
            )
            
            if overlapping_bookings.exists():
                messages.error(request, 'This car is not available for the selected dates.')
                return render(request, 'bookings/booking_create.html', {'form': form})
            
            # Calculate total cost
            days = max(1, (dropoff_date - pickup_date).days)
            booking.total_cost = days * car.daily_rate
            
            # Save the booking
            booking.save()
            
            # Redirect to checkout
            return redirect('booking_checkout', reference=booking.booking_reference)
    else:
        # Initialize form with car if provided in GET parameters
        car_id = request.GET.get('car')
        if car_id:
            try:
                car = Car.objects.get(id=car_id)
                form = BookingForm(initial={'car': car})
            except Car.DoesNotExist:
                form = BookingForm()
        else:
            form = BookingForm()
    
    return render(request, 'bookings/booking_create.html', {'form': form})


@login_required
def booking_checkout(request, reference):
    """View for processing payment for a booking."""
    booking = get_object_or_404(Booking, booking_reference=reference, user=request.user)
    
    # Redirect if already paid
    if booking.payment_status:
        messages.info(request, 'This booking has already been paid for.')
        return redirect('booking_confirmation', reference=booking.booking_reference)
    
    if request.method == 'POST':
        form = PaymentForm(request.POST)
        if form.is_valid():
            # Process payment (simulated)
            import random
            import string
            
            # Generate a transaction ID
            transaction_id = ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(12))
            
            # Create payment record
            payment = Payment.objects.create(
                booking=booking,
                amount=booking.total_cost,
                payment_method=form.cleaned_data['payment_method'],
                transaction_id=transaction_id
            )
            
            # Update booking status
            booking.payment_status = True
            booking.status = 'confirmed'
            booking.save()
            
            messages.success(request, 'Payment successful! Your booking is confirmed.')
            return redirect('booking_confirmation', reference=booking.booking_reference)
    else:
        form = PaymentForm()
    
    return render(request, 'bookings/booking_checkout.html', {
        'booking': booking,
        'form': form,
    })


@login_required
def booking_confirmation(request, reference):
    """View for displaying booking confirmation details."""
    booking = get_object_or_404(Booking, booking_reference=reference, user=request.user)
    
    try:
        payment = booking.payment
    except Payment.DoesNotExist:
        payment = None
    
    return render(request, 'bookings/booking_confirmation.html', {
        'booking': booking,
        'payment': payment,
    })


@login_required
def booking_cancel(request, reference):
    """View for cancelling a booking."""
    booking = get_object_or_404(Booking, booking_reference=reference, user=request.user)
    
    # Only allow cancellation of pending or confirmed bookings
    if booking.status not in ['pending', 'confirmed']:
        messages.error(request, 'This booking cannot be cancelled.')
        return redirect('booking_detail', reference=reference)
    
    if request.method == 'POST':
        booking.status = 'cancelled'
        booking.save()
        messages.success(request, 'Your booking has been cancelled.')
        return redirect('booking_list')
    
    return render(request, 'bookings/booking_cancel.html', {'booking': booking})


@login_required
def booking_list(request):
    """View for listing user's bookings."""
    # Get active bookings (pending, confirmed, active)
    active_bookings = Booking.objects.filter(
        user=request.user,
        status__in=['pending', 'confirmed', 'active']
    ).order_by('-created_at')
    
    # Get past bookings (completed, cancelled)
    past_bookings = Booking.objects.filter(
        user=request.user,
        status__in=['completed', 'cancelled']
    ).order_by('-created_at')
    
    return render(request, 'bookings/booking_list.html', {
        'active_bookings': active_bookings,
        'past_bookings': past_bookings,
    })


@login_required
def booking_detail(request, reference):
    """View for displaying booking details."""
    booking = get_object_or_404(Booking, booking_reference=reference, user=request.user)
    
    try:
        payment = booking.payment
    except Payment.DoesNotExist:
        payment = None
    
    return render(request, 'bookings/booking_detail.html', {
        'booking': booking,
        'payment': payment,
    })