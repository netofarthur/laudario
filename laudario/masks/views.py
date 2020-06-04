from django.shortcuts import render
from .models import Mascara, TopicoNormal, TopicoAnormal

# Create your views here.

def mostrar_mascara(request, id_mascara):
    mascara = Mascara.objects.get(pk=id_mascara)
    topicos_normais = TopicoNormal.objects.filter(mascara=id_mascara)

    topicos_anormais = TopicoAnormal.objects.all()
    context = {'mascara': mascara, 'topicos_normais': topicos_normais, 'topicos_anormais': topicos_anormais, }
    template_name = mascara.template_name
    return render(request, 'masks/mascaras/' + template_name, context)




def mostrar_modal_diagnostico(request, id_diagnostico):
    diagnostico = TopicoAnormal.objects.get(pk=id_diagnostico)
    template_name = diagnostico.template_name
    context = {}
    return render(request, 'masks/diagnosticos/' + template_name, context)
