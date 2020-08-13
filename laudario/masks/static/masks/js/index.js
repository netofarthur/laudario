function limparMensagensErro() {

    var mensagens = document.getElementsByClassName("mensagem_erro");
    for(mensagem of mensagens) {
        mensagem.parentNode.removeChild(mensagem);
    }
}

function clicouCadastrar() {

    limparMensagensErro();
    var usuario = document.getElementById("usuario");
    var primeiroNome = document.getElementById("primeiro_nome");
    var sobrenome = document.getElementById("sobrenome");
    var email = document.getElementById("email");
    var senha = document.getElementById("senha");
    var senhaRepetida = document.getElementById("repetir_senha");

    var passouFiltros = true;
    var mensagem = "";
    var divMensagem;

    if(senha.value != senhaRepetida.value) {
        passouFiltros = false;
        mensagem = "As senhas digitadas são diferentes";
        divMensagem = document.getElementById("repetir_senha_div");
    }

    if(senha.value.length < 6) {
        passouFiltros = false;
        mensagem = "A senha deve ter mais de 6 caracteres";
        divMensagem = document.getElementById("senha_div");
    }

    if(email.value == "") {
        passouFiltros = false;
        mensagem = "Digite um email";
        divMensagem = document.getElementById("email_div");
    }

    if(!email.value.includes("@")) {
         passouFiltros = false;
        mensagem = "Email inválido";
        divMensagem = document.getElementById("email_div");
    }

    if(sobrenome.value.length > 30) {
        passouFiltros = false;
        mensagem = "Sobrenome deve conter menos de 30 letras";
        divMensagem = document.getElementById("sobrenome_div");
    }

    if(sobrenome.value == "") {
        passouFiltros = false;
        mensagem = "Sobrenome vazio";
        divMensagem = document.getElementById("sobrenome_div");
    }

    if(primeiroNome.value.length > 30) {
        passouFiltros = false;
        mensagem = "Primeiro nome deve conter menos de 30 letras";
        divMensagem = document.getElementById("primeiro_nome_div");
    }

    if(primeiroNome.value == "") {
        passouFiltros = false;
        mensagem = "Primeiro nome vazio";
        divMensagem = document.getElementById("primeiro_nome_div");
    }

    if(usuario.value.length < 3) {
        passouFiltros = false;
        mensagem = "Nome do usuário deve conter mais de 3 letras";
        divMensagem = document.getElementById("usuario_div");
    }
    if(usuario.value.length > 15) {
        passouFiltros = false;
        mensagem = "Nome do usuário deve conter menos de 15 letras";
        divMensagem = document.getElementById("usuario_div");
    }


    var pattern = /^[a-z0-9]+$/i;
    if(usuario.value.match(pattern) == null) {
        passouFiltros = false;
        mensagem = "Nome do usuário deve conter somente letras e números (espaço, acentos e cedilha não são permitidos)";
        divMensagem = document.getElementById("usuario_div");
    }

    var usuariosJson = JSON.parse(usuarios);
    for(i = 0; i < usuariosJson.length; i++) {
      if(usuariosJson[i].fields.username == usuario.value) {
        passouFiltros = false;
        mensagem = "Nome de usuário já existe. Escolha outro nome";
        divMensagem = document.getElementById("usuario_div");
      }

      if(usuariosJson[i].fields.email == email.value && usuariosJson[i].fields.is_active == 1) {
        passouFiltros = false;
        mensagem = "Já existe uma conta cadastrada com esse email";
        divMensagem = document.getElementById("email_div");
      }


    }


    if(passouFiltros) {
        document.getElementById("formulario_cadastro").submit();

    } else {

        var paragrafo = document.createElement("p");
        paragrafo.innerHTML = mensagem;
        paragrafo.setAttribute("class", "mensagem_erro");

            divMensagem.appendChild(paragrafo);


    }

}