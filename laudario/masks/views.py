from django.shortcuts import render
from .models import Mascara, TopicoNormal

# Create your views here.

def mostrar_mascara(request, id_mascara):
    mascara = Mascara.objects.get(pk=id_mascara)
    topicos = TopicoNormal.objects.filter(mascara=id_mascara)
    context = {'mascara': mascara, 'topicos': topicos, }
    template_name = mascara.template_name
    return render(request, 'masks/' + template_name, context)

