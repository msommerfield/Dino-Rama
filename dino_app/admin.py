from django.contrib import admin

# Register your models here.

from .models import Diet, Location, Dinosaur

admin.site.register([Diet, Location, Dinosaur])