from django import forms
from .models import Review


class ReviewForm(forms.ModelForm):
    """Form for adding car reviews."""
    
    class Meta:
        model = Review
        fields = ['rating', 'comment']
        widgets = {
            'comment': forms.Textarea(attrs={'rows': 4}),
        }