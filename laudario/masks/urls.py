from django.urls import path

from . import views

urlpatterns = [
    path('teste/<int:numero>/', views.index, name='index'),
]
