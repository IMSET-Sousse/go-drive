from django.db import models
from django.utils.text import slugify


class CarCategory(models.Model):
    """Model for car categories."""
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    
    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name_plural = "Car Categories"


class Location(models.Model):
    """Model for pickup/dropoff locations."""
    name = models.CharField(max_length=100)
    address = models.TextField()
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    zip_code = models.CharField(max_length=20)
    
    def __str__(self):
        return f"{self.name} - {self.city}, {self.state}"


class Car(models.Model):
    """Model for car information."""
    TRANSMISSION_CHOICES = (
        ('automatic', 'Automatic'),
        ('manual', 'Manual'),
    )
    
    FUEL_TYPE_CHOICES = (
        ('petrol', 'Petrol'),
        ('diesel', 'Diesel'),
        ('electric', 'Electric'),
        ('hybrid', 'Hybrid'),
    )
    
    category = models.ForeignKey(CarCategory, on_delete=models.CASCADE, related_name='cars')
    name = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, blank=True)
    description = models.TextField()
    daily_rate = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to='cars/')
    year = models.PositiveIntegerField()
    make = models.CharField(max_length=100)
    model = models.CharField(max_length=100)
    seats = models.PositiveIntegerField(default=5)
    doors = models.PositiveIntegerField(default=4)
    transmission = models.CharField(max_length=20, choices=TRANSMISSION_CHOICES, default='automatic')
    fuel_type = models.CharField(max_length=20, choices=FUEL_TYPE_CHOICES, default='petrol')
    mileage = models.PositiveIntegerField(help_text="Mileage in miles per gallon (MPG)")
    features = models.TextField(help_text="Comma-separated list of features")
    is_available = models.BooleanField(default=True)
    is_featured = models.BooleanField(default=False)
    locations = models.ManyToManyField(Location, related_name='available_cars')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(f"{self.make}-{self.model}-{self.year}")
        super().save(*args, **kwargs)
    
    def __str__(self):
        return f"{self.year} {self.make} {self.model}"
    
    def get_features_list(self):
        """Return features as a list."""
        return [feature.strip() for feature in self.features.split(',')]


class CarImage(models.Model):
    """Model for additional car images."""
    car = models.ForeignKey(Car, on_delete=models.CASCADE, related_name='additional_images')
    image = models.ImageField(upload_to='cars/additional/')
    is_primary = models.BooleanField(default=False)
    
    def __str__(self):
        return f"Image for {self.car}"


class Review(models.Model):
    """Model for car reviews."""
    car = models.ForeignKey(Car, on_delete=models.CASCADE, related_name='reviews')
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    rating = models.PositiveIntegerField(choices=[(i, i) for i in range(1, 6)])
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Review by {self.user.username} for {self.car}"
    
    class Meta:
        unique_together = ('car', 'user')