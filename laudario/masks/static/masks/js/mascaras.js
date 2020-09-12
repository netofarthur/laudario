function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function clicouAba(button) {

    if(button.getAttribute("aria-expanded") == "true") {
         setCookie('aba', button.getAttribute("data-target").substring(1, button.getAttribute("data-target").length));
    }

}

function tornarExamesInvisiveis() {

    setCookie('exame', document.getElementById("exames").value, 1);

  let especialidadeSelecionada = document.getElementById("exames").value;
  let todasMascaras = document.getElementsByClassName("list-group-item list-group-item-action");

  for(i = 0; i < todasMascaras.length; i++) {

      if(document.getElementById("exames").value == "todos") {
          todasMascaras[i].parentNode.parentNode.style.display = "block";
            todasMascaras[i].parentNode.parentNode.parentNode.parentNode.style.display = "block";


      } else {
        if(todasMascaras[i].getAttribute("name") != especialidadeSelecionada) {
            todasMascaras[i].parentNode.parentNode.style.display = "none";
                        todasMascaras[i].parentNode.parentNode.parentNode.parentNode.style.display = "none";

         } else {
                     todasMascaras[i].parentNode.parentNode.parentNode.parentNode.style.display = "block";

            todasMascaras[i].parentNode.parentNode.style.display = "block";

         }
      }


  }

}

function colocaNomesAmigaveisFontes() {
     var opcoes = document.getElementById("fonte").options;
     for(opcao of opcoes) {

     }

}

//apaga tópicos duplicados
function apagar() {

        if(document.getElementById("exames") != null) {
            if(document.getElementById(getCookie('aba')) != null) {
                document.getElementById(getCookie('aba')).setAttribute("class", "collapse show");

            }
            if(getCookie('exame') != null) {
                document.getElementById("exames").value = getCookie('exame');
                tornarExamesInvisiveis();
            }
        }

    if(document.getElementById("fonte") != null) {

     var opcoes = document.getElementById("fonte").options;
     var opcaoSelecionada = opcoes[0].value;
     for(var i = 1; i < opcoes.length; i++) {
        if(opcoes[i].value == opcaoSelecionada) {
                        opcoes.remove(i);
        }
     }
     opcoes[0].innerHTML = opcoes[0].value.split(",")[0];


       var opcoes = document.getElementById("tamanho_fonte").options;
     var opcaoSelecionada = opcoes[0].innerHTML;
     for(var i = 1; i < opcoes.length; i++) {
        if(opcoes[i].innerHTML == opcaoSelecionada) {
                        opcoes.remove(i);
        }
     }


            var opcoes = document.getElementById("alinhamento_titulo").options;
     var opcaoSelecionada = opcoes[0].innerHTML;
     for(var i = 1; i < opcoes.length; i++) {
        if(opcoes[i].innerHTML == opcaoSelecionada) {
                        opcoes.remove(i);
        }
     }



     var opcoes = document.getElementById("tamanho_titulo").options;
     var opcaoSelecionada = opcoes[0].innerHTML;
     for(var i = 1; i < opcoes.length; i++) {
        if(opcoes[i].innerHTML == opcaoSelecionada) {
                        opcoes.remove(i);
        }
     }



          var opcoes = document.getElementById("alinhamento_topicos").options;
     var opcaoSelecionada = opcoes[0].innerHTML;
     for(var i = 1; i < opcoes.length; i++) {
        if(opcoes[i].innerHTML == opcaoSelecionada) {
                        opcoes.remove(i);
        }
     }


          var opcoes = document.getElementById("tamanho_topicos").options;
     var opcaoSelecionada = opcoes[0].innerHTML;
     for(var i = 1; i < opcoes.length; i++) {
        if(opcoes[i].innerHTML == opcaoSelecionada) {
                        opcoes.remove(i);
        }
     }


         var opcoes = document.getElementById("espacamento_topicos").options;
     var opcaoSelecionada = opcoes[0].innerHTML;
     for(var i = 1; i < opcoes.length; i++) {
        if(opcoes[i].innerHTML == opcaoSelecionada) {
                        opcoes.remove(i);
        }
     }


          var opcoes = document.getElementById("altura_linha").options;
     var opcaoSelecionada = opcoes[0].innerHTML;
     for(var i = 1; i < opcoes.length; i++) {
        if(opcoes[i].innerHTML == opcaoSelecionada) {
                        opcoes.remove(i);
        }
     }


         var opcoes = document.getElementById("margem_cabecalho").options;
     var opcaoSelecionada = opcoes[0].innerHTML;
     for(var i = 1; i < opcoes.length; i++) {
        if(opcoes[i].innerHTML == opcaoSelecionada) {
                        opcoes.remove(i);
        }
     }




}



}


function clicouExcluir(id) {
    if(confirm("Deseja realmente excluir a máscara? Todas as alterações relacionadas a ela também serão excluídas.")) {
            document.getElementById(id).parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.style.display = "none";
            document.getElementById(id).setAttribute("type", "submit");
    }

}


window.onload = apagar;






