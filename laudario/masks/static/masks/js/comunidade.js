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
setarBoxUltimas();

    if(document.getElementById("frasesRadio").checked) {
        document.getElementById("procurarFrases").setAttribute("placeholder", "Procurar frases ou usuários");

    } else {
        document.getElementById("procurarFrases").setAttribute("placeholder", "Procurar máscaras ou usuários");

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



    eliminarLinkSeNecessario();
    document.getElementById("linkmais").innerHTML = "Mais " + calcularResultadosEncontrados() + " resultados";

}



//Execute after page loads
document.addEventListener('DOMContentLoaded', function() {

  setarBoxUltimas();

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







    var loop = parseInt(getCookie("vezesClicadoMais"));
if(document.getElementById("procurarFrases").value.length > 0) {
                    procurarEntradas("procurarFrases");

            }
    for(i=0; i < loop; i++) {


       var children = document.getElementById("direitadiv").children;
       var counter = 0;



         for(i=0; i < children.length; i++) {
            if(children[i].style.display == "none" && counter < 5*loop && children[i].firstChild.innerHTML.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase().includes(document.getElementById("procurarFrases").value.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))) {

                children[i].style.display = "block";
                counter++;
            }

         }


             if(document.getElementById("procurarFrases").value != "") {

if(document.getElementById("procurarFrases").value.length == 0) {
               resultado = calcularResultadosEncontrados()-5;

        } else {
           resultado = calcularResultadosEncontrados();

        }
        } else {
        if(document.getElementById("procurarFrases").value.length == 0) {
               resultado = calcularResultadosEncontrados()-5;

        } else {
           resultado = calcularResultadosEncontrados();

        }
        }



                     if(resultado > 0) {
                     document.getElementById("linkmais").innerHTML = "Mais " + resultado + " resultados";
                        }
        eliminarLinkSeNecessario();
    }



    }

var quantos = 0;



        document.getElementById("clicouBotaoRadio").value = 1;



          if(getCookie("procurouTudo") != null && getCookie("procurouTudo") == "1") {
        procurarTudo("procurarFrases");

           var loop = parseInt(getCookie("vezesClicadoMais"));
if(document.getElementById("procurarFrases").value.length > 0) {
                    procurarEntradas("procurarFrases");

            }
    for(i=0; i < loop; i++) {


       var children = document.getElementById("direitadiv").children;
       var counter = 0;



         for(i=0; i < children.length; i++) {
            if(children[i].style.display == "none" && counter < 5*loop && children[i].firstChild.innerHTML.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase().includes(document.getElementById("procurarFrases").value.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))) {

                children[i].style.display = "block";
                counter++;
            }

         }
        resultado = calcularResultadosEncontrados()-5;
     document.getElementById("linkmais").innerHTML = "Mais " + resultado + " resultados";
        eliminarLinkSeNecessario();



    }

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
        var normaisObject = JSON.parse(normais);
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

                if(devolverUsuarioMascara(mascarasJsonObject[i].pk).toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(document.getElementById("procurarFrases").value.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")) || mascarasJsonObject[i].fields.nome.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(document.getElementById("procurarFrases").value.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))) {

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

                    var paragrafoExame1 = document.createElement("span");
                    paragrafoExame1.setAttribute("style", "margin-left: 4px; color: gray; font-weight: bold");
                    paragrafoExame1.innerHTML = document.getElementById(mascarasJsonObject[i].fields.exame).innerText;
                    var paragrafoEspecialidade1 = document.createElement("span");
                        paragrafoEspecialidade1.setAttribute("style", "margin-left: 4px; color: gray; font-weight: bold");

                        paragrafoEspecialidade1.innerHTML = "(" + document.getElementsByName(mascarasJsonObject[i].fields.especialidade)[0].innerText + ")";


                    var paragrafoNome = document.createElement("a");
                    paragrafoNome.setAttribute("style", "color: #c96100; font-size: 1.3rem; font-weight: bold; text-decoration: none")
                  paragrafoNome.setAttribute("href", "../mascaras/" + mascarasJsonObject[i].pk);


                    var frase;

                    if(mascarasJsonObject[i].fields.popularidade == 1) {
                        frase = "usuário"
                    } else {
                        frase = "usuários"
                    }

                    var criadaEm = document.createElement("p");

                    var criadaEmFormatada = "Criada em " + mascarasJsonObject[i].fields.data_criada.substring(0, 10).split("-").reverse().join("/") + ", por <span style='font-weight: bold; color: #c96100;'>"+ usuarioResponsavel + "</span><span style='font-size: .9rem;'> (" + mascarasJsonObject[i].fields.popularidade + " " + frase + ")</span>";

                    criadaEm.innerHTML = criadaEmFormatada;

                    paragrafoNome.setAttribute("class", "nome_entrada");

                    var paragrafoTecnicaHeader = document.createElement("p");

                    paragrafoTecnicaHeader.setAttribute("style", "color: " + cor_topicos + "; text-align: " + alinhamento_topicos + "; font-size: " + tamanho_topicos + "; margin-top: " + margem_cabecalho + "; margin-bottom: 2px; font-weight: bold;")

                    var paragrafoTecnica = document.createElement("p");

                    paragrafoTecnica.setAttribute("style", "margin-top: 0; font-size: " + tamanho_fonte + "; font-family: " + fonte + "; color: " + cor_mascara + "; line-height: " + altura_linha + "; margin-bottom: " + espacamento_topicos)

                  var paragrafoRelatorioHeader = document.createElement("p");

                  paragrafoRelatorioHeader.setAttribute("style", "color: " + cor_topicos + "; text-align: " + alinhamento_topicos + "; font-size: " + tamanho_topicos + "; margin-top: " + margem_cabecalho + "; margin-bottom: 2px; font-weight: bold;")

                var paragrafoConclusaoHeader = document.createElement("p");

                paragrafoConclusaoHeader.setAttribute("style", "color: "+ cor_topicos + "; text-align: " + alinhamento_topicos + "; font-size: " + tamanho_topicos + "; margin-top: " + margem_cabecalho + "; margin-bottom: 2px; font-weight: bold;")


                var paragrafoConclusao = document.createElement("p");

                var divEntrada = document.createElement("div");


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

                  divEntrada.appendChild(criadaEm);

                  divEntrada.appendChild(paragrafo);
                  divEntrada.appendChild(paragrafoTecnicaHeader);
                  divEntrada.appendChild(paragrafoTecnica);
                  divEntrada.appendChild(paragrafoRelatorioHeader);

                    document.getElementById("direitadiv").appendChild(divEntrada);



                var divGeral = document.createElement("div");
                  divEntrada.appendChild(divGeral);



                  for(y=0; y < normaisObject.length; y++) {
                        if(normaisObject[y].fields.mascara == mascarasJsonObject[i].pk) {
                            var paragrafoRelatorio = document.createElement("div");
                            if(mascara_topicos === true && normaisObject[y].fields.orgao != "Nenhum órgão") {
                                paragrafoRelatorio.innerHTML = "<strong>" + normaisObject[y].fields.orgao + ": </strong>" + normaisObject[y].fields.relatorio;
                            } else {
                                paragrafoRelatorio.innerHTML = normaisObject[y].fields.relatorio;
                            }
                            paragrafoRelatorio.setAttribute("style", "margin-top: 0; font-size: " + tamanho_fonte + "; font-family: " + fonte + "; color: " + cor_mascara + "; margin-bottom: " + espacamento_topicos + "; line-height: " + altura_linha);
                              divGeral.appendChild(paragrafoRelatorio);


                        }
                    }

                  divEntrada.appendChild(paragrafoConclusaoHeader);
                  divEntrada.appendChild(paragrafoConclusao);


                  var linkMascara = document.createElement("a");
                  linkMascara.innerHTML = "&lt;Usar Máscara&gt;";
                  linkMascara.setAttribute("href", "../mascaras/" + mascarasJsonObject[i].pk);
                      linkMascara.setAttribute("style", "color: #c96100;")

                   divEntrada.appendChild(linkMascara);


                  var divisoria = document.createElement("hr")
                  divEntrada.appendChild(divisoria);

                }
            }
                var divLink = document.createElement("div");
                divLink.setAttribute("style", "text-align: center")
                divLink.setAttribute("id", "divlink")
                var linkMais = document.createElement("button");
                linkMais.setAttribute("onclick", "mostrarMais()");
                linkMais.setAttribute("id", "linkmais");
                linkMais.setAttribute("class", "botaoLink");
                divLink.appendChild(linkMais);
                 document.getElementById("direitadiv").appendChild(divLink);

        } else {

             document.getElementById("direitadiv").innerHTML = "";



                for(i = 0; i < alteradosJSONObject.length; i++) {
                            if(devolverUsuarioAlteracao(alteradosJSONObject[i].pk).toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(document.getElementById("procurarFrases").value.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")) || alteradosJSONObject[i].fields.nome.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(document.getElementById("procurarFrases").value.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))) {
                        var alteracaoId = alteradosJSONObject[i].pk;
                        encontrou = true;

                        nome = alteradosJSONObject[i].fields.nome;
                        relatorioAlterado = "<span style='font-weight: bold'>Relatório: </span>" + substituirVariaveis(alteradosJSONObject[i].fields.relatorio, devolverUsuarioAlteracaoInt(alteracaoId));
                        conclusaoAlterada = "<span style='font-weight: bold'>Conclusão: </span>" + substituirVariaveis(alteradosJSONObject[i].fields.conclusao, devolverUsuarioAlteracaoInt(alteracaoId));



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




                        var paragrafo = document.createElement("p");
                        var paragrafoConclusao = document.createElement("p");
                        var paragrafoUsuarioAlt = document.createElement("p");
                        paragrafoUsuarioAlt.style.fontWeight = "bold";

                           var paragrafonome = document.createElement("a");
                           paragrafonome.setAttribute("href", "../mascaras/alteracao/" + mascaraId + "/" + topicoParaAlterar + "/" + alteracaoId);

                    paragrafonome.setAttribute("style", "color: #c96100; font-size: 1.3rem; font-weight: bold; text-decoration: none")


                     if(alteradosJSONObject[i].fields.popularidade == 1) {
                        frase = "usuário"
                    } else {
                        frase = "usuários"
                    }


                    var criadaEm = document.createElement("p");

                    var criadaEmFormatada = "Criada em " + alteradosJSONObject[i].fields.data_criada.substring(0, 10).split("-").reverse().join("/") + ", por <span style='font-weight: bold; color: #c96100;'>"+ devolverUsuarioAlteracao(alteracaoId) + "</span><span style='font-size: .9rem;'> (" + alteradosJSONObject[i].fields.popularidade + " " + frase + ")</span>";


                    criadaEm.innerHTML = criadaEmFormatada;


                    paragrafonome.setAttribute("class", "nome_entrada");


                     var especiadidadeInt;
                    var exameInt;

                    var mascarasJsonObject2 = JSON.parse(mascarasJson);

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






                    divEntrada.appendChild(paragrafonome);
                       divEntrada.appendChild(paragrafoExame2);
                                            divEntrada.appendChild(paragrafoEspecialidade2);


                      divEntrada.appendChild(criadaEm);



                  divEntrada.appendChild(paragrafo);
                divEntrada.appendChild(paragrafoConclusao);


                                document.getElementById("direitadiv").appendChild(divEntrada);


                    linkAlteracao.innerHTML = "&lt;Usar Frase&gt;";
                      linkAlteracao.setAttribute("style", "color: #c96100;")

                    linkAlteracao.setAttribute("href", "../mascaras/alteracao/" + mascaraId + "/" + topicoParaAlterar + "/" + alteracaoId);

                   divEntrada.appendChild(linkAlteracao);

                  var divisoria = document.createElement("hr")
                  divEntrada.appendChild(divisoria);


                            }

                }
                var divLink = document.createElement("div");
                divLink.setAttribute("style", "text-align: center")
                divLink.setAttribute("id", "divlink")
                var linkMais = document.createElement("button");
                linkMais.setAttribute("onclick", "mostrarMais()");
                linkMais.setAttribute("class", "botaoLink");
                linkMais.setAttribute("id", "linkmais");


                divLink.appendChild(linkMais);
                 document.getElementById("direitadiv").appendChild(divLink);



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

function setarBoxUltimas() {
            document.getElementById("conteudo_box").innerHTML = "";


       var alteradosJSONObjectBox = JSON.parse(alteradosRecentes);
        var mascarasJsonObjectBox = JSON.parse(mascarasRecentes);

     if(document.getElementById("mascarasRadio").checked) {
        document.getElementById("header_box").innerHTML = "Últimas Máscaras Adicionadas";

        for(z=0; z < 10; z++) {
            var usuariosObjectBox = JSON.parse(usuarios2);
            for(x=0; x < usuariosObjectBox.length; x++) {
                if(usuariosObjectBox[x].pk == mascarasJsonObjectBox[z].fields.usuario) {
                    var mascaraUsuario = usuariosObjectBox[x].fields.username;

                }
            }

            var mascaraId = mascarasJsonObjectBox[z].pk;
            var mascaraNome = mascarasJsonObjectBox[z].fields.nome;
            var mascaraLink = document.createElement("a");
            mascaraLink.setAttribute("class", "link_mascara_box");
            mascaraLink.innerHTML = mascaraNome + ' <span style="color: #c96100;">(' + mascaraUsuario + ')</span><br>';
            mascaraLink.setAttribute("href", "../mascaras/" + mascaraId);
            document.getElementById("conteudo_box").appendChild(mascaraLink);
        }

    } else {
            document.getElementById("header_box").innerHTML = "Últimas Frases Adicionadas";

        for(z=0; z < 10; z++) {
            var idMascara;
            var idTopico = alteradosJSONObjectBox[z].fields.topico_normal;
            var idAlteracao = alteradosJSONObjectBox[z].pk;
            var normaisObject = JSON.parse(normais);
            var alteracaoNome = alteradosJSONObjectBox[z].fields.nome;
            var alteracaoUsuario;

            var usuarioId;
            var alteracaoUsuario;
            for(w=0; w < normaisObject.length; w++) {
                if(alteradosJSONObjectBox[z].fields.topico_normal == normaisObject[w].pk) {
                    idMascara = normaisObject[w].fields.mascara;
                }
            }
            for(t=0; t < mascarasJsonObjectBox.length; t++) {
                if(mascarasJsonObjectBox[t].pk == idMascara) {
                    usuarioId = mascarasJsonObjectBox[t].fields.usuario;

                }
            }

            var usuariosObjectBox = JSON.parse(usuarios2);
            for(g=0; g < usuariosObjectBox.length; g++) {
                if(usuariosObjectBox[g].pk == usuarioId) {
                        alteracaoUsuario = usuariosObjectBox[g].fields.username;
                }
            }


             var alteracaoLink = document.createElement("a");
                 alteracaoLink.setAttribute("class", "link_mascara_box");

            alteracaoLink.innerHTML = alteracaoNome + ' <span style="color: #c96100;">(' + alteracaoUsuario + ')</span><br>';
            alteracaoLink.setAttribute("href", "../mascaras/alteracao/" + idMascara + "/" + idTopico + "/" + idAlteracao);
            document.getElementById("conteudo_box").appendChild(alteracaoLink);


        }


    }
}

function clicouAbaEspecial(especialidadeid, exameid) {

        setarBoxUltimas();





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
             document.getElementById("procurarFrases").setAttribute("placeholder", "Procurar máscaras ou usuários")
            setCookie("mascarasRadioChecked", "true", 12);

        } else {
                     document.getElementById("procurarFrases").setAttribute("placeholder", "Procurar frases ou usuários")

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
              mascarasJsonObject = JSON.parse(mascarasJsonPopulares);
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

                    var paragrafoNome = document.createElement("a");
                    paragrafoNome.setAttribute("style", "color: #c96100; font-size: 1.3rem; font-weight: bold; text-decoration: none")
                  paragrafoNome.setAttribute("href", "../mascaras/" + mascarasJsonObject[i].pk);


                    var frase;

                    if(mascarasJsonObject[i].fields.popularidade == 1) {
                        frase = "usuário"
                    } else {
                        frase = "usuários"
                    }

                    var criadaEm = document.createElement("p");

                    var criadaEmFormatada = "Criada em " + mascarasJsonObject[i].fields.data_criada.substring(0, 10).split("-").reverse().join("/") + ", por <span style='font-weight: bold; color: #c96100;'>"+ usuarioResponsavel + "</span><span style='font-size: .9rem;'> (" + mascarasJsonObject[i].fields.popularidade + " " + frase + ")</span>";


                    criadaEm.innerHTML = criadaEmFormatada;

                    paragrafoNome.setAttribute("class", "nome_entrada");

                    var paragrafoTecnicaHeader = document.createElement("p");

                    paragrafoTecnicaHeader.setAttribute("style", "color: " + cor_topicos + "; text-align: " + alinhamento_topicos + "; font-size: " + tamanho_topicos + "; margin-top: " + margem_cabecalho + "; margin-bottom: 2px; font-weight: bold;")

                    var paragrafoTecnica = document.createElement("p");

                    paragrafoTecnica.setAttribute("style", "margin-top: 0; font-size: " + tamanho_fonte + "; font-family: " + fonte + "; color: " + cor_mascara + "; line-height: " + altura_linha + "; margin-bottom: " + espacamento_topicos)

                  var paragrafoRelatorioHeader = document.createElement("p");

                  paragrafoRelatorioHeader.setAttribute("style", "color: " + cor_topicos + "; text-align: " + alinhamento_topicos + "; font-size: " + tamanho_topicos + "; margin-top: " + margem_cabecalho + "; margin-bottom: 2px; font-weight: bold;")

                var paragrafoConclusaoHeader = document.createElement("p");

                paragrafoConclusaoHeader.setAttribute("style", "color: "+ cor_topicos + "; text-align: " + alinhamento_topicos + "; font-size: " + tamanho_topicos + "; margin-top: " + margem_cabecalho + "; margin-bottom: 2px; font-weight: bold;")


                var paragrafoConclusao = document.createElement("p");

                var divEntrada = document.createElement("div");


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

                  divEntrada.appendChild(criadaEm);

                  divEntrada.appendChild(paragrafo);
                  divEntrada.appendChild(paragrafoTecnicaHeader);
                  divEntrada.appendChild(paragrafoTecnica);
                  divEntrada.appendChild(paragrafoRelatorioHeader);

                    document.getElementById("direitadiv").appendChild(divEntrada);



                var divGeral = document.createElement("div");
                  divEntrada.appendChild(divGeral);



                  for(y=0; y < normaisObject.length; y++) {
                        if(normaisObject[y].fields.mascara == mascarasJsonObject[i].pk) {
                            var paragrafoRelatorio = document.createElement("div");
                            if(mascara_topicos === true && normaisObject[y].fields.orgao != "Nenhum órgão") {
                                paragrafoRelatorio.innerHTML = "<strong>" + normaisObject[y].fields.orgao + ": </strong>" + normaisObject[y].fields.relatorio;
                            } else {
                                paragrafoRelatorio.innerHTML = normaisObject[y].fields.relatorio;
                            }
                            paragrafoRelatorio.setAttribute("style", "margin-top: 0; font-size: " + tamanho_fonte + "; font-family: " + fonte + "; color: " + cor_mascara + "; margin-bottom: " + espacamento_topicos + "; line-height: " + altura_linha);
                              divGeral.appendChild(paragrafoRelatorio);


                        }
                    }

                  divEntrada.appendChild(paragrafoConclusaoHeader);
                  divEntrada.appendChild(paragrafoConclusao);


                  var linkMascara = document.createElement("a");
                  linkMascara.innerHTML = "&lt;Usar Máscara&gt;";
                  linkMascara.setAttribute("href", "../mascaras/" + mascarasJsonObject[i].pk);
                      linkMascara.setAttribute("style", "color: #c96100;")

                   divEntrada.appendChild(linkMascara);


                  var divisoria = document.createElement("hr")
                  divEntrada.appendChild(divisoria);

                }
            }
                var divLink = document.createElement("div");
                divLink.setAttribute("style", "text-align: center")
                divLink.setAttribute("id", "divlink")
                var linkMais = document.createElement("button");
                linkMais.setAttribute("onclick", "mostrarMais()");
                linkMais.setAttribute("id", "linkmais");
                linkMais.setAttribute("class", "botaoLink");
                divLink.appendChild(linkMais);
                 document.getElementById("direitadiv").appendChild(divLink);

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
                        relatorioAlterado = "<span style='font-weight: bold'>Relatório: </span>" + substituirVariaveis(alteradosJSONObject[i].fields.relatorio, devolverUsuarioAlteracaoInt(alteracaoId));
                        conclusaoAlterada = "<span style='font-weight: bold'>Conclusão: </span>" + substituirVariaveis(alteradosJSONObject[i].fields.conclusao, devolverUsuarioAlteracaoInt(alteracaoId));



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


             var mascarasObj = JSON.parse(mascarasJson);
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

                           var paragrafonome = document.createElement("a");
                           paragrafonome.setAttribute("href", "../mascaras/alteracao/" + mascaraId + "/" + topicoParaAlterar + "/" + alteracaoId);

                    paragrafonome.setAttribute("style", "color: #c96100; font-size: 1.3rem; font-weight: bold; text-decoration: none")


                     if(alteradosJSONObject[i].fields.popularidade == 1) {
                        frase = "usuário"
                    } else {
                        frase = "usuários"
                    }


                    var criadaEm = document.createElement("p");

                    var criadaEmFormatada = "Criada em " + alteradosJSONObject[i].fields.data_criada.substring(0, 10).split("-").reverse().join("/") + ", por <span style='font-weight: bold; color: #c96100;'>"+ devolverUsuarioAlteracao(alteracaoId) + "</span><span style='font-size: .9rem;'> (" + alteradosJSONObject[i].fields.popularidade + " " + frase + ")</span>";


                    criadaEm.innerHTML = criadaEmFormatada;


                    paragrafonome.setAttribute("class", "nome_entrada");




                paragrafo.innerHTML = relatorioAlterado;
                 paragrafoConclusao.innerHTML = conclusaoAlterada;

               paragrafonome.innerHTML = alteradosJSONObject[i].fields.nome + '<span style="color: gray; font-size: 1.0rem;"> (' + nomeMascara + ')</span><span style="display: none;">' + devolverUsuarioAlteracao(alteracaoId) + '</span>';



                      var divEntrada = document.createElement("div");

                    divEntrada.appendChild(paragrafonome);


                      divEntrada.appendChild(criadaEm);



                  divEntrada.appendChild(paragrafo);
                divEntrada.appendChild(paragrafoConclusao);


                                document.getElementById("direitadiv").appendChild(divEntrada);


                    linkAlteracao.innerHTML = "&lt;Usar Frase&gt;";
                      linkAlteracao.setAttribute("style", "color: #c96100;")

                    linkAlteracao.setAttribute("href", "../mascaras/alteracao/" + mascaraId + "/" + topicoParaAlterar + "/" + alteracaoId);

                   divEntrada.appendChild(linkAlteracao);

                  var divisoria = document.createElement("hr")
                  divEntrada.appendChild(divisoria);


                            }

                }
                var divLink = document.createElement("div");
                divLink.setAttribute("style", "text-align: center")
                divLink.setAttribute("id", "divlink")
                var linkMais = document.createElement("button");
                linkMais.setAttribute("onclick", "mostrarMais()");
                linkMais.setAttribute("class", "botaoLink");
                linkMais.setAttribute("id", "linkmais");


                divLink.appendChild(linkMais);
                 document.getElementById("direitadiv").appendChild(divLink);



        }
                        var resultado = calcularResultadosEncontrados()-5;
                        if(resultado > 0) {
                        document.getElementById("linkmais").innerHTML = "Mais " + resultado + " resultados";
}

    limitarEntradas();
    if(document.getElementById("procurarFrases").value == "") {

    } else {
        procurarEntradas("procurarFrases");

    }



}


function clicouAba(especialidadeid, exameid) {
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
              mascarasJsonObject = JSON.parse(mascarasJsonPopulares);
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

                    var paragrafoNome = document.createElement("a");
                    paragrafoNome.setAttribute("style", "color: #c96100; font-size: 1.3rem; font-weight: bold; text-decoration: none")
                  paragrafoNome.setAttribute("href", "../mascaras/" + mascarasJsonObject[i].pk);


                    var frase;

                    if(mascarasJsonObject[i].fields.popularidade == 1) {
                        frase = "usuário"
                    } else {
                        frase = "usuários"
                    }

                    var criadaEm = document.createElement("p");

                    var criadaEmFormatada = "Criada em " + mascarasJsonObject[i].fields.data_criada.substring(0, 10).split("-").reverse().join("/") + ", por <span style='font-weight: bold; color: #c96100;'>"+ usuarioResponsavel + "</span><span style='font-size: .9rem;'> (" + mascarasJsonObject[i].fields.popularidade + " " + frase + ")</span>";


                    criadaEm.innerHTML = criadaEmFormatada;

                    paragrafoNome.setAttribute("class", "nome_entrada");

                    var paragrafoTecnicaHeader = document.createElement("p");

                    paragrafoTecnicaHeader.setAttribute("style", "color: " + cor_topicos + "; text-align: " + alinhamento_topicos + "; font-size: " + tamanho_topicos + "; margin-top: " + margem_cabecalho + "; margin-bottom: 2px; font-weight: bold;")

                    var paragrafoTecnica = document.createElement("p");

                    paragrafoTecnica.setAttribute("style", "margin-top: 0; font-size: " + tamanho_fonte + "; font-family: " + fonte + "; color: " + cor_mascara + "; line-height: " + altura_linha + "; margin-bottom: " + espacamento_topicos)

                  var paragrafoRelatorioHeader = document.createElement("p");

                  paragrafoRelatorioHeader.setAttribute("style", "color: " + cor_topicos + "; text-align: " + alinhamento_topicos + "; font-size: " + tamanho_topicos + "; margin-top: " + margem_cabecalho + "; margin-bottom: 2px; font-weight: bold;")

                var paragrafoConclusaoHeader = document.createElement("p");

                paragrafoConclusaoHeader.setAttribute("style", "color: "+ cor_topicos + "; text-align: " + alinhamento_topicos + "; font-size: " + tamanho_topicos + "; margin-top: " + margem_cabecalho + "; margin-bottom: 2px; font-weight: bold;")


                var paragrafoConclusao = document.createElement("p");

                var divEntrada = document.createElement("div");


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

                  divEntrada.appendChild(criadaEm);

                  divEntrada.appendChild(paragrafo);
                  divEntrada.appendChild(paragrafoTecnicaHeader);
                  divEntrada.appendChild(paragrafoTecnica);
                  divEntrada.appendChild(paragrafoRelatorioHeader);

                    document.getElementById("direitadiv").appendChild(divEntrada);



                var divGeral = document.createElement("div");
                  divEntrada.appendChild(divGeral);



                  for(y=0; y < normaisObject.length; y++) {
                        if(normaisObject[y].fields.mascara == mascarasJsonObject[i].pk) {
                            var paragrafoRelatorio = document.createElement("div");
                            if(mascara_topicos === true && normaisObject[y].fields.orgao != "Nenhum órgão") {
                                paragrafoRelatorio.innerHTML = "<strong>" + normaisObject[y].fields.orgao + ": </strong>" + normaisObject[y].fields.relatorio;
                            } else {
                                paragrafoRelatorio.innerHTML = normaisObject[y].fields.relatorio;
                            }

                            paragrafoRelatorio.setAttribute("style", "margin-top: 0; font-size: " + tamanho_fonte + "; font-family: " + fonte + "; color: " + cor_mascara + "; margin-bottom: " + espacamento_topicos + "; line-height: " + altura_linha);
                              divGeral.appendChild(paragrafoRelatorio);


                        }
                    }

                  divEntrada.appendChild(paragrafoConclusaoHeader);
                  divEntrada.appendChild(paragrafoConclusao);


                  var linkMascara = document.createElement("a");
                  linkMascara.innerHTML = "&lt;Usar Máscara&gt;";
                  linkMascara.setAttribute("href", "../mascaras/" + mascarasJsonObject[i].pk);
                      linkMascara.setAttribute("style", "color: #c96100;")

                   divEntrada.appendChild(linkMascara);


                  var divisoria = document.createElement("hr")
                  divEntrada.appendChild(divisoria);

                }
            }
                var divLink = document.createElement("div");
                divLink.setAttribute("style", "text-align: center")
                divLink.setAttribute("id", "divlink")
                var linkMais = document.createElement("button");
                linkMais.setAttribute("onclick", "mostrarMais()");
                linkMais.setAttribute("id", "linkmais");
                linkMais.setAttribute("class", "botaoLink");
                divLink.appendChild(linkMais);
                 document.getElementById("direitadiv").appendChild(divLink);

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
                        relatorioAlterado = "<span style='font-weight: bold'>Relatório: </span>" + substituirVariaveis(alteradosJSONObject[i].fields.relatorio, devolverUsuarioAlteracaoInt(alteracaoId));
                        conclusaoAlterada = "<span style='font-weight: bold'>Conclusão: </span>" + substituirVariaveis(alteradosJSONObject[i].fields.conclusao, devolverUsuarioAlteracaoInt(alteracaoId));



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

            var mascarasObj = JSON.parse(mascarasJson);
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

                           var paragrafonome = document.createElement("a");
                           paragrafonome.setAttribute("href", "../mascaras/alteracao/" + mascaraId + "/" + topicoParaAlterar + "/" + alteracaoId);

                    paragrafonome.setAttribute("style", "color: #c96100; font-size: 1.3rem; font-weight: bold; text-decoration: none")


                     if(alteradosJSONObject[i].fields.popularidade == 1) {
                        frase = "usuário"
                    } else {
                        frase = "usuários"
                    }


                    var criadaEm = document.createElement("p");

                    var criadaEmFormatada = "Criada em " + alteradosJSONObject[i].fields.data_criada.substring(0, 10).split("-").reverse().join("/") + ", por <span style='color: #c96100; font-weight: bold'>"+ devolverUsuarioAlteracao(alteracaoId) + "</span><span style='font-size: .9rem;'> (" + alteradosJSONObject[i].fields.popularidade + " " + frase + ")</span>";


                    criadaEm.innerHTML = criadaEmFormatada;


                    paragrafonome.setAttribute("class", "nome_entrada");




                paragrafo.innerHTML = relatorioAlterado;
                 paragrafoConclusao.innerHTML = conclusaoAlterada;


                  paragrafonome.innerHTML = alteradosJSONObject[i].fields.nome + '<span style="color: gray; font-size: 1.0rem;"> (' + nomeMascara + ')</span><span style="display: none;">' + devolverUsuarioAlteracao(alteracaoId) + '</span>';

                      var divEntrada = document.createElement("div");

                    divEntrada.appendChild(paragrafonome);


                      divEntrada.appendChild(criadaEm);



                  divEntrada.appendChild(paragrafo);
                divEntrada.appendChild(paragrafoConclusao);


                                document.getElementById("direitadiv").appendChild(divEntrada);


                    linkAlteracao.innerHTML = "&lt;Usar Frase&gt;";
                      linkAlteracao.setAttribute("style", "color: #c96100;")

                    linkAlteracao.setAttribute("href", "../mascaras/alteracao/" + mascaraId + "/" + topicoParaAlterar + "/" + alteracaoId);

                   divEntrada.appendChild(linkAlteracao);

                  var divisoria = document.createElement("hr")
                  divEntrada.appendChild(divisoria);


                            }

                }
                var divLink = document.createElement("div");
                divLink.setAttribute("style", "text-align: center")
                divLink.setAttribute("id", "divlink")
                var linkMais = document.createElement("button");
                linkMais.setAttribute("onclick", "mostrarMais()");
                linkMais.setAttribute("class", "botaoLink");
                linkMais.setAttribute("id", "linkmais");


                divLink.appendChild(linkMais);
                 document.getElementById("direitadiv").appendChild(divLink);



        }
                        var resultado = calcularResultadosEncontrados()-5;
                        if(resultado > 0) {
                        document.getElementById("linkmais").innerHTML = "Mais " + resultado + " resultados";
}

    limitarEntradas();
    if(document.getElementById("procurarFrases").value == "") {

    } else {
        procurarEntradas("procurarFrases");

    }
                        document.getElementById("container").scrollIntoView();



}


function calcularResultadosEncontrados() {
    var children = document.getElementById("direitadiv").children;
       var counterEncontrados = 0;
       var counterAbertos = 0;
         for(i=0; i < children.length - 1; i++) {
            if(children[i].firstChild.innerHTML.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase().includes(document.getElementById("procurarFrases").value.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))) {

                counterEncontrados++;
            }
            if(children[i].style.display == "block") {
                counterAbertos++;
            }

         }

         return counterEncontrados - counterAbertos;
}


function eliminarLinkSeNecessario() {
     var children = document.getElementById("direitadiv").children;
       var counter = 0;
       var mostrarBotao = false;
         for(i=0; i < children.length - 1; i++) {
            if(children[i].style.display == "none" && children[i].firstChild.innerHTML.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase().includes(document.getElementById("procurarFrases").value.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))) {
                mostrarBotao = true;
            }

         }
         if(mostrarBotao) {
             document.getElementById("divlink").style.display = "block";

         } else {
            if(document.getElementById("divlink") != null) {
            document.getElementById("divlink").style.display = "none";
                }
         }
}

function mostrarMais() {

        var vezesClicado;

        if(getCookie("vezesClicadoMais") == null || getCookie("vezesClicadoMais") == "") {
            vezesClicado = 0;
        } else {
            vezesClicado = parseInt(getCookie("vezesClicadoMais"))+1;
        }


        setCookie("vezesClicadoMais", vezesClicado);


       var children = document.getElementById("direitadiv").children;
       var counter = 0;

        if(document.getElementById("procurarFrases").value.length == 0 || document.getElementById("clicouBotaoRadio").value == 0) {
               resultado = calcularResultadosEncontrados()-10;

        } else {
           resultado = calcularResultadosEncontrados()-5;

        }

         for(i=0; i < children.length; i++) {
            if(children[i].style.display == "none" && counter < 5 && children[i].firstChild.innerHTML.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase().includes(document.getElementById("procurarFrases").value.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))) {

                children[i].style.display = "block";
                counter++;
            }

         }
                     if(resultado > 0) {
                     document.getElementById("linkmais").innerHTML = "Mais " + resultado + " resultados";
                        }
        eliminarLinkSeNecessario();


}

function limitarEntradas() {
         var children = document.getElementById("direitadiv").children;
         for(i=5; i < children.length - 1; i++) {

            children[i].style.display = "none";

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
      li[i].parentNode.style.display = "block";
      counter++;
    } else {
      li[i].parentNode.style.display = "none";
    }

  }

    eliminarLinkSeNecessario();
    if(document.getElementById("linkmais") != null) {
    document.getElementById("linkmais").innerHTML = "Mais " + calcularResultadosEncontrados() + " resultados";
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
                        variavelNominal = variavelNominal.replace("{", "");
                        variavelNominal = variavelNominal.replace("}", "");
                        if(!listaVariaveisNominais.includes(variavelNominal)) {
                            listaVariaveisNominais[count] = variavelNominal;
                            count++;
                        }

                    }
                    } else {
                        variaveisQuantitativas.push(variavel.replace("{", "").replace("}", ""));
                    }
            }






            for(variavel of listaVariaveisNominais) {

                for(variavelUsuario of variaveisUsuarioJSONObject) {
                    if(variavelUsuario.fields.nome_da_variavel == variavel) {
                        provisoria = provisoria.replace("{" + variavel + "}", "{" + variavelUsuario.fields.nome_amigavel + "}");
                        provisoria = provisoria.replace("|" + variavel + "|", "|" + variavelUsuario.fields.nome_amigavel + "|");
                        provisoria = provisoria.replace("{" + variavel + "|", "{" + variavelUsuario.fields.nome_amigavel + "|");

                        provisoria = provisoria.replace("|" + variavel + "}", "|" + variavelUsuario.fields.nome_amigavel + "}");



                    }
                }

            }

            for(variavel of variaveisQuantitativas) {

                for(variavelUsuario of variaveisUsuarioJSONObject) {
                    if(variavelUsuario.fields.nome_da_variavel == variavel) {
                        provisoria = provisoria.replace("{" + variavel + "}", "{#}");

                    }
                }

            }

            return provisoria;

}







