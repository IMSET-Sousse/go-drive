from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver


class Profile(models.Model):
    """Model for user profile information."""
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone = models.CharField(max_length=20, blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    license_number = models.CharField(max_length=50, blank=True, null=True)
    profile_image = models.ImageField(default='default-profile.jpg', upload_to='profile_pics')
    date_joined = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f'{self.user.username} Profile'


@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):
    """Create a profile when a new user is created."""
    if created:
        Profile.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_profile(sender, instance, **kwargs):
    """Save profile when user is saved."""
    instance.profile.save()