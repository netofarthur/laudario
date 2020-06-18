from django.shortcuts import render
from django.core import serializers
from django.http import HttpResponse
from .models import Mascara, TopicoNormal, TopicoAnormal, TopicoAnormalBuilder, Variavel, Especialidade, Exame

# Create your views here.

def mostrar_mascara(request, id_mascara):
    mascara = Mascara.objects.get(pk=id_mascara)
    topicos_normais = TopicoNormal.objects.filter(mascara=id_mascara)



    topicos_anormais = TopicoAnormal.objects.all()
    topicos_anormais_builders = TopicoAnormalBuilder.objects.all()

    json_serializer = serializers.get_serializer("json")()
    alterados = json_serializer.serialize(TopicoAnormal.objects.all())
    variaveis = json_serializer.serialize(Variavel.objects.all())

    context = {'mascara': mascara, 'topicos_normais': topicos_normais, 'topicos_anormais': topicos_anormais,
               'topicos_anormais_builders': topicos_anormais_builders, 'alterados': alterados, 'variaveis': variaveis, }
    return render(request, 'masks/mascara.html', context)

def nova_mascara(request):
    especialidades = Especialidade.objects.all()
    exames = Exame.objects.all()
    context = {'especialidades': especialidades, 'exames': exames}
    return render(request, 'masks/nova_mascara.html', context)

def adicionar_nova_mascara(request):
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


    st = request.POST['titulo_exame']


    especialidadeInstance = Especialidade.objects.get(pk=especialidade_id)
    exameInstance = Exame.objects.get(pk=exame_id)

    nova_mascara = Mascara(especialidade=especialidadeInstance, exame=exameInstance, nome=nome_exame, titulo=titulo_exame,
                           tecnica_header=tecnica_header, tecnica=tecnica, relatorio_header=relatorio_header,
                          conclusao_header=conclusao_header, conclusao=conclusao)
    nova_mascara.save()


    for i in range(len(lista_orgaos)):
        topico_normal = TopicoNormal(mascara=nova_mascara, orgao=lista_orgaos[i], relatorio=lista_relatorios_orgaos[i])
        topico_normal.save()



    return HttpResponse("<html><body><p>Máscara adicionada" + lista_orgaos[0] + lista_relatorios_orgaos[0] + "</p></body></html>")



def mostrar_modal_diagnostico(request, id_diagnostico):
    diagnostico = TopicoAnormal.objects.get(pk=id_diagnostico)
    context = {'diagnostico': diagnostico}
    return render(request, 'masks/topico_alterado.html', context)


def mostrar_mascara_builder(request, template_name):
    context = {}
    return render(request, 'masks/diagnosticos/' + template_name, context)

def mostrar_index(request):
    context = {}
    return render(request, 'masks/index.html/', context)

def login(request):
    return HttpResponse("<html><body><p>Login efetuado</p></body></html>")

def cadastro(request):
    context = {}
    return render(request, 'masks/cadastro.html/', context)


def cadastrar(request):
    usuario = request.POST['usuario']
    primeiro_nome = request.POST['primeiro_nome']
    segundo_nome = request.POST['segundo_nome']
    email = request.POST['email']
    senha = request.POST['senha']
    return HttpResponse("<html><body><p>" + usuario + "</p></body></html>")
