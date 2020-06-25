



    //Função que coloca as variáveis preenchidas pelo usuário no Modal nos campos <> do laudo.
    function alterarVariaveisModal() {

        var listaParagrafos = document.getElementsByName("topico");

         for(var i = 0; i < listaParagrafos.length; i++) {

                    var provisoria = listaParagrafos[i].innerHTML;

                      var children =  document.getElementsByName("var");

                      for(var z = 0; z < children.length; z++) {
                             var mystr = "var " + document.getElementById("lab" + z).innerHTML + " = " + parseFloat(document.getElementById("var" + z).value.replace(",",".")) + ";";


                               //É variável, else, é expressão
                            if(document.getElementById("lab" + z).innerHTML.split(/[*/+-]+/g).length == 1) {
                                provisoria = provisoria.replace("{" + document.getElementById("lab" + z).innerHTML + "}", document.getElementById("var" + z).value);
                                eval(mystr);

                            } else {

                                provisoria = provisoria.replace("{" + document.getElementById("lab" + z).innerHTML + "}", eval(document.getElementById("lab" + z).innerHTML));
                            }

                      }
                    listaParagrafos[i].innerHTML = provisoria;
    }

}

    //Altera o diagnótico Personalizado com auxílio de um Modal, que busca o tópico a ser alterado no name do botão clicado, enviado com auxílio de jquery num script em mascara.html

    function alterarDiagnosticoModal() {
        var topicoNormalParaAlterar = document.getElementById("save_changes").getAttribute("name");

        colocarElementosEmOrdem(topicoNormalParaAlterar);


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


    //Função para colocar os tópicos diagnóstico na ordem em que as alterações forem adicionadas.
    function colocarElementosEmOrdem(name) {
        var lista = document.getElementById("topicos_div").children;
        var topicoDiv = document.getElementById("topicos_div");
        for(z = 0; z < lista.length; z++) {
            if(lista[z].getAttribute("name") != "alterado" && document.getElementById(name).getAttribute("name") != "alterado") {

                topicoDiv.insertBefore(document.getElementById(name), lista[z]);
                break;
            }
        }
    }


    // Altera o diagnóstico Padrão diretamente, sem abrir outras janelas. Tive que usar serialização com JSON objects.
    function alterarDiagnosticoDireto(name, id) {
        var idSemB = id.substring(1, id.length);
        var alteradosJSONObject = JSON.parse(alterados);
        var relatorio;
        var conclusao;
        for(i = 0; i < alteradosJSONObject.length; i++) {
            if(alteradosJSONObject[i].pk == idSemB) {
                relatorio = alteradosJSONObject[i].fields.relatorio;
                conclusao = alteradosJSONObject[i].fields.conclusao;
            }
        }



    colocarElementosEmOrdem(name);



        if(document.getElementById(name).getAttribute("name") != "alterado") {
            document.getElementById(name).innerHTML = relatorio;
            document.getElementById(name).setAttribute("name", "alterado");
        } else {
           document.getElementById(name).innerHTML = document.getElementById(name).innerHTML + "<br>" + relatorio;
        }

        if(document.getElementById("conclusao_normal").getAttribute("name") != "alterado") {
            document.getElementById("conclusao_normal").setAttribute("name", "alterado");
            if(conclusao != null && conclusao != "") {
                 document.getElementById("conclusao_normal").innerHTML = conclusao;

            }

        } else {
            if(conclusao != null && conclusao != "") {
                    document.getElementById("conclusao_normal").innerHTML = document.getElementById("conclusao_normal").innerHTML + "<br>" + conclusao;


            }
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





    function obterListaVariaveis() {
        var listaVariaveis = [];
        var listaParagrafos = document.getElementsByName("topico");
        var pattern = /\{([^}]+)\}/g;


        var counter = 0;
        for(var i = 0; i < listaParagrafos.length; i++) {



                    var result = listaParagrafos[i].innerHTML.match(pattern);

                    if(result != null) {
                        for(var z = 0; z < result.length; z++) {


                            listaVariaveis[counter] = result[z].substring(1, result[z].length - 1);
                            counter = counter + 1;

                        }


                    }
        }

        return listaVariaveis;

    }

    function obterUnidadesMedida() {
        var unidadesJSONObject = JSON.parse(nomesAmigaveis);
        var listaUnidades = [];
        for(var i = 0; i < unidadesJSONObject.length; i++) {
            listaUnidades[i] = unidadesJSONObject[i].fields.unidade_medida;
        }
        return listaUnidades;
    }


    function obterNomesAmigaveisVariaveis() {
        var variaveisJSONObject = JSON.parse(nomesAmigaveis);
        var listaNomesAmigaveis = [];
        for(var i = 0; i < variaveisJSONObject.length; i++) {
            listaNomesAmigaveis[i] = variaveisJSONObject[i].fields.nome_amigavel;
        }


        return listaNomesAmigaveis;
    }


    //Função coloca as variaveis a serem preenchidas pelo usuario em um Modal.
    function popularVariaveis() {

        var divVariaveis = document.getElementById("template_name_variaveis");

        var lista = obterListaVariaveis();

        var nomesAmigaveisVars = obterNomesAmigaveisVariaveis();
        var unidadesMedida = obterUnidadesMedida();

        for(var i = 0; i < lista.length; i++) {
            var input = document.createElement("input");
            input.setAttribute("type", "text");
            input.setAttribute("id", "var" + i);


            //Labels invisíveis para fazer as contas em evals.
            var labelInput = document.createElement("label");
             labelInput.setAttribute("id", "lab" + i);
             labelInput.setAttribute("name", "var");
             labelInput.style.visibility = "hidden";

            //Labels visíveis amigáveis.
             var labelVisivel = document.createElement("label");
              labelVisivel.setAttribute("for", "var" + i);
                labelVisivel.innerHTML = "teset";


            labelInput.innerHTML = lista[i];
            labelVisivel.innerHTML = nomesAmigaveisVars[i] + " (" + unidadesMedida[i] + ")";
            divVariaveis.appendChild(labelVisivel);

              divVariaveis.appendChild(input);
              divVariaveis.appendChild(document.createElement("br"));
              divVariaveis.appendChild(labelInput);


            //Se for expressão, não mostrar.
            if(document.getElementById("lab" + i).innerHTML.split(/[*/+-]+/g).length > 1) {
                labelInput.style.display = "none";
                input.style.display = "none";
                labelVisivel.style.display = "none";


            } else {
                divVariaveis.appendChild(document.createElement("br"));

            }



        }




    }




