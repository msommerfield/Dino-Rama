from rest_framework import serializers

from .models import Location, Diet, Dinosaur

class DinosaurSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dinosaur
        fields = ('id', 'name', 'estimated_height', 'estimated_mass', 'image', 'fossil', 'location', 'diet')

class DietSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Diet
        fields = ('id', 'diet')

class LocationSerializer(serializers.ModelSerializer):
   
    class Meta:
        model = Location
        fields = ('id', 'time_period', 'region')