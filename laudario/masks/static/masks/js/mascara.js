
    //Altera o diagnótico Personalizado com auxílio de um Modal, que busca o tópico a ser alterado no name do botão clicado, enviado com auxílio de jquery num script em mascara.html

    function alterarDiagnosticoModal() {
        var topicoNormalParaAlterar = document.getElementById("save_changes").getAttribute("name");

        if(document.getElementById(topicoNormalParaAlterar).getAttribute("name") != "alterado") {
            document.getElementById(topicoNormalParaAlterar).innerHTML = document.getElementById("relatorio").innerHTML;
            document.getElementById("conclusao_normal").innerHTML = document.getElementById("conclusao_alterada").innerHTML;
            document.getElementById(topicoNormalParaAlterar).setAttribute("name", "alterado");
            document.getElementById("conclusao_normal").setAttribute("name", "alterado");
        } else {
            document.getElementById(topicoNormalParaAlterar).innerHTML = document.getElementById(topicoNormalParaAlterar).innerHTML + "<br>" + document.getElementById("relatorio").innerHTML;
            document.getElementById("conclusao_normal").innerHTML = document.getElementById("conclusao_normal").innerHTML + "<br>" + document.getElementById("conclusao_alterada").innerHTML;

        }




    }
    // Altera o diagnóstico Padrão diretamente, sem abrir outras janelas. Tive que usar serialização com JSON objects.

    function alterarDiagnosticoDireto(name, id) {


        var alteradosJSONObject = JSON.parse(alterados);

        var relatorio;
        var conclusao;

        for(i = 0; i < alteradosJSONObject.length; i++) {

            if(alteradosJSONObject[i].pk == id) {
                relatorio = alteradosJSONObject[i].fields.relatorio;
                conclusao = alteradosJSONObject[i].fields.conclusao;
            }



        }

        if(document.getElementById(name).getAttribute("name") != "alterado") {
            document.getElementById(name).innerHTML = relatorio;
            document.getElementById("conclusao_normal").innerHTML = conclusao;
            document.getElementById(name).setAttribute("name", "alterado");
            document.getElementById("conclusao_normal").setAttribute("name", "alterado");
        } else {
           document.getElementById(name).innerHTML = document.getElementById(name).innerHTML + "<br>" + relatorio;
            document.getElementById("conclusao_normal").innerHTML = document.getElementById("conclusao_normal").innerHTML + "<br>" + conclusao;
        }



    }


    //função para inserir um html dentro de outro html no modal.
        function includeHTML() {
          var z, i, elmnt, file, xhttp;
          /* Loop through a collection of all HTML elements: */
          z = document.getElementsByTagName("*");
          for (i = 0; i < z.length; i++) {
            elmnt = z[i];
            /*search for elements with a certain atrribute:*/
            file = elmnt.getAttribute("w3-include-html");
            if (file) {
              /* Make an HTTP request using the attribute value as the file name: */
              xhttp = new XMLHttpRequest();
              xhttp.onreadystatechange = function() {
                if (this.readyState == 4) {
                  if (this.status == 200) {elmnt.innerHTML = this.responseText;}
                  if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
                  /* Remove the attribute, and call this function once more: */
                  elmnt.removeAttribute("w3-include-html");
                  includeHTML();
                }
              }
              xhttp.open("GET", file, true);
              xhttp.send();
              /* Exit the function: */
              return;
            }
          }
        }


