from django.shortcuts import render, redirect
from django.core import serializers
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django_email_verification import sendConfirm
from django.http import HttpResponse
import re

from . import views




from .models import Mascara, TopicoNormal, TopicoAnormal, TopicoAnormalBuilder, Variavel, Especialidade, Exame


# Create your views here.

def mostrar_mascara(request, id_mascara):

    #Verifica se o usuário está logado
    if not request.user.is_authenticated:
        return redirect(views.mostrar_index)



    mascara = Mascara.objects.get(pk=id_mascara)

    # Verifica se o usuário tem permissão para ver essa máscara
    if request.user != mascara.usuario:
        return redirect(views.mostrar_index)


    topicos_normais = TopicoNormal.objects.filter(mascara=id_mascara)

    topicos_anormais = TopicoAnormal.objects.filter(topico_normal__in=TopicoNormal.objects.filter(mascara=id_mascara)).order_by('-frequencia', 'nome')

    todos_topicos_anormais = TopicoAnormal.objects.all().order_by('-popularidade', 'nome')
    topicos_anormais_builders = TopicoAnormalBuilder.objects.all()

    json_serializer = serializers.get_serializer("json")()
    alterados = json_serializer.serialize(TopicoAnormal.objects.all())
    variaveis = json_serializer.serialize(Variavel.objects.all())
    normais = json_serializer.serialize(TopicoNormal.objects.all())
    mascarasJson = json_serializer.serialize(Mascara.objects.all())
    variaveisusuario = json_serializer.serialize(Variavel.objects.filter(usuario=request.user))

    usuarios2 = json_serializer.serialize(User.objects.all())

    context = {'mascara': mascara, 'topicos_normais': topicos_normais, 'topicos_anormais': topicos_anormais,
               'topicos_anormais_builders': topicos_anormais_builders, 'alterados': alterados, 'variaveis': variaveis, 'normais': normais,
               'usuarios2': usuarios2, 'mascarasJson': mascarasJson, 'variaveisusuario': variaveisusuario, 'todos_topicos_anormais': todos_topicos_anormais,}
    return render(request, 'masks/mascara.html', context)

def nova_mascara(request):
    # Verifica se o usuário está logado
    if not request.user.is_authenticated:
        return redirect(views.mostrar_index)
    especialidades = Especialidade.objects.all()
    exames = Exame.objects.all()

    json_serializer = serializers.get_serializer("json")()

    mascarasJson = json_serializer.serialize(Mascara.objects.filter(publica=True))

    mascaras = Mascara.objects.filter(publica=True)

    topicos_normais = json_serializer.serialize(TopicoNormal.objects.all())
    variaveis = json_serializer.serialize(Variavel.objects.all())
    variaveisusuario = json_serializer.serialize(Variavel.objects.filter(usuario=request.user))

    context = {'especialidades': especialidades, 'exames': exames, 'mascaras': mascaras, 'mascarasJson': mascarasJson, 'topicos_normais': topicos_normais, 'variaveis': variaveis,
               'variaveisusuario': variaveisusuario}
    return render(request, 'masks/nova_mascara.html', context)

def adicionar_nova_mascara(request):
    # Verifica se o usuário está logado
    if not request.user.is_authenticated:
        return redirect(views.mostrar_index)

    usuario = request.user
    exame_id = request.POST['exames']
    especialidade_id = request.POST['especialidades']
    nome_exame = request.POST['nome_exame']
    titulo_exame = request.POST['titulo_exame']
    tecnica_header = request.POST['tecnica_header']
    tecnica = request.POST['tecnica']
    relatorio_header = request.POST['relatorio_header']

    lista_orgaos = request.POST.getlist('orgao')
    lista_relatorios_orgaos = request.POST.getlist('relatorio_orgao')

    conclusao_header = request.POST['conclusao_header']
    conclusao = request.POST['conclusao']

    pub = request.POST.get('mascara_publica', False)

    if (pub == 'on'):
        publica = True;
    else:
        publica = False;

    st = request.POST['titulo_exame']





    especialidadeInstance = Especialidade.objects.get(pk=especialidade_id)
    exameInstance = Exame.objects.get(pk=exame_id)

    nova_mascara = Mascara(usuario=usuario, especialidade=especialidadeInstance, exame=exameInstance, nome=nome_exame, titulo=titulo_exame,
                           tecnica_header=tecnica_header, tecnica=tecnica, relatorio_header=relatorio_header,
                          conclusao_header=conclusao_header, conclusao=conclusao, publica=publica,)
    nova_mascara.save()


    topico_normal_nenhum_orgao = TopicoNormal(mascara=nova_mascara, orgao="Nenhum órgão", relatorio="")
    topico_normal_nenhum_orgao.save()

    for i in range(len(lista_orgaos)):

        topico_normal = TopicoNormal(mascara=nova_mascara, orgao=lista_orgaos[i], relatorio=lista_relatorios_orgaos[i])
        topico_normal.save()

    mascaraId = request.POST['mascara_aproveitada']

    if(mascaraId != ""):

        mascaraUtilizada = Mascara.objects.get(pk=mascaraId)

        mascaraUtilizada.popularidade += 1

        mascaraUtilizada.save()

    adicionar_variaveis(request)



    return HttpResponse(status=204)


def adicionar_alteracao(request):
    if not request.user.is_authenticated:
        return redirect(views.mostrar_index)

    pub = request.POST.get('frase_publica', False)

    if (pub == 'on'):
        publica = True;
    else:
        publica = False;

    if request.POST.get('adicionar_no_banco', False) == 'on':

        try:
            topicoNormal = TopicoNormal.objects.get(pk=request.POST.get('exames', None))
        except TopicoNormal.DoesNotExist:
            topicoNormal = None


        if(topicoNormal != None):
            topicoAnormal = TopicoAnormal(topico_normal=topicoNormal, nome=request.POST['nome_modal'],
                                          relatorio=request.POST['relatorio_modal'],
                                          conclusao=request.POST['conclusao_modal'],
                                          publica=publica)
            topicoAnormal.save()
            adicionar_variaveis(request)

    fraseId = request.POST['frase_aproveitada']

    if(fraseId != ""):

        fraseUtilizada = TopicoAnormal.objects.get(pk=int(fraseId))

        fraseUtilizada.popularidade += 1

        fraseUtilizada.save()


    return HttpResponse(status=204)

def adicionar_variaveis(request):
    usuario = request.user
    lista_nomes_variaveis = request.POST.getlist('nome_da_variavel')
    lista_nomes_amigaveis = request.POST.getlist('nome_amigavel_variavel')
    lista_unidades_de_medidas = request.POST.getlist('unidade_de_medida')
    mystr = ""
    for i in range(len(lista_nomes_variaveis)):
        variavel = Variavel(usuario=usuario, nome_da_variavel=lista_nomes_variaveis[i])
        if(lista_nomes_amigaveis[i] == ""):
            variavel.nome_amigavel = ''.join([i for i in lista_nomes_variaveis[i] if not i.isdigit()])
        else:
            variavel.nome_amigavel = lista_nomes_amigaveis[i]

        variavel.unidade_medida = lista_unidades_de_medidas[i]
        variavel.save()



def obter_variaveis(frase):
    variavelRegex = re.compile(r'\{([^}]+)\}')
    achados = variavelRegex.findall(frase)
    return achados


def mostrar_modal_diagnostico(request, id_diagnostico):
    # Verifica se o usuário está logado
    if not request.user.is_authenticated:
        return redirect(views.mostrar_index)
    diagnostico = TopicoAnormal.objects.get(pk=id_diagnostico)
    context = {'diagnostico': diagnostico}
    return render(request, 'masks/topico_alterado.html', context)


def mostrar_mascara_builder(request, template_name):
    # Verifica se o usuário está logado
    if not request.user.is_authenticated:
        return redirect(views.mostrar_index)
    context = {}
    return render(request, 'masks/diagnosticos/' + template_name, context)

def mostrar_index(request):

    context = {}
    return render(request, 'masks/index.html/', context)

def login_usuario(request):
    usuario = request.POST['usuario']
    senha = request.POST['senha']
    usr = authenticate(request, username=usuario, password=senha)
    if usr is not None:
        login(request, usr)
        return redirect(views.mostrar_mascaras)

    else:
        return HttpResponse("<html><body><p>Usuário ou senha inválidos</p></body></html>")


def cadastro(request):
    context = {}
    return render(request, 'masks/cadastro.html/', context)


def cadastrar(request):
    usuario = request.POST['usuario']
    email = request.POST['email']
    senha = request.POST['senha']

    user = User.objects.create_user(usuario, email, senha)
    sendConfirm(user)
    user.save()

    return HttpResponse("<html><body><p>" + usuario + " criado!</p></body></html>")


def logout_usuario(request):
    logout(request)
    return redirect(views.mostrar_mascaras)


def mostrar_mascaras(request):
    # Verifica se o usuário está logado
    if not request.user.is_authenticated:
        return redirect(views.mostrar_index)
    mascaras = Mascara.objects.filter(usuario=request.user)
    especialidades = Especialidade.objects.all()
    exames = Exame.objects.all()
    context = {'mascaras': mascaras, 'exames': exames, 'especialidades': especialidades}
    return render(request, 'masks/mascaras.html', context)




def configuracoes(request):
    especialidades = Especialidade.objects.all()
    mascaras = Mascara.objects.filter(usuario=request.user)
    exames = Exame.objects.all()
    context = {'especialidades': especialidades, 'mascaras': mascaras, 'exames': exames}
    return render(request, 'masks/configuracoes.html', context)


def editar_mascara(request, id_mascara):
    json_serializer = serializers.get_serializer("json")()

    variaveis = json_serializer.serialize(Variavel.objects.filter(usuario=request.user))
    variaveisusuario = json_serializer.serialize(Variavel.objects.filter(usuario=request.user))

    especialidades = Especialidade.objects.all()
    topicos_anormais = TopicoAnormal.objects.filter(topico_normal__in=TopicoNormal.objects.filter(mascara=id_mascara))
    mascara = Mascara.objects.get(pk=id_mascara)
    exames = Exame.objects.all()
    topicos_normais = TopicoNormal.objects.filter(mascara=id_mascara)
    context = {'mascara': mascara, 'especialidades': especialidades, 'exames': exames, 'topicos_normais': topicos_normais,
               'topicos_anormais': topicos_anormais,'variaveis': variaveis, 'variaveisusuario': variaveisusuario,}
    return render(request, 'masks/editar_mascara.html', context)


def salvar_edicao(request, id_mascara):
    mascara = Mascara.objects.get(pk=id_mascara)

    exame_id = request.POST['exames']
    exame = Exame.objects.get(pk=exame_id)
    especialidade_id = request.POST['especialidades']
    especialidade = Especialidade.objects.get(pk=especialidade_id)
    mascara.nome = request.POST['nome_exame']
    mascara.exame = exame
    mascara.especialidade = especialidade
    mascara.titulo = request.POST['titulo_exame']
    mascara.tecnica_header = request.POST['tecnica_header']
    mascara.tecnica = request.POST['tecnica']
    mascara.relatorio_header = request.POST['relatorio_header']
    mascara.conclusao_header = request.POST['conclusao_header']
    mascara.conclusao = request.POST['conclusao']

    pub = request.POST.get('mascara_publica', False)

    if(pub == 'on'):
        publica = True
    else:
        publica = False

    mascara.publica = publica


    orgaosDaMascara = TopicoNormal.objects.filter(mascara=id_mascara)

    lista_nomes_orgaos = request.POST.getlist('orgao')

    lista_relatorios_orgaos = request.POST.getlist('relatorio_orgao')

    lista_ids_orgaos = request.POST.getlist('id_orgao')

    vezesClicadoRemover = request.POST['clicou_remover']





    for i in range(len(lista_relatorios_orgaos)):

        if(i < len(orgaosDaMascara) - int(vezesClicadoRemover)):
            orgao = TopicoNormal.objects.get(pk=lista_ids_orgaos[i])
            orgao.orgao = lista_nomes_orgaos[i]
            orgao.relatorio = lista_relatorios_orgaos[i]
            orgao.save()
        else:
            orgao = TopicoNormal(orgao=lista_nomes_orgaos[i], relatorio=lista_relatorios_orgaos[i], mascara=mascara)
            orgao.save()


    mascara.save()

    #remove tópico do usuário que estiver sido removido da página. Ainda faltar deixar aviso do risco.
    for i in range(len(orgaosDaMascara)):
        if(str(orgaosDaMascara[i].pk) not in lista_ids_orgaos):
            orgaosDaMascara[i].delete()
    adicionar_variaveis(request)
    return HttpResponse(status=204)


def editar_alteracao(request, id_alteracao, id_mascara):
    json_serializer = serializers.get_serializer("json")()


    variaveis = json_serializer.serialize(Variavel.objects.filter(usuario=request.user))
    variaveisusuario = json_serializer.serialize(Variavel.objects.filter(usuario=request.user))

    topicos_normais = TopicoNormal.objects.filter(mascara=id_mascara)
    topico_anormal = TopicoAnormal.objects.get(pk=id_alteracao)
    context = {'id_alteracao': id_alteracao, 'topico_anormal': topico_anormal, 'topicos_normais': topicos_normais,
               'variaveis': variaveis, 'variaveisusuario': variaveisusuario,}
    return render(request, 'masks/editar_alteracao.html', context)


def salvar_alteracao(request):
    topicoId = request.POST['topico_id']
    topicoAnormal = TopicoAnormal.objects.get(pk=topicoId)
    topicoNormal = TopicoNormal.objects.get(pk=request.POST['exames'])
    topicoAnormal.topico_normal = topicoNormal
    topicoAnormal.nome = request.POST['nome_modal']
    topicoAnormal.relatorio = request.POST['relatorio_modal']
    topicoAnormal.conclusao = request.POST['conclusao_modal']

    pub = request.POST.get('frase_publica', False)

    if (pub == 'on'):
        publica = True;
    else:
        publica = False;

    topicoAnormal.publica = publica

    topicoAnormal.save();
    adicionar_variaveis(request)

    return HttpResponse(status=204)


def upvote_frase(request):
    fraseId = request.POST['frase_clicada']
    topicoAnormal = TopicoAnormal.objects.get(pk=int(fraseId))
    topicoAnormal.frequencia += 1
    topicoAnormal.save()
    return HttpResponse(status=204)