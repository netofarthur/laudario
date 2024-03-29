from django.db import models
from django.conf import settings
from django.utils import timezone



class Exame(models.Model):
    descricao = models.CharField(max_length=100)
    initials = models.CharField(max_length=5)

    def __str__(self):
        return self.descricao

class Especialidade(models.Model):
    descricao = models.CharField(max_length=100)
    def __str__(self):
        return self.descricao


# Normal masks (templates)
class Mascara(models.Model):
    usuario = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    especialidade = models.ForeignKey(Especialidade, on_delete=models.CASCADE)
    exame = models.ForeignKey(Exame, on_delete=models.CASCADE)
    nome = models.CharField(max_length=100)
    titulo = models.CharField(max_length=500)
    indicacoes_header = models.CharField(max_length=500)
    indicacoes = models.TextField(max_length=5000)
    tecnica_header = models.CharField(max_length=50)
    tecnica = models.CharField(max_length=1000)
    relatorio_header = models.CharField(max_length=50)
    conclusao_header = models.CharField(max_length=50)
    conclusao = models.CharField(max_length=2000)
    publica = models.BooleanField(default=True)
    popularidade = models.IntegerField(default=0)
    frequencia = models.IntegerField(default=0)
    ultima_vez_usado = models.DateTimeField(default=timezone.now)
    info_adicional = models.TextField(max_length=2000)
    data_criada = models.DateTimeField(default=timezone.now)
    mascara_topicos = models.BooleanField(default=False)



    def __str__(self):
        return self.nome


class TopicoNormal(models.Model):
    mascara = models.ForeignKey(Mascara, on_delete=models.CASCADE)
    orgao = models.CharField(max_length=100)
    relatorio = models.TextField(max_length=3000)
    ordem = models.IntegerField(default=0)

    def __str__(self):
        return self.orgao 


class TopicoAnormal(models.Model):
    topico_normal = models.ForeignKey(TopicoNormal, on_delete=models.CASCADE)
    nome = models.CharField(max_length=200)
    descricao = models.CharField(max_length=500)
    relatorio = models.CharField(max_length=4000)
    conclusao = models.CharField(max_length=4000, blank=True, null=True)
    publica = models.BooleanField(default=True)
    popularidade = models.IntegerField(default=0)
    frequencia = models.IntegerField(default=0)
    data_criada = models.DateTimeField(default=timezone.now)


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
    ordem = models.IntegerField(default=0)

    nome_da_variavel = models.CharField(max_length=1000)
    nome_amigavel = models.CharField(max_length=500)
    unidade_medida = models.CharField(max_length=50)
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
    tamanho_fonte = models.CharField(max_length=20, default='16px')
    cor_topicos = models.CharField(max_length=20, default='#000000')
    cor_mascara = models.CharField(max_length=20, default='#000000')
    cor_titulo = models.CharField(max_length=20, default='#000000')
    capitalizacao = models.CharField(max_length=20, default='none')
    capitalizacao_topicos = models.CharField(max_length=20, default='none')

    alinhamento_titulo = models.CharField(max_length=20, default='center')
    alinhamento_topicos = models.CharField(max_length=20, default='left')
    tamanho_titulo = models.CharField(max_length=20, default='32px')
    tamanho_topicos = models.CharField(max_length=20, default='28px')
    espacamento_topicos = models.CharField(max_length=20, default='0px')
    altura_linha = models.CharField(max_length=20, default='100%')
    margem_cabecalho = models.CharField(max_length=20, default='20px')
    mascara_topicos = models.BooleanField(default=False)
    quadro_mais = models.BooleanField(default=False)
    vencimento_premium = models.DateTimeField(default=timezone.now)
    preference_id = models.CharField(max_length=1000, default='')


    def __str__(self):
        return self.usuario.username


class Mensagem(models.Model):
    usuario = models.CharField(max_length=100)
    assunto = models.CharField(max_length=100)
    mensagem = models.TextField(max_length=4000)
    email = models.CharField(max_length=100)
    data_enviada = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.usuario




