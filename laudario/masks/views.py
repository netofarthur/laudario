from django.shortcuts import render, redirect
from django.core import serializers
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponse
import re
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_decode
from django.contrib.auth.tokens import default_token_generator
from django.core.exceptions import ObjectDoesNotExist
from django.utils import timezone



from django.core.mail import send_mail
from django.template.loader import render_to_string


from . import views




from .models import Mascara, TopicoNormal, TopicoAnormal, TopicoAnormalBuilder, Variavel, Especialidade, Exame, Profile



def mostrar_mascara_adaptada(request, id_mascara, id_topico, id_alteracao):



    usuarioPermitido = True

    mascara = Mascara.objects.get(pk=id_mascara)

    # Verifica se o usuário tem permissão para ver essa máscara
    if request.user != mascara.usuario:
        usuarioPermitido = False


    topicos_normais = TopicoNormal.objects.filter(mascara=id_mascara).order_by('ordem')
    topicos_anormais_mais_usados = TopicoAnormal.objects.filter(topico_normal__in=TopicoNormal.objects.filter(mascara=id_mascara)).order_by('-frequencia', 'nome')[:9]

    topicos_anormais = TopicoAnormal.objects.filter(topico_normal__in=TopicoNormal.objects.filter(mascara=id_mascara)).order_by('nome','-frequencia')

    todos_topicos_anormais = TopicoAnormal.objects.all().order_by('-popularidade', 'nome')
    topicos_anormais_builders = TopicoAnormalBuilder.objects.all()
    profiles = Profile.objects.all()

    json_serializer = serializers.get_serializer("json")()
    alterados = json_serializer.serialize(TopicoAnormal.objects.all())
    variaveis = json_serializer.serialize(Variavel.objects.all().order_by('ordem'))
    normais = json_serializer.serialize(TopicoNormal.objects.all())
    mascarasJson = json_serializer.serialize(Mascara.objects.all())
    variaveisusuario = json_serializer.serialize(Variavel.objects.filter(usuario=mascara.usuario).order_by('ordem'))

    usuarios2 = json_serializer.serialize(User.objects.all())




    profile = Profile.objects.get(usuario=mascara.usuario)

    titulo = "Masqs - " + mascara.nome
    context = {'mascara': mascara, 'topicos_normais': topicos_normais, 'topicos_anormais': topicos_anormais,
               'topicos_anormais_builders': topicos_anormais_builders, 'alterados': alterados, 'variaveis': variaveis, 'normais': normais,
               'usuarios2': usuarios2, 'mascarasJson': mascarasJson, 'variaveisusuario': variaveisusuario, 'todos_topicos_anormais': todos_topicos_anormais,
               'profiles': profiles, 'profile': profile, 'titulo': titulo, 'topicos_anormais_mais_usados': topicos_anormais_mais_usados, 'usuarioPermitido': usuarioPermitido,
               'id_topico': id_topico, 'id_alteracao': id_alteracao}
    return render(request, 'masks/mascara_adaptada.html', context)



# Create your views here.

def mostrar_mascara(request, id_mascara):



    usuarioPermitido = False

    mascara = Mascara.objects.get(pk=id_mascara)

    # Verifica se o usuário tem permissão para ver essa máscara
    if request.user == mascara.usuario:
        usuarioPermitido = True


        topicos_normais = TopicoNormal.objects.filter(mascara=id_mascara).order_by('ordem')
        topicos_anormais_mais_usados = TopicoAnormal.objects.filter(topico_normal__in=TopicoNormal.objects.filter(mascara=id_mascara)).order_by('-frequencia', 'nome')[:9]

        topicos_anormais = TopicoAnormal.objects.filter(topico_normal__in=TopicoNormal.objects.filter(mascara=id_mascara)).order_by('nome','-frequencia')

        todos_topicos_anormais = TopicoAnormal.objects.all().order_by('-popularidade', 'nome')
        topicos_anormais_builders = TopicoAnormalBuilder.objects.all()
        profiles = Profile.objects.all()

        json_serializer = serializers.get_serializer("json")()
        alterados = json_serializer.serialize(TopicoAnormal.objects.all())
        variaveis = json_serializer.serialize(Variavel.objects.all().order_by('ordem'))
        normais = json_serializer.serialize(TopicoNormal.objects.all())

        normaisusuario = json_serializer.serialize(TopicoNormal.objects.filter(mascara=id_mascara))


        mascarasJson = json_serializer.serialize(Mascara.objects.all())
        variaveisusuario = json_serializer.serialize(Variavel.objects.filter(usuario=request.user).order_by('ordem'))

        usuarios2 = json_serializer.serialize(User.objects.all())

        mascara.frequencia += 1
        mascara.ultima_vez_usado = timezone.now()
        mascara.save()



        profile = Profile.objects.get(usuario=request.user)

        mascara_topicos = profile.mascara_topicos

        titulo = "Masqs - " + mascara.nome
        context = {'mascara': mascara, 'topicos_normais': topicos_normais, 'topicos_anormais': topicos_anormais,
                   'topicos_anormais_builders': topicos_anormais_builders, 'alterados': alterados, 'variaveis': variaveis, 'normais': normais,
                   'usuarios2': usuarios2, 'mascarasJson': mascarasJson, 'variaveisusuario': variaveisusuario, 'todos_topicos_anormais': todos_topicos_anormais,
                   'profiles': profiles, 'profile': profile, 'titulo': titulo, 'topicos_anormais_mais_usados': topicos_anormais_mais_usados, 'usuarioPermitido': usuarioPermitido,
                   'mascara_topicos': mascara_topicos, 'normaisusuario': normaisusuario}


    else:
        usuarioPermitido = False

        topicos_normais = TopicoNormal.objects.filter(mascara=id_mascara).order_by('ordem')
        topicos_anormais_mais_usados = TopicoAnormal.objects.filter(
            topico_normal__in=TopicoNormal.objects.filter(mascara=id_mascara)).order_by('-frequencia', 'nome')[:9]

        topicos_anormais = TopicoAnormal.objects.filter(
            topico_normal__in=TopicoNormal.objects.filter(mascara=id_mascara)).order_by('nome', '-frequencia')

        todos_topicos_anormais = TopicoAnormal.objects.all().order_by('-popularidade', 'nome')
        topicos_anormais_builders = TopicoAnormalBuilder.objects.all()
        profiles = Profile.objects.all()

        json_serializer = serializers.get_serializer("json")()
        alterados = json_serializer.serialize(TopicoAnormal.objects.all())
        variaveis = json_serializer.serialize(Variavel.objects.all().order_by('ordem'))
        normais = json_serializer.serialize(TopicoNormal.objects.all())
        mascarasJson = json_serializer.serialize(Mascara.objects.all())
        variaveisusuario = json_serializer.serialize(Variavel.objects.filter(usuario=mascara.usuario).order_by('ordem'))

        usuarios2 = json_serializer.serialize(User.objects.all())



        profile = Profile.objects.get(usuario=mascara.usuario)

        mascara_topicos = profile.mascara_topicos

        titulo = "Masqs - " + mascara.nome
        context = {'mascara': mascara, 'topicos_normais': topicos_normais, 'topicos_anormais': topicos_anormais,
                   'topicos_anormais_builders': topicos_anormais_builders, 'alterados': alterados,
                   'variaveis': variaveis, 'normais': normais,
                   'usuarios2': usuarios2, 'mascarasJson': mascarasJson, 'variaveisusuario': variaveisusuario,
                   'todos_topicos_anormais': todos_topicos_anormais,
                   'profiles': profiles, 'profile': profile, 'titulo': titulo,
                   'topicos_anormais_mais_usados': topicos_anormais_mais_usados, 'usuarioPermitido': usuarioPermitido,
                   'mascara_topicos': mascara_topicos}
    return render(request, 'masks/mascara.html', context)

def nova_mascara(request):
    # Verifica se o usuário está logado
    if not request.user.is_authenticated:
        return redirect(views.mostrar_index)
    especialidades = Especialidade.objects.all()
    exames = Exame.objects.all()

    json_serializer = serializers.get_serializer("json")()

    mascarasJson = json_serializer.serialize(Mascara.objects.filter(publica=True))

    mascaras = Mascara.objects.filter(publica=True)
    profiles = Profile.objects.all()
    topicos_normais = json_serializer.serialize(TopicoNormal.objects.all())
    variaveis = json_serializer.serialize(Variavel.objects.all().order_by('ordem'))
    variaveisusuario = json_serializer.serialize(Variavel.objects.filter(usuario=request.user).order_by('ordem'))
    titulo = "Masqs - Nova Máscara"
    context = {'especialidades': especialidades, 'exames': exames, 'mascaras': mascaras, 'mascarasJson': mascarasJson, 'topicos_normais': topicos_normais, 'variaveis': variaveis,
               'variaveisusuario': variaveisusuario, 'profiles': profiles, 'titulo': titulo}
    return render(request, 'masks/nova_mascara.html', context)

def adicionar_nova_mascara(request):
    # Verifica se o usuário está logado
    if not request.user.is_authenticated:
        return redirect(views.mostrar_index)

    usuario = request.user
    exame_id = request.POST['exames']
    especialidade_id = request.POST['especialidades']
    nome_exame = request.POST['nome_exame']
    titulo_exame = request.POST['titulo_exame']
    indicacoes_header = request.POST['indicacoes_header']
    indicacoes = request.POST['indicacoes']
    tecnica_header = request.POST['tecnica_header']
    tecnica = request.POST['tecnica']
    relatorio_header = request.POST['relatorio_header']
    info_adicional = request.POST['info_adicional']

    lista_orgaos = request.POST.getlist('orgao')
    lista_relatorios_orgaos = request.POST.getlist('relatorio_orgao')

    conclusao_header = request.POST['conclusao_header']
    conclusao = request.POST['conclusao']

    publica = request.POST.get('mascara_publica', True)





    st = request.POST['titulo_exame']





    especialidadeInstance = Especialidade.objects.get(pk=especialidade_id)
    exameInstance = Exame.objects.get(pk=exame_id)

    nova_mascara = Mascara(usuario=usuario, especialidade=especialidadeInstance, exame=exameInstance, nome=nome_exame, titulo=titulo_exame,
                           indicacoes_header=indicacoes_header, indicacoes=indicacoes,
                           tecnica_header=tecnica_header, tecnica=tecnica, relatorio_header=relatorio_header,
                          conclusao_header=conclusao_header, conclusao=conclusao, publica=publica, info_adicional=info_adicional, data_criada=timezone.now())
    nova_mascara.save()


    topico_normal_nenhum_orgao = TopicoNormal(mascara=nova_mascara, orgao="Nenhum órgão", relatorio="", ordem=1000000)


    for i in range(len(lista_orgaos)):

        topico_normal = TopicoNormal(mascara=nova_mascara, orgao=lista_orgaos[i], relatorio=lista_relatorios_orgaos[i], ordem=i)
        topico_normal.save()

    topico_normal_nenhum_orgao.save()

    mascaraId = request.POST['mascara_aproveitada']

    if(mascaraId != ""):

        mascaraUtilizada = Mascara.objects.get(pk=mascaraId)

        mascaraUtilizada.popularidade += 1

        mascaraUtilizada.save()

    adicionar_variaveis(request)
    titulo = "Masqs - Máscara Adicionada"
    mensagem = 'Máscara adicionada com sucesso. <a href="/mascaras/' + str(nova_mascara.pk) + '">Clique aqui</a> para acessá-la.'

    context = {'mensagem_confirmacao': mensagem, 'apagar_login': True, 'titulo': titulo}
    return render(request, 'masks/aviso.html', context)




def adicionar_alteracao(request):
    if not request.user.is_authenticated:
        return redirect(views.mostrar_index)



    pub = request.POST.get('frase_publica', False)

    if (pub == 'on'):
        publica = True
    else:
        publica = False

    if request.POST.get('adicionar_no_banco', False) == 'on':

        try:
            topicoNormal = TopicoNormal.objects.get(pk=request.POST.get('exames', None))
        except TopicoNormal.DoesNotExist:
            topicoNormal = None


        if(topicoNormal != None):

            if(topicoNormal.orgao == 'Nenhum órgão'):
                orgaoSelecionado = request.POST['usuario_orgao_alteracao']
                topicoNormalNovo = TopicoNormal(mascara=topicoNormal.mascara, orgao="Nenhum órgão", relatorio="", ordem=100000)
                topicoNormalNovo.save()
                topicoAnormal = TopicoAnormal(topico_normal=topicoNormalNovo, nome=request.POST['nome_modal'],
                                              relatorio=request.POST['relatorio_modal'],
                                              conclusao=request.POST['conclusao_modal'],
                                              publica=publica, data_criada=timezone.now())
            else:
                topicoAnormal = TopicoAnormal(topico_normal=topicoNormal, nome=request.POST['nome_modal'],
                                          relatorio=request.POST['relatorio_modal'],
                                          conclusao=request.POST['conclusao_modal'],
                                          publica=publica, data_criada=timezone.now())
            topicoAnormal.save()
            adicionar_variaveis(request)

    fraseId = request.POST['frase_aproveitada']

    if(fraseId != ""):

        fraseUtilizada = TopicoAnormal.objects.get(pk=int(fraseId))

        fraseUtilizada.popularidade += 1

        fraseUtilizada.save()


    return HttpResponse(status=204)

def adicionar_variaveis(request):
    # Verifica se o usuário está logado
    if not request.user.is_authenticated:
        return redirect(views.mostrar_index)




    usuario = request.user
    lista_nomes_variaveis = request.POST.getlist('nome_da_variavel')
    lista_nomes_amigaveis = request.POST.getlist('nome_amigavel_variavel')
    lista_unidades_de_medidas = request.POST.getlist('unidade_de_medida')
    mystr = ""
    for i in range(len(lista_nomes_variaveis)):
        try:
            variavel = Variavel.objects.get(usuario=usuario, nome_da_variavel=lista_nomes_variaveis[i])
        except Variavel.DoesNotExist:
            variavel = Variavel(usuario=usuario, nome_da_variavel=lista_nomes_variaveis[i])
        except Variavel.MultipleObjectsReturned:
            variaveis = Variavel.objects.filter(usuario=usuario, nome_da_variavel=lista_nomes_variaveis[i])
            for myvar in variaveis:
                myvar.delete()
            variavel = Variavel(usuario=usuario, nome_da_variavel=lista_nomes_variaveis[i])
        if(lista_nomes_amigaveis[i] == ""):
            variavel.nome_amigavel = 'Ignorar'
        else:
            variavel.nome_amigavel = lista_nomes_amigaveis[i]

        variavel.unidade_medida = lista_unidades_de_medidas[i]
        variavel.ordem = i
        variavel.save()



def obter_variaveis(frase):
    variavelRegex = re.compile(r'\{([^}]+)\}')
    achados = variavelRegex.findall(frase)
    return achados


def mostrar_modal_diagnostico(request, id_diagnostico):
    # Verifica se o usuário está logado
    if not request.user.is_authenticated:
        return redirect(views.mostrar_index)
    diagnostico = TopicoAnormal.objects.get(pk=id_diagnostico)
    context = {'diagnostico': diagnostico}
    return render(request, 'masks/topico_alterado.html', context)


def mostrar_mascara_builder(request, template_name):
    # Verifica se o usuário está logado
    if not request.user.is_authenticated:
        return redirect(views.mostrar_index)
    context = {}
    return render(request, 'masks/diagnosticos/' + template_name, context)

def mostrar_index(request):
    json_serializer = serializers.get_serializer("json")()
    usuarios = json_serializer.serialize(User.objects.all())


    titulo = "Masqs"
    context = {'usuarios': usuarios, 'titulo': titulo}

    if request.user.is_authenticated:
        return redirect(views.mostrar_mascaras)
    else:

        return render(request, 'masks/index.html/', context)

def login_usuario(request):
    usuario = request.POST['usuario']
    senha = request.POST['senha']
    usr = authenticate(request, username=usuario, password=senha)
    if usr is not None:
        login(request, usr)
        return redirect(views.mostrar_mascaras)

    else:
        mensagem_erro = "Usuário ou senha inválidos"
        titulo = "Masqs - Erro"
        context = {'mensagem_erro': mensagem_erro, 'titulo': titulo}
        return render(request, 'masks/erro.html', context)





def cadastrar(request):
    usuario = request.POST['usuario']
    primeiro_nome = request.POST['primeiro_nome']
    sobrenome = request.POST['segundo_nome']
    email = request.POST['email']
    senha = request.POST['senha']
    senha_repetida = request.POST['repetir_senha']



    users = User.objects.all()

    user_names = []
    user_emails = []

    for user in users:
        user_names.append(user.username.lower())
        if(user.is_active == 1):
            user_emails.append(user.email)

    passou_filtro = True
    mensagem_erro = ''

    if(len(usuario) < 3):
        passou_filtro = False
        mensagem_erro = 'Nome do usuário deve conter mais de 3 letras'
    if(len(usuario) > 15):
        passou_filtro = False
        mensagem_erro = 'Nome do usuário deve conter menos de 15 letras'
    if (len(primeiro_nome) > 30):
        passou_filtro = False
        mensagem_erro = 'Primeiro nome deve conter menos de 30 letras'
    if (len(sobrenome) > 30):
        passou_filtro = False
        mensagem_erro = 'Sobrenome deve conter menos de 30 letras'
    if(not usuario.isalnum()):
        passou_filtro = False
        mensagem_erro = 'Somente caracteres alfanumériocs são permitidos para o usuário'
    if " " in usuario:
        passou_filtro = False
        mensagem_erro = 'Não é permitido espaço no nome do usuário'
    if usuario.lower() in user_names:
        passou_filtro = False
        mensagem_erro = 'Usuário já existe. Escolha outro nome de usuário'
    if email in user_emails:
        passou_filtro = False
        mensagem_erro = 'Já existe um usuário cadastrado com esse email. Caso tenha esquecido sua senha clique em "Voltar" e depois em "Esqueceu sua senha?"'
    if(len(senha) < 6):
        passou_filtro = False
        mensagem_erro = 'A senha deve conter pelo menos 6 caracteres'
    if(senha_repetida != senha):
        passou_filtro = False
        mensagem_erro = 'As senhas digitadas não são iguais'
    if(email == ''):
        passou_filtro = False
        mensagem_erro = 'Campo de email em branco'
    if('@' not in email):
        passou_filtro = False
        mensagem_erro = 'Email inválido'





    if(passou_filtro):
        user = User.objects.create_user(usuario, email, senha)
        user.is_active = 0
        user.first_name = primeiro_nome
        user.last_name = sobrenome
        user.save()
        profile = Profile(usuario=user, is_premium=False)
        profile.save()
        token = default_token_generator.make_token(user)
        uid = urlsafe_base64_encode(force_bytes(user.pk))

        link = 'https://masqs.com.br/users/validate/' + uid + '/' + token
        nomeusuario = user.first_name
        msg_plain = render_to_string('masks/email.txt', {'link': link, 'nomeusuario': nomeusuario})
        msg_html = render_to_string('masks/email.html', {'link': link, 'nomeusuario': nomeusuario})
        send_mail(
          'Verificação de cadastro',
          msg_plain,
          'Contato Masqs <contato@masqs.com.br>',
          [user.email],
          html_message=msg_html,

          fail_silently=False,
        )
        titulo = "Masqs - Confirmação"
        mensagem_confirmacao = 'Parabéns, <span style="color: #c96100">' + user.first_name + '</span>, seu cadastro foi criado!<br><br>Para poder acessar sua conta, antes é necessário clicar no link de confirmação enviado para o email <span style="color: #c96100">' + user.email + '</span>.<br><br>Certifique-se de que o email enviado não foi para a sua <span style="color: #c96100">lixeira</span> ou <span style="color: #c96100">caixa de spams</span>.'
        context = {'mensagem_confirmacao': mensagem_confirmacao, 'titulo': titulo,}
        return render(request, 'masks/aviso.html', context)



    else:
        return HttpResponse('<html><body><h2>' + mensagem_erro + '<h2></body></html><br><a href="javascript:history.back()">Voltar</a>')



def activate(request, uid, token):

    if uid is not None and token is not None:

        uidid = urlsafe_base64_decode(uid)
        try:
            user = User.objects.get(pk=uidid)
            if default_token_generator.check_token(user, token):
                user.is_active = 1
                user.save()
                mensagem_confirmacao = '<h2 style="color: #c96100; padding: 3rem;">Parabéns, <span style="color: black;">' + user.first_name + '</span>! Sua conta foi verificada. Seu nome de usuário é: <span style="color: black;">' + user.username + '</span></h2>'
                titulo = "Masqs - Confirmação"
                context = {'mensagem_confirmacao': mensagem_confirmacao, 'titulo': titulo}
                return render(request, 'masks/aviso.html', context)

        except:
            pass
    mensagem_erro = '<h2 style="color: #c96100; padding: 3rem;">Houve um erro ao verificar sua conta. O link pode ter expirado.</h2>'
    titulo = "Masqs - Erro"
    context = {'mensagem_erro': mensagem_erro, 'titulo': titulo}
    return render(request, 'masks/erro.html', context)





def logout_usuario(request):
    logout(request)
    return redirect(views.home)


def mostrar_mascaras(request):
    # Verifica se o usuário está logado
    if not request.user.is_authenticated:
        return redirect(views.mostrar_index)
    mascaras = Mascara.objects.filter(usuario=request.user).order_by('nome')
    mascaras_populares = Mascara.objects.filter(usuario=request.user).order_by('-frequencia', 'nome')[:10]
    ultimas_mascaras = Mascara.objects.filter(usuario=request.user).order_by('-ultima_vez_usado', 'nome')[:10]
    todasespecialidades = Especialidade.objects.all().order_by('descricao')
    especialidades_com_mascara = []
    for especialidade in todasespecialidades:
        mascarasEspecialidade = Mascara.objects.filter(usuario=request.user, especialidade=especialidade)
        if len(mascarasEspecialidade) > 0:
            especialidades_com_mascara.append(especialidade)
    exames = Exame.objects.all()
    especialidades = especialidades_com_mascara
    titulo = "Masqs - Máscaras"
    context = {'mascaras': mascaras, 'exames': exames, 'especialidades': especialidades, 'ultimas_mascaras': ultimas_mascaras,
               'mascaras_populares': mascaras_populares, 'titulo': titulo}
    return render(request, 'masks/mascaras.html', context)




def configuracoes(request):
    # Verifica se o usuário está logado
    if not request.user.is_authenticated:
        return redirect(views.mostrar_index)



    todasespecialidades = Especialidade.objects.all().order_by('descricao')
    especialidades_com_mascara = []
    for especialidade in todasespecialidades:
        mascarasEspecialidade = Mascara.objects.filter(usuario=request.user, especialidade=especialidade)
        if len(mascarasEspecialidade) > 0:
            especialidades_com_mascara.append(especialidade)
    exames = Exame.objects.all()
    especialidades = especialidades_com_mascara
    mascaras = Mascara.objects.filter(usuario=request.user).order_by('nome')
    exames = Exame.objects.all()

    profile = Profile.objects.get(usuario=request.user)
    titulo = "Masqs - Configurações"
    context = {'especialidades': especialidades, 'mascaras': mascaras, 'exames': exames,
               'profile': profile, 'titulo': titulo}
    return render(request, 'masks/configuracoes.html', context)


def editar_mascara(request, id_mascara):
    # Verifica se o usuário está logado
    if not request.user.is_authenticated:
        return redirect(views.mostrar_index)

    mascara = Mascara.objects.get(pk=id_mascara)

    # Verifica se o usuário tem permissão para ver essa máscara
    if request.user != mascara.usuario:
        return redirect(views.mostrar_index)


    json_serializer = serializers.get_serializer("json")()

    variaveis = json_serializer.serialize(Variavel.objects.filter(usuario=request.user).order_by('ordem'))
    variaveisusuario = json_serializer.serialize(Variavel.objects.filter(usuario=request.user).order_by('ordem'))
    profiles = Profile.objects.all()
    especialidades = Especialidade.objects.all()
    topicos_anormais = TopicoAnormal.objects.filter(topico_normal__in=TopicoNormal.objects.filter(mascara=id_mascara)).order_by('nome')
    mascara = Mascara.objects.get(pk=id_mascara)
    exames = Exame.objects.all()
    topicos_normais = TopicoNormal.objects.filter(mascara=id_mascara).order_by('ordem')
    titulo = "Masqs - Editar Máscara"
    context = {'mascara': mascara, 'especialidades': especialidades, 'exames': exames, 'topicos_normais': topicos_normais,
               'topicos_anormais': topicos_anormais,'variaveis': variaveis, 'variaveisusuario': variaveisusuario,
               'profiles': profiles, 'titulo': titulo}
    return render(request, 'masks/editar_mascara.html', context)


def salvar_edicao(request, id_mascara):
    # Verifica se o usuário está logado
    if not request.user.is_authenticated:
        return redirect(views.mostrar_index)

    mascara = Mascara.objects.get(pk=id_mascara)

    # Verifica se o usuário tem permissão para ver essa máscara
    if request.user != mascara.usuario:
        return redirect(views.mostrar_index)

    mascara = Mascara.objects.get(pk=id_mascara)

    exame_id = request.POST['exames']
    exame = Exame.objects.get(pk=exame_id)
    especialidade_id = request.POST['especialidades']
    especialidade = Especialidade.objects.get(pk=especialidade_id)
    mascara.nome = request.POST['nome_exame']
    mascara.exame = exame
    mascara.especialidade = especialidade
    mascara.titulo = request.POST['titulo_exame']
    mascara.indicacoes_header = request.POST['indicacoes_header']
    mascara.indicacoes = request.POST['indicacoes']
    mascara.tecnica_header = request.POST['tecnica_header']
    mascara.tecnica = request.POST['tecnica']
    mascara.relatorio_header = request.POST['relatorio_header']
    mascara.conclusao_header = request.POST['conclusao_header']
    mascara.conclusao = request.POST['conclusao']
    mascara.info_adicional = request.POST['info_adicional']

    pub = request.POST.get('mascara_publica', False)

    if(pub == 'on'):
        publica = True
    else:
        publica = False

    mascara.publica = publica


    orgaosDaMascara = TopicoNormal.objects.filter(mascara=id_mascara)

    lista_nomes_orgaos = request.POST.getlist('orgao')

    lista_relatorios_orgaos = request.POST.getlist('relatorio_orgao')

    lista_ids_orgaos = request.POST.getlist('id_orgao')

    vezesClicadoRemover = request.POST['clicou_remover']





    for i in range(len(lista_relatorios_orgaos)):
        counter = TopicoNormal.objects.filter(mascara=mascara, relatorio=lista_relatorios_orgaos[i])

        if(i < len(orgaosDaMascara) - int(vezesClicadoRemover)):
            if(lista_ids_orgaos[i] == "vazio"):
                orgao = TopicoNormal(orgao=lista_nomes_orgaos[i], relatorio=lista_relatorios_orgaos[i], mascara=mascara, ordem=i)
                orgao.save()
            else:
                orgao = TopicoNormal.objects.get(pk=lista_ids_orgaos[i])
                orgao.orgao = lista_nomes_orgaos[i]
                orgao.relatorio = lista_relatorios_orgaos[i]
                orgao.ordem = i
                orgao.save()

        else:
            if (lista_ids_orgaos[i] == "vazio"):
                orgao = TopicoNormal(orgao=lista_nomes_orgaos[i], relatorio=lista_relatorios_orgaos[i], mascara=mascara,
                                     ordem=i)
                orgao.save()
            else:
                orgao = TopicoNormal.objects.get(pk=lista_ids_orgaos[i])
                orgao.orgao = lista_nomes_orgaos[i]
                orgao.relatorio = lista_relatorios_orgaos[i]
                orgao.ordem = i
                orgao.save()


    mascara.save()

    #remove tópico do usuário que estiver sido removido da página. Ainda faltar deixar aviso do risco.
    for i in range(len(orgaosDaMascara)):
        if(str(orgaosDaMascara[i].pk) not in lista_ids_orgaos):
            orgaosDaMascara[i].delete()
    adicionar_variaveis(request)

    mensagem = 'Máscara alterada com sucesso. <a href="/mascaras/' + str(
        mascara.pk) + '">Clique aqui</a> para acessá-la.'
    titulo = "Masqs - Confirmação"
    context = {'mensagem_confirmacao': mensagem, 'apagar_login': True, 'titulo': titulo}
    return render(request, 'masks/aviso.html', context)


def editar_alteracao(request, id_alteracao, id_mascara):
    # Verifica se o usuário está logado
    if not request.user.is_authenticated:
        return redirect(views.mostrar_index)

    mascara = Mascara.objects.get(pk=id_mascara)

    # Verifica se o usuário tem permissão para ver essa máscara
    if request.user != mascara.usuario:
        return redirect(views.mostrar_index)

    json_serializer = serializers.get_serializer("json")()


    variaveis = json_serializer.serialize(Variavel.objects.filter(usuario=request.user).order_by('ordem'))
    variaveisusuario = json_serializer.serialize(Variavel.objects.filter(usuario=request.user).order_by('ordem'))
    profiles = Profile.objects.all()
    topicos_normais = TopicoNormal.objects.filter(mascara=id_mascara)
    topico_anormal = TopicoAnormal.objects.get(pk=id_alteracao)
    titulo = "Masqs - Editar Alteração"
    context = {'id_alteracao': id_alteracao, 'topico_anormal': topico_anormal, 'topicos_normais': topicos_normais,
               'variaveis': variaveis, 'variaveisusuario': variaveisusuario, 'profiles': profiles, 'titulo': titulo}
    return render(request, 'masks/editar_alteracao.html', context)


def salvar_alteracao(request):
    # Verifica se o usuário está logado
    if not request.user.is_authenticated:
        return redirect(views.mostrar_index)


    topicoId = request.POST['topico_id']
    topicoAnormal = TopicoAnormal.objects.get(pk=topicoId)
    topicoNormal = TopicoNormal.objects.get(pk=request.POST['exames'])
    topicoAnormal.topico_normal = topicoNormal
    topicoAnormal.nome = request.POST['nome_modal']
    topicoAnormal.relatorio = request.POST['relatorio_modal']
    topicoAnormal.conclusao = request.POST['conclusao_modal']

    pub = request.POST.get('frase_publica', False)

    if (pub == 'on'):
        publica = True
    else:
        publica = False

    topicoAnormal.publica = publica

    topicoAnormal.save()
    adicionar_variaveis(request)



    return HttpResponse(status=204)


def upvote_frase(request):
    # Verifica se o usuário está logado
    if request.user.is_authenticated:
        fraseId = request.POST['frase_clicada']
        topicoAnormal = TopicoAnormal.objects.get(pk=int(fraseId))
        topicoAnormal.frequencia += 1
        topicoAnormal.save()
    return HttpResponse(status=204)





def resetar_password(request):
    titulo = "Masqs - Redefinir Senha"
    context = {'titulo': titulo}
    return render(request, 'masks/resetarpwd.html', context)



def link_reset(request):
    email = request.POST['email']


    try:

        user = User.objects.get(email=email)

        token = default_token_generator.make_token(user)
        uid = urlsafe_base64_encode(force_bytes(user.pk))

        link = 'https://masqs.com.br/users/resetpwd/' + uid + '/' + token
        nomeusuario = user.username

        msg_plain = render_to_string('masks/emailreset.txt', {'link': link, 'nomeusuario': nomeusuario})
        msg_html = render_to_string('masks/emailreset.html', {'link': link, 'nomeusuario': nomeusuario})

        send_mail(
           'Alterar senha',
           msg_plain,
           'Contato Masqs <contato@masqs.com.br>',
           [user.email],
           html_message=msg_html,
        
           fail_silently=False,
        )
        logout(request)
        mensagem_confirmacao = 'Um link foi enviado para o email <span style="color: #c96100">' + user.email + '</span>.<br><br>Certifique-se de que o email enviado não foi para a sua <span style="color: #c96100">lixeira</span> ou <span style="color: #c96100">caixa de spams</span>.'
        titulo = "Masqs - Confirmação"
        context = {'mensagem_confirmacao': mensagem_confirmacao, 'titulo': titulo}
        return render(request, 'masks/aviso.html', context)


    except ObjectDoesNotExist:
        mensagem_erro = "Email não cadastrado em nosso sistema."
        titulo = "Masqs - Erro"
        context = {'mensagem_erro': mensagem_erro, 'titulo': titulo}
        return render(request, 'masks/erro.html', context)



def resetar_password_confirm(request, uid, token):
    if uid is not None and token is not None:

        uidid = urlsafe_base64_decode(uid)
        user = User.objects.get(pk=uidid)
        request.user = user

        if default_token_generator.check_token(user, token):
            titulo = "Masqs - Redefinir Senha"
            context = {'uid': uid, 'token': token, 'titulo': titulo}

            return render(request, 'masks/confirmar_reset.html', context)
        else:
            mensagem_erro = "Link expirado!"
            titulo = "Masqs - Erro"
            context = {'mensagem_erro': mensagem_erro, 'titulo': titulo}
            return render(request, 'masks/erro.html', context)

def confirmar_reset(request, uid, token):
    if uid is not None and token is not None:
        senha = request.POST['senha']
        uidid = urlsafe_base64_decode(uid)
        user = User.objects.get(pk=uidid)
        request.user = user
        if default_token_generator.check_token(user, token):

            login(request, user)

            request.user.set_password(senha)
            request.user.save()
            logout(request)
            mensagem_confirmacao = "Senha alterada com sucesso!"
            titulo = "Masqs - Confirmação"
            context = {'mensagem_confirmacao': mensagem_confirmacao, 'titulo': titulo}
            return render(request, 'masks/aviso.html', context)
        else:
            mensagem_erro = "Link expirado!"
            titulo = "Masqs - Erro"
            context = {'mensagem_erro': mensagem_erro, 'titulo': titulo}
            return render(request, 'masks/erro.html', context)


def sobre(request):




    titulo = "Masqs - Sobre"
    context = {'titulo': titulo}
    return render(request, 'masks/sobre.html', context)


def salvar_configuracoes(request):
    # Verifica se o usuário está logado
    if not request.user.is_authenticated:
        return redirect(views.mostrar_index)



    context = {}
    profile = Profile.objects.get(usuario=request.user)
    fonte = request.POST['fonte']
    tamanho_fonte = request.POST['tamanho_fonte']
    cor_topicos = request.POST['cor_topicos']
    cor_titulo = request.POST['cor_titulo']
    alinhamento_titulo = request.POST['alinhamento_titulo']
    capitalizacao = request.POST['capitalizacao']
    cor_mascara = request.POST['cor_mascara']
    alinhamento_topicos = request.POST['alinhamento_topicos']
    tamanho_topicos = request.POST['tamanho_topicos']
    tamanho_titulo = request.POST['tamanho_titulo']
    espacamento_topicos = request.POST['espacamento_topicos']
    altura_linha = request.POST['altura_linha']
    margem_cabecalho = request.POST['margem_cabecalho']
    mascara_topicos = request.POST.get('mascara_topicos')
    quadro_mais = request.POST.get('quadro_mais')

    profile.tamanho_fonte = tamanho_fonte
    profile.fonte = fonte
    profile.cor_topicos = cor_topicos
    profile.cor_titulo = cor_titulo
    profile.alinhamento_titulo = alinhamento_titulo
    profile.capitalizacao = capitalizacao
    profile.cor_mascara = cor_mascara
    profile.alinhamento_topicos = alinhamento_topicos
    profile.tamanho_titulo = tamanho_titulo
    profile.tamanho_topicos = tamanho_topicos
    profile.espacamento_topicos = espacamento_topicos
    profile.altura_linha = altura_linha
    profile.margem_cabecalho = margem_cabecalho

    if(mascara_topicos == "True"):
        profile.mascara_topicos = True
    else:
        profile.mascara_topicos = False

    if (quadro_mais == "True"):
        profile.quadro_mais = True
    else:
        profile.quadro_mais = False

    profile.save()
    return HttpResponse(status=204)


def excluir_mascara(request, id_mascara):

    # Verifica se o usuário está logado
    if not request.user.is_authenticated:
        return redirect(views.mostrar_index)

    mascara = Mascara.objects.get(pk=id_mascara)

    # Verifica se o usuário tem permissão para ver essa máscara
    if request.user != mascara.usuario:
        return redirect(views.mostrar_index)

    Mascara.objects.get(pk=id_mascara).delete()

    return HttpResponse(status=204)

def excluir_alteracao(request, id_alteracao):
    # Verifica se o usuário está logado
    if not request.user.is_authenticated:
        return redirect(views.mostrar_index)

    topicoAnormal = TopicoAnormal.objects.get(pk=id_alteracao)

    #Verifica se a máscara é realmente do usuário.
    if(topicoAnormal.topico_normal.mascara.usuario != request.user):
        return redirect(views.mostrar_index)



    TopicoAnormal.objects.get(pk=id_alteracao).delete()

    return HttpResponse(status=204)

def descricao(request):



    titulo = "Masqs - Descrição"
    context = {'titulo': titulo}
    return render(request, 'masks/descricao.html', context)


def termos(request):




    titulo = "Masqs - Termos de Uso"
    context = {'titulo': titulo,}
    return render(request, 'masks/termos.html', context)

def quemsomos(request):
    titulo = "Masqs - Quem Somos"
    context = {'titulo': titulo}
    return render(request, 'masks/quemsomos.html', context)

def comunidade(request):

    if not request.user.is_anonymous:

        exames = Exame.objects.all().order_by('descricao')
        especialidades = Especialidade.objects.all().order_by('descricao')

        json_serializer = serializers.get_serializer("json")()

        alterados = json_serializer.serialize(TopicoAnormal.objects.all().order_by('nome', '-popularidade')) #alfabético
        alteradosTotal = json_serializer.serialize(TopicoAnormal.objects.all().order_by('-popularidade', 'nome')) #alfabéticototal

        alteradosPopulares = json_serializer.serialize(TopicoAnormal.objects.all().order_by('-popularidade'))
        alteradosUsuario = json_serializer.serialize(TopicoAnormal.objects.filter(topico_normal__mascara__usuario=request.user).order_by('nome'))

        mascarasJsonPopulares = json_serializer.serialize(Mascara.objects.all().order_by('-popularidade'))
        mascarasJsonUsuario = json_serializer.serialize(Mascara.objects.filter(usuario=request.user).order_by('nome'))

        normais = json_serializer.serialize(TopicoNormal.objects.all())
        mascarasJson = json_serializer.serialize(Mascara.objects.all().order_by('nome', '-popularidade')) #alfabético
        mascarasJsonTotal = json_serializer.serialize(Mascara.objects.all().order_by('-popularidade', 'nome')) #alfabéticototal


        mascarasMaisRecentes = json_serializer.serialize(Mascara.objects.all().order_by('-data_criada', 'nome'))
        alteradosMaisRecentes = json_serializer.serialize(TopicoAnormal.objects.all().order_by('-data_criada', 'nome'))


        usuarios2 = json_serializer.serialize(User.objects.all())
        profiles = json_serializer.serialize(Profile.objects.all())

        usuarioLogado = True

        variaveis = json_serializer.serialize(Variavel.objects.all())

        titulo = "Masqs - Comunidade"
        context = {'titulo': titulo, 'exames': exames, 'especialidades': especialidades, 'alterados': alterados, 'normais': normais, 'mascarasJson': mascarasJson,
                   'alteradosPopulares': alteradosPopulares, 'alteradosUsuario': alteradosUsuario, 'mascarasJsonPopulares': mascarasJsonPopulares,
                   'mascarasJsonUsuario': mascarasJsonUsuario, 'usuarios2': usuarios2, 'profiles': profiles, 'mascarasMaisRecentes': mascarasMaisRecentes,
                   'alteradosMaisRecentes': alteradosMaisRecentes, 'mascarasJsonTotal': mascarasJsonTotal,
                   'alteradosTotal': alteradosTotal, 'usuarioLogado': usuarioLogado, 'variaveis': variaveis}
        return render(request, 'masks/comunidade.html', context)

    else:
        exames = Exame.objects.all().order_by('descricao')
        especialidades = Especialidade.objects.all().order_by('descricao')
        json_serializer = serializers.get_serializer("json")()
        usuario = User.objects.get(email='netofarthur@gmail.com')
        alterados = json_serializer.serialize(
            TopicoAnormal.objects.filter(topico_normal__mascara__usuario=usuario).order_by('nome'))

        alteradosPopulares = json_serializer.serialize(
            TopicoAnormal.objects.filter(topico_normal__mascara__usuario=usuario).order_by('nome'))
        alteradosUsuario = "";
        alteradosTotal = json_serializer.serialize(
            TopicoAnormal.objects.filter(topico_normal__mascara__usuario=usuario).order_by('nome'))  # alfabéticototal

        mascarasJsonPopulares = json_serializer.serialize(Mascara.objects.filter(usuario=usuario).order_by('nome'))
        mascarasJsonUsuario = "";

        normais = json_serializer.serialize(TopicoNormal.objects.filter(mascara__usuario=usuario))
        mascarasJson = json_serializer.serialize(Mascara.objects.filter(usuario=usuario).order_by('nome'))
        mascarasJsonTotal = json_serializer.serialize(Mascara.objects.filter(usuario=usuario).order_by('nome'))

        usuarios2 = json_serializer.serialize(User.objects.filter(email='netofarthur@gmail.com'))
        profiles = json_serializer.serialize(Profile.objects.filter(usuario=usuario))

        usuarioLogado = False

        variaveis = json_serializer.serialize(Variavel.objects.filter(usuario=usuario))

        titulo = "Masqs"
        context = {'titulo': titulo, 'exames': exames, 'especialidades': especialidades, 'alterados': alterados,
                   'normais': normais, 'mascarasJson': mascarasJson,
                   'alteradosPopulares': alteradosPopulares, 'alteradosUsuario': alteradosUsuario,
                   'mascarasJsonPopulares': mascarasJsonPopulares,
                   'mascarasJsonUsuario': mascarasJsonUsuario, 'usuarios2': usuarios2, 'profiles': profiles,
                   'mascarasJsonTotal': mascarasJsonTotal,
                   'alteradosTotal': alteradosTotal, 'usuarioLogado': usuarioLogado, 'variaveis': variaveis}
        return render(request, 'masks/home.html', context)


def home(request):
    exames = Exame.objects.all().order_by('descricao')
    especialidades = Especialidade.objects.all().order_by('descricao')
    json_serializer = serializers.get_serializer("json")()
    usuario = User.objects.get(email='arthneto@hotmail.com')
    usuario2 = User.objects.get(email='netofarthur@gmail.com')
    alterados = json_serializer.serialize(
        TopicoAnormal.objects.filter(topico_normal__mascara__usuario=usuario).order_by('nome'))

    alteradosPopulares = json_serializer.serialize(
        TopicoAnormal.objects.filter(topico_normal__mascara__usuario=usuario).order_by('nome'))
    alteradosUsuario = "";
    alteradosTotal = json_serializer.serialize(TopicoAnormal.objects.filter(topico_normal__mascara__usuario=usuario).order_by('nome'))  # alfabéticototal

    mascarasJsonPopulares = json_serializer.serialize(Mascara.objects.filter(usuario=usuario).order_by('nome'))

    mascarasJsonPopularesAlt = json_serializer.serialize(Mascara.objects.filter(usuario=usuario2).order_by('nome'))


    mascarasJsonUsuario = "";

    normais = json_serializer.serialize(TopicoNormal.objects.filter(mascara__usuario=usuario))

    normaisAlt = json_serializer.serialize(TopicoNormal.objects.filter(mascara__usuario=usuario2))


    normaisTemplate = TopicoNormal.objects.filter(mascara__usuario=usuario).order_by('ordem')



    mascarasJson = json_serializer.serialize(Mascara.objects.filter(usuario=usuario).order_by('nome'))
    mascarasJsonTotal = json_serializer.serialize(Mascara.objects.filter(usuario=usuario2).order_by('nome'))


    usuarios2 = json_serializer.serialize(User.objects.filter(email='netofarthur@gmail.com'))
    profiles = json_serializer.serialize(Profile.objects.filter(usuario=usuario2))

    usuarioLogado = False

    variaveis = json_serializer.serialize(Variavel.objects.filter(usuario=usuario))

    variaveis2 = json_serializer.serialize(Variavel.objects.all())



    titulo = "Masqs"
    context = {'titulo': titulo, 'exames': exames, 'especialidades': especialidades, 'alterados': alterados,
               'normais': normais, 'mascarasJson': mascarasJson,
               'alteradosPopulares': alteradosPopulares, 'alteradosUsuario': alteradosUsuario,
               'mascarasJsonPopulares': mascarasJsonPopulares,
               'mascarasJsonUsuario': mascarasJsonUsuario, 'usuarios2': usuarios2, 'profiles': profiles,
               'mascarasJsonTotal': mascarasJsonTotal,
               'alteradosTotal': alteradosTotal, 'usuarioLogado': usuarioLogado, 'variaveis': variaveis,
               'normaisTemplate': normaisTemplate, 'mascarasJsonPopularesAlt': mascarasJsonPopularesAlt,
               'normaisAlt': normaisAlt, 'variaveis2': variaveis2}
    return render(request, 'masks/home.html', context)
