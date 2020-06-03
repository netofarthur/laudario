from django.shortcuts import render
from .models import Mascara

# Create your views here.

def mostrar_mascara(request, id_mascara):
    mascara = Mascara.objects.get(pk=id_mascara)
    context = {'mascara': mascara, }
    template_name = mascara.template_name
    return render(request, 'masks/' + template_name, context)

