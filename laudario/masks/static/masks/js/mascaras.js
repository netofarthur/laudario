
function tornarExamesInvisiveis() {

  let especialidadeSelecionada = document.getElementById("exames").value;
  let todasMascaras = document.getElementsByClassName("list-group-item list-group-item-action");

  for(i = 0; i < todasMascaras.length; i++) {

      if(document.getElementById("exames").value == "todos") {
          todasMascaras[i].style.display = "block";

      } else {
        if(todasMascaras[i].getAttribute("name") != especialidadeSelecionada) {
            todasMascaras[i].style.display = "none";
         } else {
            todasMascaras[i].style.display = "block";

         }
      }


  }

}


