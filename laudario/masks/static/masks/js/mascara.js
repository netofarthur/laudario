






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

                                provisoria = provisoria.replace("{" + document.getElementById("lab" + z).innerHTML + "}", eval(document.getElementById("lab" + z).innerHTML.replace(",",".")).toFixed(2).replace(".",","));
                            }
                            provisoria = provisoria.replace("Ignorar", "");

                      }
                    listaParagrafos[i].innerHTML = provisoria;




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
            if(conclusao != "") {
                document.getElementById("paragrafo_conclusao").setAttribute("name", "alterado");

            }
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

        fraseAlteradaCorrigidoBr = fraseAlteradaBanco.replace(/<br \/>/g, '<br>');


        var paragrafoFinal = paragrafoAlteradoMascara.replace(fraseAlteradaCorrigidoBr, "");




        return paragrafoFinal;
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


        document.getElementById(name).innerHTML = document.getElementById(name).innerHTML.replace(document.getElementById("ultima_alteracao_relatorio").innerHTML, "");
        var pos = document.getElementById(name).innerHTML.lastIndexOf("<br>");
        document.getElementById(name).innerHTML = document.getElementById(name).innerHTML.substring(0, pos);

        if(conclusaoAlterada != "") {
            document.getElementById("paragrafo_conclusao").innerHTML = document.getElementById("paragrafo_conclusao").innerHTML.replace(document.getElementById("ultima_alteracao_conclusao").innerHTML, "");
            var pos = document.getElementById("paragrafo_conclusao").innerHTML.lastIndexOf("<br>");
            document.getElementById("paragrafo_conclusao").innerHTML = document.getElementById("paragrafo_conclusao").innerHTML.substring(0, pos);
        }


        document.getElementById(id).setAttribute("onclick", "alterarDiagnosticoDireto(this.name, this.id)");
               document.getElementById(id).style.color = "#c96100";


        if(document.getElementById(name).innerHTML == "") {
            document.getElementById(name).setAttribute("name", "topico");

            document.getElementById(name).innerHTML = relatorioNormal;

        }

        if(document.getElementById("paragrafo_conclusao").innerHTML == "") {
            document.getElementById("paragrafo_conclusao").setAttribute("name", "conclusao");

            document.getElementById("paragrafo_conclusao").innerHTML = htmlDecode(conclusaoMascaraAtual);
        }

                mostrarBotaoPopularSeNecessario();




    }





 // Altera o diagnóstico Padrão diretamente, sem abrir outras janelas. Tive que usar serialização com JSON objects.
    function alterarDiagnosticoDireto(name, id) {


      if(document.getElementById("procurarFrases").value != "") {
       var botao = document.getElementById(id);
        var divDiagnosticos = document.getElementById("diagnosticos_div");
        divDiagnosticos.removeChild(botao);
        divDiagnosticos.insertBefore(botao, divDiagnosticos.children[1]);
        divDiagnosticos.scrollTop = 0;

        }

     if(document.getElementById("procurarFrases") != null) {



                    document.getElementById("procurarFrases").value = "";
                    procurarFrases("procurarFrases");


                }

        if(document.getElementById("procurarFrases") != null) {
                    document.getElementById("procurarFrases").value = "";
                    procurarFrases("procurarFrases");
                } else if(document.getElementById("procurarFrasesPublicas") != null) {
                    document.getElementById("procurarFrasesPublicas").value = "";
                    procurarFrases("procurarFrasesPublicas");



                }






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

        var listaParagrafosConclusao = document.getElementById("paragrafo_conclusao").children;







        if(document.getElementById(name).getAttribute("name") != "alterado") {
            document.getElementById(name).innerHTML = relatorio;
            document.getElementById(name).setAttribute("name", "alterado");
            document.getElementById(name).setAttribute("class", "paragrafo_mascara");
        } else {
           document.getElementById(name).innerHTML = document.getElementById(name).innerHTML + "<br>" + relatorio;
        }

        if(document.getElementById("paragrafo_conclusao").getAttribute("name") != "alterado") {
            if(conclusao != "") {
                document.getElementById("paragrafo_conclusao").setAttribute("name", "alterado");

            }
            document.getElementById("paragrafo_conclusao").setAttribute("class", "paragrafo_mascara");

            if(conclusao != null && conclusao != "") {
                 document.getElementById("paragrafo_conclusao").innerHTML = conclusao;

            }

        } else {
            if(conclusao != null && conclusao != "") {
                    document.getElementById("paragrafo_conclusao").innerHTML = document.getElementById("paragrafo_conclusao").innerHTML + "<br>" + conclusao;


            }
        }

                document.getElementById("ultima_alteracao_relatorio").innerHTML = relatorio;
                document.getElementById("ultima_alteracao_conclusao").innerHTML = conclusao;



       var todosBotoes = document.getElementsByClassName("botao_diagnostico");
       for(botao of todosBotoes) {
            if(botao.innerHTML == "Reverter") {
                 botao.style.display = "none";


            }
       }

       document.getElementById(id).innerHTML = "Reverter";
       document.getElementById(id).style.color = "red";





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
                if(nomeAmigavel == "Ignorar") {
                return "";
                } else {
                return nomeAmigavel;
                }


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
                variaveisDiv.firstChild.children[1].style.display = "none";
            document.getElementById("teclado").style.display = "none";
            var tecladoNominal = document.getElementById("teclado_nominal");
                tecladoNominal.style.display = "block";

               while(tecladoNominal.firstChild) {
                tecladoNominal.removeChild(tecladoNominal.firstChild);
               }

                var opcoes = document.getElementsByName("select")[0];
                for (opcao of opcoes) {
                    var botao = document.createElement("button");
                    if(opcao.value == "") {
                        botao.innerHTML = "Ignorar";

                    } else {
                        botao.innerHTML = opcao.value;

                    }
                    botao.setAttribute("onclick", "selecionarVariavelNominal(this.innerHTML)");
                    botao.setAttribute("class", "botao_calculadora_nominal");
                    tecladoNominal.appendChild(botao);
                }

                var proximaVariavelBotao = document.createElement("button");
                proximaVariavelBotao.setAttribute("class", "botao_calculadora_triplo");
                proximaVariavelBotao.setAttribute("onclick", "mostrarProximaVariavel()");
                proximaVariavelBotao.innerHTML = "Próxima variável";
                proximaVariavelBotao.setAttribute("id", "proxima_variavel");
                proximaVariavelBotao.style.display = "none";
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


}

function selecionarVariavelNominal(textoSelecao) {
            mostrarProximaVariavel();
           var variaveisInativas = document.getElementById("variaveis_inativas");
     var variaveisAtivas = document.getElementById("template_name_variaveis");

            var children = variaveisInativas.children;

                children[children.length - 1].children[1].value = textoSelecao;

            if(variaveisAtivas.firstChild == null || variaveisAtivas.firstChild.firstChild.style.display == "none") {
                alterarVariaveisModal();
            }



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
           variaveisDiv.style.fontWeight = "bold";
           variaveisDiv.style.fontSize = "1.2rem";
           var variaveisInativasDiv = document.getElementById("variaveis_inativas");

           if(variaveisDiv.firstChild.style.display == "block") {
                  variaveisInativasDiv.appendChild(variaveisDiv.firstChild);

           }
           if(variaveisDiv.firstChild != null) {
                   variaveisDiv.firstChild.style.display = "block";


           } else {
             if(variaveisInativasDiv.lastChild.children[1].getAttribute("name") == "input") {
                alterarVariaveisModal();
             }
           }
            //gambiarra para passar variáveis que são expressões sem apertar ok
           if(variaveisDiv.firstChild != null) {
               if(variaveisDiv.firstChild.firstChild.style.display == "none") {
                               document.getElementById("proxima_variavel").click();

               }
           }


            if(variaveisDiv.firstChild != null) {
               if(variaveisDiv.firstChild.firstChild.style.display == "none") {
                               document.getElementById("proxima_variavel").click();

               }
           }
            if(variaveisDiv.firstChild != null) {
               if(variaveisDiv.firstChild.firstChild.style.display == "none") {
                               document.getElementById("proxima_variavel").click();

               }
           }
            if(variaveisDiv.firstChild != null) {
               if(variaveisDiv.firstChild.firstChild.style.display == "none") {
                               document.getElementById("proxima_variavel").click();

               }
           }
            if(variaveisDiv.firstChild != null) {
               if(variaveisDiv.firstChild.firstChild.style.display == "none") {
                               document.getElementById("proxima_variavel").click();

               }
           }
            if(variaveisDiv.firstChild != null) {
               if(variaveisDiv.firstChild.firstChild.style.display == "none") {
                               document.getElementById("proxima_variavel").click();

               }
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
            input.style.width = "50%";




            //Labels invisíveis para fazer as contas em evals.
            var labelInput = document.createElement("label");
             labelInput.setAttribute("id", "lab" + i);
             labelInput.setAttribute("name", "var");
             labelInput.style.display = "none";

            //Labels visíveis amigáveis.
             var labelVisivel = document.createElement("label");
              labelVisivel.setAttribute("for", "var" + i);
                labelVisivel.innerHTML = "teset";
                 labelVisivel.style.width = "100%";





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

    var inputs2 = document.getElementsByName("nome_amigavel_variavel");
        for(input2 of inputs2) {
            if(input2.value.indexOf(">") >= 0 || input2.value.indexOf("<") >= 0) {
                alert("Nomes de variáveis não podem conter o sinal de maior (>) ou menor (<). Corrija antes de prosseguir.");

                return;
            }
      }



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
        ancora.setAttribute("href", "javascript:history.back()");
        ancora.innerHTML = "Voltar";
        paragrafo = document.createElement("p");
                ancora.setAttribute("id", "link_voltar");

        paragrafo.innerHTML = "Alterações salvas com sucesso!"
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


    function desabilitarEntradasConfiguracaoMascara() {
        document.getElementsByClassName("paragrafo_mascara").disabled = true;
        document.getElementById("adicionar_entrada_orgao").style.display = "none";
        var botoes = document.getElementsByName("botao_remover");
        for(botao of botoes) {
            botao.style.display = "none";
        }
        document.getElementById("salva_mudancas").value = "Concluir";

        if(document.getElementById("coluna_mascaras") != null) {
            document.getElementById("coluna_mascaras").parentNode.removeChild(document.getElementById("coluna_mascaras"));
 document.getElementById("coluna_esquerda").classList.remove('col-6');
        document.getElementById("coluna_esquerda").classList.add('col-12');
        }




    }

function recolocarTinys() {

        if(document.getElementById("adicionar_no_atual") != null) {

                            tinymce.init({
                            selector: '#relatorio_modal',
                                language: 'pt_BR',

                              menubar: false,
                                      plugins: "table",
                                forced_root_block: false,
                            toolbar: "bold italic underline forecolor table",
                              fontsize_formats: '11px 12px 14px 16px 18px 24px 36px 48px',
                                branding: false,
                                  elementpath: false


                          });


                              tinymce.init({
                            selector: '#conclusao_modal',
                                language: 'pt_BR',

                              menubar: false,
                                      plugins: "table",
                        forced_root_block: false,
                            toolbar: "bold italic underline forecolor table",
                              fontsize_formats: '11px 12px 14px 16px 18px 24px 36px 48px',
                                branding: false,
                                  elementpath: false


                          });

        } else {




                 tinymce.init({

        selector: '#info_adicional',
            language: 'pt_BR',

    forced_root_block: false,
        plugins: "table",
          menubar: false,
        toolbar: "bold italic underline forecolor table",
          fontsize_formats: '11px 12px 14px 16px 18px 24px 36px 48px',
            branding: false,
              elementpath: false


      });


      tinymce.init({
        selector: '#text_area_orgao',
            language: 'pt_BR',

    forced_root_block: false,
        plugins: "table",
          menubar: false,
        toolbar: "bold italic underline forecolor table",
          fontsize_formats: '11px 12px 14px 16px 18px 24px 36px 48px',
            branding: false,
              elementpath: false


      });


      var orgaos = document.getElementsByName("relatorio_orgao");

      for(var i = 1; i < orgaos.length; i++) {
        tinymce.init({
        selector: '#text_area_orgao' + i,
        forced_root_block: false,
            language: 'pt_BR',

            plugins: "table",
              menubar: false,
            toolbar: "bold italic underline forecolor table",
              fontsize_formats: '11px 12px 14px 16px 18px 24px 36px 48px',
                branding: false,
                  elementpath: false


          });
      }


            tinymce.init({
            body_id : "tecnica",
    forced_root_block: false,
        selector: '#tecnica',
        plugins: "table",
            language: 'pt_BR',

          menubar: false,
        toolbar: "bold italic underline forecolor table",
          fontsize_formats: '11px 12px 14px 16px 18px 24px 36px 48px',
            branding: false,
              elementpath: false


      });


      tinymce.init({
        selector: '#conclusao',
    forced_root_block: false,
        body_id : "conclusao",
        plugins: "table",
            language: 'pt_BR',

          menubar: false,
        toolbar: "bold italic underline forecolor table",
          fontsize_formats: '11px 12px 14px 16px 18px 24px 36px 48px',
            branding: false,
              elementpath: false


      });

      }
}


    function adicionarAlteracoNaMascara() {


        if(document.getElementById("nome_exame") != null && document.getElementById("nome_exame").value == "") {
            alert("É necessário colocar um nome para o exame");
            document.getElementById("salva_mudancas").blur();
            return;
        }

        if(document.getElementById("nome_modal") != null && document.getElementById("nome_modal").value == "") {
            alert("É necessário colocar um nome para o exame");
            document.getElementById("salva_mudancas").blur();
            return;
        }


        if(document.getElementById("exames").value == "") {
            alert("Selecione um tópico a ser alterado pela frase");
            document.getElementById("label_topicos").style.color = "red";
            return;
        }




                var topicoNormalParaAlterar = document.getElementById("exames").value;


            tinymce.remove();



         if(document.getElementById("adicionar_no_atual") != null) {
            var variaveis = obterListaVariaveis("entrada_modal");

        } else {
            var variaveis = obterListaVariaveis("paragrafo_mascara");


        }

        for(variavel of variaveis) {
            if(variavel.indexOf(' ') >= 0) {
                alert("Variáveis não podem conter espaços. Corrija antes de prosseguir.");
                recolocarTinys();
                document.getElementById("salva_mudancas").blur();

                return;
            }

             var pattern = /^[a-z0-9_|*-+\/,.]+$/i;
            if(variavel.match(pattern) == null) {
                alert("Variáveis não podem conter acentuação ou símbolos, apenas letras e números. Corrija antes de prosseguir.");
                recolocarTinys();
                document.getElementById("salva_mudancas").blur();

                return;
            }

        }



   var todasVariaveis = [];

   var stringVars = "";

        var pattern = /\{([^}]+)\}/g;

        //verifica se está em adicionar tópico alterado, se não estiver, está em nova máscara,
        //possibilitando que uma única função seja utilizada. Foi meio gambiarra, mas melhor que
        //duplicar funções. Talvez posso melhorar isso com um id mais descritivo
        if(document.getElementById("adicionar_no_atual") != null) {
            var variaveis = obterListaVariaveis("entrada_modal");
            var result = [];
            var resultados = document.getElementsByClassName("entrada_modal");
            for(resultado of resultados) {
                var matches = resultado.value.match(pattern);
                if(matches != null) {
                    for(match of matches) {
                        result.push(match);
                    }
                }
            }


        } else {
        desabilitarEntradasConfiguracaoMascara();
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



            if(result.length != 0) {


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







        var variaveisJSONObject = JSON.parse(nomesAmigaveisUsuario);

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
                  label.style.fontWeight = "bold";
                label.style.color = "#c96100";


                label.setAttribute("name", "label_variavel");
                    var br = document.createElement("br")
                br.setAttribute("name", "label_br");


                 if(listaVariaveisNominais.includes(listaVars[i])) {
                        input.setAttribute("placeholder", "Descrição no laudo");
                        input.setAttribute("size", 40)
                          label.style.color = "#000000";

                        inputMedida.style.display = "none"

                } else if(listaVars[i].indexOf("|") > -1) {
                        input.setAttribute("placeholder", "Nome amigável da variável");
                        input.setAttribute("size", 40)
                        inputMedida.style.display = "none"


                } else {
                        inputMedida.setAttribute("placeholder", "Unidade de medida");
                        inputMedida.setAttribute("size", 18);
                        inputMedida.style.marginLeft = ".2rem";

                        input.setAttribute("size", 40)

                        input.setAttribute("placeholder", "Nome amigável da variável");

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
                }



                if(variaveisModal.toString() === variaveisInvisiveis.toString()) {
                    variavelJaExiste = false;
                    variavelExisteNaMascara = true;
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
                    if(document.getElementById("adicionar_no_atual") != null) {
                        if(document.getElementById("relatorio_modal").value.indexOf("{" + listaVars[i] + "}") > -1) {
                            document.getElementById("relatorio_modal").value = document.getElementById("relatorio_modal").value.replace(listaVars[i], inputHidden.value);

                        }
                        if(document.getElementById("conclusao_modal").value.indexOf("{" + listaVars[i] + "}") > -1) {
                            document.getElementById("conclusao_modal").value = document.getElementById("conclusao_modal").value.replace(listaVars[i], inputHidden.value);

                        }
                    } else {
                    var orgaos = document.getElementsByClassName("paragrafo_mascara");
                        for(orgao of orgaos) {
                            if(orgao.value.indexOf("{" + listaVars[i] + "}") > -1) {
                                orgao.value = orgao.value.replace(listaVars[i], inputHidden.value);

                            }
                        }
                    }

                } else {



                    var constructor = listaVars[i];
                    var splits = listaVars[i].split(/[*/+-]+/g);
                    if(splits.length > 1) {
                        for(var z = 0; z < splits.length; z++) {
                                if(isNaN(parseFloat(splits[z].trim()))) {
                                    constructor = constructor.replace(splits[z].trim(), splits[z].trim() + getVariaveisUsuarioCount());
                                }
                        }




                        label.innerHTML = constructor;
                        inputHidden.setAttribute("value", constructor);

                    } else {
                        label.innerHTML = listaVars[i] + getVariaveisUsuarioCount();
                        inputHidden.setAttribute("value", listaVars[i] + getVariaveisUsuarioCount());
                    }



                     if(document.getElementById("adicionar_no_atual") != null) {
                         if(document.getElementById("relatorio_modal").value.indexOf("{" + listaVars[i] + "}") > -1) {
                            document.getElementById("relatorio_modal").value = document.getElementById("relatorio_modal").value.replace(listaVars[i], inputHidden.value);

                        }
                        if(document.getElementById("conclusao_modal").value.indexOf("{" + listaVars[i] + "}") > -1) {
                            document.getElementById("conclusao_modal").value = document.getElementById("conclusao_modal").value.replace(listaVars[i], inputHidden.value);

                        }
                     } else {
                        var orgaos = document.getElementsByClassName("paragrafo_mascara");
                        for(orgao of orgaos) {
                            if(orgao.value.indexOf("{" + listaVars[i] + "}") > -1) {
                                orgao.value = orgao.value.replace(listaVars[i], inputHidden.value);

                            }
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
                            if(vari.fields.nome_amigavel == "Ignorar") {
                            nomesAmigos.push("");

                            } else {
                            nomesAmigos.push(vari.fields.nome_amigavel);
                            unidadesMedidas.push(vari.fields.unidade_medida);

                            }

                        }
                    }

                }




                nomesAmigaveisInputs = document.getElementsByName("nome_amigavel_variavel");
                unidadesMedidasInputs = document.getElementsByName("unidade_de_medida");

                for (var z = 0; z < nomesAmigaveisInputs.length; z++) {


                        nomesAmigaveisInputs[z].value = nomesAmigos[z];
                        unidadesMedidasInputs[z].value = unidadesMedidas[z];
                        if(nomesAmigaveisInputs[z].value == "undefined") {
                            nomesAmigaveisInputs[z].value = "";
                        }
                        if(unidadesMedidasInputs[z].value == "undefined") {
                            unidadesMedidasInputs[z].value = "";
                        }



                }





        //verifica se está em adicionar tópico alterado, se não estiver, está em nova máscara,
        //possibilitando que uma única função seja utilizada. Foi meio gambiarra, mas melhor que
        //duplicar funções. Talvez posso melhorar isso com um id mais descritivo
        if(document.getElementById("adicionar_no_atual") != null && document.getElementById(topicoNormalParaAlterar) != null) {
             var resultado = document.getElementById(topicoNormalParaAlterar).innerHTML.match(pattern);



            if(document.getElementById("adicionar_no_atual").checked) {




                colocarElementosEmOrdem(topicoNormalParaAlterar);


                if(document.getElementById(topicoNormalParaAlterar).getAttribute("name") != "alterado") {
                    document.getElementById(topicoNormalParaAlterar).innerHTML = document.getElementById("relatorio_modal").value;
                    if(document.getElementById("conclusao_modal").value != "") {
                            document.getElementById("paragrafo_conclusao").innerHTML = document.getElementById("conclusao_modal").value;
                            document.getElementById("paragrafo_conclusao").setAttribute("name", "alterado");
                    }

                    document.getElementById(topicoNormalParaAlterar).setAttribute("name", "alterado");

                    document.getElementById("paragrafo_conclusao").setAttribute("class", "paragrafo_mascara");

                } else {
                    document.getElementById(topicoNormalParaAlterar).innerHTML = document.getElementById(topicoNormalParaAlterar).innerHTML + "<br>" + document.getElementById("relatorio_modal").value;
                    document.getElementById("paragrafo_conclusao").innerHTML = document.getElementById("paragrafo_conclusao").innerHTML + "<br>" + document.getElementById("conclusao_modal").value;

                }



            }
        }

        if(document.getElementById("coluna_esquerda") != null) {

        if(document.getElementsByName("nome_amigavel_variavel").length == 0) {
            ancora = document.createElement("a");
        ancora.setAttribute("href", "javascript:history.back()");
        ancora.innerHTML = "Voltar";
        paragrafo = document.createElement("p");
        ancora.setAttribute("id", "link_voltar");
        paragrafo.innerHTML = "Alterações salvas com sucesso!"
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




function aplicarConfiguracoesUsuario() {
        document.getElementById("mascara_div").style.fontFamily = "Times New Roman, Times, serif";
        document.getElementById("mascara_div").style.color = "red";
    }



    function styleTinyMceTables() {
        var tables = document.getElementsByTagName("table");
        var trs = document.getElementsByTagName("tr");
        var tds = document.getElementsByTagName("td");
        var tecnica = document.getElementById("tecnica");
        var spans = document.getElementsByTagName("span");

        for(table of tables) {
            table.setAttribute("data-mce-style", table.getAttribute("style"));
        }
        for(tr of trs) {
            tr.setAttribute("data-mce-style", tr.getAttribute("style"));
        }
        for(span of spans) {
            span.setAttribute("data-mce-style", span.getAttribute("style"));

        }
        for(td of tds) {
            td.setAttribute("data-mce-style", td.getAttribute("style") + "; font-size: " + tecnica.style.fontSize + "; font-family: " + tecnica.style.fontFamily);
        }
    }


    function mostrarBotaoPopularSeNecessario() {



    styleTinyMceTables();


    var paragrafos = document.getElementsByClassName("paragrafo_mascara");

    for(paragrafo of paragrafos) {
        if(paragrafo.innerHTML != "") {
            paragrafo.style.display = "block";
        }
    }

        var lista = obterListaVariaveis("paragrafo_mascara");
        var botao = document.getElementById("popular_variaveis");
        if(botao != null) {
            if(lista.length == 0) {
                botao.style.display = "none";

            } else {
                botao.style.display = "block";
                botao.click();


            }
        }

        if(document.getElementById("procurarFrases") != null) {
            document.getElementById("procurarFrases").focus();
        }

    }



function htmlDecode(input) {
  var doc = new DOMParser().parseFromString(input, "text/html");
  return doc.documentElement.textContent;
}


    window.onload = mostrarBotaoPopularSeNecessario;





    function popularFraseAlterada(topicoId) {
           if(document.getElementById("procurarFrasesPublicas") != null) {
                    document.getElementById("procurarFrasesPublicas").value = "";
                    procurarFrases("procurarFrasesPublicas");
    }

        var idSemT = topicoId.substring(1, topicoId.length);
        var alteradosJSONObject = JSON.parse(alterados);

        var topicoNormalId;

        for(i = 0; i < alteradosJSONObject.length; i++) {



            if(alteradosJSONObject[i].pk == idSemT) {
                document.getElementById("nome_modal").value = alteradosJSONObject[i].fields.nome;

                tinymce.get("relatorio_modal").setContent(alteradosJSONObject[i].fields.relatorio);


                tinymce.get("conclusao_modal").setContent(alteradosJSONObject[i].fields.conclusao);



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



function procurarFrases(id) {
  // Declare variables
  var input, filter, li, i, txtValue;
  input = document.getElementById(id);
  filter = input.value.toUpperCase();
  li = document.getElementsByClassName('botao_diagnostico');

  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < li.length; i++) {
    txtValue = li[i].innerHTML;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "block";
    } else {
      li[i].style.display = "none";
    }
    if(li[i].innerHTML == "Reverter") {
      li[i].style.display = "none";

    }
  }
}



function css(selector, property, value) {
    for (var i=0; i<document.styleSheets.length;i++) {//Loop through all styles
        //Try add rule
        try { document.styleSheets[i].insertRule(selector+ ' {'+property+':'+value+'}', document.styleSheets[i].cssRules.length);
        } catch(err) {try { document.styleSheets[i].addRule(selector, property+':'+value);} catch(err) {}}//IE
    }
}


function clicouExcluir(id) {
    document.getElementById(id).parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.style.display = "none";
}

