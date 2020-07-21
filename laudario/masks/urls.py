from django.urls import path

from . import views

urlpatterns = [
    path('mascaras/<int:id_mascara>/', views.mostrar_mascara, name='mostrar_mascara'),
    path('mascaras/diagnosticos/<str:template_name>/', views.mostrar_mascara_builder, name='mostrar_mascara_buider'),
    path('mascaras/nova/', views.nova_mascara, name='nova_mascara'),
    path('mascaras/nova/adicionar', views.adicionar_nova_mascara, name='adicionar_nova_mascara'),
    path('', views.mostrar_index, name='mostrar_index'),
    path('login', views.login_usuario, name='login_usuario'),
    path('cadastro', views.cadastro, name='cadastro'),
    path('cadastrar', views.cadastrar, name='cadastrar'),
    path('logout', views.logout_usuario, name='logout_usuario'),
    path('mascaras/', views.mostrar_mascaras, name='mostrar_mascaras'),
    path('salvaralteracao/', views.adicionar_alteracao, name='adicionar_alteracao'),
    path('mascaras/variaveis/adicionar', views.adicionar_variaveis, name='adicionar_variaveis'),
    path('fazernada', views.fazer_nada, name='fazer_nada'),

]
