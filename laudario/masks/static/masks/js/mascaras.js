
function tornarExamesInvisiveis() {

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

//apaga tópicos duplicados.
function apagar() {

    if(document.getElementById("fonte") != null) {

     var opcoes = document.getElementById("fonte").options;
     var opcaoSelecionada = opcoes[0].innerHTML;
     for(var i = 1; i < opcoes.length; i++) {
        if(opcoes[i].innerHTML == opcaoSelecionada) {
                        opcoes.remove(i);
        }
     }


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







}



}


window.onload = apagar;






