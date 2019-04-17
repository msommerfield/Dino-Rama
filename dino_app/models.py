from django.db import models

# Create your models here.

class Diet(models.Model):
    diet = models.CharField(max_length=255)

    def __str__(self):
        return self.diet

class Location(models.Model):
    time_period = models.CharField(max_length=255)
    region = models.CharField(max_length=255)

    def __str__(self):
        return self.time_period

class Dinosaur(models.Model):
    name = models.CharField(max_length=255)
    estimated_height = models.IntegerRange()
    estimated_mass = models.IntegerRange()
    image = models.CharField(max_length=400)
    fossil = models.CharField(max_length=400)
    location = models.ForeignKey(Location, on_delete=models.CASCADE, related_name='dinosaurs')
    diet = models.ForeignKey(Diet, on_delete=models.CASCADE, related_name='dinosaurs')

    def __str__(self):
        return self.name
