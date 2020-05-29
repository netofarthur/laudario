from django.shortcuts import render

# Create your views here.

def index(request, numero):
    context = {'meunumero':numero,}
    return render (request, 'masks/index.html', context)
    
