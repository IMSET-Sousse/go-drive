from django.db import models
from django.contrib.auth.models import User
from cars.models import Car, Location
from django.utils import timezone


class Booking(models.Model):
    """Model for car bookings."""
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('active', 'Active'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    )
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='bookings')
    car = models.ForeignKey(Car, on_delete=models.CASCADE, related_name='bookings')
    pickup_location = models.ForeignKey(Location, on_delete=models.CASCADE, related_name='pickup_bookings')
    dropoff_location = models.ForeignKey(Location, on_delete=models.CASCADE, related_name='dropoff_bookings')
    pickup_date = models.DateTimeField()
    dropoff_date = models.DateTimeField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    total_cost = models.DecimalField(max_digits=10, decimal_places=2)
    booking_reference = models.CharField(max_length=20, unique=True)
    payment_status = models.BooleanField(default=False)
    special_requests = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"Booking {self.booking_reference} by {self.user.username}"
    
    def save(self, *args, **kwargs):
        # Generate booking reference if not exists
        if not self.booking_reference:
            import random
            import string
            
            # Generate a random booking reference
            chars = string.ascii_uppercase + string.digits
            booking_ref = ''.join(random.choice(chars) for _ in range(8))
            
            # Make sure it's unique
            while Booking.objects.filter(booking_reference=booking_ref).exists():
                booking_ref = ''.join(random.choice(chars) for _ in range(8))
                
            self.booking_reference = booking_ref
            
        # Calculate total cost if not set
        if not self.total_cost:
            days = (self.dropoff_date - self.pickup_date).days
            if days < 1:
                days = 1
            self.total_cost = days * self.car.daily_rate
            
        super().save(*args, **kwargs)
    
    def is_active(self):
        """Check if the booking is currently active."""
        now = timezone.now()
        return (
            self.status in ['confirmed', 'active'] and
            self.pickup_date <= now and 
            self.dropoff_date >= now
        )
    
    def get_duration_days(self):
        """Get the duration of the booking in days."""
        days = (self.dropoff_date - self.pickup_date).days
        return max(1, days)  # Minimum 1 day


class Payment(models.Model):
    """Model for booking payments."""
    PAYMENT_METHOD_CHOICES = (
        ('credit_card', 'Credit Card'),
        ('debit_card', 'Debit Card'),
        ('paypal', 'PayPal'),
    )
    
    booking = models.OneToOneField(Booking, on_delete=models.CASCADE, related_name='payment')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    payment_method = models.CharField(max_length=20, choices=PAYMENT_METHOD_CHOICES)
    transaction_id = models.CharField(max_length=100, unique=True)
    payment_date = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Payment for booking {self.booking.booking_reference}"