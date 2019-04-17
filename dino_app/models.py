from django.db import models

# Create your models here.

class Stats(models.Model):
    estimated_height = models.IntegerField()
    estimated_mass = models.IntegerField()
    diet = models.CharField(max_length=255)
    def __str__(self):
        return self.estimated_height

class Location(models.Model):
    time_period = models.CharField(max_length=255)
    region = models.CharField(max_length=255)

    def __str__(self):
        return self.title

class Dinosaur(models.Model):
    name = models.CharField(max_length=255)
    image = models.CharField(max_length=400)
    location = models.ForeignKey(Location, on_delete=models.CASCADE, related_name='dinosaurs')
    stats = models.ForeignKey(Stats, on_delete=models.CASCADE, related_name='dinosaurs')

    def __str__(self):
        return self.name
