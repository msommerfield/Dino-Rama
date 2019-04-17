from django.db import models

# Create your models here.

class Diet(models.Model):
    diet = models.CharField(max_length=255, default="omnivore")

    def __str__(self):
        return self.diet

class Location(models.Model):
    time_period = models.CharField(max_length=255, default="Cretaceous period")
    region = models.CharField(max_length=255, default="Laramidia which is now western North America")

    def __str__(self):
        return self.time_period

class Dinosaur(models.Model):
    name = models.CharField(max_length=255, default="Tyrannosaurus Rex")
    estimated_height = models.CharField(max_length=255, default="15 – 20 feet")
    estimated_mass = models.CharField(max_length=255, default="13,000 – 32,000 lbs")
    image = models.CharField(max_length=400, default="dino pic")
    fossil = models.CharField(max_length=400, default="fossil pic")
    location = models.ForeignKey(Location, on_delete=models.CASCADE, related_name='dinosaurs', default="Laramidia which is now western North America")
    diet = models.ForeignKey(Diet, on_delete=models.CASCADE, related_name='dinosaurs')

    def __str__(self):
        return self.name
