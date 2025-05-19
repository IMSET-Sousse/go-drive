from rest_framework import serializers
from .models import Car, CarCategory, Location, CarImage, Review

class CarImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarImage
        fields = ['id', 'image', 'is_primary']

class ReviewSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()

    class Meta:
        model = Review
        fields = ['id', 'user', 'rating', 'comment', 'created_at']
        read_only_fields = ['user']

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ['id', 'name', 'address', 'city', 'state', 'zip_code']

class CarCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = CarCategory
        fields = ['id', 'name', 'description', 'slug']

class CarSerializer(serializers.ModelSerializer):
    category = CarCategorySerializer(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=CarCategory.objects.all(),
        source='category',
        write_only=True
    )
    locations = LocationSerializer(many=True, read_only=True)
    location_ids = serializers.PrimaryKeyRelatedField(
        queryset=Location.objects.all(),
        source='locations',
        write_only=True,
        many=True,
        required=False
    )
    images = CarImageSerializer(many=True, read_only=True)
    reviews = ReviewSerializer(many=True, read_only=True)
    features_list = serializers.SerializerMethodField()

    class Meta:
        model = Car
        fields = [
            'id', 'category', 'category_id', 'name', 'slug', 'description',
            'daily_rate', 'image', 'year', 'make', 'model', 'seats',
            'doors', 'transmission', 'fuel_type', 'mileage', 'features',
            'features_list', 'is_available', 'is_featured', 'locations',
            'location_ids', 'images', 'reviews', 'created_at', 'updated_at'
        ]
        read_only_fields = ['slug', 'created_at', 'updated_at']

    def get_features_list(self, obj):
        return obj.get_features_list()

    def create(self, validated_data):
        locations = validated_data.pop('locations', [])
        car = Car.objects.create(**validated_data)
        if locations:
            car.locations.set(locations)
        return car

    def update(self, instance, validated_data):
        locations = validated_data.pop('locations', None)
        instance = super().update(instance, validated_data)
        if locations is not None:
            instance.locations.set(locations)
        return instance 