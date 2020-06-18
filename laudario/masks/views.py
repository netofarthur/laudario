from django.shortcuts import render
from django.core import serializers
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


def mostrar_modal_diagnostico(request, id_diagnostico):
    diagnostico = TopicoAnormal.objects.get(pk=id_diagnostico)
    context = {'diagnostico': diagnostico}
    return render(request, 'masks/topico_alterado.html', context)


def mostrar_mascara_builder(request, template_name):
    context = {}
    return render(request, 'masks/diagnosticos/' + template_name, context)
