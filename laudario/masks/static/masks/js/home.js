function devolverUsuarioMascara(mascaraId) {

        var mascarasJsonObject = JSON.parse(mascarasJson);
        var normaisObject = JSON.parse(normais);
        var usuariosObject = JSON.parse(usuarios2);

        var profilesObject = JSON.parse(profiles);

        var topicoNormalId;
        var mascaraId;

        var usuarioId;

        var usuarioResponsavel;





         for(u=0; u < mascarasJsonObject.length; u++) {
            if(mascarasJsonObject[u].pk == mascaraId) {
                usuarioId = mascarasJsonObject[u].fields.usuario;
            }
        }

        for(u=0; u < usuariosObject.length; u++) {
            if(usuariosObject[u].pk == usuarioId) {
                usuarioResponsavel = usuariosObject[u].fields.username;
            }

        }

        return usuarioResponsavel;

}




function devolverUsuarioAlteracaoInt(alteracaoid) {

        var mascarasJsonObject = JSON.parse(mascarasJson);
        var alteradosJSONObject = JSON.parse(alterados);
        var normaisObject = JSON.parse(normais);
        var usuariosObject = JSON.parse(usuarios2);

        var profilesObject = JSON.parse(profiles);

        var topicoNormalId;
        var mascaraId;

        var usuarioId;

        var usuarioResponsavel;

        for(u=0; u < alteradosJSONObject.length; u++) {
            if(alteradosJSONObject[u].pk == alteracaoid) {
                topicoNormalId = alteradosJSONObject[u].fields.topico_normal;
            }
        }

         for(u=0; u < normaisObject.length; u++) {
            if(normaisObject[u].pk == topicoNormalId) {
                mascaraId = normaisObject[u].fields.mascara;
            }
        }

         for(u=0; u < mascarasJsonObject.length; u++) {
            if(mascarasJsonObject[u].pk == mascaraId) {
                usuarioId = mascarasJsonObject[u].fields.usuario;
            }
        }

        for(u=0; u < usuariosObject.length; u++) {
            if(usuariosObject[u].pk == usuarioId) {
                usuarioResponsavel = usuariosObject[u].pk;
            }

        }

        return usuarioResponsavel;


}



function devolverUsuarioAlteracao(alteracaoid) {

        var mascarasJsonObject = JSON.parse(mascarasJson);
        var alteradosJSONObject = JSON.parse(alterados);
        var normaisObject = JSON.parse(normais);
        var usuariosObject = JSON.parse(usuarios2);

        var profilesObject = JSON.parse(profiles);

        var topicoNormalId;
        var mascaraId;

        var usuarioId;

        var usuarioResponsavel;

        for(u=0; u < alteradosJSONObject.length; u++) {
            if(alteradosJSONObject[u].pk == alteracaoid) {
                topicoNormalId = alteradosJSONObject[u].fields.topico_normal;
            }
        }

         for(u=0; u < normaisObject.length; u++) {
            if(normaisObject[u].pk == topicoNormalId) {
                mascaraId = normaisObject[u].fields.mascara;
            }
        }

         for(u=0; u < mascarasJsonObject.length; u++) {
            if(mascarasJsonObject[u].pk == mascaraId) {
                usuarioId = mascarasJsonObject[u].fields.usuario;
            }
        }

        for(u=0; u < usuariosObject.length; u++) {
            if(usuariosObject[u].pk == usuarioId) {
                usuarioResponsavel = usuariosObject[u].fields.username;
            }

        }

        return usuarioResponsavel;


}


function clicouBotaoRadio() {

    if(document.getElementById("frasesRadio").checked) {
        document.getElementById("procurarFrases").setAttribute("placeholder", "Procurar frases");

    } else {
        document.getElementById("procurarFrases").setAttribute("placeholder", "Procurar máscaras");

    }
    var especialidadeid = document.getElementById("especialidadeHidden").value;
    var exameid = document.getElementById("exameHidden").value;
    clicouAba(especialidadeid, exameid);
    if(document.getElementById("procurarFrases").value == "") {

    } else {
        procurarEntradas("procurarFrases");

    }

    document.getElementById("clicouBotaoRadio").value = 1;

}

function procurarEntradasAdaptado() {

    var id = "procurarFrases";
  // Declare variables
  var input, filter, li, i, txtValue;
  input = document.getElementById(id);
  filter = input.value.toUpperCase();
  li = document.getElementsByClassName('nome_entrada');


  setCookie("procura", input.value, 12);


  var counter = 0;

  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < li.length; i++) {
    txtValue = li[i].innerHTML;
    if (txtValue.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase().indexOf(filter.normalize("NFD").replace(/[\u0300-\u036f]/g, "")) > -1 && counter < 5) {
      li[i].parentNode.style.display = "block";
      counter++;
    } else {
      li[i].parentNode.style.display = "none";
    }

  }




}



//Execute after page loads
document.addEventListener('DOMContentLoaded', function() {



    if(getCookie("exameid") != null && document.getElementById("collapse" + getCookie("exameid")) != null)  {
        document.getElementById("collapse" + getCookie("exameid")).setAttribute("class", "collapse show");
        document.getElementById("exameHidden").value = getCookie("exameid");
        document.getElementById("especialidadeHidden").value = getCookie("especialidadeid");
        if(getCookie("mascarasRadioChecked") != null &&  getCookie("mascarasRadioChecked") != "" && getCookie("mascarasRadioChecked") == "true") {
            document.getElementById("mascarasRadio").checked = true;
        } else {
            document.getElementById("mascarasRadio").checked = false;

        }

        if(getCookie("frasesRadioChecked") != null &&  getCookie("frasesRadioChecked") != "" && getCookie("frasesRadioChecked") == "true") {
            document.getElementById("frasesRadio").checked = true;
        } else {
            document.getElementById("frasesRadio").checked = false;

        }


        if(getCookie("popularRadioChecked") != null &&  getCookie("popularRadioChecked") != "" && getCookie("popularRadioChecked") == "true") {
            document.getElementById("popularRadio").checked = true;
        } else {
            document.getElementById("popularRadio").checked = false;

        }

        if(getCookie("alfabeticoRadioChecked") != null &&  getCookie("alfabeticoRadioChecked") != "" && getCookie("alfabeticoRadioChecked") == "true") {
            document.getElementById("alfabeticoRadio").checked = true;
        } else {
            document.getElementById("alfabeticoRadio").checked = false;

        }


        if(document.getElementById("minhasRadio") != null) {
            if(getCookie("minhasRadioChecked") != null &&  getCookie("minhasRadioChecked") != "" && getCookie("minhasRadioChecked") == "true") {
                document.getElementById("minhasRadio").checked = true;
            } else {
                document.getElementById("minhasRadio").checked = false;

            }
        }
         if(getCookie("recentesRadioChecked") != null &&  getCookie("recentesRadioChecked") != "" && getCookie("recentesRadioChecked") == "true") {
            document.getElementById("recentesRadio").checked = true;
        } else {
            document.getElementById("recentesRadio").checked = false;

        }

        if(getCookie("procura") != null && getCookie("procura") != "") {
            document.getElementById("procurarFrases").value = getCookie("procura");

        }


    clicouAbaEspecial(getCookie("especialidadeid"), getCookie("exameid"));










    }

var quantos = 0;



        document.getElementById("clicouBotaoRadio").value = 1;



          if(getCookie("procurouTudo") != null && getCookie("procurouTudo") == "1") {
        procurarTudo("procurarFrases");




}

 if(isScrolledIntoView(document.getElementById("myfooter"))) {
        document.getElementById("myfooter").setAttribute("class", "fixedfooter");
     } else {
        document.getElementById("myfooter").setAttribute("class", "normalfooter");

     }

    }, false);





function procurarTudo() {

        setCookie("procurouTudo", "1", 12);


        if(document.getElementById("procurarFrases").value.length == 1) {
            alert("Digite ao menos dois caracteres para realizar uma busca geral")
        }


        if(document.getElementById("procurarFrases").value == "") {
            clicouBotaoRadio();
            setCookie("vezesClicadoMais", "0", 12);
            setCookie("procura", "", 12);


            return;
        }


        var alteradosJSONObject;
        var mascarasJsonObject;
        var normaisObject = JSON.parse(normaisAlt);
        var usuariosObject = JSON.parse(usuarios2);

        var profilesObject = JSON.parse(profiles);


        var nome;
        var relatorioAlterado;



        var mascarasValidas = [];
        var topicosNormaisValidos = [];


              mascarasJsonObject = JSON.parse(mascarasJsonTotal);
              alteradosJSONObject = JSON.parse(alteradosTotal);




        var usuarioResponsavel;


        var encontrou = false;

        if(document.getElementById("mascarasRadio").checked) {


             document.getElementById("direitadiv").innerHTML = "";
            for(i=0; i < mascarasJsonObject.length; i++) {

                if(mascarasJsonObject[i].fields.nome.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(document.getElementById("procurarFrases").value.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))) {

                    encontrou = true;
                    usuarioResponsavelInt = mascarasJsonObject[i].fields.usuario;


                    for(z=0; z < usuariosObject.length; z++) {
                        if(usuariosObject[z].pk == usuarioResponsavelInt) {
                            usuarioResponsavel = usuariosObject[z].fields.username;

                        }

                    }

                    var cor_titulo;
                    var alinhamento_titulo;
                    var tamanho_titulo;
                    var capitalizacao;

                    var cor_topicos;
                    var alinhamento_topicos;
                    var tamanho_topicos;
                    var margem_cabecalho;

                    var tamanho_fonte;
                    var fonte;
                    var cor_mascara;
                    var altura_linha;
                    var espacamento_topicos;
                    var mascara_topicos;


                    for(t=0; t < profilesObject.length; t++) {
                        if(profilesObject[t].fields.usuario == mascarasJsonObject[i].fields.usuario) {
                            cor_titulo = profilesObject[t].fields.cor_titulo;
                            alinhamento_titulo = profilesObject[t].fields.alinhamento_titulo
                            tamanho_titulo = profilesObject[t].fields.tamanho_titulo
                            capitalizacao = profilesObject[t].fields.capitalizacao

                            cor_topicos = profilesObject[t].fields.cor_topicos;
                              alinhamento_topicos = profilesObject[t].fields.alinhamento_topicos
                            tamanho_topicos = profilesObject[t].fields.tamanho_topicos
                            margem_cabecalho = profilesObject[t].fields.margem_cabecalho

                            tamanho_fonte = profilesObject[t].fields.tamanho_fonte

                            fonte = profilesObject[t].fields.fonte;
                              cor_mascara = profilesObject[t].fields.cor_mascara
                            altura_linha = profilesObject[t].fields.altura_linha
                            espacamento_topicos = profilesObject[t].fields.espacamento_topicos
                            mascara_topicos = profilesObject[t].fields.mascara_topicos



                        }

                    }

                    var tituloExame = mascarasJsonObject[i].fields.titulo;

                    var paragrafo = document.createElement("p");

                    paragrafo.setAttribute("style", "text-transform: " + capitalizacao + "; color: " + cor_titulo + "; text-align: " + alinhamento_titulo + "; font-size: " + tamanho_titulo + "; font-weight: bold;")
                    paragrafo.setAttribute("data-mce-style", "text-transform: " + capitalizacao + "; color: " + cor_titulo + "; text-align: " + alinhamento_titulo + "; font-size: " + tamanho_titulo + "; font-weight: bold;")

                    var paragrafoExame1 = document.createElement("span");
                    paragrafoExame1.setAttribute("style", "margin-left: 4px; color: gray; font-weight: bold");
                    paragrafoExame1.innerHTML = document.getElementById(mascarasJsonObject[i].fields.exame).innerText;
                    var paragrafoEspecialidade1 = document.createElement("span");
                        paragrafoEspecialidade1.setAttribute("style", "margin-left: 4px; color: gray; font-weight: bold");

                        paragrafoEspecialidade1.innerHTML = "(" + document.getElementsByName(mascarasJsonObject[i].fields.especialidade)[0].innerText + ")";


                    var paragrafoNome = document.createElement("button");
                    paragrafoNome.setAttribute("style", "color: #c96100; font-size: 1.3rem; font-weight: bold; text-decoration: none")
paragrafoNome.setAttribute("id", "b" + mascarasJsonObject[i].pk);

                  paragrafoNome.setAttribute("onclick", "clicouEntradaMascara(this.id)");

                    var frase;

                    if(mascarasJsonObject[i].fields.popularidade == 1) {
                        frase = "usuário"
                    } else {
                        frase = "usuários"
                    }




                    paragrafoNome.setAttribute("class", "nome_entrada");

                    var paragrafoTecnicaHeader = document.createElement("p");

                    paragrafoTecnicaHeader.setAttribute("style", "color: " + cor_topicos + "; text-align: " + alinhamento_topicos + "; font-size: " + tamanho_topicos + "; margin-top: " + margem_cabecalho + "; margin-bottom: 2px; font-weight: bold;")
                    paragrafoTecnicaHeader.setAttribute("data-mce-style", "color: " + cor_topicos + "; text-align: " + alinhamento_topicos + "; font-size: " + tamanho_topicos + "; margin-top: " + margem_cabecalho + "; margin-bottom: 2px; font-weight: bold;")

                    var paragrafoTecnica = document.createElement("p");

                    paragrafoTecnica.setAttribute("style", "margin-top: 0; font-size: " + tamanho_fonte + "; font-family: " + fonte + "; color: " + cor_mascara + "; line-height: " + altura_linha + "; margin-bottom: " + espacamento_topicos)
                    paragrafoTecnica.setAttribute("data-mce-style", "margin-top: 0; font-size: " + tamanho_fonte + "; font-family: " + fonte + "; color: " + cor_mascara + "; line-height: " + altura_linha + "; margin-bottom: " + espacamento_topicos)

                  var paragrafoRelatorioHeader = document.createElement("p");

                  paragrafoRelatorioHeader.setAttribute("style", "color: " + cor_topicos + "; text-align: " + alinhamento_topicos + "; font-size: " + tamanho_topicos + "; margin-top: " + margem_cabecalho + "; margin-bottom: 2px; font-weight: bold;")
                  paragrafoRelatorioHeader.setAttribute("data-mce-style", "color: " + cor_topicos + "; text-align: " + alinhamento_topicos + "; font-size: " + tamanho_topicos + "; margin-top: " + margem_cabecalho + "; margin-bottom: 2px; font-weight: bold;")

                var paragrafoConclusaoHeader = document.createElement("p");

                paragrafoConclusaoHeader.setAttribute("style", "color: "+ cor_topicos + "; text-align: " + alinhamento_topicos + "; font-size: " + tamanho_topicos + "; margin-top: " + margem_cabecalho + "; margin-bottom: 2px; font-weight: bold;")
                paragrafoConclusaoHeader.setAttribute("data-mce-style", "color: "+ cor_topicos + "; text-align: " + alinhamento_topicos + "; font-size: " + tamanho_topicos + "; margin-top: " + margem_cabecalho + "; margin-bottom: 2px; font-weight: bold;")


                var paragrafoConclusao = document.createElement("p");

                var divEntrada = document.createElement("div");

                var divEntrada2 = document.createElement("div");

                                var divEntrada3 = document.createElement("div");

        divEntrada3.setAttribute("style", "display: inline; margin-left: 5px;");
                                divEntrada.setAttribute("style", "display: inline");

                divEntrada2.setAttribute("id", "div" + mascarasJsonObject[i].pk);
                                divEntrada2.setAttribute("style", "display: none");




                paragrafoTecnicaHeader.innerHTML = mascarasJsonObject[i].fields.tecnica_header;
                paragrafoTecnica.innerHTML = mascarasJsonObject[i].fields.tecnica;
                paragrafoRelatorioHeader.innerHTML = mascarasJsonObject[i].fields.relatorio_header;
                paragrafoConclusaoHeader.innerHTML = mascarasJsonObject[i].fields.conclusao_header;
                paragrafoConclusao.innerHTML = mascarasJsonObject[i].fields.conclusao;
                paragrafoNome.innerHTML = mascarasJsonObject[i].fields.nome + '<span style="display: none;">' + devolverUsuarioMascara(mascarasJsonObject[i].pk) + '</span>';

                    paragrafo.innerHTML = tituloExame;

                    var paragrafoUsuario = document.createElement("p");
                    paragrafoUsuario.style.fontWeight = "bold";



                    divEntrada.appendChild(paragrafoNome);
                    divEntrada.appendChild(paragrafoExame1);
                    divEntrada.appendChild(paragrafoEspecialidade1);


                  divEntrada2.appendChild(paragrafo);
                  divEntrada2.appendChild(paragrafoTecnicaHeader);
                  divEntrada2.appendChild(paragrafoTecnica);
                  divEntrada2.appendChild(paragrafoRelatorioHeader);

                  var divExterno = document.createElement("div");
                  divExterno.appendChild(divEntrada);
                                    divExterno.appendChild(divEntrada3);
                                                      divExterno.appendChild(divEntrada2);




                    document.getElementById("direitadiv").appendChild(divExterno);






                var divGeral = document.createElement("div");
                  divEntrada2.appendChild(divGeral);



                  for(y=0; y < normaisObject.length; y++) {
                        if(normaisObject[y].fields.mascara == mascarasJsonObject[i].pk) {
                            var paragrafoRelatorio = document.createElement("div");
                            if(mascara_topicos === true && normaisObject[y].fields.orgao != "Nenhum órgão") {
                                paragrafoRelatorio.innerHTML = "<strong>" + normaisObject[y].fields.orgao + ": </strong>" + normaisObject[y].fields.relatorio;
                            } else {
                                paragrafoRelatorio.innerHTML = normaisObject[y].fields.relatorio;
                            }
                            paragrafoRelatorio.setAttribute("style", "margin-top: 0; font-size: " + tamanho_fonte + "; font-family: " + fonte + "; color: " + cor_mascara + "; margin-bottom: " + espacamento_topicos + "; line-height: " + altura_linha);
                                      paragrafoRelatorio.setAttribute("data-mce-style", "margin-top: 0; font-size: " + tamanho_fonte + "; font-family: " + fonte + "; color: " + cor_mascara + "; margin-bottom: " + espacamento_topicos + "; line-height: " + altura_linha);

                              divGeral.appendChild(paragrafoRelatorio);


                        }
                    }

                  divEntrada2.appendChild(paragrafoConclusaoHeader);
                  divEntrada2.appendChild(paragrafoConclusao);

                  divEntrada2.innerHTML = substituirVariaveisMascara(divEntrada2.innerHTML, devolverUsuarioMascaraInt(mascarasJsonObject[i].pk));

                  var copiarMascara = document.createElement("button");
                  copiarMascara.innerHTML = "Copiar";
                  copiarMascara.setAttribute("id", "copy" + mascarasJsonObject[i].pk);

                  copiarMascara.setAttribute("onclick", "copiarMascaraPublica(this.id)");
                  copiarMascara.setAttribute("class", "botao_configuracao3");
divEntrada3.appendChild(copiarMascara);

                    var butao = document.createElement("button");
                    butao.setAttribute("class", "botao_configuracao3");

divEntrada3.appendChild(butao);
                  var linkMascara = document.createElement("a");
                  linkMascara.innerHTML = "Usar Máscara";
                  linkMascara.setAttribute("href", "../mascaras/" + mascarasJsonObject[i].pk);
                      linkMascara.setAttribute("style", "color: #ffffff; text-decoration: none");

                   butao.appendChild(linkMascara);


                  var divisoria = document.createElement("hr")
                  divEntrada2.appendChild(document.createElement("br"));

                  divEntrada2.appendChild(divisoria);


                }
            }


        } else {

             document.getElementById("direitadiv").innerHTML = "";



                for(i = 0; i < alteradosJSONObject.length; i++) {
                            if(alteradosJSONObject[i].fields.nome.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(document.getElementById("procurarFrases").value.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))) {
                        var alteracaoId = alteradosJSONObject[i].pk;
                        encontrou = true;

                        nome = alteradosJSONObject[i].fields.nome;

                        var relatorioSpan = document.createElement("span");
                        relatorioSpan.setAttribute("style", "font-weight: bold");
                        relatorioSpan.innerHTML = "Relatório: ";
                        var conclusaoSpan = document.createElement("span");
                        conclusaoSpan.setAttribute("style", "font-weight: bold");
                        conclusaoSpan.innerHTML = "Conclusão: ";


                        relatorioAlterado = substituirVariaveis(alteradosJSONObject[i].fields.relatorio, devolverUsuarioAlteracaoInt(alteracaoId));
                        conclusaoAlterada = substituirVariaveis(alteradosJSONObject[i].fields.conclusao, devolverUsuarioAlteracaoInt(alteracaoId));



                var linkAlteracao = document.createElement("a");
                  linkAlteracao.innerHTML = "Usar";

                  var topicoParaAlterar = alteradosJSONObject[i].fields.topico_normal;

                  var alteracaoId = alteradosJSONObject[i].pk;
                  var mascaraId;

                  var normaisObject2 = JSON.parse(normais);

            for(b=0; b < normaisObject2.length; b++) {
                if(normaisObject2[b].pk == topicoParaAlterar) {
                    mascaraId = normaisObject2[b].fields.mascara;
                }
            }



                        var paragrafo = document.createElement("p");
                        var paragrafoConclusao = document.createElement("p");
                        var paragrafoUsuarioAlt = document.createElement("p");
                        paragrafoUsuarioAlt.style.fontWeight = "bold";

                           var paragrafonome = document.createElement("button");
paragrafonome.setAttribute("id", alteracaoId);

                  paragrafonome.setAttribute("onclick", "clicouEntradaAlteracao2(this.id)");

                    paragrafonome.setAttribute("style", "color: #c96100; font-size: 1.3rem; font-weight: bold; text-decoration: none")


                     if(alteradosJSONObject[i].fields.popularidade == 1) {
                        frase = "usuário"
                    } else {
                        frase = "usuários"
                    }







                    paragrafonome.setAttribute("class", "nome_entrada");


                     var especiadidadeInt;
                    var exameInt;

                    var mascarasJsonObject2 = JSON.parse(mascarasJsonPopulares);

                    for(p=0; p < mascarasJsonObject2.length; p++) {
                        if(mascarasJsonObject2[p].pk == mascaraId) {

                            especiadidadeInt = mascarasJsonObject2[p].fields.especialidade;
                            exameInt = mascarasJsonObject2[p].fields.exame;
                        }
                    }

                    var paragrafoEspecialidade2 = document.createElement("span");
                        paragrafoEspecialidade2.innerHTML = "(" + document.getElementsByName(especiadidadeInt)[0].innerText + ")";
                    paragrafoEspecialidade2.setAttribute("style", "margin-left: 4px; color: gray; font-weight: bold");


                     var paragrafoExame2 = document.createElement("span");
                    paragrafoExame2.innerHTML = document.getElementById(exameInt).innerText;

                    paragrafoExame2.setAttribute("style", "margin-left: 4px; color: gray; font-weight: bold");



                    var paragrafoNome = document.createElement("a");
                    paragrafoNome.setAttribute("style", "color: #c96100; font-size: 1.3rem; font-weight: bold; text-decoration: none")
                  if(mascarasJsonObject[i] != null) {
                  paragrafoNome.setAttribute("href", "../mascaras/" + mascarasJsonObject[i].pk);
                    }




                paragrafo.innerHTML = relatorioAlterado;
                 paragrafoConclusao.innerHTML = conclusaoAlterada;
                  paragrafonome.innerHTML = alteradosJSONObject[i].fields.nome;

                      var divEntrada = document.createElement("div");

                        divEntrada.setAttribute("name", topicoParaAlterar);




                    divEntrada.appendChild(paragrafonome);
                       divEntrada.appendChild(paragrafoExame2);
                                            divEntrada.appendChild(paragrafoEspecialidade2);

                                var mypar = document.createElement("p");
                                mypar.setAttribute("style", "margin-bottom: 8px;");

                                            divEntrada.appendChild(mypar);





                  divEntrada.appendChild(relatorioSpan);

                  divEntrada.appendChild(paragrafo);

                    paragrafo.setAttribute("style", "display: inline;");

                    var copiarRelatorio = document.createElement("button");
                    copiarRelatorio.setAttribute("id", "relatorio" + alteradosJSONObject[i].pk);
                    copiarRelatorio.setAttribute("onclick", "copiarEntradaPublica(this.id)");
                                              copiarRelatorio.innerHTML = "Copiar";
                                                copiarRelatorio.setAttribute("class", "botao_configuracao2");


                                                divEntrada.appendChild(copiarRelatorio);
                                                      divEntrada.appendChild(document.createElement("br"));
                  divEntrada.appendChild(conclusaoSpan);

                divEntrada.appendChild(paragrafoConclusao);
                                    paragrafoConclusao.setAttribute("style", "display: inline;");

                  var copiarConclusao = document.createElement("button");
                                      copiarConclusao.setAttribute("id", "conclusao" + alteradosJSONObject[i].pk);
                                                          copiarConclusao.setAttribute("onclick", "copiarEntradaPublica(this.id)");


                  copiarConclusao.setAttribute("class", "botao_configuracao2");
                                              copiarConclusao.innerHTML = "Copiar";

                                                divEntrada.appendChild(copiarConclusao);
                                                            divEntrada.appendChild(document.createElement("br"));



                                document.getElementById("direitadiv").appendChild(divEntrada);


        var pattern = /\{([^}]+)\}/g;
        var matches1 = paragrafo.innerHTML.match(pattern);
        var matches2 = paragrafoConclusao.innerHTML.match(pattern);

        if(matches1 != null || matches2 != null) {
            linkAlteracao.innerHTML = "&lt;Preencher variáveis&gt;";
                      linkAlteracao.setAttribute("style", "color: #c96100;")

                    linkAlteracao.setAttribute("href", "../mascaras/alteracao/" + mascaraId + "/" + topicoParaAlterar + "/" + alteracaoId);

                   divEntrada.appendChild(linkAlteracao);
        }







                  var divisoria = document.createElement("hr")

                  divEntrada.appendChild(divisoria);


                            }

                }




        }


    var regiaoProcurada;

    if(document.getElementById("mascarasRadio").checked) {
        regiaoProcurada = "máscara";
    } else {
        regiaoProcurada = "frase";
    }


    if(!encontrou) {
                 document.getElementById("direitadiv").innerHTML = 'Nenhuma ' + regiaoProcurada + ' encontrada para o termo "' + document.getElementById("procurarFrases").value + '".';
    }





}



function limparTodosBotoes() {



    var grupoEspecialidades = document.getElementsByName("grupoEspecialidades");
    for(i=0; i < grupoEspecialidades.length; i++) {
        var children = grupoEspecialidades[i].children;
        for(z=0; z < children.length; z++) {
            children[z].style.backgroundColor = "white";
        }
    }
}


function clicouAbaEspecial(especialidadeid, exameid) {



        configurarBotoesTopicos(especialidadeid,exameid);




        limparTodosBotoes();
        var todas = document.getElementsByName(especialidadeid);
        for(i=0; i < todas.length; i++) {
            if(todas[i].parentNode.parentNode.id == "collapse" + exameid) {
                todas[i].style.backgroundColor = "lightgray";
            }

        }





        //seta Cookies
        setCookie("exameid", exameid, 12);
        setCookie("especialidadeid", especialidadeid, 12);


             if(document.getElementById("mascarasRadio").checked) {
             document.getElementById("procurarFrases").setAttribute("placeholder", "Procurar máscaras")
            setCookie("mascarasRadioChecked", "true", 12);

        } else {
                     document.getElementById("procurarFrases").setAttribute("placeholder", "Procurar frases")

            setCookie("mascarasRadioChecked", "false", 12);

        }


        if(document.getElementById("frasesRadio").checked) {
            setCookie("frasesRadioChecked", "true", 12);

        } else {
            setCookie("frasesRadioChecked", "false", 12);

        }


      if(document.getElementById("popularRadio").checked) {
            setCookie("popularRadioChecked", "true", 12);

        } else {
            setCookie("popularRadioChecked", "false", 12);

        }

          if(document.getElementById("alfabeticoRadio").checked) {
            setCookie("alfabeticoRadioChecked", "true", 12);

        } else {
            setCookie("alfabeticoRadioChecked", "false", 12);

        }
            if(document.getElementById("minhasRadio") != null) {
          if(document.getElementById("minhasRadio").checked) {
            setCookie("minhasRadioChecked", "true", 12);

        } else {
            setCookie("minhasRadioChecked", "false", 12);

        }
}
           if(document.getElementById("recentesRadio").checked) {
            setCookie("recentesRadioChecked", "true", 12);

        } else {
            setCookie("recentesRadioChecked", "false", 12);

        }





        document.getElementById("especialidadeHidden").value = especialidadeid;
        document.getElementById("exameHidden").value = exameid;



        var alteradosJSONObject;
        var mascarasJsonObject;
        var normaisObject = JSON.parse(normais);
        var usuariosObject = JSON.parse(usuarios2);

        var profilesObject = JSON.parse(profiles);


        var nome;
        var relatorioAlterado;



        var mascarasValidas = [];
        var topicosNormaisValidos = [];


        if(document.getElementById("alfabeticoRadio").checked) {
              mascarasJsonObject = JSON.parse(mascarasJson);
              alteradosJSONObject = JSON.parse(alterados);

        } else if(document.getElementById("popularRadio").checked || usuarioLogado == "False") {
            if(document.getElementById("mascarasRadio").checked) {
                  mascarasJsonObject = JSON.parse(mascarasJsonPopularesAlt);
                  normaisObject = JSON.parse(normaisAlt);

            } else {
                mascarasJsonObject = JSON.parse(mascarasJsonPopulares);

            }

              alteradosJSONObject = JSON.parse(alteradosPopulares);

        } else if(document.getElementById("minhasRadio") != null && document.getElementById("minhasRadio").style.display != "none" && document.getElementById("minhasRadio").checked) {
              if(document.getElementById("minhasRadio") != null) {
              mascarasJsonObject = JSON.parse(mascarasJsonUsuario);
              alteradosJSONObject = JSON.parse(alteradosUsuario);
                }
        } else {
              alteradosJSONObject = JSON.parse(alteradosRecentes);
              mascarasJsonObject = JSON.parse(mascarasRecentes);

        }


        var usuarioResponsavel;


        if(document.getElementById("mascarasRadio").checked) {


             document.getElementById("direitadiv").innerHTML = "";
            for(i=0; i < mascarasJsonObject.length; i++) {
                if(mascarasJsonObject[i].fields.especialidade == especialidadeid && mascarasJsonObject[i].fields.exame == exameid) {
                    usuarioResponsavelInt = mascarasJsonObject[i].fields.usuario;

                    for(z=0; z < usuariosObject.length; z++) {
                        if(usuariosObject[z].pk == usuarioResponsavelInt) {
                            usuarioResponsavel = usuariosObject[z].fields.username;
                        }

                    }

                    var cor_titulo;
                    var alinhamento_titulo;
                    var tamanho_titulo;
                    var capitalizacao;

                    var cor_topicos;
                    var alinhamento_topicos;
                    var tamanho_topicos;
                    var margem_cabecalho;

                    var tamanho_fonte;
                    var fonte;
                    var cor_mascara;
                    var altura_linha;
                    var espacamento_topicos;
                    var mascara_topicos;



                    for(t=0; t < profilesObject.length; t++) {
                        if(profilesObject[t].fields.usuario == mascarasJsonObject[i].fields.usuario) {
                            cor_titulo = profilesObject[t].fields.cor_titulo;
                            alinhamento_titulo = profilesObject[t].fields.alinhamento_titulo
                            tamanho_titulo = profilesObject[t].fields.tamanho_titulo
                            capitalizacao = profilesObject[t].fields.capitalizacao

                            cor_topicos = profilesObject[t].fields.cor_topicos;
                              alinhamento_topicos = profilesObject[t].fields.alinhamento_topicos
                            tamanho_topicos = profilesObject[t].fields.tamanho_topicos
                            margem_cabecalho = profilesObject[t].fields.margem_cabecalho

                            tamanho_fonte = profilesObject[t].fields.tamanho_fonte

                            fonte = profilesObject[t].fields.fonte;
                              cor_mascara = profilesObject[t].fields.cor_mascara
                            altura_linha = profilesObject[t].fields.altura_linha
                            espacamento_topicos = profilesObject[t].fields.espacamento_topicos
                            mascara_topicos = profilesObject[t].fields.mascara_topicos



                        }

                    }

                    var tituloExame = mascarasJsonObject[i].fields.titulo;
                    var paragrafo = document.createElement("p");

                    paragrafo.setAttribute("style", "text-transform: " + capitalizacao + "; color: " + cor_titulo + "; text-align: " + alinhamento_titulo + "; font-size: " + tamanho_titulo + "; font-weight: bold;")
                    paragrafo.setAttribute("data-mce-style", "text-transform: " + capitalizacao + "; color: " + cor_titulo + "; text-align: " + alinhamento_titulo + "; font-size: " + tamanho_titulo + "; font-weight: bold;")

                    var paragrafoNome = document.createElement("button");
                    paragrafoNome.setAttribute("style", "color: #c96100; font-size: 1.3rem; font-weight: bold; text-decoration: none");

                    paragrafoNome.setAttribute("id", "b" + mascarasJsonObject[i].pk);
                                      paragrafoNome.setAttribute("onclick", "clicouEntradaMascara(this.id)");


                    var frase;

                    if(mascarasJsonObject[i].fields.popularidade == 1) {
                        frase = "usuário"
                    } else {
                        frase = "usuários"
                    }





                    paragrafoNome.setAttribute("class", "nome_entrada");

                    var paragrafoTecnicaHeader = document.createElement("p");

                    paragrafoTecnicaHeader.setAttribute("style", "color: " + cor_topicos + "; text-align: " + alinhamento_topicos + "; font-size: " + tamanho_topicos + "; margin-top: " + margem_cabecalho + "; margin-bottom: 2px; font-weight: bold;")
                    paragrafoTecnicaHeader.setAttribute("data-mce-style", "color: " + cor_topicos + "; text-align: " + alinhamento_topicos + "; font-size: " + tamanho_topicos + "; margin-top: " + margem_cabecalho + "; margin-bottom: 2px; font-weight: bold;")

                    var paragrafoTecnica = document.createElement("p");

                    paragrafoTecnica.setAttribute("style", "margin-top: 0; font-size: " + tamanho_fonte + "; font-family: " + fonte + "; color: " + cor_mascara + "; line-height: " + altura_linha + "; margin-bottom: " + espacamento_topicos)
                    paragrafoTecnica.setAttribute("data-mce-style", "margin-top: 0; font-size: " + tamanho_fonte + "; font-family: " + fonte + "; color: " + cor_mascara + "; line-height: " + altura_linha + "; margin-bottom: " + espacamento_topicos)

                  var paragrafoRelatorioHeader = document.createElement("p");

                  paragrafoRelatorioHeader.setAttribute("style", "color: " + cor_topicos + "; text-align: " + alinhamento_topicos + "; font-size: " + tamanho_topicos + "; margin-top: " + margem_cabecalho + "; margin-bottom: 2px; font-weight: bold;")
                  paragrafoRelatorioHeader.setAttribute("data-mce-style", "color: " + cor_topicos + "; text-align: " + alinhamento_topicos + "; font-size: " + tamanho_topicos + "; margin-top: " + margem_cabecalho + "; margin-bottom: 2px; font-weight: bold;")

                var paragrafoConclusaoHeader = document.createElement("p");

                paragrafoConclusaoHeader.setAttribute("style", "color: "+ cor_topicos + "; text-align: " + alinhamento_topicos + "; font-size: " + tamanho_topicos + "; margin-top: " + margem_cabecalho + "; margin-bottom: 2px; font-weight: bold;")
                paragrafoConclusaoHeader.setAttribute("data-mce-style", "color: "+ cor_topicos + "; text-align: " + alinhamento_topicos + "; font-size: " + tamanho_topicos + "; margin-top: " + margem_cabecalho + "; margin-bottom: 2px; font-weight: bold;")


                var paragrafoConclusao = document.createElement("p");

                var divEntrada = document.createElement("div");

                 var divEntrada2 = document.createElement("div");

                                var divEntrada3 = document.createElement("div");

        divEntrada3.setAttribute("style", "display: inline; margin-left: 5px;");


                divEntrada2.setAttribute("id", "div" + mascarasJsonObject[i].pk);
                                divEntrada.setAttribute("style", "display: inline");
                                                                divEntrada2.setAttribute("style", "display: none");



                paragrafoTecnicaHeader.innerHTML = mascarasJsonObject[i].fields.tecnica_header;
                paragrafoTecnica.innerHTML = mascarasJsonObject[i].fields.tecnica;
                paragrafoRelatorioHeader.innerHTML = mascarasJsonObject[i].fields.relatorio_header;
                paragrafoConclusaoHeader.innerHTML = mascarasJsonObject[i].fields.conclusao_header;
                paragrafoConclusao.innerHTML = mascarasJsonObject[i].fields.conclusao;
                paragrafoNome.innerHTML = mascarasJsonObject[i].fields.nome + '<span style="display: none;">' + devolverUsuarioMascara(mascarasJsonObject[i].pk) + '</span>';

                    paragrafo.innerHTML = tituloExame;

                    var paragrafoUsuario = document.createElement("p");
                    paragrafoUsuario.style.fontWeight = "bold";
                    divEntrada.appendChild(paragrafoNome);


                  divEntrada2.appendChild(paragrafo);
                  divEntrada2.appendChild(paragrafoTecnicaHeader);
                  divEntrada2.appendChild(paragrafoTecnica);
                  divEntrada2.appendChild(paragrafoRelatorioHeader);

                    var divExterno = document.createElement("div");
                  divExterno.appendChild(divEntrada);
                                    divExterno.appendChild(divEntrada3);
                                                      divExterno.appendChild(divEntrada2);




                    document.getElementById("direitadiv").appendChild(divExterno);




                var divGeral = document.createElement("div");
                  divEntrada2.appendChild(divGeral);



                  for(y=0; y < normaisObject.length; y++) {
                        if(normaisObject[y].fields.mascara == mascarasJsonObject[i].pk) {
                            var paragrafoRelatorio = document.createElement("div");
                            if(mascara_topicos === true && normaisObject[y].fields.orgao != "Nenhum órgão") {
                                paragrafoRelatorio.innerHTML = "<strong>" + normaisObject[y].fields.orgao + ": </strong>" + normaisObject[y].fields.relatorio;
                            } else {
                                paragrafoRelatorio.innerHTML = normaisObject[y].fields.relatorio;
                            }
                            paragrafoRelatorio.setAttribute("style", "margin-top: 0; font-size: " + tamanho_fonte + "; font-family: " + fonte + "; color: " + cor_mascara + "; margin-bottom: " + espacamento_topicos + "; line-height: " + altura_linha);
                                         paragrafoRelatorio.setAttribute("data-mce-style", "margin-top: 0; font-size: " + tamanho_fonte + "; font-family: " + fonte + "; color: " + cor_mascara + "; margin-bottom: " + espacamento_topicos + "; line-height: " + altura_linha);

                              divGeral.appendChild(paragrafoRelatorio);


                        }
                    }

                  divEntrada2.appendChild(paragrafoConclusaoHeader);
                  divEntrada2.appendChild(paragrafoConclusao);
                                    divEntrada2.innerHTML = substituirVariaveisMascara(divEntrada2.innerHTML, devolverUsuarioMascaraInt(mascarasJsonObject[i].pk));


 var copiarMascara = document.createElement("button");
                  copiarMascara.innerHTML = "Copiar";
                  copiarMascara.setAttribute("id", "copy" + mascarasJsonObject[i].pk);

                  copiarMascara.setAttribute("onclick", "copiarMascaraPublica(this.id)");
                  copiarMascara.setAttribute("class", "botao_configuracao3");
divEntrada3.appendChild(copiarMascara);

                    var butao = document.createElement("button");
                    butao.setAttribute("class", "botao_configuracao3");

divEntrada3.appendChild(butao);
                  var linkMascara = document.createElement("a");
                  linkMascara.innerHTML = "Usar Máscara";
                  linkMascara.setAttribute("href", "../mascaras/" + mascarasJsonObject[i].pk);
                      linkMascara.setAttribute("style", "color: #ffffff; text-decoration: none");

                   butao.appendChild(linkMascara);


                  var divisoria = document.createElement("hr");

                   divEntrada2.appendChild(document.createElement("br"));

                  divEntrada2.appendChild(divisoria);

                }
            }

        } else {


             document.getElementById("direitadiv").innerHTML = "";

            for(i=0; i < mascarasJsonObject.length; i++) {
                if(mascarasJsonObject[i].fields.especialidade == especialidadeid && mascarasJsonObject[i].fields.exame == exameid) {
                    mascarasValidas.push(mascarasJsonObject[i].pk);

                    usuarioResponsavelInt = mascarasJsonObject[i].fields.usuario;

                    for(z=0; z < usuariosObject.length; z++) {
                        if(usuariosObject[z].pk == usuarioResponsavelInt) {
                            usuarioResponsavel = usuariosObject[z].fields.username;
                        }

                    }

                }
            }




            for(i=0; i < normaisObject.length; i++) {
                if(mascarasValidas.includes(normaisObject[i].fields.mascara)) {
                    topicosNormaisValidos.push(normaisObject[i].pk);
                }
            }

                for(i = 0; i < alteradosJSONObject.length; i++) {
                            if(topicosNormaisValidos.includes(alteradosJSONObject[i].fields.topico_normal)) {
                        var alteracaoId = alteradosJSONObject[i].pk;
                        nome = alteradosJSONObject[i].fields.nome;


                         var relatorioSpan = document.createElement("span");
                        relatorioSpan.setAttribute("style", "font-weight: bold");
                        relatorioSpan.innerHTML = "Relatório: ";
                        var conclusaoSpan = document.createElement("span");
                        conclusaoSpan.setAttribute("style", "font-weight: bold");
                        conclusaoSpan.innerHTML = "Conclusão: ";


                        relatorioAlterado = substituirVariaveis(alteradosJSONObject[i].fields.relatorio, devolverUsuarioAlteracaoInt(alteracaoId));
                        conclusaoAlterada = substituirVariaveis(alteradosJSONObject[i].fields.conclusao, devolverUsuarioAlteracaoInt(alteracaoId));


                var linkAlteracao = document.createElement("a");
                  linkAlteracao.innerHTML = "Usar";

                  var topicoParaAlterar = alteradosJSONObject[i].fields.topico_normal;

                  var alteracaoId = alteradosJSONObject[i].pk;
                  var mascaraId;

            for(b=0; b < normaisObject.length; b++) {
                if(normaisObject[b].pk == topicoParaAlterar) {
                    mascaraId = normaisObject[b].fields.mascara;
                }
            }


             var mascarasObj = JSON.parse(mascarasJsonPopulares);
            var nomeMascara;

            for(c=0; c < mascarasObj.length; c++) {
                if(mascarasObj[c].pk == mascaraId) {
                    nomeMascara = mascarasObj[c].fields.nome;
                }
            }

                        var paragrafo = document.createElement("p");
                        var paragrafoConclusao = document.createElement("p");
                        var paragrafoUsuarioAlt = document.createElement("p");
                        paragrafoUsuarioAlt.style.fontWeight = "bold";

                          var paragrafonome = document.createElement("button");
paragrafonome.setAttribute("id", alteracaoId);

                  paragrafonome.setAttribute("onclick", "clicouEntradaAlteracao(this.id)");

                    paragrafonome.setAttribute("style", "color: #c96100; font-size: 1.3rem; font-weight: bold; text-decoration: none")


                     if(alteradosJSONObject[i].fields.popularidade == 1) {
                        frase = "usuário"
                    } else {
                        frase = "usuários"
                    }







                    paragrafonome.setAttribute("class", "nome_entrada");




                paragrafo.innerHTML = relatorioAlterado;
                 paragrafoConclusao.innerHTML = conclusaoAlterada;

               paragrafonome.innerHTML = alteradosJSONObject[i].fields.nome + '<span style="color: gray; font-size: 1.0rem;"> (' + nomeMascara + ')</span><span style="display: none;">' + devolverUsuarioAlteracao(alteracaoId) + '</span>';



                      var divEntrada = document.createElement("div");

                          divEntrada.setAttribute("name", topicoParaAlterar);


                    divEntrada.appendChild(paragrafonome);


      var mypar = document.createElement("p");
                                mypar.setAttribute("style", "margin-bottom: 8px;");

                                            divEntrada.appendChild(mypar);

                      divEntrada.appendChild(relatorioSpan);

                  divEntrada.appendChild(paragrafo);


           paragrafo.setAttribute("style", "display: inline;");

                    var copiarRelatorio = document.createElement("button");
                                              copiarRelatorio.innerHTML = "Copiar";
                                                copiarRelatorio.setAttribute("class", "botao_configuracao2");
                                                copiarRelatorio.setAttribute("id", "relatorio" + alteradosJSONObject[i].pk);
                    copiarRelatorio.setAttribute("onclick", "copiarEntradaPublica(this.id)");


                                                divEntrada.appendChild(copiarRelatorio);
                                                      divEntrada.appendChild(document.createElement("br"));
                                        divEntrada.appendChild(conclusaoSpan);

                divEntrada.appendChild(paragrafoConclusao);
                                    paragrafoConclusao.setAttribute("style", "display: inline;");

                  var copiarConclusao = document.createElement("button");
                  copiarConclusao.setAttribute("class", "botao_configuracao2");
                  copiarConclusao.setAttribute("id", "conclusao" + alteradosJSONObject[i].pk);
                    copiarConclusao.setAttribute("onclick", "copiarEntradaPublica(this.id)");
                                              copiarConclusao.innerHTML = "Copiar";

                                                divEntrada.appendChild(copiarConclusao);
                                                            divEntrada.appendChild(document.createElement("br"));



                                document.getElementById("direitadiv").appendChild(divEntrada);


        var pattern = /\{([^}]+)\}/g;
        var matches1 = paragrafo.innerHTML.match(pattern);
        var matches2 = paragrafoConclusao.innerHTML.match(pattern);

        if(matches1 != null || matches2 != null) {
            linkAlteracao.innerHTML = "&lt;Preencher variáveis&gt;";
                      linkAlteracao.setAttribute("style", "color: #c96100;")

                    linkAlteracao.setAttribute("href", "../mascaras/alteracao/" + mascaraId + "/" + topicoParaAlterar + "/" + alteracaoId);

                   divEntrada.appendChild(linkAlteracao);
        }

                  var divisoria = document.createElement("hr")

                  divEntrada.appendChild(divisoria);


                            }

                }




        }


    if(document.getElementById("procurarFrases").value == "") {

    } else {
        procurarEntradas("procurarFrases");

    }



}


function configurarBotoesTopicos(especialidadeid, exameid) {


     if(document.getElementById("mascarasRadio").checked) {

             var botoes = document.getElementById("botoezinhos_div").children;

        for(botao of botoes) {
                botao.style.display = "none";


        }

     } else {



 var mascarasJsonObject = JSON.parse(mascarasJson);
        var normaisObject = JSON.parse(normais);

        var mascarasPermitidas = [];

        var topicosPermitidos = [];

        for(mascara of mascarasJsonObject) {
            if(mascara.fields.especialidade == especialidadeid && mascara.fields.exame == exameid) {
                mascarasPermitidas.push(mascara.pk);
            }
        }

        for(normal of normaisObject) {
            if(mascarasPermitidas.includes(normal.fields.mascara) && normal.fields.orgao != "Nenhum órgão") {
                topicosPermitidos.push(normal.pk)
            }
        }



        var botoes = document.getElementById("botoezinhos_div").children;

        for(botao of botoes) {
            if(topicosPermitidos.includes(parseInt(botao.id.substring(1)))) {
                botao.style.display = "inline";
            } else {
                botao.style.display = "none";

            }
        }


     }






}

function clicouEntradaMascara(id) {
    var div = document.getElementById("div" + id.substr(1));

    if(div.style.display == "none") {
    div.setAttribute("style", "display: inline");

    } else {
    div.setAttribute("style", "display: none");

    }


}

function clicouEntradaAlteracao(id) {
    var children = document.getElementById(id).parentNode.children;
    var vazio = false;

    if(children[1].style.display == "none") {
      for(i=0; i < children.length; i++) {
    if(children[i].getAttribute("class") != "nome_entrada") {

        children[i].style.display = "inline";

    }
    children[0].style.display = "block";
        children[1].style.display = "block";
        children[children.length-1].removeAttribute("style");
                children[children.length-2].removeAttribute("style");



   }
    } else {
      for(child of children) {
    if(child.getAttribute("class") != "nome_entrada") {
        child.style.display = "none";
    }
   }
    }







}



function clicouEntradaAlteracao2(id) {
    var children = document.getElementById(id).parentNode.children;
    var vazio = false;

    if(children[1].style.display == "none") {
      for(i=0; i < children.length; i++) {
    if(children[i].getAttribute("class") != "nome_entrada") {

        children[i].style.display = "inline";

    }
    children[0].style.display = "inline";
        children[3].style.display = "block";
        children[children.length-1].removeAttribute("style");
                children[children.length-2].removeAttribute("style");



   }
    } else {
      for(child of children) {
    if(child.getAttribute("class") != "nome_entrada") {
        child.style.display = "none";
    }
   }
    }







}



function clicouAba(especialidadeid, exameid) {
        document.getElementById("myfooter").setAttribute("class", "normalfooter");




        configurarBotoesTopicos(especialidadeid,exameid);


        setCookie("vezesClicadoMais", "0", 12);
        setCookie("procurouTudo", "0", 12);

        document.getElementById("procurarFrases").value = "";
                                setCookie("procura", "", 12);



        limparTodosBotoes();
        var todas = document.getElementsByName(especialidadeid);
        for(i=0; i < todas.length; i++) {
            if(todas[i].parentNode.parentNode.id == "collapse" + exameid) {
                todas[i].style.backgroundColor = "lightgray";
            }

        }




        //seta Cookies
        setCookie("exameid", exameid, 12);
        setCookie("especialidadeid", especialidadeid, 12);


             if(document.getElementById("mascarasRadio").checked) {
            setCookie("mascarasRadioChecked", "true", 12);

        } else {
            setCookie("mascarasRadioChecked", "false", 12);

        }


        if(document.getElementById("frasesRadio").checked) {
            setCookie("frasesRadioChecked", "true", 12);

        } else {
            setCookie("frasesRadioChecked", "false", 12);

        }


      if(document.getElementById("popularRadio").checked) {
            setCookie("popularRadioChecked", "true", 12);

        } else {
            setCookie("popularRadioChecked", "false", 12);

        }

          if(document.getElementById("alfabeticoRadio").checked) {
            setCookie("alfabeticoRadioChecked", "true", 12);

        } else {
            setCookie("alfabeticoRadioChecked", "false", 12);

        }
            if(document.getElementById("minhasRadio") != null) {
          if(document.getElementById("minhasRadio").checked) {
            setCookie("minhasRadioChecked", "true", 12);

        } else {
            setCookie("minhasRadioChecked", "false", 12);

        }
}
           if(document.getElementById("recentesRadio").checked) {
            setCookie("recentesRadioChecked", "true", 12);

        } else {
            setCookie("recentesRadioChecked", "false", 12);

        }





        document.getElementById("especialidadeHidden").value = especialidadeid;
        document.getElementById("exameHidden").value = exameid;



        var alteradosJSONObject;
        var mascarasJsonObject;
        var normaisObject = JSON.parse(normais);
        var usuariosObject = JSON.parse(usuarios2);

        var profilesObject = JSON.parse(profiles);


        var nome;
        var relatorioAlterado;



        var mascarasValidas = [];
        var topicosNormaisValidos = [];


        if(document.getElementById("alfabeticoRadio").checked) {
              mascarasJsonObject = JSON.parse(mascarasJson);
              alteradosJSONObject = JSON.parse(alterados);

        } else if(document.getElementById("popularRadio").checked || usuarioLogado == "False") {
            if(document.getElementById("mascarasRadio").checked) {
                           mascarasJsonObject = JSON.parse(mascarasJsonPopularesAlt);
                           normaisObject = JSON.parse(normaisAlt);

             } else {
                           mascarasJsonObject = JSON.parse(mascarasJsonPopulares);

             }
              alteradosJSONObject = JSON.parse(alteradosPopulares);

        } else if(document.getElementById("minhasRadio") != null && document.getElementById("minhasRadio").style.display != "none" && document.getElementById("minhasRadio").checked) {
              if(document.getElementById("minhasRadio") != null) {
              mascarasJsonObject = JSON.parse(mascarasJsonUsuario);
              alteradosJSONObject = JSON.parse(alteradosUsuario);
                }
        } else {
              alteradosJSONObject = JSON.parse(alteradosRecentes);
              mascarasJsonObject = JSON.parse(mascarasRecentes);

        }


        var usuarioResponsavel;


        if(document.getElementById("mascarasRadio").checked) {


             document.getElementById("direitadiv").innerHTML = "";
            for(i=0; i < mascarasJsonObject.length; i++) {
                if(mascarasJsonObject[i].fields.especialidade == especialidadeid && mascarasJsonObject[i].fields.exame == exameid) {
                    usuarioResponsavelInt = mascarasJsonObject[i].fields.usuario;

                    for(z=0; z < usuariosObject.length; z++) {
                        if(usuariosObject[z].pk == usuarioResponsavelInt) {
                            usuarioResponsavel = usuariosObject[z].fields.username;
                        }

                    }

                    var cor_titulo;
                    var alinhamento_titulo;
                    var tamanho_titulo;
                    var capitalizacao;

                    var cor_topicos;
                    var alinhamento_topicos;
                    var tamanho_topicos;
                    var margem_cabecalho;

                    var tamanho_fonte;
                    var fonte;
                    var cor_mascara;
                    var altura_linha;
                    var espacamento_topicos;
                    var mascara_topicos;



                    for(t=0; t < profilesObject.length; t++) {
                        if(profilesObject[t].fields.usuario == mascarasJsonObject[i].fields.usuario) {
                            cor_titulo = profilesObject[t].fields.cor_titulo;
                            alinhamento_titulo = profilesObject[t].fields.alinhamento_titulo
                            tamanho_titulo = profilesObject[t].fields.tamanho_titulo
                            capitalizacao = profilesObject[t].fields.capitalizacao

                            cor_topicos = profilesObject[t].fields.cor_topicos;
                              alinhamento_topicos = profilesObject[t].fields.alinhamento_topicos
                            tamanho_topicos = profilesObject[t].fields.tamanho_topicos
                            margem_cabecalho = profilesObject[t].fields.margem_cabecalho

                            tamanho_fonte = profilesObject[t].fields.tamanho_fonte

                            fonte = profilesObject[t].fields.fonte;
                              cor_mascara = profilesObject[t].fields.cor_mascara
                            altura_linha = profilesObject[t].fields.altura_linha
                            espacamento_topicos = profilesObject[t].fields.espacamento_topicos
                            mascara_topicos = profilesObject[t].fields.mascara_topicos


                        }

                    }

                    var tituloExame = mascarasJsonObject[i].fields.titulo;
                    var paragrafo = document.createElement("p");

                    paragrafo.setAttribute("style", "text-transform: " + capitalizacao + "; color: " + cor_titulo + "; text-align: " + alinhamento_titulo + "; font-size: " + tamanho_titulo + "; font-weight: bold;")
                    paragrafo.setAttribute("data-mce-style", "text-transform: " + capitalizacao + "; color: " + cor_titulo + "; text-align: " + alinhamento_titulo + "; font-size: " + tamanho_titulo + "; font-weight: bold;")



                    var paragrafoNome = document.createElement("button");
                    paragrafoNome.setAttribute("style", "color: #c96100; font-size: 1.3rem; font-weight: bold; text-decoration: none")
                                      paragrafoNome.setAttribute("id", "b" + mascarasJsonObject[i].pk);

                  paragrafoNome.setAttribute("onclick", "clicouEntradaMascara(this.id)");


                    var frase;

                    if(mascarasJsonObject[i].fields.popularidade == 1) {
                        frase = "usuário"
                    } else {
                        frase = "usuários"
                    }





                    paragrafoNome.setAttribute("class", "nome_entrada");

                    var paragrafoTecnicaHeader = document.createElement("p");

                    paragrafoTecnicaHeader.setAttribute("style", "color: " + cor_topicos + "; text-align: " + alinhamento_topicos + "; font-size: " + tamanho_topicos + "; margin-top: " + margem_cabecalho + "; margin-bottom: 2px; font-weight: bold;")
                    paragrafoTecnicaHeader.setAttribute("data-mce-style", "color: " + cor_topicos + "; text-align: " + alinhamento_topicos + "; font-size: " + tamanho_topicos + "; margin-top: " + margem_cabecalho + "; margin-bottom: 2px; font-weight: bold;")

                    var paragrafoTecnica = document.createElement("p");

                    paragrafoTecnica.setAttribute("style", "margin-top: 0; font-size: " + tamanho_fonte + "; font-family: " + fonte + "; color: " + cor_mascara + "; line-height: " + altura_linha + "; margin-bottom: " + espacamento_topicos)
                    paragrafoTecnica.setAttribute("data-mce-style", "margin-top: 0; font-size: " + tamanho_fonte + "; font-family: " + fonte + "; color: " + cor_mascara + "; line-height: " + altura_linha + "; margin-bottom: " + espacamento_topicos)

                  var paragrafoRelatorioHeader = document.createElement("p");

                  paragrafoRelatorioHeader.setAttribute("style", "color: " + cor_topicos + "; text-align: " + alinhamento_topicos + "; font-size: " + tamanho_topicos + "; margin-top: " + margem_cabecalho + "; margin-bottom: 2px; font-weight: bold;")
                  paragrafoRelatorioHeader.setAttribute("data-mce-style", "color: " + cor_topicos + "; text-align: " + alinhamento_topicos + "; font-size: " + tamanho_topicos + "; margin-top: " + margem_cabecalho + "; margin-bottom: 2px; font-weight: bold;")

                var paragrafoConclusaoHeader = document.createElement("p");

                paragrafoConclusaoHeader.setAttribute("style", "color: "+ cor_topicos + "; text-align: " + alinhamento_topicos + "; font-size: " + tamanho_topicos + "; margin-top: " + margem_cabecalho + "; margin-bottom: 2px; font-weight: bold;")
                paragrafoConclusaoHeader.setAttribute("data-mce-style", "color: "+ cor_topicos + "; text-align: " + alinhamento_topicos + "; font-size: " + tamanho_topicos + "; margin-top: " + margem_cabecalho + "; margin-bottom: 2px; font-weight: bold;")


                var paragrafoConclusao = document.createElement("p");

                var divEntrada = document.createElement("div");

                  var divEntrada2 = document.createElement("div");

                                var divEntrada3 = document.createElement("div");


        divEntrada3.setAttribute("style", "display: inline; margin-left: 5px;");
                                divEntrada.setAttribute("style", "display: inline");


                divEntrada2.setAttribute("id", "div" + mascarasJsonObject[i].pk);
                                divEntrada2.setAttribute("style", "display: none");






                paragrafoTecnicaHeader.innerHTML = mascarasJsonObject[i].fields.tecnica_header;
                paragrafoTecnica.innerHTML = mascarasJsonObject[i].fields.tecnica;
                paragrafoRelatorioHeader.innerHTML = mascarasJsonObject[i].fields.relatorio_header;
                paragrafoConclusaoHeader.innerHTML = mascarasJsonObject[i].fields.conclusao_header;
                paragrafoConclusao.innerHTML = mascarasJsonObject[i].fields.conclusao;
                paragrafoNome.innerHTML = mascarasJsonObject[i].fields.nome + '<span style="display: none;">' + devolverUsuarioMascara(mascarasJsonObject[i].pk) + '</span>';

                    paragrafo.innerHTML = tituloExame;

                    var paragrafoUsuario = document.createElement("p");
                    paragrafoUsuario.style.fontWeight = "bold";
                    divEntrada.appendChild(paragrafoNome);


                  divEntrada2.appendChild(paragrafo);
                  divEntrada2.appendChild(paragrafoTecnicaHeader);
                  divEntrada2.appendChild(paragrafoTecnica);
                  divEntrada2.appendChild(paragrafoRelatorioHeader);

                    var divExterno = document.createElement("div");
                  divExterno.appendChild(divEntrada);
                                    divExterno.appendChild(divEntrada3);
                                                      divExterno.appendChild(divEntrada2);




                    document.getElementById("direitadiv").appendChild(divExterno);


                var divGeral = document.createElement("div");
                  divEntrada2.appendChild(divGeral);



                  for(y=0; y < normaisObject.length; y++) {
                        if(normaisObject[y].fields.mascara == mascarasJsonObject[i].pk) {
                            var paragrafoRelatorio = document.createElement("div");
                            if(mascara_topicos === true && normaisObject[y].fields.orgao != "Nenhum órgão") {
                                paragrafoRelatorio.innerHTML = "<strong>" + normaisObject[y].fields.orgao + ": </strong>" + normaisObject[y].fields.relatorio;
                            } else {
                                paragrafoRelatorio.innerHTML = normaisObject[y].fields.relatorio;
                            }

                            paragrafoRelatorio.setAttribute("style", "margin-top: 0; font-size: " + tamanho_fonte + "; font-family: " + fonte + "; color: " + cor_mascara + "; margin-bottom: " + espacamento_topicos + "; line-height: " + altura_linha);
                                                          paragrafoRelatorio.setAttribute("data-mce-style", "margin-top: 0; font-size: " + tamanho_fonte + "; font-family: " + fonte + "; color: " + cor_mascara + "; margin-bottom: " + espacamento_topicos + "; line-height: " + altura_linha);

                              divGeral.appendChild(paragrafoRelatorio);


                        }
                    }

                  divEntrada2.appendChild(paragrafoConclusaoHeader);
                  divEntrada2.appendChild(paragrafoConclusao);
                                    divEntrada2.innerHTML = substituirVariaveisMascara(divEntrada2.innerHTML, devolverUsuarioMascaraInt(mascarasJsonObject[i].pk));




 var copiarMascara = document.createElement("button");
                  copiarMascara.innerHTML = "Copiar";
                  copiarMascara.setAttribute("id", "copy" + mascarasJsonObject[i].pk);

                  copiarMascara.setAttribute("onclick", "copiarMascaraPublica(this.id)");
                  copiarMascara.setAttribute("class", "botao_configuracao3");
divEntrada3.appendChild(copiarMascara);

                    var butao = document.createElement("button");
                    butao.setAttribute("class", "botao_configuracao3");

divEntrada3.appendChild(butao);
                  var linkMascara = document.createElement("a");
                  linkMascara.innerHTML = "Usar Máscara";
                  linkMascara.setAttribute("href", "../mascaras/" + mascarasJsonObject[i].pk);
                      linkMascara.setAttribute("style", "color: #ffffff; text-decoration: none");

                   butao.appendChild(linkMascara);


                  var divisoria = document.createElement("hr");
                   divEntrada2.appendChild(document.createElement("br"));

                  divEntrada2.appendChild(divisoria);


                }
            }

        } else {


             document.getElementById("direitadiv").innerHTML = "";

            for(i=0; i < mascarasJsonObject.length; i++) {
                if(mascarasJsonObject[i].fields.especialidade == especialidadeid && mascarasJsonObject[i].fields.exame == exameid) {
                    mascarasValidas.push(mascarasJsonObject[i].pk);

                    usuarioResponsavelInt = mascarasJsonObject[i].fields.usuario;

                    for(z=0; z < usuariosObject.length; z++) {
                        if(usuariosObject[z].pk == usuarioResponsavelInt) {
                            usuarioResponsavel = usuariosObject[z].fields.username;
                        }

                    }

                }
            }




            for(i=0; i < normaisObject.length; i++) {
                if(mascarasValidas.includes(normaisObject[i].fields.mascara)) {
                    topicosNormaisValidos.push(normaisObject[i].pk);
                }
            }

                for(i = 0; i < alteradosJSONObject.length; i++) {
                            if(topicosNormaisValidos.includes(alteradosJSONObject[i].fields.topico_normal)) {
                        var alteracaoId = alteradosJSONObject[i].pk;
                        nome = alteradosJSONObject[i].fields.nome;

                        var relatorioSpan = document.createElement("span");
                        relatorioSpan.setAttribute("style", "font-weight: bold");
                        relatorioSpan.innerHTML = "Relatório: ";
                        var conclusaoSpan = document.createElement("span");
                        conclusaoSpan.setAttribute("style", "font-weight: bold");
                        conclusaoSpan.innerHTML = "Conclusão: ";


                        relatorioAlterado = substituirVariaveis(alteradosJSONObject[i].fields.relatorio, devolverUsuarioAlteracaoInt(alteracaoId));
                        conclusaoAlterada = substituirVariaveis(alteradosJSONObject[i].fields.conclusao, devolverUsuarioAlteracaoInt(alteracaoId));


                var linkAlteracao = document.createElement("a");
                  linkAlteracao.innerHTML = "Usar";

                  var topicoParaAlterar = alteradosJSONObject[i].fields.topico_normal;

                  var alteracaoId = alteradosJSONObject[i].pk;
                  var mascaraId;

            for(b=0; b < normaisObject.length; b++) {
                if(normaisObject[b].pk == topicoParaAlterar) {
                    mascaraId = normaisObject[b].fields.mascara;
                }
            }

            var mascarasObj = JSON.parse(mascarasJsonPopulares);
            var nomeMascara;

            for(c=0; c < mascarasObj.length; c++) {
                if(mascarasObj[c].pk == mascaraId) {
                    nomeMascara = mascarasObj[c].fields.nome;
                }
            }




                        var paragrafo = document.createElement("p");
                        var paragrafoConclusao = document.createElement("p");
                        var paragrafoUsuarioAlt = document.createElement("p");
                        paragrafoUsuarioAlt.style.fontWeight = "bold";

                           var paragrafonome = document.createElement("button");
paragrafonome.setAttribute("id", alteracaoId);

                  paragrafonome.setAttribute("onclick", "clicouEntradaAlteracao(this.id)");
                    paragrafonome.setAttribute("style", "color: #c96100; font-size: 1.3rem; font-weight: bold; text-decoration: none")


                     if(alteradosJSONObject[i].fields.popularidade == 1) {
                        frase = "usuário"
                    } else {
                        frase = "usuários"
                    }







                    paragrafonome.setAttribute("class", "nome_entrada");




                paragrafo.innerHTML = relatorioAlterado;
                 paragrafoConclusao.innerHTML = conclusaoAlterada;


                  paragrafonome.innerHTML = alteradosJSONObject[i].fields.nome + '<span style="color: gray; font-size: 1.0rem;"> (' + nomeMascara + ')</span><span style="display: none;">' + devolverUsuarioAlteracao(alteracaoId) + '</span>';

                      var divEntrada = document.createElement("div");

                      divEntrada.setAttribute("name", topicoParaAlterar);


                    divEntrada.appendChild(paragrafonome);


      var mypar = document.createElement("p");
                                mypar.setAttribute("style", "margin-bottom: 8px;");

                                            divEntrada.appendChild(mypar);

                      divEntrada.appendChild(relatorioSpan);

                  divEntrada.appendChild(paragrafo);

                         paragrafo.setAttribute("style", "display: inline;");

                    var copiarRelatorio = document.createElement("button");
                                              copiarRelatorio.innerHTML = "Copiar";
                                                copiarRelatorio.setAttribute("class", "botao_configuracao2");
                                                  copiarRelatorio.setAttribute("id", "relatorio" + alteradosJSONObject[i].pk);
                    copiarRelatorio.setAttribute("onclick", "copiarEntradaPublica(this.id)");



                                                divEntrada.appendChild(copiarRelatorio);
                                                      divEntrada.appendChild(document.createElement("br"));
                      divEntrada.appendChild(conclusaoSpan);

                divEntrada.appendChild(paragrafoConclusao);
                                    paragrafoConclusao.setAttribute("style", "display: inline;");

                  var copiarConclusao = document.createElement("button");
                  copiarConclusao.setAttribute("class", "botao_configuracao2");
                    copiarConclusao.setAttribute("id", "conclusao" + alteradosJSONObject[i].pk);
                    copiarConclusao.setAttribute("onclick", "copiarEntradaPublica(this.id)");

                                              copiarConclusao.innerHTML = "Copiar";

                                                divEntrada.appendChild(copiarConclusao);
                                                            divEntrada.appendChild(document.createElement("br"));



                                document.getElementById("direitadiv").appendChild(divEntrada);


        var pattern = /\{([^}]+)\}/g;
        var matches1 = paragrafo.innerHTML.match(pattern);
        var matches2 = paragrafoConclusao.innerHTML.match(pattern);

        if(matches1 != null || matches2 != null) {
            linkAlteracao.innerHTML = "&lt;Preencher variáveis&gt;";
                      linkAlteracao.setAttribute("style", "color: #c96100;")

                    linkAlteracao.setAttribute("href", "../mascaras/alteracao/" + mascaraId + "/" + topicoParaAlterar + "/" + alteracaoId);

                   divEntrada.appendChild(linkAlteracao);
        }

                  var divisoria = document.createElement("hr")

                  divEntrada.appendChild(divisoria);


                            }

                }



        }


    if(document.getElementById("procurarFrases").value == "") {

    } else {
        procurarEntradas("procurarFrases");

    }
                        document.getElementById("container").scrollIntoView();


if(isScrolledIntoView(document.getElementById("myfooter"))) {
        document.getElementById("myfooter").setAttribute("class", "fixedfooter");
     } else {
        document.getElementById("myfooter").setAttribute("class", "normalfooter");

     }
}








function clicouTopico(id) {




    var entradas = document.getElementById("direitadiv").children;

    for(entrada of entradas) {
        if(entrada.getAttribute("name") == id.substring(1)) {
            entrada.style.display = "block";
        } else {
            entrada.style.display = "none";
        }
    }












}





function procurarEntradas(id) {


 if(document.getElementById("procurarFrases").value == "") {
            clicouBotaoRadio();
            setCookie("vezesClicadoMais", "0", 12);
                        setCookie("procura", "", 12);

            return;
        }


  // Declare variables
  var input, filter, li, i, txtValue;
  input = document.getElementById(id);
  filter = input.value.toUpperCase();
  li = document.getElementsByClassName('nome_entrada');


  setCookie("procura", input.value, 12);


  var counter = 0;

  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < li.length; i++) {
    txtValue = li[i].innerText;
    if (txtValue.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase().indexOf(filter.normalize("NFD").replace(/[\u0300-\u036f]/g, "")) > -1 && counter < 5) {
            if(document.getElementById("mascarasRadio").checked) {

      li[i].parentNode.parentNode.style.display = "block";
      } else {
            li[i].parentNode.style.display = "block";

      }
      counter++;
    } else {
                if(document.getElementById("mascarasRadio").checked) {

      li[i].parentNode.parentNode.style.display = "none";
      } else {
            li[i].parentNode.style.display = "none";

      }
    }

  }






}

function setCookie(cname, cvalue, exhours) {
  var d = new Date();
  d.setTime(d.getTime() + (exhours*60*60*1000));
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

function substituirVariaveis(descricao, usuarioId) {

        var provisoria = descricao;

        var variaveisJSONObject = JSON.parse(variaveis);

        var variaveisUsuarioJSONObject = [];


          for(var z = 0; z < variaveisJSONObject.length; z++) {
                if(variaveisJSONObject[z].fields.usuario == usuarioId) {
                variaveisUsuarioJSONObject.push(variaveisJSONObject[z]);
                }

                }


        var pattern = /\{([^}]+)\}/g;
        var matches = descricao.match(pattern);
        var result = [];


        if(matches != null) {
            for(match of matches) {
                result.push(match);
            }
        }


            var listaVariaveisNominais = [];



var variaveisQuantitativas = [];

            //separa as variáveis nominais e depois faz um concat com as outras. Agora as variáveis nominais são
            //separadas no banco com nomes amigáveis para poderem existir várias, teoricamente iguais (lateralidade, por exemplo)
            //em um mesmo laudo.
            var count = 0;
            for(variavel of result) {



                var variaveisNominais = variavel.split("|");


                    if(variaveisNominais.length > 1) {
                    for(variavelNominal of variaveisNominais) {
                        variavelNominal = variavelNominal.replaceAll("{", "");
                        variavelNominal = variavelNominal.replaceAll("}", "");
                        if(!listaVariaveisNominais.includes(variavelNominal)) {
                            listaVariaveisNominais[count] = variavelNominal;
                            count++;
                        }

                    }
                    } else {
                        variaveisQuantitativas.push(variavel.replaceAll("{", "").replaceAll("}", ""));
                    }
            }






            for(variavel of listaVariaveisNominais) {

                for(variavelUsuario of variaveisUsuarioJSONObject) {
                    if(variavelUsuario.fields.nome_da_variavel == variavel) {
                        provisoria = provisoria.replaceAll("{" + variavel + "}", "{" + variavelUsuario.fields.nome_amigavel + "}");
                        provisoria = provisoria.replaceAll("|" + variavel + "|", "|" + variavelUsuario.fields.nome_amigavel + "|");
                        provisoria = provisoria.replaceAll("{" + variavel + "|", "{" + variavelUsuario.fields.nome_amigavel + "|");

                        provisoria = provisoria.replaceAll("|" + variavel + "}", "|" + variavelUsuario.fields.nome_amigavel + "}");



                    }
                }

            }

            for(variavel of variaveisQuantitativas) {

                for(variavelUsuario of variaveisUsuarioJSONObject) {
                    if(variavelUsuario.fields.nome_da_variavel == variavel) {
                        provisoria = provisoria.replaceAll("{" + variavel + "}", "{#}");

                    }
                }

            }

            return provisoria;

}





function substituirVariaveisMascara(descricao, usuarioId) {

        var provisoria = descricao;

        var variaveisJSONObject = JSON.parse(variaveis2);

        var variaveisUsuarioJSONObject = [];


          for(var z = 0; z < variaveisJSONObject.length; z++) {
                if(variaveisJSONObject[z].fields.usuario == usuarioId) {
                variaveisUsuarioJSONObject.push(variaveisJSONObject[z]);
                }

                }


        var pattern = /\{([^}]+)\}/g;
        var matches = descricao.match(pattern);
        var result = [];


        if(matches != null) {
            for(match of matches) {
                result.push(match);
            }
        }


            var listaVariaveisNominais = [];



var variaveisQuantitativas = [];

            //separa as variáveis nominais e depois faz um concat com as outras. Agora as variáveis nominais são
            //separadas no banco com nomes amigáveis para poderem existir várias, teoricamente iguais (lateralidade, por exemplo)
            //em um mesmo laudo.
            var count = 0;
            for(variavel of result) {



                var variaveisNominais = variavel.split("|");


                    if(variaveisNominais.length > 1) {
                    for(variavelNominal of variaveisNominais) {
                        variavelNominal = variavelNominal.replaceAll("{", "");
                        variavelNominal = variavelNominal.replaceAll("}", "");
                        if(!listaVariaveisNominais.includes(variavelNominal)) {
                            listaVariaveisNominais[count] = variavelNominal;
                            count++;
                        }

                    }
                    } else {
                        variaveisQuantitativas.push(variavel.replaceAll("{", "").replaceAll("}", ""));
                    }
            }






            for(variavel of listaVariaveisNominais) {

                for(variavelUsuario of variaveisUsuarioJSONObject) {
                    if(variavelUsuario.fields.nome_da_variavel == variavel) {
                        provisoria = provisoria.replaceAll("{" + variavel + "}", "{" + variavelUsuario.fields.nome_amigavel + "}");
                        provisoria = provisoria.replaceAll("|" + variavel + "|", "|" + variavelUsuario.fields.nome_amigavel + "|");
                        provisoria = provisoria.replaceAll("{" + variavel + "|", "{" + variavelUsuario.fields.nome_amigavel + "|");

                        provisoria = provisoria.replaceAll("|" + variavel + "}", "|" + variavelUsuario.fields.nome_amigavel + "}");



                    }
                }

            }

            for(variavel of variaveisQuantitativas) {

                for(variavelUsuario of variaveisUsuarioJSONObject) {
                    if(variavelUsuario.fields.nome_da_variavel == variavel) {
                        provisoria = provisoria.replaceAll("{" + variavel + "}", "{#}");

                    }
                }

            }

            return provisoria;

}





function copiarEntradaPublica(id) {


   var containerid = document.getElementById(id).previousSibling;

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

function copiarMascaraPublica(id) {

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




    if(document.getElementById("mais_utilizadas") != null) {
document.getElementById("mais_utilizadas").style.display = "none";
}

    var anchor2 = document.createElement("a");
anchor2.setAttribute("href", window.location.href);
anchor2.setAttribute("class", "link_voltar");

    if(document.referrer.split("/").reverse()[0] == "comunidade" || document.referrer == window.location.protocol + "//" + window.location.hostname + "/") {
    anchor2.style.display = "none";
}










limparTagsHtml();


    var containerid = "mascara_div";












   var containerid = document.getElementById("div" + id.substring(4));

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





function limparTagsHtml() {

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
        p.removeAttribute("id");
        if(p.innerHTML == " ") {
            p.style.display = "none";
        }
    }
    $("p:empty").remove()
    $("div:empty").remove()



}



function devolverUsuarioMascaraInt(mascaraId) {

        var mascarasJsonObject = JSON.parse(mascarasJsonTotal);
        var normaisObject = JSON.parse(normais);
        var usuariosObject = JSON.parse(usuarios2);

        var profilesObject = JSON.parse(profiles);

        var topicoNormalId;


        var usuarioId;





         for(u=0; u < mascarasJsonObject.length; u++) {
            if(mascarasJsonObject[u].pk == mascaraId) {
                usuarioId = mascarasJsonObject[u].fields.usuario;
            }
        }



        return usuarioId;

}


function isScrolledIntoView(elem)
{
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}