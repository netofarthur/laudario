from django.db import models
from django.conf import settings
from django.utils import timezone



class Exame(models.Model):
    descricao = models.CharField(max_length=50)
    initials = models.CharField(max_length=3)

    def __str__(self):
        return self.descricao

class Especialidade(models.Model):
    descricao = models.CharField(max_length=50)
    def __str__(self):
        return self.descricao


# Normal masks (templates)
class Mascara(models.Model):
    usuario = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    especialidade = models.ForeignKey(Especialidade, on_delete=models.CASCADE)
    exame = models.ForeignKey(Exame, on_delete=models.CASCADE)
    nome = models.CharField(max_length=50)
    titulo = models.CharField(max_length=50)
    tecnica_header = models.CharField(max_length=50)
    tecnica = models.CharField(max_length=500)
    relatorio_header = models.CharField(max_length=500)
    conclusao_header = models.CharField(max_length=50)
    conclusao = models.CharField(max_length=100)
    publica = models.BooleanField(default=True)
    popularidade = models.IntegerField(default=0)
    frequencia = models.IntegerField(default=0)
    ultima_vez_usado = models.DateTimeField(default=timezone.now)
    def __str__(self):
        return self.nome


class TopicoNormal(models.Model):
    mascara = models.ForeignKey(Mascara, on_delete=models.CASCADE)
    orgao = models.CharField(max_length=50)
    relatorio = models.TextField(max_length=500)
    def __str__(self):
        return self.orgao 


class TopicoAnormal(models.Model):
    topico_normal = models.ForeignKey(TopicoNormal, on_delete=models.CASCADE)
    nome = models.CharField(max_length=100)
    descricao = models.CharField(max_length=500)
    relatorio = models.CharField(max_length=500)
    conclusao = models.CharField(max_length=500, blank=True, null=True)
    publica = models.BooleanField(default=True)
    popularidade = models.IntegerField(default=0)
    frequencia = models.IntegerField(default=0)

    def __str__(self):
        return self.nome

class TopicoAnormalBuilder(models.Model):
    topico_normal = models.ForeignKey(TopicoNormal, on_delete=models.CASCADE)
    template_name = models.CharField(max_length=100)
    nome = models.CharField(max_length=100)
    def __str__(self):
        return self.nome

class Variavel(models.Model):
    usuario = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    nome_da_variavel = models.CharField(max_length=100)
    nome_amigavel = models.CharField(max_length=500)
    unidade_medida = models.CharField(max_length=10)
    def __str__(self):
        return self.nome_da_variavel
    def __eq__(self, other):
        return self.nome_da_variavel == other.nome_da_variavel

    def __hash__(self):
        return id(self)




class Profile(models.Model):
    usuario = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    is_premium = models.BooleanField(default=False)
    fonte = models.CharField(max_length=100, default='Arial, Helvetica, sans-serif')
    cor_topicos = models.CharField(max_length=20, default='#000000')












