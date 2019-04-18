from django.shortcuts import render
from rest_framework import viewsets
from .serializers import DinosaurSerializer, DietSerializer, LocationSerializer
from .models import Dinosaur, Diet, Location
# Create your views here.

class DinosaurView(viewsets.ModelViewSet):
    queryset = Dinosaur.objects.all()
    serializer_class = DinosaurSerializer

class DietView(viewsets.ModelViewSet):
    queryset = Diet.objects.all()
    serializer_class = DietSerializer

class LocationView(viewsets.ModelViewSet):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer