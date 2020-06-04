from django.urls import path

from . import views

urlpatterns = [
    path('<int:id_mascara>/', views.mostrar_mascara, name='mostrar_mascara'),
    path('<str:template_name>/', views.mostrar_modal, name='mostrar_modal'),
]
