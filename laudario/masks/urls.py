from django.urls import path

from . import views

urlpatterns = [
    path('mascaras/<int:id_mascara>/', views.mostrar_mascara, name='mostrar_mascara'),
    path('diagnosticos/<int:id_diagnostico>/', views.mostrar_modal_diagnostico, name='mostrar_modal_diagnostico'),
]
