from django.urls import path

from . import views

urlpatterns = [
    path('mascaras/<int:id_mascara>/', views.mostrar_mascara, name='mostrar_mascara'),
    path('mascaras/alteracao/<int:id_mascara>/<int:id_topico>/<int:id_alteracao>', views.mostrar_mascara_adaptada, name='mostrar_mascara_adaptada'),

    path('mascaras/diagnosticos/<str:template_name>/', views.mostrar_mascara_builder, name='mostrar_mascara_buider'),
    path('mascaras/nova', views.nova_mascara, name='nova_mascara'),
    path('mascaras/nova/adicionar', views.adicionar_nova_mascara, name='adicionar_nova_mascara'),
    path('', views.home, name='home'),
    path('login', views.login_usuario, name='login_usuario'),
    path('cadastrar', views.cadastrar, name='cadastrar'),
    path('logout', views.logout_usuario, name='logout_usuario'),
    path('mascaras', views.mostrar_mascaras, name='mostrar_mascaras'),
    path('salvaralteracao/', views.adicionar_alteracao, name='adicionar_alteracao'),
    path('mascaras/variaveis/adicionar', views.adicionar_variaveis, name='adicionar_variaveis'),
    path('configuracoes', views.configuracoes, name='configuracoes'),
    path('configuracoes/editarmascara/<int:id_mascara>/', views.editar_mascara, name='editar_mascara'),
    path('configuracoes/editarmascara/<int:id_mascara>/salvar', views.salvar_edicao, name='salvar_edicao'),
    path('configuracoes/editaralteracao/<int:id_mascara>/<int:id_alteracao>/', views.editar_alteracao, name='editar_alteracao'),
    path('alteracao/salvaralteracao', views.salvar_alteracao, name='salvar_alteracao'),
    path('upvote/', views.upvote_frase, name='upvote_frase'),
    path('users/validate/<str:uid>/<str:token>', views.activate, name='activate'),
    path('resetarpwd/', views.resetar_password, name='resetar_password'),
    path('linkreset/', views.link_reset, name='link_reset'),
    path('users/resetpwd/<str:uid>/<str:token>', views.resetar_password_confirm, name='resetar_password_confirm'),
    path('confirmarreset/<str:uid>/<str:token>', views.confirmar_reset, name='confirmar_reset'),
    path('ajuda', views.sobre, name='sobre'),
    path('salvarconfiguracoes', views.salvar_configuracoes, name='salvar_configuracoes'),
    path('configuracoes/excluirmascara/<int:id_mascara>/', views.excluir_mascara, name='excluir_mascara'),
    path('configuracoes/excluiralteracao/<int:id_alteracao>/', views.excluir_alteracao, name='excluir_alteracao'),
    path('sobre/descricao', views.descricao, name='descricao'),
    path('eula', views.termos, name='termos'),
    path('quemsomos', views.quemsomos, name='quemsomos'),
    path('comunidade', views.comunidade, name='comunidade'),
    path('entrar', views.mostrar_index, name='mostrar_index')

]
