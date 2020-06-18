from django.urls import path

from . import views

urlpatterns = [
    path('mascaras/<int:id_mascara>/', views.mostrar_mascara, name='mostrar_mascara'),
    path('mascaras/diagnosticos/<str:template_name>/', views.mostrar_mascara_builder, name='mostrar_mascara_buider'),
    path('mascaras/nova/', views.nova_mascara, name='nova_mascara'),
]
