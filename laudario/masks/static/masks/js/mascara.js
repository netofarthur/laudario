



  function reset() {
var node = document.querySelector('[title="Ditar no microfone"]');

	if(node != null) {
        node.innerHTML = '<span class="tox-tbtn__select-label"><image src=' + tinymce.baseURL.replace("tinymce/js/tinymce", "images/microfone.png") + ' style="height: 20px;width: 20px;"/ ></span>';
	}
    recognizing = false;


  }

  function toggleStartStop() {



    if (recognizing) {
      recognition.stop();
      reset();
    } else {
      recognition.start();
      recognizing = true;
    }
  }




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

                                    var mystr = "var " + document.getElementById("lab" + z).innerHTML + " = " + parseFloat(document.getElementById("var" + z).value.replaceAll(",",".")) + ";";


                                    eval(mystr);

                                    provisoria = provisoria.replace("{" + document.getElementById("lab" + z).innerHTML + "}", document.getElementById("var" + z).value);

                                }




                            } else {

                                provisoria = provisoria.replace("{" + document.getElementById("lab" + z).innerHTML + "}", eval(document.getElementById("lab" + z).innerHTML.replaceAll(",",".")).toFixed(2).replaceAll(".",","));
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

        colocarElementosEmOrdem(topicoNormalParaAlterar);


        mostrarBotaoPopularSeNecessario();

    }

    function removerBrsDuplos() {
            var topicoDiv = document.getElementById("topicos_div");
            var children = topicoDiv.children;
            var counter = 0;

            for(i=0; i < children.length; i++) {
                if(children[i].tagName == "BR" && children[i+1].tagName == "BR") {
                    children[i].remove();
                }
            }

    }

    function colocarTopicosOrdemJames(name) {


        var topicoDiv = document.getElementById("topicos_div");

        var br = document.createElement("br");

        if(document.getElementById("s" + name) != null) {
            topicoDiv.insertBefore(document.getElementById("s" + name).parentNode, document.getElementById(name));
        if(document.getElementById(name).innerHTML != "&nbsp;") {
        topicoDiv.insertBefore(br, document.getElementById(name).nextSibling);
        }

        document.getElementById(name).innerHTML = document.getElementById(name).innerHTML.replace("<br>&nbsp;", "<br>");
        }





    }

    //Função para colocar os tópicos diagnóstico na ordem em que as alterações forem adicionadas.
    function colocarElementosEmOrdem(name) {


        var lista = document.getElementById("topicos_div").children;
        var topicoDiv = document.getElementById("topicos_div");
        for(z = 0; z < lista.length; z++) {

            if(mascara_topicos == "True" && document.getElementById("s" + name) != null) {
                            if(document.getElementById(name).nextSibling == null) {
                            document.getElementById(name).parentNode.nextSibling.remove();
                            } else {
                            if(document.getElementById(name).previousSibling.innerText == "Nenhum órgão:" || document.getElementById(name).previousSibling.firstChild.innerText == "Nenhum órgão:") {
                                                        document.getElementById(name).previousSibling.style.display = "none";

                            } else {
                                                        document.getElementById(name).nextSibling.remove();

                            }
                            }



            }

                topicoDiv.insertBefore(document.getElementById(name), lista[z]);

                    if(mascara_topicos == "True") {
                colocarTopicosOrdemJames(name);

            }

                break;

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

    if(id.charAt(0) == "b") {
        document.getElementById("p" + id.substring(1, id.length)).style.visibility = "visible";

    } else if (id.charAt(0) == "n") {
                document.getElementById("m" + id.substring(1, id.length)).style.visibility = "visible";

    }


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


        document.getElementById("topicos_div").innerHTML = document.getElementById("ultima_alteracao_relatorio").innerHTML;


        if(conclusaoAlterada != "") {
            document.getElementById("paragrafo_conclusao").innerHTML = document.getElementById("ultima_alteracao_conclusao").innerHTML;

        }


        document.getElementById(id).setAttribute("onclick", "alterarDiagnosticoDireto(this.name, this.id)");
               document.getElementById(id).style.color = "#c96100";


        if(document.getElementById(name).innerHTML == "") {
            document.getElementById(name).setAttribute("name", "topico");

            document.getElementById(name).innerHTML = relatorioNormal;

        }




        if(document.getElementById("paragrafo_conclusao").innerText == document.getElementById("conclusaoNormal").value) {

            document.getElementById("paragrafo_conclusao").setAttribute("name", "conclusao");

        }

                mostrarBotaoPopularSeNecessario();




    }





 // Altera o diagnóstico Padrão diretamente, sem abrir outras janelas. Tive que usar serialização com JSON objects.
    function alterarDiagnosticoDireto(name, id) {

        if(document.getElementById("conclusaoNormal") != null && document.getElementById("conclusaoNormal").value == "") {

    document.getElementById("conclusaoNormal").value = document.getElementById("paragrafo_conclusao").innerText;
}


      document.getElementById("ultima_alteracao_relatorio").innerHTML = document.getElementById("topicos_div").innerHTML;
                document.getElementById("ultima_alteracao_conclusao").innerHTML = document.getElementById("paragrafo_conclusao").innerHTML;;

        if(document.getElementById("cancelarIndicacoes") != null) {
document.getElementById("cancelarIndicacoes").remove();
}


      if(document.getElementById("procurarFrases").value != "") {
       var botao = document.getElementById(id);

        var divDiagnosticos = document.getElementById("diagnosticos_div");
        if(botao.parentNode.getAttribute("id") != "box_mais_utilizadas") {
        divDiagnosticos.removeChild(botao.parentNode.parentNode.parentNode);
        divDiagnosticos.insertBefore(botao.parentNode.parentNode.parentNode, divDiagnosticos.children[1]);
        divDiagnosticos.scrollTop = 0;
        }
        }



        if(document.getElementById("procurarFrases") != null) {
                    document.getElementById("procurarFrases").value = "";
                    procurarFrasesMascara("procurarFrases");
                } else if(document.getElementById("procurarFrasesPublicas") != null) {
                    document.getElementById("procurarFrasesPublicas").value = "";
                    procurarFrases("procurarFrasesPublicas");



                }






        var idSemB = id.substring(1, id.length);
        var alteradosJSONObject = JSON.parse(alterados);
                var normaisObject = JSON.parse(normais);

        var relatorio;
        var conclusao;
        var orgao;
        var orgaoid;
        for(i = 0; i < alteradosJSONObject.length; i++) {
            if(alteradosJSONObject[i].pk == idSemB) {
                relatorio = alteradosJSONObject[i].fields.relatorio;
                conclusao = alteradosJSONObject[i].fields.conclusao;
                for(z=0; z < normaisObject.length; z++) {
                    if(alteradosJSONObject[i].fields.topico_normal == normaisObject[z].pk) {
                        orgao = normaisObject[z].fields.orgao;
                        orgaoid = normaisObject[z].pk;
                    }
                }
            }
        }

        if(orgao == "Nenhum órgão" && mascara_topicos == "True" && relatorio != "") {
            relatorio = relatorio;

        }

        if(document.getElementById("s" + orgaoid) != null) {
        if(document.getElementById("s" + orgaoid).parentNode.style.display == "none") {

                            document.getElementById("s" + name).style.display = "inline";
                            document.getElementById(name).style.display = "inline";
                                                        document.getElementById(name).parentNode.style.display = "inline";

                                document.getElementById("s" + name).nextSibling.parentNode.insertBefore(document.createElement("br"), document.getElementById("s" + name).nextSibling.nextSibling);


                document.getElementById("s" + name).nextSibling.setAttribute("data-mce-style", document.getElementById("s" + name).nextSibling.getAttribute("data-mce-style").replaceAll("none", "inline"));
                document.getElementById("s" + name).parentNode.setAttribute("data-mce-style", document.getElementById("s" + name).parentNode.getAttribute("data-mce-style").replaceAll("none", "inline"));


                            }
}


        document.getElementById("frase_clicada").value = idSemB;







        var pattern = /\{([^}]+)\}/g;
        var result = document.getElementById(name).innerHTML.match(pattern);

        var listaParagrafosConclusao = document.getElementById("paragrafo_conclusao").children;




        if(relatorio != "&nbsp;" && relatorio != "&nbsp;<br>") {



        if(document.getElementById(name).getAttribute("name") != "alterado") {
            if(mascara_topicos == "True" && document.getElementById(name).previousSibling.id == "s" + name) {
                document.getElementById(name).innerHTML = "&nbsp;" + relatorio.charAt(0).toLowerCase() + relatorio.slice(1);

            } else {
                if(mascara_topicos == "True") {
                document.getElementById(name).innerHTML = "&nbsp;" + relatorio.charAt(0).toLowerCase() + relatorio.slice(1);
                } else {
                document.getElementById(name).innerHTML = relatorio;
                }


            }

            document.getElementById(name).setAttribute("name", "alterado");
            document.getElementById(name).setAttribute("class", "paragrafo_mascara");

        } else {

            if(id.charAt(0) == "p" || id.charAt(0) == "m") {
                    if(mascara_topicos == "True" && document.getElementById(name).previousSibling.id == "s" + name) {
                           document.getElementById(name).innerHTML ="&nbsp;" + relatorio.charAt(0).toLowerCase() + relatorio.slice(1) + "<br>" + document.getElementById(name).innerHTML.charAt(0).toUpperCase() + document.getElementById(name).innerHTML.slice(1);

                    } else {
                    if(mascara_topicos == "True") {
                                    document.getElementById(name).innerHTML = "&nbsp;" + relatorio.charAt(0).toLowerCase() + relatorio.slice(1) + "<br>" + document.getElementById(name).innerHTML;




                    } else {
                    document.getElementById(name).innerHTML = relatorio + "<br>" + document.getElementById(name).innerHTML ;
                    }


                    }




            } else {
                       document.getElementById(name).innerHTML = document.getElementById(name).innerHTML + "<br>" + relatorio;

            }
        }

    if(id.charAt(0) == "p" || id.charAt(0) == "m") {
    colocarElementosEmOrdem(name);

    } else {
    }
        }

        if(document.getElementById("paragrafo_conclusao").getAttribute("name") != "alterado" && relatorio != "" && relatorio != "<br>") {
            if(conclusao != "") {
                document.getElementById("paragrafo_conclusao").setAttribute("name", "alterado");

            }
            document.getElementById("paragrafo_conclusao").setAttribute("class", "paragrafo_mascara");

            if(conclusao != null && conclusao != "") {
                 document.getElementById("paragrafo_conclusao").innerHTML = conclusao;

            }

        } else {

            if(conclusao != null && conclusao != "") {
                      if(id.charAt(0) == "p" || id.charAt(0) == "m") {
                        colocarElementosEmOrdem(name);
                                document.getElementById("paragrafo_conclusao").innerHTML = conclusao + "<br>" + document.getElementById("paragrafo_conclusao").innerHTML;

                        } else {
                                document.getElementById("paragrafo_conclusao").innerHTML = document.getElementById("paragrafo_conclusao").innerHTML + "<br>" + conclusao;

                        }

                                    document.getElementById("paragrafo_conclusao").setAttribute("name", "alterado");


            }
        }


 if(orgao == "Nenhum órgão" && mascara_topicos == "True") {
                document.getElementById("s" + orgaoid).style.display = "none";
                document.getElementById(orgaoid).innerHTML = document.getElementById(orgaoid).innerHTML.replace("&nbsp;", "");
                if(relatorio == "" && id.charAt(0) != "p" && id.charAt(0) != "m") {
                document.getElementById("s" + orgaoid).parentNode.style.display = "none";


               } else if(relatorio == "&nbsp;") {
                               document.getElementById("s" + orgaoid).parentNode.style.display = "none";

               }


    }



       var todosBotoes = document.getElementsByClassName("botao_diagnostico");
       for(botao of todosBotoes) {
            if(botao.innerHTML == "Reverter") {
                 botao.parentNode.parentNode.parentNode.style.display = "none";


            }
       }

      var todosBotoes2 = document.getElementsByClassName("botao_diagnostico_mais");
       for(botao of todosBotoes2) {
            if(botao.innerHTML == "Reverter") {
                 botao.parentNode.parentNode.parentNode.style.display = "none";


            }
       }



 if(id.charAt(0) == "p") {
        document.getElementById(id).style.visibility = "hidden";
        document.getElementById("b" + id.substring(1, id.length)).innerHTML = "Reverter";
               document.getElementById("b" + id.substring(1, id.length)).setAttribute("onclick", "reverterAlteração(this.name, this.id)");


       document.getElementById("b" + id.substring(1, id.length)).style.color = "red";



    } else {
    if(id.charAt(0) == "m") {
            document.getElementById(id).style.visibility = "hidden";
document.getElementById(id).parentNode.children[1].setAttribute("onclick", "reverterAlteração(this.name, this.id)");

    document.getElementById(id).parentNode.children[1].innerHTML = "Reverter";

       document.getElementById(id).parentNode.children[1].style.color = "red";
    } else {
    document.getElementById(id).setAttribute("onclick", "reverterAlteração(this.name, this.id)");

    document.getElementById(id).innerHTML = "Reverter";

       document.getElementById(id).style.color = "red";
    }

    }









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
        var variaveisJSONObject = JSON.parse(nomesAmigaveisUsuario);
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
        var variaveisJSONObject = JSON.parse(nomesAmigaveisUsuario);
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




    document.getElementById("salva_mudancas").disabled = true;


    if(document.getElementById("salva_mudancas") != null) {
                document.getElementById("salva_mudancas").style.display = "none";
            }
            if(document.getElementById("relatorio_final") != null) {
                document.getElementById("relatorio_final").style.display = "none";
            }
            if(document.getElementById("corpo_variaveis") != null) {
                document.getElementById("corpo_variaveis").style.display = "none";
            }


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


function voltarAlteracaoFim() {

        document.getElementById("corpo_alteracao").style.display = "block";

         document.getElementById("corpo_variaveis").innerHTML = "";

        document.getElementById("salva_mudancas").value = "Adicionar";
            document.getElementById("botaoCancelar").style.display = "block";


        document.getElementById("salva_mudancas").setAttribute("onclick", "adicionarAlteracoNaMascara()");
                document.getElementById("botaoVoltar").remove();


        document.getElementById("topicos_div").innerHTML = document.getElementById("ultima_alteracao_relatorio").innerHTML;


            document.getElementById("paragrafo_conclusao").innerHTML = document.getElementById("ultima_alteracao_conclusao").innerHTML;




    }



    function apagarAlteracaoFim() {


        if(document.getElementById("corpo_alteracao") != null) {
        document.getElementById("corpo_alteracao").style.display = "none";
        } else {
        var children = document.getElementById("formulario_alteracao").children;
        for(child of children) {
            if(child.id != "corpo_variaveis" && child.id != "salva_mudancas") {
                child.style.display = "none";
            }
        }
        }
    }

    function apagarMascaraFim() {
        var fields = document.getElementsByClassName("fieldset_nova_mascara");
        for(field of fields) {
            field.style.display = "none";
        }

        var fields = document.getElementsByClassName("form-group");
        for(field of fields) {
            field.style.display = "none";
        }

        var fields = document.getElementsByClassName("label_laranja");
        for(field of fields) {
            field.style.display = "none";
        }

        var fields = document.getElementsByClassName("input_curto");
        for(field of fields) {
            field.style.display = "none";
        }


        var fields = document.getElementsByClassName("nova_mascara_titulo");
        for(field of fields) {
            field.style.display = "none";
        }


        var fields = document.getElementsByClassName("br");
        for(field of fields) {
            field.style.display = "none";
        }



    }


      function voltarMascaraFim() {
        var fields = document.getElementsByClassName("fieldset_nova_mascara");
        for(field of fields) {
            field.style.display = "block";
        }

        var fields = document.getElementsByClassName("form-group");
        for(field of fields) {
            field.style.display = "block";
        }

        var fields = document.getElementsByClassName("label_laranja");
        for(field of fields) {
            field.style.display = "block";
        }

        var fields = document.getElementsByClassName("input_curto");
        for(field of fields) {
            field.style.display = "block";
        }


        var fields = document.getElementsByClassName("nova_mascara_titulo");
        for(field of fields) {
            field.style.display = "block";
        }


        var fields = document.getElementsByClassName("br");
        for(field of fields) {
            field.style.display = "block";
        }
        document.getElementById("corpo_alteracao").innerHTML = "";

        document.getElementById("salva_mudancas").value = "Adicionar";

        document.getElementById("salva_mudancas").setAttribute("onclick", "adicionarAlteracoNaMascara()");
                document.getElementById("botaoVoltar").remove();







    }


    function desabilitarEntradasConfiguracaoMascara() {

    if(document.getElementById("adicionar_no_atual") != null) {
    apagarAlteracaoFim();

    document.getElementById("salva_mudancas").value = "Concluir";
    if(document.getElementById("botaoCancelar") != null) {
    document.getElementById("botaoCancelar").style.display = "none";
}

        var botaoVoltar = document.createElement("button");
        botaoVoltar.innerHTML = "Voltar";
        botaoVoltar.id = "botaoVoltar";
        botaoVoltar.setAttribute("onclick", "voltarAlteracaoFim();");
                botaoVoltar.setAttribute("class", "btn-primary");

        var div = document.createElement("div");
        div.setAttribute("style", "text-align: center; margin: 1rem;");
        div.appendChild(botaoVoltar);

        if(document.getElementById("modal_alteracao_body") != null) {
        document.getElementById("modal_alteracao_body").appendChild(div);
        }

    } else {
    apagarMascaraFim();

        document.getElementById("salva_mudancas").value = "Concluir";



        var botaoVoltar = document.createElement("button");
        botaoVoltar.innerHTML = "Voltar";
        botaoVoltar.id = "botaoVoltar";
        botaoVoltar.setAttribute("onclick", "voltarMascaraFim();");
        botaoVoltar.setAttribute("class", "btn-primary");
        var div = document.createElement("div");
        div.setAttribute("style", "text-align: center; margin: 1rem; margin-bottom: 3rem;");
        div.appendChild(botaoVoltar);

        document.getElementById("formulario_nova_mascara").appendChild(div);
    }




    }

function recolocarTinys() {

        if(document.getElementById("adicionar_no_atual") != null) {

                            tinymce.init({
                            selector: '#relatorio_modal',
                                language: 'pt_BR',

                              menubar: false,
                                      plugins: "table paste lists",
                                        paste_as_text: true,
                                forced_root_block: false,
                            toolbar: "bold italic underline forecolor table bullist",
                              fontsize_formats: '11px 12px 14px 16px 18px 24px 36px 48px',
                                branding: false,
                                  elementpath: false


                          });


                              tinymce.init({
                            selector: '#conclusao_modal',
                                language: 'pt_BR',

                              menubar: false,
                                      plugins: "table paste lists",
                                    paste_as_text: true,
                        forced_root_block: false,
                            toolbar: "bold italic underline forecolor table bullist",
                              fontsize_formats: '11px 12px 14px 16px 18px 24px 36px 48px',
                                branding: false,
                                  elementpath: false


                          });

        } else {




                 tinymce.init({

        selector: '#info_adicional',
            language: 'pt_BR',

    forced_root_block: false,
        plugins: "table paste lists",
        paste_as_text: true,
          menubar: false,
        toolbar: "bold italic underline forecolor table bullist",
          fontsize_formats: '11px 12px 14px 16px 18px 24px 36px 48px',
            branding: false,
              elementpath: false


      });


      tinymce.init({
        selector: '#text_area_orgao',
            language: 'pt_BR',

    forced_root_block: false,
        plugins: "table paste lists",
        paste_as_text: true,
          menubar: false,
        toolbar: "bold italic underline forecolor table bullist",
          fontsize_formats: '11px 12px 14px 16px 18px 24px 36px 48px',
            branding: false,
              elementpath: false


      });


      var orgaos = document.getElementsByName("relatorio_orgao");

      for(var i = 0; i < orgaos.length; i++) {
        tinymce.init({
        selector: '#text_area_orgao' + i,
        forced_root_block: false,
            language: 'pt_BR',

            plugins: "table paste lists",
        paste_as_text: true,
              menubar: false,
            toolbar: "bold italic underline forecolor table bullist",
              fontsize_formats: '11px 12px 14px 16px 18px 24px 36px 48px',
                branding: false,
                  elementpath: false


          });
      }


            tinymce.init({
            body_id : "tecnica",
    forced_root_block: false,
        selector: '#tecnica',
        plugins: "table paste lists",
        paste_as_text: true,
            language: 'pt_BR',

          menubar: false,
        toolbar: "bold italic underline forecolor table bullist",
          fontsize_formats: '11px 12px 14px 16px 18px 24px 36px 48px',
            branding: false,
              elementpath: false


      });


      tinymce.init({
        selector: '#conclusao',
    forced_root_block: false,
        body_id : "conclusao",
        plugins: "table paste lists",
        paste_as_text: true,
            language: 'pt_BR',

          menubar: false,
        toolbar: "bold italic underline forecolor table bullist",
          fontsize_formats: '11px 12px 14px 16px 18px 24px 36px 48px',
            branding: false,
              elementpath: false


      });

      }
}



function clicouEntrada(id) {


    document.getElementById("relatorio_final").innerHTML = document.getElementById("relatorio_final").innerHTML.replaceAll('<span style="color: red; font-weight: bold">', '').replaceAll('</span>', "");
    document.getElementById("relatorio_final").innerHTML = document.getElementById("relatorio_final").innerHTML.replaceAll("{" + id + "}", '{<span style="color: red; font-weight: bold">' + id + '</span>}');
    document.getElementById("relatorio_final").innerHTML = document.getElementById("relatorio_final").innerHTML.replaceAll("|" + id + "|", '|<span style="color: red; font-weight: bold">' + id + '</span>|');
    document.getElementById("relatorio_final").innerHTML = document.getElementById("relatorio_final").innerHTML.replaceAll("{" + id + "|", '{<span style="color: red; font-weight: bold">' + id + '</span>|');
    document.getElementById("relatorio_final").innerHTML = document.getElementById("relatorio_final").innerHTML.replaceAll("|" + id + "}", '|<span style="color: red; font-weight: bold">' + id + '</span>}');


}


    function adicionarAlteracoNaMascara() {

    if(document.getElementById("cancelarIndicacoes") != null) {
document.getElementById("cancelarIndicacoes").remove();
}


        if(document.getElementById("coluna_mascaras") != null && document.getElementById("coluna_esquerda") != null) {
            document.getElementById("coluna_mascaras").parentNode.removeChild(document.getElementById("coluna_mascaras"));
            document.getElementById("coluna_esquerda").setAttribute("class", "col-12");
            document.getElementById("coluna_esquerda").style.padding = "2rem";
        }
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

                orgaoid = topicoNormalParaAlterar;
                name = orgaoid;

        if(document.getElementById("s" + orgaoid) != null) {
        if(document.getElementById("s" + orgaoid).parentNode.style.display == "none") {
                            if(document.getElementById("s" + orgaoid).innerHTML != "Nenhum órgão:") {
                            document.getElementById("s" + name).style.display = "inline";
                            } else {

                            }

                            document.getElementById(name).style.display = "inline";
                                                        document.getElementById(name).parentNode.style.display = "inline";

                                document.getElementById("s" + name).nextSibling.parentNode.insertBefore(document.createElement("br"), document.getElementById("s" + name).nextSibling.nextSibling);


                document.getElementById("s" + name).nextSibling.setAttribute("data-mce-style", document.getElementById("s" + name).nextSibling.getAttribute("data-mce-style").replaceAll("none", "inline"));
                document.getElementById("s" + name).parentNode.setAttribute("data-mce-style", document.getElementById("s" + name).parentNode.getAttribute("data-mce-style").replaceAll("none", "inline"));


    if(document.getElementById(name).innerHTML == "&nbsp;" && document.getElementById("s" + orgaoid).innerHTML == "Nenhum órgão:") {
        document.getElementById(name).parentNode.style.display = "none";
    }

                            }
}

try {
 var topicosNormais = JSON.parse(normais);


            for(topico of topicosNormais) {
                if(topico.pk == name) {
                    orgao = topico.fields.orgao;
                }

            }


    if(document.getElementById(name).innerText == "" && orgao == "Nenhum órgão" && mascara_topicos == "False") {
        document.getElementById(name).style.display = "none";
    }

} catch (err) {

}

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

             var pattern = /^[a-z0-9_|*-+\/,.()]+$/i;
            if(variavel.match(pattern) == null) {
                alert("Variáveis não podem conter acentuação ou símbolos, apenas letras e números. Corrija antes de prosseguir.");
                recolocarTinys();
                document.getElementById("salva_mudancas").blur();

                return;
            }



        }

   if(document.getElementById("adicionar_no_atual") != null && document.getElementById("ultima_alteracao_relatorio") && document.getElementById("paragrafo_conclusao")) {
          document.getElementById("ultima_alteracao_relatorio").innerHTML = document.getElementById("topicos_div").innerHTML;
                document.getElementById("ultima_alteracao_conclusao").innerHTML = document.getElementById("paragrafo_conclusao").innerHTML;
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

                desabilitarEntradasConfiguracaoMascara();

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


        if(document.getElementById("adicionar_no_atual") != null) {
            var relatorioFinal = document.createElement("div");
            relatorioFinal.id = "relatorio_final";
            relatorioFinal.setAttribute("style","position: sticky; position: -webkit-sticky; top: 0; background: white; padding: 1rem;");
            relatorioFinal.innerHTML = document.getElementById("relatorio_modal").value + "<br>" + document.getElementById("conclusao_modal").value;
            corpo.appendChild(relatorioFinal);
        } else {
            var relatorioTexto = "";
            var relatorioOrgaos = document.getElementsByName("relatorio_orgao");

            for(relatorio of relatorioOrgaos) {
                    if(relatorio.style.display != "none" && relatorio.value != "") {
                   if(relatorioTexto == "") {
                          relatorioTexto = relatorio.value;

                   } else {

                      relatorioTexto = relatorioTexto + "<br>" + relatorio.value;

                   }
                   }
            }

            var relatorioFinal = document.createElement("div");
            relatorioFinal.id = "relatorio_final";
            relatorioFinal.innerHTML = document.getElementById("titulo_exame").value + "<br>" + document.getElementById("tecnica_header").value + "<br>" + document.getElementById("tecnica").value + "<br>" + document.getElementById("relatorio_header").value + "<br>"
            + relatorioTexto + "<br>" + document.getElementById("conclusao_header").value + "<br>" + document.getElementById("conclusao").value;
            corpo.appendChild(relatorioFinal);
        }




        if(listaVars.length == 0) {
                formulario.submit();

        }







        var variaveisJSONObject = JSON.parse(nomesAmigaveisUsuario);

        var variavelJaExiste = false;
        for(var i = 0; i < listaVars.length; i++) {

            for(var z = 0; z < variaveisJSONObject.length; z++) {
                if(listaVars.includes(variaveisJSONObject[z].fields.nome_da_variavel)) {
                    variavelJaExiste = true;

                }


            }

              var inputMedida = document.createElement("input");
                inputMedida.setAttribute("name", "unidade_de_medida");
                inputMedida.style.marginBottom = "1rem";
                inputMedida.style.width = "20%";

                var input = document.createElement("input");
                input.setAttribute("name", "nome_amigavel_variavel")
                input.style.width = "75%";
                input.style.marginBottom = "1rem";
                input.style.whiteSpace = "pre";

                input.setAttribute("id", listaVars[i]);

                input.setAttribute("onclick", "clicouEntrada(this.id)");
                input.setAttribute("onfocus", "clicouEntrada(this.id)");
                input.setAttribute("autocomplete", "off");

                var inputHidden = document.createElement("input");
                inputHidden.setAttribute("type", "hidden");
                inputHidden.style.maxHeight = 0;

                inputHidden.setAttribute("name", "nome_da_variavel");
                  var label = document.createElement("label");
                  label.style.fontWeight = "bold";
                label.style.color = "#c96100";
                label.style.display = "block";


                label.setAttribute("name", "label_variavel");

                    var br = document.createElement("br")
                br.setAttribute("name", "label_br");


                 if(listaVariaveisNominais.includes(listaVars[i])) {
                        input.setAttribute("placeholder", "Descrição no laudo");
                        input.setAttribute("size", 40)
                          label.style.color = "#000000";

                        inputMedida.style.display = "none"

                } else if(listaVars[i].indexOf("|") > -1) {
                        input.setAttribute("placeholder", "Nome da variável");
                        input.setAttribute("size", 40)
                        inputMedida.style.display = "none"


                } else {
                        inputMedida.setAttribute("placeholder", "Unidade medida");
                        inputMedida.setAttribute("size", 18);
                        inputMedida.style.marginLeft = ".2rem";

                        input.setAttribute("size", 40)

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
                            document.getElementById("relatorio_modal").value = document.getElementById("relatorio_modal").value.replace("{" + listaVars[i] + "}", "{" + inputHidden.value + "}");

                        }
                        if(document.getElementById("conclusao_modal").value.indexOf("{" + listaVars[i] + "}") > -1) {
                            document.getElementById("conclusao_modal").value = document.getElementById("conclusao_modal").value.replace("{" + listaVars[i] + "}", "{" + inputHidden.value + "}");

                        }
                    } else {

                    var orgaos = document.getElementsByClassName("paragrafo_mascara");
                        for(orgao of orgaos) {
                            if(orgao.value.indexOf("{" + listaVars[i] + "}") > -1) {
                                orgao.value = orgao.value.replace("{" + listaVars[i] + "}", "{" + inputHidden.value + "}");

                            }
                        }
                    }

                } else {



                    var constructor = listaVars[i];
                    var splits = listaVars[i].split(/[*/+-]+/g);
                    if(splits.length > 1) {
                        for(var z = 0; z < splits.length; z++) {
                                if(isNaN(parseFloat(splits[z].trim()))) {

                                    constructor = constructor.replace(splits[z].trim().replaceAll("(", "").replaceAll(")", ""), splits[z].trim().replaceAll("(", "").replaceAll(")", "") + getVariaveisUsuarioCount());
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
                            document.getElementById("relatorio_modal").value = document.getElementById("relatorio_modal").value.replace("{" + listaVars[i] + "}", "{" + inputHidden.value + "}");

                        }
                        if(document.getElementById("conclusao_modal").value.indexOf("{" + listaVars[i] + "}") > -1) {
                            document.getElementById("conclusao_modal").value = document.getElementById("conclusao_modal").value.replace("{" + listaVars[i] + "}", "{" + inputHidden.value + "}");

                        }
                     } else {
                        var orgaos = document.getElementsByClassName("paragrafo_mascara");
                        for(orgao of orgaos) {
                            if(orgao.value.indexOf("{" + listaVars[i] + "}") > -1) {
                                orgao.value = orgao.value.replace("{" + listaVars[i] + "}", "{" + inputHidden.value + "}");

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
                var variaveisUsuarioAproveitado = [];

                for(vari of variaveisJSONObject) {

                    if(vari.fields.usuario == document.getElementById("usuario_id_alteracao").value) {
                        if(todasVariaveis.includes(vari.fields.nome_da_variavel)) {



                            nomesAmigos.push(vari.fields.nome_amigavel);
                            unidadesMedidas.push(vari.fields.unidade_medida);
                            variaveisUsuarioAproveitado.push(vari.fields.nome_da_variavel);




                        }
                    }

                }


                var variaJSONObject = JSON.parse(nomesAmigaveisUsuario);


                var variaveisUsuario = []
            for(var z = 0; z < variaJSONObject.length; z++) {
                variaveisUsuario.push(variaJSONObject[z].fields.nome_da_variavel);

                }




                nomesAmigaveisInputs = document.getElementsByName("nome_amigavel_variavel");
                unidadesMedidasInputs = document.getElementsByName("unidade_de_medida");
                var labels = document.getElementsByName("label_variavel");

                var contador = 0;


                for (var z = 0; z < nomesAmigaveisInputs.length; z++) {

                        if(variaveisUsuario.includes(nomesAmigaveisInputs[z].getAttribute("id")) || variaveisUsuarioAproveitado.includes(nomesAmigaveisInputs[z].getAttribute("id"))) {
                            nomesAmigaveisInputs[z].value = nomesAmigos[contador];
                            unidadesMedidasInputs[z].value = unidadesMedidas[contador];
                            contador++;
                        } else {
                        nomesAmigaveisInputs[z].value = "";
                        unidadesMedidasInputs[z].value = "";
                        }





                        if(nomesAmigaveisInputs[z].value == "undefined" || nomesAmigaveisInputs[z].value == "Ignorar") {
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






                if(document.getElementById(topicoNormalParaAlterar).getAttribute("name") != "alterado") {
                    if(mascara_topicos == "True" && document.getElementById(topicoNormalParaAlterar).previousSibling.id == "s" + topicoNormalParaAlterar) {
                    if(document.getElementById(topicoNormalParaAlterar).previousSibling.innerHTML == "Nenhum órgão:") {
                                     document.getElementById(topicoNormalParaAlterar).innerHTML = document.getElementById("relatorio_modal").value.charAt(0).toLowerCase() + document.getElementById("relatorio_modal").value.slice(1);

                    } else {
                                     document.getElementById(topicoNormalParaAlterar).innerHTML = "&nbsp;" + document.getElementById("relatorio_modal").value.charAt(0).toLowerCase() + document.getElementById("relatorio_modal").value.slice(1);

                    }



                } else {
                if(mascara_topicos == "True") {
                document.getElementById(topicoNormalParaAlterar).innerHTML = "&nbsp;" + document.getElementById("relatorio_modal").value;
                } else {
                document.getElementById(topicoNormalParaAlterar).innerHTML = document.getElementById("relatorio_modal").value;
                }


                }


                    if(document.getElementById("conclusao_modal").value != "" && document.getElementById("paragrafo_conclusao").getAttribute("name") != "alterado" && document.getElementById("relatorio_modal").value != "") {
                            document.getElementById("paragrafo_conclusao").innerHTML = document.getElementById("conclusao_modal").value;
                            document.getElementById("paragrafo_conclusao").setAttribute("name", "alterado");
                    } else {
                    document.getElementById("paragrafo_conclusao").innerHTML = document.getElementById("paragrafo_conclusao").innerHTML + "<br>" + document.getElementById("conclusao_modal").value;
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
            if(document.getElementById("salva_mudancas") != null) {
                document.getElementById("salva_mudancas").style.display = "none";
            }
            if(document.getElementById("relatorio_final") != null) {
                document.getElementById("relatorio_final").style.display = "none";
            }

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



    var pars = document.getElementsByClassName("paragrafo_mascara");
    for(par of pars) {

         par.style.visibility = "visible";
        par.style.maxHeight = "400px";
        par.rows = 3;

        par.style.width = "100%";
    }


            if(document.getElementById("adicionar_no_atual") != null) {
                document.getElementById("corpo_variaveis").scrollIntoView();

            } else {
                document.getElementById("corpo_alteracao").scrollIntoView();

            }



    }




    function getVariaveisUsuarioCount() {
            var variaveisJSONObject = JSON.parse(nomesAmigaveisUsuario);
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
            if(tecnica != null) {
            td.setAttribute("data-mce-style", td.getAttribute("style") + "; font-size: " + tecnica.style.fontSize + "; font-family: " + tecnica.style.fontFamily);
            }
        }
    }


    function mostrarBotaoPopularSeNecessario() {



    styleTinyMceTables();



    var paragrafos = document.getElementsByClassName("paragrafo_mascara");

    for(paragrafo of paragrafos) {
        if(paragrafo.innerHTML != "" && paragrafo.getAttribute("id") != "titulo") {
            if(mascara_topicos == "True") {
                paragrafo.style.display = "inline";

            } else {
                paragrafo.style.display = "block";

            }

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



    window.onload = colocarIndicacaoClinica;





    function popularFraseAlterada(topicoId) {

     var profileJsonObject = JSON.parse(profileJson);

     if(profileJsonObject[0].fields.is_premium) {

     } else {

        if (confirm('Somente usuários Premium podem visualizar e copiar alterações de outros usuários. Deseja se tornar Premium para ativar este recurso?')) {
          // Save it!
          window.location.href="../../premium"

        } else {
          // Do nothing!
        }
        return;

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
            var orgaoSelecionadoUsuario;


            for(topico of topicosNormais) {
                if(topico.pk == topicoNormalId) {
                    mascaraSelecionadaId = topico.fields.mascara;
                    orgaoSelecionadoUsuario = topico.fields.orgao;
                }

            }


             for(mascara of mascaras) {
                if(mascara.pk == mascaraSelecionadaId) {
                    usuarioSelecionadoId = mascara.fields.usuario;
                }

            }





            document.getElementById("usuario_id_alteracao").value = usuarioSelecionadoId;
            document.getElementById("exames").value = "";
            document.getElementById("frase_aproveitada").value = idSemT;
            document.getElementById("usuario_orgao_alteracao").value = orgaoSelecionadoUsuario;


    }


//não ativa nas máscaras estilo James.
    function aumentarPrimeiraLetraRelatorio() {

    if(document.getElementById("mascara_topicos") != null) {

             if(document.getElementById("topicos_div") != null) {
        var topicos = document.getElementById("topicos_div").children;
        for(child of topicos) {
            child.innerHTML = child.innerHTML.trim();
            child.innerHTML = child.innerHTML.charAt(0).toUpperCase() + child.innerHTML.slice(1);
        }
    }

        }
    }


    function CopyToClipboard() {

if(mascara_topicos != "True") {


aumentarPrimeiraLetraRelatorio();


}


        document.getElementById("copiar_laudo").scrollIntoView();

    if(document.getElementById("indicacoesEscondida") != null) {
        document.getElementById("indicacoesEscondida").remove();
    }

    if(document.getElementById("cancelarIndicacoes") != null) {
document.getElementById("cancelarIndicacoes").remove();
}

    if(document.getElementById("botoes_div2") != null) {
        document.getElementById("botoes_div2").remove();
    }

var voltars = document.getElementsByClassName("link_voltar");
    for(i=0; i < voltars.length; i++) {
        voltars[i].style.display = "none";
    }


document.getElementById("ModalVariaveis").style.display = "none";
document.getElementById("myModalAlteracao").style.display = "none";
document.getElementById("myModal").style.display = "none";

    if(document.getElementById("mais_utilizadas") != null) {
document.getElementById("mais_utilizadas").style.display = "none";
}

    var anchor2 = document.createElement("a");
anchor2.setAttribute("href", window.location.href);
anchor2.setAttribute("class", "link_voltar");


anchor2.innerHTML = "Repetir exame";
anchor2.style.fontSize = "1.5rem";
document.getElementById("botoes_div").appendChild(anchor2);

    var anchor = document.createElement("a");
anchor.setAttribute("href", "../../mascaras");
anchor.setAttribute("id", "link_voltar");


    if(document.referrer.split("/").reverse()[0] == "comunidade" || document.referrer == window.location.protocol + "//" + window.location.hostname + "/") {
        anchor.setAttribute("href", "javascript:history.back()");
    }

anchor.innerHTML = "Novo exame";
anchor.style.fontSize = "1.5rem";
document.getElementById("botoes_div").appendChild(anchor);



$('#copiar_laudo').tooltip('dispose');


document.getElementById("copiar_laudo").style.display = "none";
if(document.getElementById("editar_laudo") != null) {
document.getElementById("editar_laudo").style.display = "none";

}
if(document.getElementById("popular_variaveis") != null) {
document.getElementById("popular_variaveis").style.display = "none";

}
if(document.getElementById("diagnosticos_div") != null) {
                        document.getElementById("diagnosticos_div").parentNode.parentNode.removeChild(document.getElementById("diagnosticos_div").parentNode);

}

limparTagsHtmlParcial();


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


      var anchor = document.createElement("a");
anchor.setAttribute("href", "../../mascaras");
anchor.setAttribute("id", "link_voltar");


    if(document.referrer.split("/").reverse()[0] == "comunidade" || document.referrer == window.location.protocol + "//" + window.location.hostname + "/") {
        anchor.setAttribute("href", "javascript:history.back()");
    }

    anchor.innerHTML = "Novo exame";
    anchor.style.marginLeft = "45%";
    anchor.style.fontSize = "1.5rem";
    if(document.getElementById("link_voltar") == null) {

    }



}

function isLetter(c) {
  return c.toLowerCase() != c.toUpperCase();
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
  if(li[i].getAttribute("name") == "botao_alteracao") {
    txtValue = li[i].innerText;
    if (txtValue.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase().indexOf(filter.normalize("NFD").replace(/[\u0300-\u036f]/g, "")) > -1) {
      li[i].style.display = "block";
    } else {
      li[i].style.display = "none";
    }

  }
  }
}

function procurarFrasesMascara(id) {

var topicoSelecionado;

if(document.getElementById("botoezinhos_div") != null) {
var botoes = document.getElementById("botoezinhos_div").children;

for(botao of botoes) {
    if(botao.style.background != "") {
        topicoSelecionado = botao.id.substring(1);
    }
}

} else {
    topicoSelecionado = "odas"
}



  // Declare variables
  var input, filter, li, i, txtValue;
  input = document.getElementById(id);
  filter = input.value.toUpperCase();
  li = document.getElementsByClassName('botao_diagnostico');

  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < li.length; i++) {

    if(topicoSelecionado == "odas") {
        txtValue = li[i].innerText;

        if (txtValue.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase().indexOf(filter.normalize("NFD").replace(/[\u0300-\u036f]/g, "")) > -1) {

          li[i].parentNode.parentNode.parentNode.style.display = "block";
        } else {
          li[i].parentNode.parentNode.parentNode.style.display = "none";
        }
        if(li[i].innerHTML == "Reverter") {
          li[i].parentNode.parentNode.parentNode.style.display = "none";

        }
    } else if(topicoSelecionado == "utras") {
            var topicosNenhum = [];

        var normaisJSONObject = JSON.parse(normaisusuario);
        for(z=0; z < normaisJSONObject.length; z++) {
            if(normaisJSONObject[z].fields.orgao == "Nenhum órgão") {
                topicosNenhum.push(normaisJSONObject[z].pk);
            }
        }
        txtValue = li[i].innerText;

        if (txtValue.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase().indexOf(filter.normalize("NFD").replace(/[\u0300-\u036f]/g, "")) > -1 &&  topicosNenhum.includes(parseInt(li[i].name))) {

          li[i].parentNode.parentNode.parentNode.style.display = "block";
        } else {
          li[i].parentNode.parentNode.parentNode.style.display = "none";
        }
        if(li[i].innerHTML == "Reverter") {
          li[i].parentNode.parentNode.parentNode.style.display = "none";

        }


    } else {
        txtValue = li[i].innerText;

        if (txtValue.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase().indexOf(filter.normalize("NFD").replace(/[\u0300-\u036f]/g, "")) > -1 && li[i].name == topicoSelecionado) {

          li[i].parentNode.parentNode.parentNode.style.display = "block";
        } else {
          li[i].parentNode.parentNode.parentNode.style.display = "none";
        }
        if(li[i].innerHTML == "Reverter") {
          li[i].parentNode.parentNode.parentNode.style.display = "none";

        }
    }

  }
}

function procurarMascarasUsuariosAdaptada(id) {

  filtrarMascaras();



  // Declare variables
  var input, filter, li, i, txtValue;
  input = document.getElementById(id);
  filter = input.value.toUpperCase();
  li = document.getElementsByClassName('botao_diagnostico');



  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < li.length; i++) {
    txtValue = li[i].innerText;

    if (txtValue.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase().indexOf(filter.normalize("NFD").replace(/[\u0300-\u036f]/g, "")) > -1) {
      if(li[i].style.display != "none") {
        li[i].style.display = "block";
      }
    } else {
      li[i].style.display = "none";
    }

  }
}


function procurarMascarasUsuarios(id) {




  // Declare variables
  var input, filter, li, i, txtValue;
  input = document.getElementById(id);
  filter = input.value.toUpperCase();
  li = document.getElementsByClassName('botao_diagnostico');



  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < li.length; i++) {
    txtValue = li[i].innerText;

    if (txtValue.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase().indexOf(filter.normalize("NFD").replace(/[\u0300-\u036f]/g, "")) > -1) {
      if(li[i].style.display != "none") {
        li[i].style.display = "block";
      }
    } else {
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

function colocarIndicacaoClinica() {




if(mascara_topicos == "True") {

var paragrafos = document.getElementsByTagName("ul");
for(paragrafo of paragrafos) {


    if(paragrafo.parentNode.parentNode.nextSibling.tagName == "BR") {
        paragrafo.parentNode.parentNode.nextSibling.remove();
    }
}


}

configurarBotoezinhosJames();


//funçãozinha que remove os tópicos vazios máscara james de copiar sem editar. Se for editar, não remove.




    if(document.getElementById("copiar_laudo") != null) {
    document.getElementById("copiar_laudo").scrollIntoView();
    }

    if(document.referrer.split("/").reverse()[0] == "comunidade" || document.referrer == window.location.protocol + "//" + window.location.hostname + "/") {
        if(document.getElementById("voltar_baixo") != null) {
        document.getElementById("voltar_baixo").setAttribute("href", "javascript:window.close()");
        }
    }




   if(document.getElementById("indicacoes") != null && document.getElementById("copiar_laudo") != null) {
    var indicacoes = document.getElementById("indicacoes").innerHTML.split(",");
    var indicacoesDiv = document.getElementById("indicacoes");
    var select = document.createElement("select");
    select.setAttribute("id", "lista_indicacoes");
    select.setAttribute("onchange", "setarIndicacao()");
    for(indicacao of indicacoes) {
        var option = document.createElement("option");
        option.innerHTML = indicacao;
        select.appendChild(option);
    }
    indicacoesDiv.innerHTML = "";

        indicacoesDiv.appendChild(select);

    }

    mostrarBotaoPopularSeNecessario();

    var idTopico;
    var idAlteracao;

if(document.getElementById("ultima_alteracao_relatorio") != null) {
 document.getElementById("ultima_alteracao_relatorio").innerHTML = document.getElementById("topicos_div").innerHTML;
                document.getElementById("ultima_alteracao_conclusao").innerHTML = document.getElementById("paragrafo_conclusao").innerHTML;
}


if(document.getElementsByName("opcoesJames") != null) {
    var orgaos = document.getElementsByName("orgao");
    for(orgao of orgaos) {
        if(orgao.value.includes("\u2022")) {
            orgao.parentNode.parentNode.children[1].children[0].checked = true;

        }
        if(orgao.value.includes("\u2001")) {
            orgao.parentNode.parentNode.children[1].children[2].checked = true;

        }
        if(orgao.value.includes("<i>") && orgao.value.includes("</i>")) {
            orgao.parentNode.parentNode.children[1].children[4].checked = true;

        }

    }
}



            if(document.getElementById("exames") != null) {

                var opcoes = document.getElementById("exames").options;

     var opcaoSelecionada = opcoes[0].innerHTML;
     for(var i = 0; i < opcoes.length; i++) {
             if(opcoes[i].innerHTML == "Nenhum órgão") {
                        opcoes[i].style.display = "none";


        }
     }

     for(var i = 0; i < opcoes.length; i++) {
             if(opcoes[i].innerHTML == "Nenhum órgão") {
                        opcoes[i].style.display = "block";
                        break;


        }
     }

     }

}

function setarIndicacao() {
    var deixouEmBranco = false;
    var indicacoesDiv = document.getElementById("indicacoes");

    var select = document.getElementById("lista_indicacoes");
    var selecao = select.options[select.selectedIndex].innerHTML;

    if(selecao.trim() == "Não mostrar") {
document.getElementById("indicacoes_header").style.display = "none";
        select.parentNode.style.display = "none";
    } else if(selecao.trim() == "Deixar em branco") {
        indicacoesDiv.setAttribute("contentEditable", "true");

        indicacoesDiv.innerHTML = "&nbsp;";
        deixouEmBranco = true;
    } else {
    indicacoesDiv.innerHTML = "";
        indicacoesDiv.innerHTML = selecao;

    }



if(document.getElementById("procurarFrases") != null) {
            document.getElementById("procurarFrases").focus();
        }

        if(deixouEmBranco) {
            indicacoesDiv.focus();
        }
    if(document.getElementById("cancelarIndicacoes") != null) {
    document.getElementById("cancelarIndicacoes").style.display = "block";
    }
}

function editarLaudo() {

 var topics = document.getElementsByClassName("paragrafo_mascara");
for(topic of topics) {
    if(topic.innerHTML == " " || topic.innerHTML == "") {
        topic.style.display = "none";
    }
}
$('.paragrafo_mascara:hidden').remove();
$('.outerstrong:hidden').remove();




$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

document.getElementById("copiar_laudo").setAttribute("data-toggle", "tooltip");
document.getElementById("copiar_laudo").setAttribute("data-placement", "bottom");
document.getElementById("copiar_laudo").setAttribute("title", "Copia texto, formatação e estilo. Para colar em outro WEBSITE");
document.getElementById("copiar_laudo").setAttribute("data-delay", '{"show":"700", "hide":"0"}');

document.getElementById("copiar_html").setAttribute("data-toggle", "tooltip");
document.getElementById("copiar_html").setAttribute("data-placement", "bottom");
document.getElementById("copiar_html").setAttribute("title", "Copia somente texto e formatação. Para colar em aplicativos DESKTOP");
document.getElementById("copiar_html").setAttribute("data-delay", '{"show":"700", "hide":"0"}');


document.getElementById("copiar_texto").setAttribute("data-toggle", "tooltip");
document.getElementById("copiar_texto").setAttribute("data-placement", "bottom");
document.getElementById("copiar_texto").setAttribute("title", "Copia somente texto, sem formatação ou estilo");
document.getElementById("copiar_texto").setAttribute("data-delay", '{"show":"700", "hide":"0"}');





if(mascara_topicos == "True") {
var topicosVisiveis = document.getElementById("topicos_div").children;
var ultimoTopicoVisivel;

for(topico of topicosVisiveis) {
    if(topico.style.display == "inline") {
    ultimoTopicoVisivel = topico;
    }
}
ultimoTopicoVisivel.nextSibling.remove();

}


var paragrafos = document.getElementsByTagName("ul");
for(paragrafo of paragrafos) {

    if(paragrafo.id != "barra_navegacao") {
    paragrafo.style.marginTop = 0;
    paragrafo.style.marginBottom = 0;


    }
}

 var divs2 = document.getElementsByTagName("div");
    for(div2 of divs2) {
        if(div2.getAttribute("class") == "outerstrong") {
            if(div2.innerHTML == "") {
                div2.remove();
            }

        }
}
var topics = document.getElementsByClassName("paragrafo_mascara");
for(topic of topics) {
    if(topic.innerHTML == "&nbsp;") {
        topic.remove();
    }
}


if(document.getElementById("indicacoes_header") != null) {

if(document.getElementById("indicacoes_header").style.display == "none") {
document.getElementById("indicacoes_header").remove();
        document.getElementById("lista_indicacoes").remove();
                document.getElementById("indicacoes").remove();

}

}

if(mascara_topicos != "True") {

aumentarPrimeiraLetraRelatorio();

}

if(document.getElementById("indicacoesEscondida") != null) {
        document.getElementById("indicacoesEscondida").remove();
    }

    if(document.getElementById("cancelarIndicacoes") != null) {
document.getElementById("cancelarIndicacoes").remove();
}
	document.onmousedown = (e) => {
  e.preventDefault();
}

document.getElementById("botoes_div2").remove();
document.getElementById("botoes_div").setAttribute("style", "margin-bottom: 0; text-align: center;")
document.getElementById("mycontainer").setAttribute("style", "position: -webkit-sticky; position: sticky; top: 0")

var voltars = document.getElementsByClassName("link_voltar");
    for(i=0; i < voltars.length; i++) {
        voltars[i].style.display = "none";
        voltars[i].parentNode.remove();
    }

document.getElementById("popular_variaveis").remove();
limparDivsVazios();
if(document.getElementById("mais_utilizadas") != null) {
    document.getElementById("mais_utilizadas").style.display = "none";

}
document.getElementById("copiar_laudo").innerHTML = "Copiar Tudo";
document.getElementById("copiar_laudo").style.display = "inline-block";
document.getElementById("copiar_html").style.display = "inline-block";
document.getElementById("copiar_texto").style.display = "inline-block";
document.getElementById("copiar_laudo").style.width = "30%";
document.getElementById("copiar_html").style.width = "30%";
document.getElementById("copiar_texto").style.width = "30%";
document.getElementById("copiar_laudo").style.marginBottom = "1rem";
document.getElementById("copiar_html").style.marginBottom = "1rem";
document.getElementById("copiar_texto").style.marginBottom = "1rem";

if(document.getElementById("tecnica") != null) {
document.getElementById("tecnica").style.marginTop = "0px";

}
if(document.getElementById("topicos_div") != null) {
document.getElementById("topicos_div").style.marginTop = "0px";

}
if(document.getElementById("paragrafo_conclusao") != null) {
document.getElementById("paragrafo_conclusao").style.marginTop = "0px";

}

if(document.getElementById("relatorio_header") == null) {
document.getElementById("topicos_div").style.marginTop = "15px";

}

if(document.getElementById("indicacoes") != null) {
document.getElementById("indicacoes").style.marginTop = "0px";

}
if(document.getElementById("titulo") != null) {
document.getElementById("titulo").style.margin = "0px";

}



                     tinymce.init({
                            browser_spellcheck: true,
                            selector: '#mascara_div',
                                 language: 'pt_BR',
                                height: "70vh",


                              menubar: false,
                                      plugins: "noneditable, table paste code lists",

                                forced_root_block: false,
                            toolbar: "fontselect fontsizeselect bold italic underline forecolor table bullist code spell",
                            setup: function (editor) {
                                editor.ui.registry.addButton('spell', {
                                  tooltip: 'Ditar no microfone',
                                  autofocus: false,
                                      text: '<image src=' + tinymce.baseURL.replace("tinymce/js/tinymce", "images/microfone.png") + ' style="height: 20px;width: 20px;"/ >',

                                  onAction: function () {
                                    GetSpellBtn();
                                  }
                                });
                              },

                              fontsize_formats: '11px 12px 14px 16px 18px 24px 36px 48px',
                                branding: false,
                                  elementpath: false


                          });
                         document.getElementById("copiar_laudo").setAttribute("onclick", "copiarTiny()");
                        document.getElementById("editar_laudo").parentNode.removeChild(document.getElementById("editar_laudo"));
                        document.getElementById("diagnosticos_div").parentNode.parentNode.removeChild(document.getElementById("diagnosticos_div").parentNode);



}

function copiarTiny() {

removerBotoes();

var conteudoTiny = tinymce.get("mascara_div").getBody().innerHTML;
tinymce.remove();

    document.getElementById("mascara_div").innerHTML = conteudoTiny;
    limparTagsHtmlParcial();

    CopyToClipboard();
document.getElementById("copiar_laudo").parentNode.removeChild(document.getElementById("copiar_laudo"));
var anchor = document.getElementById("link_voltar");
anchor.setAttribute("href", "../../mascaras");
anchor.setAttribute("id", "link_voltar");


    if(document.referrer.split("/").reverse()[0] == "comunidade" || document.referrer == window.location.protocol + "//" + window.location.hostname + "/") {
        anchor.setAttribute("href", "javascript:history.back()");
    }

anchor.innerHTML = "Novo exame";
anchor.style.fontSize = "1.5rem";
document.getElementById("botoes_div").appendChild(anchor);




}

function titleCase(str) {
   var splitStr = str.toLowerCase().split(' ');
   for (var i = 0; i < splitStr.length; i++) {
       // You do not need to check if i is larger than splitStr length, as your for does that for you
       // Assign it back to the array
       splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
   }
   // Directly return the joined string
   return splitStr.join(' ');
}

function copiarTinySemEstilo() {
removerBotoes();

var conteudoTiny = tinymce.get("mascara_div").getBody().innerHTML;
tinymce.remove();

    document.getElementById("mascara_div").innerHTML = conteudoTiny;

if(document.getElementById("titulo") != null) {
    if(document.getElementById("titulo").style.textTransform == "uppercase") {
        document.getElementById("titulo").innerHTML = document.getElementById("titulo").innerHTML.toUpperCase();

    }
}
if(document.getElementById("titulo") != null) {
    if(document.getElementById("titulo").style.textTransform == "capitalize") {
        document.getElementById("titulo").innerHTML = titleCase(document.getElementById("titulo").innerHTML);

    }
}
if(document.getElementById("tecnica_header") != null) {
    if(document.getElementById("tecnica_header").style.textTransform == "capitalize") {
        document.getElementById("tecnica_header").innerHTML = titleCase(document.getElementById("tecnica_header").innerHTML);

    }
}

if(document.getElementById("indicacoes_header") != null) {
    if(document.getElementById("indicacoes_header").style.textTransform == "capitalize") {
        document.getElementById("indicacoes_header").innerHTML = titleCase(document.getElementById("indicacoes_header").innerHTML);

    }
    }
    if(document.getElementById("relatorio_header") != null) {
    if(document.getElementById("relatorio_header").style.textTransform == "capitalize") {
        document.getElementById("relatorio_header").innerHTML = titleCase(document.getElementById("relatorio_header").innerHTML);

    }
    }
    if(document.getElementById("conclusao_header") != null) {
    if(document.getElementById("conclusao_header").style.textTransform == "capitalize") {
        document.getElementById("conclusao_header").innerHTML = titleCase(document.getElementById("conclusao_header").innerHTML);

    }
}
if(document.getElementById("info_adicional") != null) {
    if(document.getElementById("info_adicional").style.textTransform == "capitalize") {
        document.getElementById("info_adicional").innerHTML = titleCase(document.getElementById("info_adicional").innerHTML);

    }
}
if(document.getElementById("tecnica_header") != null) {
     if(document.getElementById("tecnica_header").style.textTransform == "uppercase") {
        document.getElementById("tecnica_header").innerHTML = document.getElementById("tecnica_header").innerHTML.toUpperCase();

    }
    }
if(document.getElementById("indicacoes_header") != null) {
    if(document.getElementById("indicacoes_header").style.textTransform == "uppercase") {
        document.getElementById("indicacoes_header").innerHTML = document.getElementById("indicacoes_header").innerHTML.toUpperCase();

    }
    }
    if(document.getElementById("relatorio_header") != null) {
    if(document.getElementById("relatorio_header").style.textTransform == "uppercase") {
        document.getElementById("relatorio_header").innerHTML = document.getElementById("relatorio_header").innerHTML.toUpperCase();

    }
    }
        if(document.getElementById("conclusao_header") != null) {
    if(document.getElementById("conclusao_header").style.textTransform == "uppercase") {
        document.getElementById("conclusao_header").innerHTML = document.getElementById("conclusao_header").innerHTML.toUpperCase();

    }
    }
        if(document.getElementById("info_adicional") != null) {
    if(document.getElementById("info_adicional").style.textTransform == "uppercase") {
        document.getElementById("info_adicional").innerHTML = document.getElementById("info_adicional").innerHTML.toUpperCase();

    }
}





    limparTagsHtmlTotal();
    document.getElementById("mascara_div").innerHTML = document.getElementById("mascara_div").innerHTML.replaceAll("espacoembranco", "");

    CopyToClipboard();
document.getElementById("copiar_laudo").parentNode.removeChild(document.getElementById("copiar_laudo"));
var anchor = document.getElementById("link_voltar");
anchor.setAttribute("href", "../../mascaras");
anchor.setAttribute("id", "link_voltar");


    if(document.referrer.split("/").reverse()[0] == "comunidade" || document.referrer == window.location.protocol + "//" + window.location.hostname + "/") {
        anchor.setAttribute("href", "javascript:history.back()");
    }

anchor.innerHTML = "Novo exame";
anchor.style.fontSize = "1.5rem";
document.getElementById("botoes_div").appendChild(anchor);




}

function copiarTextoSomente() {

var isTituloUpperCase = false;

var isTitutloFirstLettersUppercase = false;

var isTituloUpperCase = false;

var isTitutloFirstLettersUppercase = false;


var isIndicacoesHeaderUpperCase = false;

var isIndicacoesHeaderFirstLettersUppercase = false;

var isTecnicaHeaderUpperCase = false;

var isTecnicaHeaderFirstLettersUppercase = false;

var isRelatorioHeaderUpperCase = false;

var isRelatorioHeaderFirstLettersUppercase = false;

var isConclusaoHeaderUpperCase = false;

var isConclusaoHeaderFirstLettersUppercase = false;


var isInformacoesAdicionaisUpperCase = false;

var isInformacoesAdicionaisFirstLettersUppercase = false;




if(document.getElementById("titulo") != null) {
if(document.getElementById("titulo").style.textTransform == "uppercase") {
        isTituloUpperCase = true;

    }
    }
if(document.getElementById("titulo") != null) {
    if(document.getElementById("titulo").style.textTransform == "capitalize") {
        isTitutloFirstLettersUppercase = true;

    }
}
if(document.getElementById("indicacoes_header") != null) {
    if(document.getElementById("indicacoes_header").style.textTransform == "uppercase") {
        isIndicacoesHeaderUpperCase = true;

    }
}
if(document.getElementById("indicacoes_header") != null) {
    if(document.getElementById("indicacoes_header").style.textTransform == "capitalize") {
        isIndicacoesHeaderFirstLettersUppercase = true;

    }
}
if(document.getElementById("tecnica_header") != null) {
    if(document.getElementById("tecnica_header").style.textTransform == "uppercase") {
        isTecnicaHeaderUpperCase = true;

    }
}
if(document.getElementById("tecnica_header") != null) {
    if(document.getElementById("tecnica_header").style.textTransform == "capitalize") {
        isTecnicaHeaderFirstLettersUppercase = true;

    }
}
if(document.getElementById("relatorio_header") != null) {
      if(document.getElementById("relatorio_header").style.textTransform == "uppercase") {
        isRelatorioHeaderUpperCase = true;

    }
}
if(document.getElementById("relatorio_header") != null) {
    if(document.getElementById("relatorio_header").style.textTransform == "capitalize") {
        isRelatorioHeaderFirstLettersUppercase = true;

    }
}
if(document.getElementById("conclusao_header") != null) {
          if(document.getElementById("conclusao_header").style.textTransform == "uppercase") {
        isConclusaoHeaderUpperCase = true;

    }
}
if(document.getElementById("conclusao_header") != null) {
    if(document.getElementById("conclusao_header").style.textTransform == "capitalize") {
        isConclusaoHeaderFirstLettersUppercase = true;

    }
    }
if(document.getElementById("info_adicional") != null) {
              if(document.getElementById("info_adicional").style.textTransform == "uppercase") {
        isInformacoesAdicionaisUpperCase = true;

    }
}
if(document.getElementById("info_adicional") != null) {
    if(document.getElementById("info_adicional").style.textTransform == "capitalize") {
        isInformacoesAdicionaisFirstLettersUppercase = true;

    }
}



tinymce.remove();


if(isTituloUpperCase) {
        document.getElementById("titulo").innerHTML = document.getElementById("titulo").innerHTML.toUpperCase();

}

 if(isTitutloFirstLettersUppercase) {
        document.getElementById("titulo").innerHTML = titleCase(document.getElementById("titulo").innerHTML);

    }

if(document.getElementById("indicacoes_header") != null) {
    if(isIndicacoesHeaderUpperCase) {
        document.getElementById("indicacoes_header").innerHTML = document.getElementById("indicacoes_header").innerHTML.toUpperCase();

}
}
    if(document.getElementById("indicacoes_header") != null) {
 if(isIndicacoesHeaderFirstLettersUppercase) {
        document.getElementById("indicacoes_header").innerHTML = titleCase(document.getElementById("indicacoes_header").innerHTML);

    }
}
        if(isTecnicaHeaderUpperCase) {
        document.getElementById("tecnica_header").innerHTML = document.getElementById("tecnica_header").innerHTML.toUpperCase();

}

 if(isTecnicaHeaderFirstLettersUppercase) {
        document.getElementById("tecnica_header").innerHTML = titleCase(document.getElementById("tecnica_header").innerHTML);

    }

            if(isRelatorioHeaderUpperCase) {
        document.getElementById("relatorio_header").innerHTML = document.getElementById("relatorio_header").innerHTML.toUpperCase();

}

 if(isRelatorioHeaderFirstLettersUppercase) {
        document.getElementById("relatorio_header").innerHTML = titleCase(document.getElementById("relatorio_header").innerHTML);

    }

                if(isConclusaoHeaderUpperCase) {
        document.getElementById("conclusao_header").innerHTML = document.getElementById("conclusao_header").innerHTML.toUpperCase();

}

 if(isConclusaoHeaderFirstLettersUppercase) {
        document.getElementById("conclusao_header").innerHTML = titleCase(document.getElementById("conclusao_header").innerHTML);

    }


                    if(isInformacoesAdicionaisUpperCase) {
        document.getElementById("info_adicional").innerHTML = document.getElementById("info_adicional").innerHTML.toUpperCase();

}

 if(isInformacoesAdicionaisFirstLettersUppercase) {
        document.getElementById("info_adicional").innerHTML = titleCase(document.getElementById("info_adicional").innerHTML);

    }



    var mascaradiv = document.getElementById("mascara_div");
    var par = document.createElement("p");
    var par1 = document.createElement("p");
    var par2 = document.createElement("p");
    var par3 = document.createElement("p");
    var par4 = document.createElement("p");
    var par5 = document.createElement("p");
    var par6 = document.createElement("p");
    var par7 = document.createElement("p");
    par.innerHTML = "XXXXXXXXXX";
        par1.innerHTML = "XXXXXXXXXX";
    par2.innerHTML = "XXXXXXXXXX";
        par3.innerHTML = "XXXXXXXXXX";
        par4.innerHTML = "XXXXXXXXXX";
        par5.innerHTML = "XXXXXXXXXX";
        par6.innerHTML = "XXXXXXXXXX";
        par7.innerHTML = "XXXXXXXXXX";


                 mascaradiv.insertBefore(par1, document.getElementById("indicacoes_header"));
                 mascaradiv.insertBefore(par4, document.getElementById("indicacoes"));
         mascaradiv.insertBefore(par2, document.getElementById("tecnica_header"));
         mascaradiv.insertBefore(par5, document.getElementById("tecnica"));
                  mascaradiv.insertBefore(par, document.getElementById("relatorio_header"));

                  if(mascara_topicos == "True") {
                  mascaradiv.insertBefore(par6, document.getElementById("topicos_div"));

                  }

                  mascaradiv.insertBefore(par3, document.getElementById("conclusao_header"));
                                    mascaradiv.insertBefore(par7, document.getElementById("paragrafo_conclusao"));







if(mascara_topicos == "True") {
    var topicosDiv = document.getElementById("topicos_div");
    var children = topicosDiv.children;
    for(child of children) {
        if(child.tagName == "STRONG") {

            var paragrafodiv = document.getElementById(child.id.substr(1));
            paragrafodiv.innerHTML = paragrafodiv.innerHTML.replaceAll("<br>", "espacinhos");

            paragrafodiv.innerHTML = child.innerHTML + paragrafodiv.innerHTML;
            child.remove();
        }
    }


} else {
        var topicosDiv = document.getElementById("topicos_div");
         var children = topicosDiv.children;
    for(child of children) {
        if(child.getAttribute("class") == "paragrafo_mascara") {
            child.innerHTML = child.innerHTML.replaceAll("<br>", "espacinhos");
        }
    }

}





document.getElementById("paragrafo_conclusao").innerHTML = document.getElementById("paragrafo_conclusao").innerHTML.replaceAll("<br>", "espacetos");

removerBotoes();


    limparTagsHtmlTotal();
    document.getElementById("mascara_div").innerHTML = document.getElementById("mascara_div").innerHTML.replace(/<[^>]*>/g, '');;

    document.getElementById("mascara_div").innerHTML = document.getElementById("mascara_div").innerHTML.replace(/^\s*$(?:\r\n?|\n)/gm, "");
    if(mascara_topicos) {
    document.getElementById("mascara_div").innerHTML = document.getElementById("mascara_div").innerHTML.replaceAll("espacoembranco", "<br>");
    } else {
        document.getElementById("mascara_div").innerHTML = document.getElementById("mascara_div").innerHTML.replace(/\n/g, "<br>");;

    document.getElementById("mascara_div").innerHTML = document.getElementById("mascara_div").innerHTML.replaceAll("espacoembranco", "");


    }
document.getElementById("mascara_div").innerHTML = document.getElementById("mascara_div").innerHTML.replaceAll("TOPICOPARAREMOCAO", "");

document.getElementById("mascara_div").innerHTML = document.getElementById("mascara_div").innerHTML.replaceAll("espacetos", "<br>");
document.getElementById("mascara_div").innerHTML = document.getElementById("mascara_div").innerHTML.replaceAll("espacinhos", "<br>");

if(mascara_topicos == "True") {
document.getElementById("mascara_div").innerHTML = document.getElementById("mascara_div").innerHTML.replaceAll("XXXXXXXXXX", "<br>");
document.getElementById("mascara_div").innerHTML = document.getElementById("mascara_div").innerHTML.replaceAll("&nbsp;", "");


} else {
document.getElementById("mascara_div").innerHTML = document.getElementById("mascara_div").innerHTML.replaceAll("XXXXXXXXXX", "");
document.getElementById("mascara_div").style.whiteSpace = "pre-wrap";

}


document.getElementById("mascara_div").innerHTML = document.getElementById("mascara_div").innerHTML.replace("Preencher Variáveis<br>", "");
        CopyToClipboard();

document.getElementById("copiar_laudo").parentNode.removeChild(document.getElementById("copiar_laudo"));
var anchor = document.getElementById("link_voltar");
anchor.setAttribute("href", "../../mascaras");
anchor.setAttribute("id", "link_voltar");


    if(document.referrer.split("/").reverse()[0] == "comunidade" || document.referrer == window.location.protocol + "//" + window.location.hostname + "/") {
        anchor.setAttribute("href", "javascript:history.back()");
    }

anchor.innerHTML = "Novo exame";
anchor.style.fontSize = "1.5rem";
document.getElementById("botoes_div").appendChild(anchor);


}




function removerBotoes() {
$('#copiar_laudo').tooltip('dispose');
$('#copiar_html').tooltip('dispose');
$('#copiar_texto').tooltip('dispose');
    document.getElementById("copiar_laudo").style.display = "none";
        document.getElementById("copiar_html").style.display = "none";
    document.getElementById("copiar_texto").style.display = "none";


}


function trocarCabecalhos() {
        var ultimoElemento = document.getElementById("conclusao_header");
        var branco = document.createElement("BR");
        ultimoElemento.parentNode.insertBefore(branco, ultimoElemento);


    var divs = document.getElementsByTagName("div");
    var counter = divs.length;
    for(div of divs) {
        if(div.innerHTML != "") {
        if(div.getAttribute("class") == "paragrafo_mascara") {

        var mypar = document.createElement("span");
        if(mascara_topicos == "True") {
        mypar.innerHTML = div.innerHTML;
        } else {
                mypar.innerHTML = div.innerHTML + "<br>";

        }
        div.parentNode.insertBefore(mypar, div.nextSibling);
        div.setAttribute("class", "aserremovido");


        }
        }
    }



    var ele= document.getElementsByClassName("aserremovido");
len = ele.length;
if(len > 0) {
parentNode = ele[0].parentNode;
for(var i=0; i<len; i++)
{
  ele[0].remove();
}
}


    var ps = document.getElementsByTagName("p");
    for(p of ps) {



        if(p.getAttribute("id") == "titulo") {
            var h2 = document.createElement("STRONG");
            h2.innerHTML = p.innerHTML + "<br><br>";

            p.parentNode.replaceChild(h2, p);
        }
        for(p of ps) {

         if(p.getAttribute("id") == "indicacoes_header") {
            var h2 = document.createElement("STRONG");
            h2.innerHTML = p.innerHTML + "<br>";
                        h2.style.marginTop = "1rem";

            p.parentNode.replaceChild(h2, p);
        }
        }

          for(p of ps) {
        if(p.getAttribute("id") == "indicacoes") {
            var h2 = document.createElement("span");
            h2.innerHTML = p.innerHTML + "<br><br>";
                        h2.style.marginTop = "1rem";

            p.parentNode.replaceChild(h2, p);
        }
        }


        for(p of ps) {
        if(p.getAttribute("id") == "tecnica_header") {
            var h2 = document.createElement("STRONG");
            h2.innerHTML = p.innerHTML + "<br>";
                        h2.style.marginTop = "1rem";

            p.parentNode.replaceChild(h2, p);
        }
        }


         for(p of ps) {
        if(p.getAttribute("id") == "tecnica") {
            var h2 = document.createElement("span");
            h2.innerHTML = p.innerHTML + "<br><br>";
                        h2.style.marginTop = "1rem";

            p.parentNode.replaceChild(h2, p);
        }
        }



        for(p of ps) {
        if(p.getAttribute("id") == "relatorio_header") {
            var h2 = document.createElement("STRONG");
            h2.innerHTML = p.innerHTML + "<br>";
                        h2.style.marginTop = "1rem";

            p.parentNode.replaceChild(h2, p);
        }
        }

        for(p of ps) {
        if(p.getAttribute("id") == "conclusao_header") {
            var h2 = document.createElement("STRONG");
            h2.innerHTML = p.innerHTML + "<br>";
            h2.style.marginTop = "1rem";

            p.parentNode.replaceChild(h2, p);
        }
        }


         for(p of ps) {
        if(p.getAttribute("id") == "paragrafo_conclusao") {
            var h2 = document.createElement("span");
            h2.innerHTML = p.innerHTML + "<br>";
                        h2.style.marginTop = "1rem";

            p.parentNode.replaceChild(h2, p);
        }
        }





    }


    var h3s = document.getElementsByTagName("STRONG");

   var counter = 0;
   var counter2 = 0;
   var fim = false;
   var primeiroTopico;

    for(h3 of h3s) {

        counter++;
        counter2++;
        if(h3.getAttribute("id") != null && fim != true) {
            primeiroTopico = counter2;
            fim = true;
        }

        if(counter > 1 && counter != primeiroTopico) {
        var par = document.createElement("p");
        par.innerHTML = "espacoembranco";
        h3.parentNode.insertBefore(par, h3);
        }


    }




}



function limparTagsHtmlTotal() {
if(mascara_topicos == "True") {
var topicosVisiveis = document.getElementById("topicos_div").children;
var ultimoTopicoVisivel;

for(topico of topicosVisiveis) {
    if(topico.style.display == "inline") {
    ultimoTopicoVisivel = topico;
    }
}

var br = document.createElement("br");

ultimoTopicoVisivel.parentNode.insertBefore(br, ultimoTopicoVisivel.nextSibling);



}



var outerstrongs = document.getElementById("topicos_div").children;
for(outerstrong of outerstrongs) {


    if(outerstrong.style.display == "none") {
                outerstrong.innerHTML = "TOPICOPARAREMOCAO";

    }


}
document.getElementById("mascara_div").innerHTML = document.getElementById("mascara_div").innerHTML.replaceAll("TOPICOPARAREMOCAO", "");


trocarCabecalhos();

    if(document.getElementById("topicos_div") != null) {

       while (document.getElementById("topicos_div").firstChild) {
    document.getElementById("topicos_div").parentNode.insertBefore(document.getElementById("topicos_div").firstChild,
                                            document.getElementById("topicos_div"));
}

document.getElementById("topicos_div").parentNode.removeChild(document.getElementById("topicos_div"));
}

    var tables = document.getElementsByTagName("table");
    var tbodys = document.getElementsByTagName("tbody");
    var trs = document.getElementsByTagName("tr");
    var tds = document.getElementsByTagName("td");


    var uls = document.getElementsByTagName("ul");
for(ul of uls) {

    if(ul.id != "barra_navegacao") {
    ul.removeAttribute("class");
        ul.removeAttribute("id");
        ul.removeAttribute("data-mce-style");
        ul.removeAttribute("style");


    }
}



    for(table of tables) {
        table.removeAttribute("class");
        table.removeAttribute("id");
        table.removeAttribute("data-mce-style");
        table.removeAttribute("style");
    }
        for(tbody of tbodys) {
        tbody.removeAttribute("class");
        tbody.removeAttribute("id");
        tbody.removeAttribute("data-mce-style");
        tbody.removeAttribute("style");
    }

            for(tr of trs) {
        tr.removeAttribute("class");
        tr.removeAttribute("id");
        tr.removeAttribute("data-mce-style");
        tr.removeAttribute("style");
    }
                for(td of tds) {
        td.removeAttribute("class");
        td.removeAttribute("id");
        td.removeAttribute("data-mce-style");
        td.removeAttribute("style");
    }




    if(mascara_topicos == "True") {
        var ps = document.getElementsByTagName("p");

    } else {
    var ps = document.getElementsByTagName("p");
    }

    var divs = document.getElementsByTagName("div");
    for(div of divs) {
        if(div.getAttribute("class") == "paragrafo_mascara") {
            div.removeAttribute("class");
        div.removeAttribute("id");
        div.removeAttribute("data-mce-style");
        div.removeAttribute("style");
        }
    }


        var divs2 = document.getElementsByTagName("div");
    for(div2 of divs2) {
        if(div2.getAttribute("class") == "outerstrong") {
            div2.removeAttribute("class");
        div2.removeAttribute("id");
        div2.removeAttribute("data-mce-style");
        div2.removeAttribute("style");
        }
    }

    document.getElementById("mascara_div").innerHTML = document.getElementById("mascara_div").innerHTML.replaceAll("<div>", "");
        document.getElementById("mascara_div").innerHTML = document.getElementById("mascara_div").innerHTML.replaceAll("</div>", "");
        document.getElementById("mascara_div").innerHTML = document.getElementById("mascara_div").innerHTML.replaceAll("<br><br><br>", "<br><br>");
                document.getElementById("mascara_div").innerHTML = document.getElementById("mascara_div").innerHTML.replaceAll("</ul><br>", "</ul>");



    for(p of ps) {
        p.removeAttribute("class");
        p.removeAttribute("id");
        p.removeAttribute("data-mce-style");
        p.removeAttribute("style");



    }

    $("p:empty").remove();
    $("div:empty").remove();




}

function limparDivsVazios() {
        var divs = document.getElementsByTagName("div");
        var counter = divs.length;

    for(var i = divs.length -1; i >= 0; i--) {
        if(divs[i].getAttribute("class") == "paragrafo_mascara" && divs[i].innerHTML == " ") {
            divs[i].remove();


        }
    }

}


function limparTagsHtmlParcial() {


if(mascara_topicos == false) {
    if(document.getElementById("topicos_div") != null) {

       while (document.getElementById("topicos_div").firstChild) {
    document.getElementById("topicos_div").parentNode.insertBefore(document.getElementById("topicos_div").firstChild,
                                            document.getElementById("topicos_div"));
}

document.getElementById("topicos_div").parentNode.removeChild(document.getElementById("topicos_div"));
}
}


    var strongs = document.getElementsByTagName("strong");

    for(strong of strongs) {

        strong.removeAttribute("id");


        }


    var ps = document.getElementsByTagName("p");
    var divs = document.getElementsByTagName("div");
    for(div of divs) {
        if(div.getAttribute("class") == "paragrafo_mascara") {
            div.removeAttribute("class");
        div.removeAttribute("id");
        if(div.innerHTML == " ") {
            div.style.display = "none";
        }

        }
    }

    for(p of ps) {
        p.removeAttribute("class");
        p.removeAttribute("contenteditable");
        p.removeAttribute("id");
        if(p.innerHTML == " ") {
            p.style.display = "none";
        }
    }
    $("p:empty").remove()
    $("div:empty").remove()



}

function copiarRelatorio() {


   var containerid = document.getElementsByName("alterado")[0];

      if (document.selection) {
        var range = document.body.createTextRange();
        range.moveToElementText(document.getElementById(containerid));
        range.select().createTextRange();
        document.execCommand("copy");
      } else if (window.getSelection) {
        selection = window.getSelection();
        var range = document.createRange();
        range.selectNode(containerid);
        selection.removeAllRanges();          // Remove all ranges from the selection.
        window.getSelection().addRange(range);
        document.execCommand("copy");
      }

}

function copiarConclusao() {
   var containerid = "paragrafo_conclusao";

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

function copiarRelatorioConclusao() {

    document.getElementById("editar_laudo").onclick = "";
    document.getElementById("copiar_laudo").onclick = "";
        document.getElementById("copiar_tudo").onclick = "";



   var containerid = document.getElementsByName("alterado")[0];

   var conclusao = document.getElementById("paragrafo_conclusao").innerHTML;


   containerid.innerHTML = containerid.innerHTML + "<br><br>" + conclusao;

    document.getElementById("relatorio_simples").style.display = "none";
        document.getElementById("conclusao_simples").style.display = "none";
    document.getElementById("paragrafo_conclusao").style.display = "none";


      if (document.selection) {
        var range = document.body.createTextRange();
        range.moveToElementText(document.getElementById(containerid));
        range.select().createTextRange();
        document.execCommand("copy");
      } else if (window.getSelection) {
        selection = window.getSelection();
        var range = document.createRange();
        range.selectNode(containerid);
        selection.removeAllRanges();          // Remove all ranges from the selection.
        window.getSelection().addRange(range);
        document.execCommand("copy");
      }
}

function procurarAlteracoes() {

    var id = "procurarFrases";
// Declare variables
  var input, filter, li, i, txtValue;
  input = document.getElementById(id);
  filter = input.value.toUpperCase();
  li = document.getElementsByClassName('link_alteracao');

  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < li.length; i++) {
    txtValue = li[i].innerText;
    if (txtValue.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase().indexOf(filter.normalize("NFD").replace(/[\u0300-\u036f]/g, "")) > -1) {
      li[i].parentNode.parentNode.parentNode.style.display = "block";
    } else {
      li[i].parentNode.parentNode.parentNode.style.display = "none";
    }
    if(li[i].innerHTML == "Reverter") {
      li[i].parentNode.parentNode.parentNode.style.display = "none";

    }
  }
}

function clicouBotaozinho(id) {




    document.getElementById("procurarFrases").value = "";

    document.getElementById(id).style.background = "#c96100";


    var botoes = document.getElementById("botoezinhos_div").children;

    for(botao of botoes) {
        if(botao.id != id) {
            botao.style = "";
        }
    }


    var botoesDiagnosticos = document.getElementsByClassName("botao_diagnostico");

    for(botao of botoesDiagnosticos) {
        if(botao.name == id.substring(1)) {
            botao.parentNode.parentNode.parentNode.style.display = "block";
        } else {
                        botao.parentNode.parentNode.parentNode.style.display = "none";

        }
    }

    var topicosNenhum = [];

        var normaisJSONObject = JSON.parse(normaisusuario);
        for(i=0; i < normaisJSONObject.length; i++) {
            if(normaisJSONObject[i].fields.orgao == "Nenhum órgão") {
                topicosNenhum.push(normaisJSONObject[i].pk);
            }
        }



    if(id == "outras") {
         for(botao of botoesDiagnosticos) {
            if(topicosNenhum.includes(parseInt(botao.name))) {
                botao.parentNode.parentNode.parentNode.style.display = "block";
            } else {
                            botao.parentNode.parentNode.parentNode.style.display = "none";

            }
        }
    }

     if(id == "todas") {
         for(botao of botoesDiagnosticos) {
                botao.parentNode.parentNode.parentNode.style.display = "block";

        }
    }


var bots = document.getElementsByClassName("botao_diagnostico");

for(bot of bots) {
    if(bot.innerHTML == "Reverter") {
          bot.parentNode.parentNode.parentNode.style.display = "none";

    }
}

}

function clicouBotaoAdicionarAlteracao() {
    document.getElementById("todas").click();
}

function GetSpellBtn() {
        window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || null;

        //caso não suporte esta API DE VOZ
        if (window.SpeechRecognition === null) {
            alert("O recurso para reconhecimento de voz somente está disponível para o navegador Google Chrome versão 25 ou superior");
        }else {
            var node = document.querySelector('[title="Ditar no microfone"]');

            if(node.firstChild.firstChild.getAttribute("src") == tinymce.baseURL.replace("tinymce/js/tinymce", "images/microfonevermelho.png")) {

                node.innerHTML = '<span class="tox-tbtn__select-label"><image src=' + tinymce.baseURL.replace("tinymce/js/tinymce", "images/microfone.png") + ' style="height: 20px;width: 20px;"/ ></span>';
            } else {
                node.innerHTML = '<span class="tox-tbtn__select-label"><image src=' + tinymce.baseURL.replace("tinymce/js/tinymce", "images/microfonevermelho.png") + ' style="height: 20px;width: 20px;"/ ></span>';

            }
            toggleStartStop();
        }






	}


function reverterIndicacoes() {
var indicacoes = document.getElementById("indicacoesEscondida").innerHTML.split(",");
    var indicacoesDiv = document.getElementById("indicacoes");
    var select = document.createElement("select");
    select.setAttribute("id", "lista_indicacoes");
    select.setAttribute("onchange", "setarIndicacao()");
    for(indicacao of indicacoes) {
        var option = document.createElement("option");
        option.innerHTML = indicacao;
        select.appendChild(option);
    }

    indicacoesDiv.innerHTML = "";
            indicacoesDiv.setAttribute("contentEditable", "false");

            if(indicacoesDiv.style.display == "none") {
                indicacoesDiv.style.display = "block";
                document.getElementById("indicacoes_header").style.display = "block";
            }


        indicacoesDiv.appendChild(select);
            document.getElementById("cancelarIndicacoes").style.display = "none";

}

function configurarBotoezinhosJames() {
if(document.getElementById("botoezinhos_div") != null) {
    var children = document.getElementById("botoezinhos_div").children;
    for(child of children) {
        child.style.display = "inline";
        child.innerHTML = child.innerText.replaceAll('&nbsp;','');
                child.innerHTML = child.innerText.replaceAll('\u2022','').trim();


    }
    }

    if(document.getElementById("exames") != null) {
     var children = document.getElementById("exames").children;
    for(child of children) {
        child.style.display = "inline";
        child.innerHTML = child.innerText.replaceAll('&nbsp;','');
                child.innerHTML = child.innerText.replaceAll('\u2022','').trim();


    }
}
}


function setCaret() {
    if(document.getElementById("indicacoes").firstChild.id != "lista_indicacoes") {
    var el = document.getElementById("indicacoes")
    var range = document.createRange()
    var sel = window.getSelection()

    range.setStart(el.childNodes[0], document.getElementById("indicacoes").innerText.length - 1)
    range.collapse(true)

    sel.removeAllRanges()
    sel.addRange(range)
    }
}