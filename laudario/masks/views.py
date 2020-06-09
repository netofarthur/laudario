from django.shortcuts import render
from .models import Mascara, TopicoNormal, TopicoAnormal

# Create your views here.

def mostrar_mascara(request, id_mascara):
    mascara = Mascara.objects.get(pk=id_mascara)
    topicos_normais = TopicoNormal.objects.filter(mascara=id_mascara)

    topicos_anormais = TopicoAnormal.objects.all()
    context = {'mascara': mascara, 'topicos_normais': topicos_normais, 'topicos_anormais': topicos_anormais, }
    return render(request, 'masks/base.html', context)




def mostrar_modal_diagnostico(request, id_diagnostico):
    diagnostico = TopicoAnormal.objects.get(pk=id_diagnostico)
    context = {'diagnostico': diagnostico}
    return render(request, 'masks/alteracao.html', context)
