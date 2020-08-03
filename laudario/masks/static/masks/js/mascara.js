






    //Função que coloca as variáveis preenchidas pelo usuário no Modal nos campos <> do laudo.
    function alterarVariaveisModal() {




        var listaParagrafos = document.getElementsByClassName("paragrafo_mascara");


          var pattern = /\{([^}]+)\}/g;



         for(var i = 0; i < listaParagrafos.length; i++) {

                var resultado = listaParagrafos[i].innerHTML.match(pattern);
                if(resultado != null) {
                    listaParagrafos[i].setAttribute("name", "alterado");

                }

                    var provisoria = listaParagrafos[i].innerHTML;

                      var children =  document.getElementsByName("var");

                      for(var z = 0; z < children.length; z++) {


                               //É variável, else, é expressão
                            if(document.getElementById("lab" + z).innerHTML.split(/[*/+-]+/g).length == 1) {
                                if(document.getElementById("lab" + z).innerHTML.split(/[|]+/g).length > 1) {
                                    provisoria = provisoria.replace("{" + document.getElementById("lab" + z).innerHTML + "}", document.getElementById("var" + z).value);

                                } else {
                                    var mystr = "var " + document.getElementById("lab" + z).innerHTML + " = " + parseFloat(document.getElementById("var" + z).value) + ";";
                                    eval(mystr);

                                    provisoria = provisoria.replace("{" + document.getElementById("lab" + z).innerHTML + "}", document.getElementById("var" + z).value);

                                }




                            } else {

                                provisoria = provisoria.replace("{" + document.getElementById("lab" + z).innerHTML + "}", eval(document.getElementById("lab" + z).innerHTML));
                            }

                      }
                    listaParagrafos[i].innerHTML = provisoria;




    }


    var todosBotoes = document.getElementsByClassName("botao_diagnostico");
       for(botao of todosBotoes) {
            if(botao.innerHTML == "Reverter") {

                var alteradosJSONObject = JSON.parse(alterados);
                var nome;

                for(i = 0; i < alteradosJSONObject.length; i++) {
                    if(alteradosJSONObject[i].pk == botao.getAttribute("id").substring(1, botao.getAttribute("id").length)) {
                        nome = alteradosJSONObject[i].fields.nome;
                    }
                }

                botao.setAttribute("onclick", "alterarDiagnosticoDireto(this.name, this.id)");

                botao.innerHTML = nome;
                 botao.style.display = "block";


            }




   }

$('#ModalVariaveis').modal('hide');

mostrarBotaoPopularSeNecessario();

}




    //Altera o diagnótico Personalizado com auxílio de um Modal, que busca o tópico a ser alterado no name do botão clicado, enviado com auxílio de jquery num script em mascara.html

    function alterarDiagnosticoModal() {
        var topicoNormalParaAlterar = document.getElementById("save_changes").getAttribute("name");

        colocarElementosEmOrdem(topicoNormalParaAlterar);


        if(document.getElementById(topicoNormalParaAlterar).getAttribute("name") != "alterado") {
            document.getElementById(topicoNormalParaAlterar).innerHTML = document.getElementById("relatorio").innerHTML;
            document.getElementById("paragrafo_conclusao").innerHTML = document.getElementById("conclusao_alterada").innerHTML;
            document.getElementById(topicoNormalParaAlterar).setAttribute("name", "alterado");
            document.getElementById("conclusao_normal").setAttribute("name", "alterado");
        } else {
            document.getElementById(topicoNormalParaAlterar).innerHTML = document.getElementById(topicoNormalParaAlterar).innerHTML + "<br>" + document.getElementById("relatorio").innerHTML;
            document.getElementById("paragrafo_conclusao").innerHTML = document.getElementById("paragrafo_conclusao").innerHTML + "<br>" + document.getElementById("conclusao_alterada").innerHTML;

        }
        mostrarBotaoPopularSeNecessario();

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

        var paragrafoFinalComBr = paragrafoAlteradoMascara.replace(fraseAlteradaBanco, "");

        var pos = paragrafoFinalComBr.lastIndexOf("<br>");

        var paragrafoFinalMenosUltimoBr = paragrafoFinalComBr.substring(0, pos);


        return paragrafoFinalMenosUltimoBr;
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

        document.getElementById("paragrafo_conclusao").innerHTML = filtrarParagrafo(document.getElementById("paragrafo_conclusao").innerHTML, conclusaoAlterada);

        document.getElementById(id).setAttribute("onclick", "alterarDiagnosticoDireto(this.name, this.id)");

        if(document.getElementById(name).innerHTML == "") {
            document.getElementById(name).setAttribute("name", "topico");

            document.getElementById(name).innerHTML = relatorioNormal;

        }

        if(document.getElementById("paragrafo_conclusao").innerHTML == "") {
            document.getElementById("conclusao_normal").setAttribute("name", "conclusao");

            document.getElementById("paragrafo_conclusao").innerHTML = conclusaoMascaraAtual;
        }

        mostrarBotaoPopularSeNecessario();


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

        document.getElementById("frase_clicada").value = idSemB;

    colocarElementosEmOrdem(name);


        var pattern = /\{([^}]+)\}/g;
        var result = document.getElementById(name).innerHTML.match(pattern);

        var listaParagrafosConclusao = document.getElementById("conclusao_normal").children;




        if(result != null) {
            document.getElementById(name).setAttribute("name", "alterado");
            document.getElementById("conclusao_normal").setAttribute("name", "alterado");


        }


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
                 document.getElementById("paragrafo_conclusao").innerHTML = conclusao;

            }

        } else {
            if(conclusao != null && conclusao != "") {
                    document.getElementById("paragrafo_conclusao").innerHTML = document.getElementById("paragrafo_conclusao").innerHTML + "<br>" + conclusao;


            }
        }




       var todosBotoes = document.getElementsByClassName("botao_diagnostico");
       for(botao of todosBotoes) {
            if(botao.innerHTML == "Reverter") {
                 botao.style.display = "none";


            }
       }

       document.getElementById(id).innerHTML = "Reverter";
        document.getElementById(id).setAttribute("onclick", "reverterAlteração(this.name, this.id)");


    mostrarBotaoPopularSeNecessario();

    document.getElementById("formulario_upvote").submit();


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





    function obterListaVariaveis(className) {
        var listaVariaveis = [];
        var listaParagrafos = document.getElementsByClassName(className);


        var pattern = /\{([^}]+)\}/g;


        var counter = 0;
        for(var i = 0; i < listaParagrafos.length; i++) {

                    //verifica se está em adicionar tópico alterado, se não estiver, está em nova máscara,
                    //possibilitando que uma única função seja utilizada. Foi meio gambiarra, mas melhor que
                    //duplicar funções. Talvez posso melhorar isso com um id mais descritivo
                    if(document.getElementById("adicionar_no_atual") != null) {
                        var result = listaParagrafos[i].innerHTML.match(pattern);
                        if(className == "entrada_modal") {
                            var result = listaParagrafos[i].value.match(pattern);
                        }

                    } else {
                        var result = listaParagrafos[i].value.match(pattern);
                    }




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
         if(unidadeMedida == null) {
            var nomesVariaveis = document.getElementsByName("nome_da_variavel");
            var unidadesMedidas = document.getElementsByName("unidade_de_medida");

            var localVariavel = 0;
            for(var i = 0; i < nomesVariaveis.length; i++) {
                if(nomesVariaveis[i].value == variavel) {
                    localVariavel = i;
                }

            }
            return unidadesMedidas[localVariavel].value;
        } else {
                return unidadeMedida;

        }
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
        if(nomeAmigavel == null) {
            var nomesVariaveis = document.getElementsByName("nome_da_variavel");
            var nomesAmigaveisVariaveis = document.getElementsByName("nome_amigavel_variavel");

            var localVariavel = 0;
            for(var i = 0; i < nomesVariaveis.length; i++) {
                if(nomesVariaveis[i].value == variavel) {
                    localVariavel = i;
                }

            }
            return nomesAmigaveisVariaveis[localVariavel].value;
        } else {
                return nomeAmigavel;

        }



    }

    function selecionarVariavel() {

       var variaveisDiv = document.getElementById("template_name_variaveis");

        if(variaveisDiv.firstChild != null) {


            if(variaveisDiv.firstChild.children[1].getAttribute("name") == "input") {
                variaveisDiv.firstChild.children[1].focus();
                variaveisDiv.firstChild.children[1].select();
                   document.getElementById("teclado").style.display = "block";
                document.getElementById("teclado_nominal").style.display = "none";

            } else {
                variaveisDiv.firstChild.children[1].focus();
            document.getElementById("teclado").style.display = "none";
            var tecladoNominal = document.getElementById("teclado_nominal");
                tecladoNominal.style.display = "block";

               while(tecladoNominal.firstChild) {
                tecladoNominal.removeChild(tecladoNominal.firstChild);
               }

                var opcoes = document.getElementsByName("select")[0];
                for (opcao of opcoes) {
                    var botao = document.createElement("button");
                    botao.innerHTML = opcao.value;
                    botao.setAttribute("onclick", "selecionarVariavelNominal(this.innerHTML)");
                    botao.setAttribute("class", "botao_calculadora_nominal");
                    tecladoNominal.appendChild(botao);
                }

                var proximaVariavelBotao = document.createElement("button");
                proximaVariavelBotao.setAttribute("class", "botao_calculadora_triplo");
                proximaVariavelBotao.setAttribute("onclick", "mostrarProximaVariavel()");
                proximaVariavelBotao.innerHTML = "Próxima variável";
                tecladoNominal.appendChild(proximaVariavelBotao);


            }
        }




    }


function adaptarCalculadoraMaisSave() {
     var variaveisAtivas = document.getElementById("template_name_variaveis");
          var variaveisInativas = document.getElementById("variaveis_inativas");


            var botaoTriplo = document.getElementsByClassName("botao_calculadora_triplo")[0];

            if(variaveisAtivas.firstChild == null) {
                document.getElementById("save_changes_variaveis").style.display = "block";
                botaoTriplo.style.display = "none";
                document.getElementById("teclado").style.display = "block";
                document.getElementById("teclado_nominal").style.display = "none";

            } else {
                document.getElementById("save_changes_variaveis").style.display = "none";
                botaoTriplo.style.display = "block";


            }

            if(variaveisInativas.firstChild == null) {
                document.getElementById("titulo_variaveis_adicionadas").style.display = "none";
                document.getElementById("barra_horizontal").style.display = "none";

            } else {
                document.getElementById("titulo_variaveis_adicionadas").style.display = "block";
                document.getElementById("barra_horizontal").style.display = "block";


            }
}

function selecionarVariavelNominal(textoSelecao) {
            mostrarProximaVariavel();
           var variaveisInativas = document.getElementById("variaveis_inativas");

            var children = variaveisInativas.children;

                children[children.length - 1].children[1].value = textoSelecao;



}


function moveCaret(win, charCount) {
    var sel, range;
    if (win.getSelection) {
        // IE9+ and other browsers
        sel = win.getSelection();
        if (sel.rangeCount > 0) {
            var textNode = sel.focusNode;
            var newOffset = sel.focusOffset + charCount;
            sel.collapse(textNode, Math.min(textNode.length, newOffset));
        }
    }
}


function insertAtCursor(text) {
  var txtarea = document.activeElement;
  if (!txtarea) {
    return;
  }

  if(txtarea.getAttribute("name") != "input") {
    return;
  }

  var scrollPos = txtarea.scrollTop;
  var strPos = 0;
  var br = ((txtarea.selectionStart || txtarea.selectionStart == '0') ?
    "ff" : (document.selection ? "ie" : false));
  if (br == "ie") {
    txtarea.focus();
    var range = document.selection.createRange();
    range.moveStart('character', -txtarea.value.length);
    strPos = range.text.length;
  } else if (br == "ff") {
    strPos = txtarea.selectionStart;
  }

  var front = (txtarea.value).substring(0, strPos);
  var back = (txtarea.value).substring(strPos, txtarea.value.length);
  txtarea.value = front + text + back;
  strPos = strPos + text.length;
  if (br == "ie") {
    txtarea.focus();
    var ieRange = document.selection.createRange();
    ieRange.moveStart('character', -txtarea.value.length);
    ieRange.moveStart('character', strPos);
    ieRange.moveEnd('character', 0);
    ieRange.select();
  } else if (br == "ff") {
    txtarea.selectionStart = strPos;
    txtarea.selectionEnd = strPos;
    txtarea.focus();
  }

  txtarea.scrollTop = scrollPos;
}



    function mostrarProximaVariavel() {


           var variaveisDiv = document.getElementById("template_name_variaveis");
           var variaveisInativasDiv = document.getElementById("variaveis_inativas");

           if(variaveisDiv.firstChild.style.display == "block") {
                  variaveisInativasDiv.appendChild(variaveisDiv.firstChild);
           }
           if(variaveisDiv.firstChild != null) {
                   variaveisDiv.firstChild.style.display = "block";

           }
           selecionarVariavel();
                     adaptarCalculadoraMaisSave();


    }


    //Função coloca as variaveis a serem preenchidas pelo usuario em um Modal.
    function popularVariaveis() {
        document.getElementById("popular_variaveis").blur();
        var botoes = document.getElementsByName("botao_calculadora");
        for(botao of botoes) {
            botao.setAttribute("onclick", "insertAtCursor(this.innerHTML)");
        }

        var divVariaveis = document.getElementById("template_name_variaveis");
        var divVariaveisInativas = document.getElementById("variaveis_inativas");

        var lista = obterListaVariaveis("paragrafo_mascara");

        //Mostra modal somente se tiver variaveis no corpo da máscara para preencher
        if(lista.length == 0) {
            botaoPopular = document.getElementById("popular_variaveis");
            botaoPopular.setAttribute("data-toggle", "");
            botaoPopular.setAttribute("data-target", "");
            alert("Não existem variáveis para preenhcer!");

        } else {
            botaoPopular = document.getElementById("popular_variaveis");
            botaoPopular.setAttribute("data-toggle", "modal");
            botaoPopular.setAttribute("data-target", "#ModalVariaveis");
        }

        //Limpa modal de popular variáveis sempre quando ele é iniciado.
        divVariaveis.innerHTML = "";
        divVariaveisInativas.innerHTML = "";
        for(var i = 0; i < lista.length; i++) {
            var input = document.createElement("input");
            input.setAttribute("type", "text");
            input.setAttribute("name", "input");



            //Labels invisíveis para fazer as contas em evals.
            var labelInput = document.createElement("label");
             labelInput.setAttribute("id", "lab" + i);
             labelInput.setAttribute("name", "var");
             labelInput.style.display = "none";

            //Labels visíveis amigáveis.
             var labelVisivel = document.createElement("label");
              labelVisivel.setAttribute("for", "var" + i);
                labelVisivel.innerHTML = "teset";




            labelInput.innerHTML = lista[i];
            if(obterUnidadeMedida(lista[i]) == "") {
                labelVisivel.innerHTML = obterNomeAmigavelVariavel(lista[i]) + " " + obterUnidadeMedida(lista[i]) + "  ";

            } else {
                    labelVisivel.innerHTML = obterNomeAmigavelVariavel(lista[i]) + " (" + obterUnidadeMedida(lista[i]) + ")  ";

            }

            var divVariavel = document.createElement("div");
            divVariavel.style.display = "none";
                divVariaveis.appendChild(divVariavel);

            divVariavel.appendChild(labelVisivel);




            var select = document.createElement("select");
            select.setAttribute("name", "select");






            var opcoes = lista[i].split("|");

            if(opcoes.length > 1) {

                for(z = 0; z < opcoes.length; z++) {
                    var opcao = document.createElement("option");
                    opcao.innerHTML = obterNomeAmigavelVariavel(opcoes[z]);
                    opcao.value = obterNomeAmigavelVariavel(opcoes[z]);

                    select.appendChild(opcao);
                }
                select.setAttribute("id", "var" + i);
                divVariavel.appendChild(select);

            } else {
                    input.setAttribute("id", "var" + i);
                  divVariavel.appendChild(input);

            }

              divVariavel.appendChild(labelInput);


            //Se for expressão ou repetida, não mostrar.
            if(document.getElementById("lab" + i).innerHTML.split(/[*/+-]+/g).length > 1) {
                labelInput.style.display = "none";
                input.style.display = "none";
                labelVisivel.style.display = "none";


            } else {

                divVariavel.appendChild(document.createElement("br"));

            }



        }


    mostrarProximaVariavel();

    }


    function colocarNomesAmigaveisAlteracao() {





        //verifica se está em adicionar tópico alterado, se não estiver, está em nova máscara,
        //possibilitando que uma única função seja utilizada. Foi meio gambiarra, mas melhor que
        //duplicar funções. Talvez posso melhorar isso com um id mais descritivo
        if(document.getElementById("adicionar_no_atual") != null) {
            var formulario =  document.getElementById("formulario_alteracao");
            if(document.getElementById("flag_edicao") == null) {
                        formulario.setAttribute("action", "/salvaralteracao/");

            }


        } else {
            var formulario =  document.getElementById("formulario_nova_mascara");
            if(document.getElementById("flag_edicao") == null) {
                        formulario.setAttribute("action", "/mascaras/nova/adicionar");

            }
        }

            formulario.submit();

        mostrarBotaoPopularSeNecessario();

      $('#myModalAlteracao').modal('hide');

      if(document.getElementById("coluna_esquerda") != null) {
      ancora = document.createElement("a");
        ancora.setAttribute("href", "http://127.0.0.1:8000/configuracoes");
        ancora.innerHTML = "Voltar";
        paragrafo = document.createElement("p");
        paragrafo.innerHTML = "Máscara adicionada com sucesso!"
       document.getElementById("coluna_esquerda").appendChild(ancora);
          document.getElementById("coluna_esquerda").appendChild(paragrafo);

      }



    //desabilita inputs. posso colocar em função separada.
    var inputs = document.getElementsByName("nome_amigavel_variavel");
    for(input of inputs) {
        input.readOnly = true;
    }
    document.getElementById("salva_mudancas").disabled = true;

    }




    function obterListaVariaveisDaAlteracao() {
        var listaVariaveis = [];
        var listaParagrafos = document.getElementsByClassName("entrada_modal");


        var pattern = /\{([^}]+)\}/g;


        var counter = 0;
        for(var i = 0; i < listaParagrafos.length; i++) {


                        var result = listaParagrafos[i].value.match(pattern);





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


    function adicionarAlteracoNaMascara() {



        if(document.getElementById("exames").value == "") {
            alert("Selecione um tópico a ser alterado pela frase");
            document.getElementById("label_topicos").style.color = "red";
            return;
        }




                var topicoNormalParaAlterar = document.getElementById("exames").value;




   var todasVariaveis = [];

   var stringVars = "";

        var pattern = /\{([^}]+)\}/g;

        //verifica se está em adicionar tópico alterado, se não estiver, está em nova máscara,
        //possibilitando que uma única função seja utilizada. Foi meio gambiarra, mas melhor que
        //duplicar funções. Talvez posso melhorar isso com um id mais descritivo
        if(document.getElementById("adicionar_no_atual") != null) {
            var variaveis = obterListaVariaveis("entrada_modal");
            var result = document.getElementById("relatorio_modal").value.match(pattern);



        } else {
            var variaveis = obterListaVariaveis("paragrafo_mascara");

            var result = [];
            var resultados = document.getElementsByClassName("paragrafo_mascara");
            for(resultado of resultados) {
                var matches = resultado.value.match(pattern);
                if(matches != null) {
                    for(match of matches) {
                        result.push(match);
                    }
                }
            }


        }

            var listaVariaveisNominais = [];




            if(result != null) {


            //separa as variáveis nominais e depois faz um concat com as outras. Agora as variáveis nominais são
            //separadas no banco com nomes amigáveis para poderem existir várias, teoricamente iguais (lateralidade, por exemplo)
            //em um mesmo laudo.
            var count = 0;
            for(variavel of result) {

                var variaveisNominais = variavel.split("|")
                if(variaveisNominais.length > 1) {
                    for(variavelNominal of variaveisNominais) {
                        variavelNominal = variavelNominal.replace("{", "");
                        variavelNominal = variavelNominal.replace("}", "");
                        if(!listaVariaveisNominais.includes(variavelNominal)) {
                            listaVariaveisNominais[count] = variavelNominal;
                            count++;
                        }

                    }
                }
            }


                var botao = document.getElementById("salva_mudancas");
                botao.setAttribute("onclick", "colocarNomesAmigaveisAlteracao()");

            } else {
                  $('#myModalAlteracao').modal('hide');


            }






        if(document.getElementById("adicionar_no_atual") != null) {
            var corpo = document.getElementById("corpo_variaveis");
            var formulario =  document.getElementById("formulario_alteracao");

            var listaVars = obterListaVariaveisDaAlteracao().concat(listaVariaveisNominais);

        } else {
            var listaVars = obterListaVariaveis("paragrafo_mascara").concat(listaVariaveisNominais);
            var formulario =  document.getElementById("formulario_nova_mascara");

            var corpo = document.getElementById("corpo_alteracao");

        }

        if(listaVars.length == 0) {
                formulario.submit();

        }







        var variaveisJSONObject = JSON.parse(nomesAmigaveis);

        var variavelJaExiste = false;

        for(var i = 0; i < listaVars.length; i++) {

            for(var z = 0; z < variaveisJSONObject.length; z++) {
                if(listaVars[i] == variaveisJSONObject[z].fields.nome_da_variavel || listaVars[i].split("|").includes(variaveisJSONObject[z].fields.nome_da_variavel)) {
                    variavelJaExiste = true;

                }


            }

              var inputMedida = document.createElement("input");
                inputMedida.setAttribute("name", "unidade_de_medida");

                var input = document.createElement("input");
                input.setAttribute("name", "nome_amigavel_variavel")




                var inputHidden = document.createElement("input");
                inputHidden.setAttribute("type", "hidden");
                inputHidden.setAttribute("name", "nome_da_variavel");
                  var label = document.createElement("label");
                label.setAttribute("name", "label_variavel");
                    var br = document.createElement("br")
                br.setAttribute("name", "label_br");


                 if(listaVariaveisNominais.includes(listaVars[i])) {
                        input.setAttribute("placeholder", "Descrição no laudo");
                        inputMedida.style.display = "none"

                } else if(listaVars[i].indexOf("|") > -1) {
                        input.setAttribute("placeholder", "Nome da variável");
                        inputMedida.style.display = "none"


                } else {
                        inputMedida.setAttribute("placeholder", "Unidade de medida");

                        input.setAttribute("placeholder", "Nome da variável");

                }

            var variavelExisteNaMascara = false;


                var variaveisModal = obterListaVariaveis("entrada_modal");


            var variaveisMascara = obterListaVariaveis("paragrafo_mascara");



            for(variavelModal of variaveisModal) {
                if(variaveisMascara.includes(variavelModal)) {
                    variavelJaExiste = true;
                }
            }


        if(document.getElementById("flag_edicao") != null) {

               var variaveisInvisiveis = document.getElementById("variaveis_originais_edicao").value.split(",");


                if(variaveisMascara.toString() === variaveisInvisiveis.toString()) {
                    variavelJaExiste = false;
                    variavelExisteNaMascara = true;
                        document.getElementById("salva_mudancas").setAttribute("type", "submit");
                }



                if(variaveisModal.toString() === variaveisInvisiveis.toString()) {
                    variavelJaExiste = false;
                    variavelExisteNaMascara = true;
                        document.getElementById("salva_mudancas").setAttribute("type", "submit");
                }



        }




            if(!variavelJaExiste) {

                inputHidden.setAttribute("value", listaVars[i]);



                label.innerHTML = listaVars[i];



            } else {
                inputHidden.setAttribute("value", listaVars[i]);

                if(listaVars[i].indexOf("|") > -1) {
                    var construcao = "";
                    var splitted = listaVars[i].split("|");
                    for(var w = 0; w < splitted.length; w++) {
                        if(w < splitted.length - 1) {
                            construcao = construcao + splitted[w] + getVariaveisUsuarioCount() + "|";
                        } else {
                            construcao = construcao + splitted[w] + getVariaveisUsuarioCount();
                        }
                    }
                     inputHidden.setAttribute("value", construcao);

                    label.innerHTML = construcao;



                } else {
                    label.innerHTML = listaVars[i] + getVariaveisUsuarioCount();
                    inputHidden.setAttribute("value", listaVars[i] + getVariaveisUsuarioCount());
                     if(document.getElementById("adicionar_no_atual") != null) {
                        document.getElementById("relatorio_modal").value = document.getElementById("relatorio_modal").value.replace(listaVars[i], inputHidden.value);
                        document.getElementById("conclusao_modal").value = document.getElementById("conclusao_modal").value.replace(listaVars[i], inputHidden.value);

                     } else {
                        var orgaos = document.getElementsByClassName("paragrafo_mascara");
                        for(orgao of orgaos) {
                            orgao.value = orgao.value.replace(listaVars[i], inputHidden.value);
                        }
                     }



                }



            }




               corpo.appendChild(br);
                corpo.appendChild(inputHidden);
                corpo.appendChild(label);
                corpo.appendChild(input);
                corpo.appendChild(inputMedida);

            if(variavelJaExiste == false && variavelExisteNaMascara == true) {
                input.setAttribute("value", obterNomeAmigavelVariavel(label.innerHTML));
                inputMedida.setAttribute("value", obterUnidadeMedida(label.innerHTML));
            }


        }


                var variaveisJSONObject = JSON.parse(nomesAmigaveis);


                for(myvar of variaveis) {
                     var splitted = myvar.split("|");
                     todasVariaveis.push(myvar);


                     for(var p = 0; p < splitted.length; p++) {
                        todasVariaveis.push(splitted[p]);

                     }

                }


                var nomesAmigos = [];
                var unidadesMedidas = [];

                for(vari of variaveisJSONObject) {

                    if(vari.fields.usuario == document.getElementById("usuario_id_alteracao").value) {
                        if(todasVariaveis.includes(vari.fields.nome_da_variavel)) {
                            nomesAmigos.push(vari.fields.nome_amigavel);
                            unidadesMedidas.push(vari.fields.unidade_medida);
                        }
                    }

                }




                nomesAmigaveisInputs = document.getElementsByName("nome_amigavel_variavel");
                unidadesMedidasInputs = document.getElementsByName("unidade_de_medida");

                for (var z = 0; z < nomesAmigaveisInputs.length; z++) {

                    //somente adiciona se tiverem todas variáveis (usuário não pode alterar depois de clicar).
                    if(nomesAmigaveisInputs.length == nomesAmigos.length) {
                        nomesAmigaveisInputs[z].value = nomesAmigos[z];
                        unidadesMedidasInputs[z].value = unidadesMedidas[z];
                        if(nomesAmigaveisInputs[z].value == "undefined") {
                            nomesAmigaveisInputs[z].value = "";
                        }
                    }


                }





        //verifica se está em adicionar tópico alterado, se não estiver, está em nova máscara,
        //possibilitando que uma única função seja utilizada. Foi meio gambiarra, mas melhor que
        //duplicar funções. Talvez posso melhorar isso com um id mais descritivo
        if(document.getElementById("adicionar_no_atual") != null && document.getElementById(topicoNormalParaAlterar) != null) {
             var resultado = document.getElementById(topicoNormalParaAlterar).innerHTML.match(pattern);

            if(resultado != null) {
                    document.getElementById(topicoNormalParaAlterar).setAttribute("name", "alterado");

            }

            if(document.getElementById("adicionar_no_atual").checked) {




                colocarElementosEmOrdem(topicoNormalParaAlterar);


                if(document.getElementById(topicoNormalParaAlterar).getAttribute("name") != "alterado") {
                    document.getElementById(topicoNormalParaAlterar).innerHTML = document.getElementById("relatorio_modal").value;
                    document.getElementById("paragrafo_conclusao").innerHTML = document.getElementById("conclusao_modal").value;
                    document.getElementById(topicoNormalParaAlterar).setAttribute("name", "alterado");
                    document.getElementById("conclusao_normal").setAttribute("name", "alterado");
                    document.getElementById("conclusao_normal").setAttribute("class", "paragrafo_mascara");

                } else {
                    document.getElementById(topicoNormalParaAlterar).innerHTML = document.getElementById(topicoNormalParaAlterar).innerHTML + "<br>" + document.getElementById("relatorio_modal").value;
                    document.getElementById("paragrafo_conclusao").innerHTML = document.getElementById("paragrafo_conclusao").innerHTML + "<br>" + document.getElementById("conclusao_modal").value;

                }
            }
        }

        if(document.getElementById("coluna_esquerda") != null) {

        if(document.getElementsByName("nome_amigavel_variavel").length == 0) {
            ancora = document.createElement("a");
        ancora.setAttribute("href", "http://127.0.0.1:8000/configuracoes");
        ancora.innerHTML = "Voltar";
        paragrafo = document.createElement("p");
        paragrafo.innerHTML = "Máscara adicionada com sucesso!"
       document.getElementById("coluna_esquerda").appendChild(ancora);
          document.getElementById("coluna_esquerda").appendChild(paragrafo);
              document.getElementById("salva_mudancas").disabled = true;


        }

    }

    //desabilita inputs. posso colocar em função separada.
    var inputs = document.getElementsByClassName("input_curto");
    for(input of inputs) {
        input.readOnly = true;
    }

    var inputs2 = document.getElementsByClassName("paragrafo_mascara");
    for(input of inputs2) {
        input.readOnly = true;
    }

    var inputs3 = document.getElementsByName("orgao");
    for(input of inputs3) {
        input.readOnly = true;
    }
    var inputs4 = document.getElementsByName("botao_remover");
    for(input of inputs4) {
        input.disabled = true;
    }

        var inputs5 = document.getElementsByClassName("entrada_modal");
    for(input of inputs5) {
        input.readOnly = true;
    }


    }




    function getVariaveisUsuarioCount() {
            var variaveisJSONObject = JSON.parse(nomesAmigaveis);
            return variaveisJSONObject.length;
    }




    function mostrarBotaoPopularSeNecessario() {
        var lista = obterListaVariaveis("paragrafo_mascara");
        var botao = document.getElementById("popular_variaveis");

        if(botao != null) {
            if(lista.length == 0) {
                botao.style.display = "none";

            } else {
                botao.style.display = "block";
            }
        }



    }



    window.onload = mostrarBotaoPopularSeNecessario;





    function popularFraseAlterada(topicoId) {


        var idSemT = topicoId.substring(1, topicoId.length);
        var alteradosJSONObject = JSON.parse(alterados);

        var topicoNormalId;

        for(i = 0; i < alteradosJSONObject.length; i++) {



            if(alteradosJSONObject[i].pk == idSemT) {
                document.getElementById("nome_modal").value = alteradosJSONObject[i].fields.nome;
                document.getElementById("relatorio_modal").value = alteradosJSONObject[i].fields.relatorio;
                document.getElementById("conclusao_modal").value = alteradosJSONObject[i].fields.conclusao;
                topicoNormalId = alteradosJSONObject[i].fields.topico_normal;
            }

        }

            var mascaras = JSON.parse(mascarasJson);
            var usuarios = JSON.parse(usuarios2);
            var topicosNormais = JSON.parse(normais);
            var mascaraSelecionada;
            var mascaraSelecionadaId;
            var usuarioSelecionadoId;


            for(topico of topicosNormais) {
                if(topico.pk == topicoNormalId) {
                    mascaraSelecionadaId = topico.fields.mascara;

                }

            }


             for(mascara of mascaras) {
                if(mascara.pk == mascaraSelecionadaId) {
                    usuarioSelecionadoId = mascara.fields.usuario;
                }

            }





            document.getElementById("usuario_id_alteracao").value = usuarioSelecionadoId;
            document.getElementById("exames").value = topicoNormalId;
            document.getElementById("frase_aproveitada").value = idSemT;

    }


    function CopyToClipboard() {
    var containerid = "mascara_div";

      if (document.selection) {
        var range = document.body.createTextRange();
        range.moveToElementText(document.getElementById(containerid));
        range.select().createTextRange();
        document.execCommand("copy");
      } else if (window.getSelection) {
        selection = window.getSelection();
        var range = document.createRange();
        range.selectNode(document.getElementById(containerid));
        selection.removeAllRanges();          // Remove all ranges from the selection.
        window.getSelection().addRange(range);
        document.execCommand("copy");
      }
}




 function obterVariaveisOriginaisDaEdicao() {
         var stringVars = "";

        var pattern = /\{([^}]+)\}/g;

        //verifica se está em adicionar tópico alterado, se não estiver, está em nova máscara,
        //possibilitando que uma única função seja utilizada. Foi meio gambiarra, mas melhor que
        //duplicar funções. Talvez posso melhorar isso com um id mais descritivo
        if(document.getElementById("adicionar_no_atual") != null) {
            var variaveis = obterListaVariaveis("entrada_modal");
            var result = document.getElementById("relatorio_modal").value.match(pattern);



        } else {
            var variaveis = obterListaVariaveis("paragrafo_mascara");

            var result = [];
            var resultados = document.getElementsByClassName("paragrafo_mascara");
            for(resultado of resultados) {
                var matches = resultado.value.match(pattern);
                if(matches != null) {
                    for(match of matches) {
                        result.push(match);
                    }
                }
            }


        }

            var listaVariaveisNominais = [];




            if(result != null) {


            //separa as variáveis nominais e depois faz um concat com as outras. Agora as variáveis nominais são
            //separadas no banco com nomes amigáveis para poderem existir várias, teoricamente iguais (lateralidade, por exemplo)
            //em um mesmo laudo.
            var listaVariaveisNominais = [];

            var count = 0;
            for(variavel of result) {

                var variaveisNominais = variavel.split("|")
                if(variaveisNominais.length > 1) {
                    for(variavelNominal of variaveisNominais) {
                        variavelNominal = variavelNominal.replace("{", "");
                        variavelNominal = variavelNominal.replace("}", "");
                        if(!listaVariaveisNominais.includes(variavelNominal)) {
                            listaVariaveisNominais[count] = variavelNominal;
                            count++;
                        }

                    }
                }
            }

        }
         if(document.getElementById("adicionar_no_atual") != null) {


            var listaVars = obterListaVariaveisDaAlteracao();

        } else {
            var listaVars = obterListaVariaveis("paragrafo_mascara");

        }


        return listaVars;


    }






