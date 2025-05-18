from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from .forms import UserRegisterForm, UserUpdateForm, ProfileUpdateForm
from bookings.models import Booking


def register(request):
    """View for user registration."""
    if request.method == 'POST':
        form = UserRegisterForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            messages.success(request, f'Account created for {username}! You can now log in.')
            return redirect('login')
    else:
        form = UserRegisterForm()
    return render(request, 'users/register.html', {'form': form})


@login_required
def profile(request):
    """View for user profile."""
    if request.method == 'POST':
        u_form = UserUpdateForm(request.POST, instance=request.user)
        p_form = ProfileUpdateForm(request.POST, request.FILES, instance=request.user.profile)
        
        if u_form.is_valid() and p_form.is_valid():
            u_form.save()
            p_form.save()
            messages.success(request, 'Your profile has been updated!')
            return redirect('profile')
    else:
        u_form = UserUpdateForm(instance=request.user)
        p_form = ProfileUpdateForm(instance=request.user.profile)
    
    # Get user's active bookings
    active_bookings = Booking.objects.filter(
        user=request.user,
        status__in=['confirmed', 'active']
    ).order_by('-created_at')
    
    # Get user's booking history
    booking_history = Booking.objects.filter(
        user=request.user,
        status__in=['completed', 'cancelled']
    ).order_by('-created_at')
    
    context = {
        'u_form': u_form,
        'p_form': p_form,
        'active_bookings': active_bookings,
        'booking_history': booking_history
    }
    
    return render(request, 'users/profile.html', context)