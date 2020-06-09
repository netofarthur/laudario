from django.shortcuts import render
from .models import Mascara, TopicoNormal, TopicoAnormal, TopicoAnormalBuilder

# Create your views here.

def mostrar_mascara(request, id_mascara):
    mascara = Mascara.objects.get(pk=id_mascara)
    topicos_normais = TopicoNormal.objects.filter(mascara=id_mascara)

    topicos_anormais = TopicoAnormal.objects.all()
    topicos_anormais_builders = TopicoAnormalBuilder.objects.all()

    context = {'mascara': mascara, 'topicos_normais': topicos_normais, 'topicos_anormais': topicos_anormais,
               'topicos_anormais_builders': topicos_anormais_builders, }
    return render(request, 'masks/mascara.html', context)




def mostrar_modal_diagnostico(request, id_diagnostico):
    diagnostico = TopicoAnormal.objects.get(pk=id_diagnostico)
    context = {'diagnostico': diagnostico}

    return render(request, 'masks/topico_alterado.html', context)

def mostrar_mascara_builder(request, template_name):
    context = {}
    return render(request, 'masks/diagnosticos/' + template_name, context)
