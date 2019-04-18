from django.urls import path, include
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register('dinosaurs', views.DinosaurView)
router.register('diets', views.DietView)
router.register('locations', views.LocationView)


urlpatterns = [
    path('', include(router.urls))
]