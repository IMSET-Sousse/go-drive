from django import forms
from django.utils import timezone
from datetime import timedelta
from .models import Booking


class DateTimePickerInput(forms.DateTimeInput):
    """Custom DateTimeInput widget."""
    input_type = 'datetime-local'


class BookingForm(forms.ModelForm):
    """Form for creating a booking."""
    
    class Meta:
        model = Booking
        fields = [
            'car', 'pickup_location', 'dropoff_location', 
            'pickup_date', 'dropoff_date', 'special_requests'
        ]
        widgets = {
            'pickup_date': DateTimePickerInput(),
            'dropoff_date': DateTimePickerInput(),
            'special_requests': forms.Textarea(attrs={'rows': 3}),
        }
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        
        # Get tomorrow and day after tomorrow for default dates
        tomorrow = timezone.now() + timedelta(days=1)
        day_after_tomorrow = tomorrow + timedelta(days=1)
        
        # Set initial values for datetime fields
        if not self.initial.get('pickup_date'):
            self.initial['pickup_date'] = tomorrow.strftime('%Y-%m-%dT%H:%M')
        if not self.initial.get('dropoff_date'):
            self.initial['dropoff_date'] = day_after_tomorrow.strftime('%Y-%m-%dT%H:%M')
        
        # If car is already set, filter locations by the selected car
        if 'car' in self.initial:
            car = self.initial['car']
            self.fields['pickup_location'].queryset = car.locations.all()
            self.fields['dropoff_location'].queryset = car.locations.all()
    
    def clean(self):
        cleaned_data = super().clean()
        pickup_date = cleaned_data.get('pickup_date')
        dropoff_date = cleaned_data.get('dropoff_date')
        car = cleaned_data.get('car')
        
        # Check if dates are in the future
        if pickup_date and pickup_date < timezone.now():
            self.add_error('pickup_date', 'Pickup date must be in the future.')
        
        # Check if dropoff date is after pickup date
        if pickup_date and dropoff_date and dropoff_date <= pickup_date:
            self.add_error('dropoff_date', 'Dropoff date must be after pickup date.')
        
        # Check that the locations are valid for the selected car
        if car and 'pickup_location' in cleaned_data:
            pickup_location = cleaned_data.get('pickup_location')
            if pickup_location not in car.locations.all():
                self.add_error('pickup_location', 'This car is not available at the selected pickup location.')
        
        if car and 'dropoff_location' in cleaned_data:
            dropoff_location = cleaned_data.get('dropoff_location')
            if dropoff_location not in car.locations.all():
                self.add_error('dropoff_location', 'This car cannot be dropped off at the selected location.')
        
        return cleaned_data


class PaymentForm(forms.Form):
    """Form for processing payments."""
    PAYMENT_METHOD_CHOICES = (
        ('credit_card', 'Credit Card'),
        ('debit_card', 'Debit Card'),
        ('paypal', 'PayPal'),
    )
    
    payment_method = forms.ChoiceField(choices=PAYMENT_METHOD_CHOICES)
    card_number = forms.CharField(max_length=19, required=False, widget=forms.TextInput(attrs={'placeholder': '4111 1111 1111 1111'}))
    card_name = forms.CharField(max_length=100, required=False, widget=forms.TextInput(attrs={'placeholder': 'Name on Card'}))
    expiry_date = forms.CharField(max_length=7, required=False, widget=forms.TextInput(attrs={'placeholder': 'MM/YYYY'}))
    cvv = forms.CharField(max_length=4, required=False, widget=forms.TextInput(attrs={'placeholder': '123'}))
    
    def clean(self):
        cleaned_data = super().clean()
        payment_method = cleaned_data.get('payment_method')
        
        # Validate card details if credit/debit card is selected
        if payment_method in ['credit_card', 'debit_card']:
            card_number = cleaned_data.get('card_number')
            card_name = cleaned_data.get('card_name')
            expiry_date = cleaned_data.get('expiry_date')
            cvv = cleaned_data.get('cvv')
            
            if not card_number:
                self.add_error('card_number', 'Card number is required.')
            
            if not card_name:
                self.add_error('card_name', 'Name on card is required.')
            
            if not expiry_date:
                self.add_error('expiry_date', 'Expiry date is required.')
            
            if not cvv:
                self.add_error('cvv', 'CVV is required.')
        
        return cleaned_data