from django.db import models

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
    especialidade = models.ForeignKey(Especialidade, on_delete=models.CASCADE)
    exame = models.ForeignKey(Exame, on_delete=models.CASCADE)
    nome = models.CharField(max_length=50)
    titulo = models.CharField(max_length=50)
    tecnica_header = models.CharField(max_length=50)
    tecnica = models.CharField(max_length=500)
    relatorio_header = models.CharField(max_length=500)
    def __str__(self):
        return self.nome


class TopicoLaudo(models.Model):
    mascara = models.ForeignKey(Mascara, on_delete=models.CASCADE)
    orgao = models.CharField(max_length=50)
    relatorio = models.CharField(max_length=500)
    def __str__(self):
        return self.orgao





