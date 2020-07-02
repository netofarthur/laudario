






    //Função que coloca as variáveis preenchidas pelo usuário no Modal nos campos <> do laudo.
    function alterarVariaveisModal() {

        var listaParagrafos = document.getElementsByClassName("paragrafo_mascara");

         for(var i = 0; i < listaParagrafos.length; i++) {

                    var provisoria = listaParagrafos[i].innerHTML;

                      var children =  document.getElementsByName("var");

                      for(var z = 0; z < children.length; z++) {


                               //É variável, else, é expressão
                            if(document.getElementById("lab" + z).innerHTML.split(/[*/+-]+/g).length == 1) {
                                if(document.getElementById("lab" + z).innerHTML.split(/[|]+/g).length > 1) {
                                    provisoria = provisoria.replace("{" + document.getElementById("lab" + z).innerHTML + "}", document.getElementById("var" + z).value);

                                } else {
                                    var mystr = "var " + document.getElementById("lab" + z).innerHTML + " = " + parseFloat(document.getElementById("var" + z).value.replace(",",".")) + ";";
                                    eval(mystr);

                                    provisoria = provisoria.replace("{" + document.getElementById("lab" + z).innerHTML + "}", document.getElementById("var" + z).value);

                                }




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



    function filtrarParagrafo (paragrafoAlteradoMascara, fraseAlteradaBanco) {


        paragrafoFinalComBrs = paragrafoAlteradoMascara.replace(fraseAlteradaBanco, "");
        paragrafoFinalMenosUmBr = paragrafoFinalComBrs.replace("<br>", ""); //tira o <br> adicionado em cada alteração extra no tópico.


        return paragrafoFinalMenosUmBr;
    }


    // Função que reverte a alteração.
    // Se conclusão vazia, apresentar o laudo de conclusão normal da máscara.
    function reverterAlteração(name, id) {
        var idSemB = id.substring(1, id.length);
        var normaisJSONObject = JSON.parse(normais);
        var relatorioNormal;
        var mascaraId;
        for(i = 0; i < normaisJSONObject.length; i++) {
            if(normaisJSONObject[i].pk == name) {
                relatorioNormal = normaisJSONObject[i].fields.relatorio;
                mascaraId = normaisJSONObject[i].fields.mascara;
            }
        }





        var alteradosJSONObject = JSON.parse(alterados);
        var nome;
        var relatorioAlterado;
        for(i = 0; i < alteradosJSONObject.length; i++) {
            if(alteradosJSONObject[i].pk == idSemB) {
                nome = alteradosJSONObject[i].fields.nome;
                relatorioAlterado = alteradosJSONObject[i].fields.relatorio;
                conclusaoAlterada = alteradosJSONObject[i].fields.conclusao;
            }
        }








        document.getElementById(id).innerHTML = nome;


        document.getElementById(name).innerHTML = filtrarParagrafo(document.getElementById(name).innerHTML, relatorioAlterado);




        document.getElementById("conclusao_normal").innerHTML = filtrarParagrafo(document.getElementById("conclusao_normal").innerHTML, conclusaoAlterada);

        document.getElementById(id).setAttribute("onclick", "alterarDiagnosticoDireto(this.name, this.id)");

        if(document.getElementById(name).innerHTML == "") {
            document.getElementById(name).setAttribute("name", "topico");

            document.getElementById(name).innerHTML = relatorioNormal;
        }

        if(document.getElementById("conclusao_normal").innerHTML == "") {
            document.getElementById("conclusao_normal").setAttribute("name", "conclusao");

            document.getElementById("conclusao_normal").innerHTML = conclusaoMascaraAtual;
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
            document.getElementById(name).setAttribute("class", "paragrafo_mascara");
        } else {
           document.getElementById(name).innerHTML = document.getElementById(name).innerHTML + "<br>" + relatorio;
        }

        if(document.getElementById("conclusao_normal").getAttribute("name") != "alterado") {
            document.getElementById("conclusao_normal").setAttribute("name", "alterado");
            document.getElementById("conclusao_normal").setAttribute("class", "paragrafo_mascara");

            if(conclusao != null && conclusao != "") {
                 document.getElementById("conclusao_normal").innerHTML = conclusao;

            }

        } else {
            if(conclusao != null && conclusao != "") {
                    document.getElementById("conclusao_normal").innerHTML = document.getElementById("conclusao_normal").innerHTML + "<br>" + conclusao;


            }
        }


       document.getElementById(id).innerHTML = "Reverter";
        document.getElementById(id).setAttribute("onclick", "reverterAlteração(this.name, this.id)");


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
        var listaParagrafos = document.getElementsByClassName("paragrafo_mascara");


        var pattern = /\{([^}]+)\}/g;


        var counter = 0;
        for(var i = 0; i < listaParagrafos.length; i++) {



                    var result = listaParagrafos[i].innerHTML.match(pattern);

                    if(result != null) {
                        for(var z = 0; z < result.length; z++) {

                            if(!listaVariaveis.includes(result[z].substring(1, result[z].length - 1))) {
                                listaVariaveis[counter] = result[z].substring(1, result[z].length - 1);
                                counter = counter + 1;
                            }


                        }


                    }
        }


        return listaVariaveis;

    }


    //ainda falta filtrar por usuário
    function obterUnidadeMedida(variavel) {
        var variaveisJSONObject = JSON.parse(nomesAmigaveis);
        var unidadeMedida;
        for(var i = 0; i < variaveisJSONObject.length; i++) {
            if(variavel == variaveisJSONObject[i].fields.nome_da_variavel) {
                unidadeMedida = variaveisJSONObject[i].fields.unidade_medida;
            }


        }
        return unidadeMedida;
    }


    //ainda falta filtrar por usuário
    function obterNomeAmigavelVariavel(variavel) {
        var variaveisJSONObject = JSON.parse(nomesAmigaveis);
        var nomeAmigavel;
        for(var i = 0; i < variaveisJSONObject.length; i++) {
            if(variavel == variaveisJSONObject[i].fields.nome_da_variavel) {
                nomeAmigavel = variaveisJSONObject[i].fields.nome_amigavel;
            }


        }
        return nomeAmigavel;



    }


    //Função coloca as variaveis a serem preenchidas pelo usuario em um Modal.
    function popularVariaveis() {


        var divVariaveis = document.getElementById("template_name_variaveis");

        var lista = obterListaVariaveis();


        for(var i = 0; i < lista.length; i++) {
            var input = document.createElement("input");
            input.setAttribute("type", "text");



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
            labelVisivel.innerHTML = obterNomeAmigavelVariavel(lista[i]) + " (" + obterUnidadeMedida(lista[i]) + ")";


            divVariaveis.appendChild(labelVisivel);


            var select = document.createElement("select");


            var opcoes = lista[i].split("|");

            if(opcoes.length > 1) {
                for(z = 0; z < opcoes.length; z++) {
                    var opcao = document.createElement("option");
                    opcao.innerHTML = opcoes[z];
                    opcao.value = opcoes[z];

                    select.appendChild(opcao);
                }
                select.setAttribute("id", "var" + i);
                divVariaveis.appendChild(select);

            } else {
                    input.setAttribute("id", "var" + i);
                  divVariaveis.appendChild(input);

            }

              divVariaveis.appendChild(document.createElement("br"));
              divVariaveis.appendChild(labelInput);


            //Se for expressão ou repetida, não mostrar.
            if(document.getElementById("lab" + i).innerHTML.split(/[*/+-]+/g).length > 1) {
                labelInput.style.display = "none";
                input.style.display = "none";
                labelVisivel.style.display = "none";


            } else {

                divVariaveis.appendChild(document.createElement("br"));

            }



        }




    }


    function adicionarAlteracoNaMascara() {

        if(document.getElementById("adicionar_no_atual").checked) {
            var topicoNormalParaAlterar = document.getElementById("exames").value;

            colocarElementosEmOrdem(topicoNormalParaAlterar);


            if(document.getElementById(topicoNormalParaAlterar).getAttribute("name") != "alterado") {
                document.getElementById(topicoNormalParaAlterar).innerHTML = document.getElementById("relatorio_modal").value;
                document.getElementById("conclusao_normal").innerHTML = document.getElementById("conclusao_modal").value;
                document.getElementById(topicoNormalParaAlterar).setAttribute("name", "alterado");
                document.getElementById("conclusao_normal").setAttribute("name", "alterado");
            } else {
                document.getElementById(topicoNormalParaAlterar).innerHTML = document.getElementById(topicoNormalParaAlterar).innerHTML + "<br>" + document.getElementById("relatorio_modal").value;
                document.getElementById("conclusao_normal").innerHTML = document.getElementById("conclusao_normal").innerHTML + "<br>" + document.getElementById("conclusao_modal").value;

            }
        }

    }






