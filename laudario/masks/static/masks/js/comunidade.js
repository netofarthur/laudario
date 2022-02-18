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
        document.getElementById("procurarFrases").setAttribute("placeholder", "Procurar frases ou usuários");

    } else {
        document.getElementById("procurarFrases").setAttribute("placeholder", "Procurar máscaras ou usuários");

    }
    var especialidadeid = document.getElementById("especialidadeHidden").value;
    var exameid = document.getElementById("exameHidden").value;

    clicouAba(especialidadeid, exameid, 0, 1);



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





function clicouAba(especialidadeid, exameid, counter, resetar) {

        document.getElementById("myfooter").setAttribute("class", "normalfooter");

        if(document.getElementById("next") != null) {
            document.getElementById("next").remove();
        }


        limparTodosBotoes();
        var todas = document.getElementsByName(especialidadeid);
        for(i=0; i < todas.length; i++) {
            if(todas[i].parentNode.parentNode.id == "collapse" + exameid) {
                todas[i].style.backgroundColor = "lightgray";
            }

        }



        if(resetar == 1) {
            document.getElementById("direitadiv").innerHTML = "";
            document.getElementById("outerdiv").scrollIntoView();
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


        if(document.getElementById("minhasRadio").checked) {

              mascarasJsonObject = JSON.parse(mascarasJsonUsuario);
              alteradosJSONObject = JSON.parse(alteradosUsuario);

        } else if(document.getElementById("masqsRadio").checked) {
              alteradosJSONObject = JSON.parse(alteradosRecentes);
              mascarasJsonObject = JSON.parse(mascarasRecentes);

        } else {
            mascarasJsonObject = JSON.parse(mascarasJsonPopulares);
              alteradosJSONObject = JSON.parse(alteradosPopulares);
        }


        var usuarioResponsavel;


        if(document.getElementById("mascarasRadio").checked) {


        var count = 0;

            for(i=counter; i < mascarasJsonObject.length; i++) {
                if(count >= 5) {
                var botao = document.createElement("button");
                botao.setAttribute("onclick", "clicouAba(" + document.getElementById("especialidadeHidden").value + ", " + document.getElementById("exameHidden").value + ", " + i + ", 0)");
                botao.innerHTML = "Mostrar mais";
                botao.id = "next";

                    document.getElementById("direitadiv").appendChild(botao);

                    break;
                }
                if(mascarasJsonObject[i].fields.especialidade == especialidadeid && mascarasJsonObject[i].fields.exame == exameid) {
                count++;


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



                        }

                    }
                    var mascara_topicos = mascarasJsonObject[i].fields.mascara_topicos
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
                            if(mascara_topicos === true && normaisObject[y].fields.orgao != "Nenhum órgão" && normaisObject[y].fields.relatorio != "") {
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

                    divEntrada.innerHTML = substituirVariaveisMascara(divEntrada.innerHTML, devolverUsuarioMascaraInt(mascarasJsonObject[i].pk));



                  var linkMascara = document.createElement("a");
                  linkMascara.innerHTML = "&lt;Usar Máscara&gt;";
                  linkMascara.setAttribute("href", "../mascaras/" + mascarasJsonObject[i].pk);
                      linkMascara.setAttribute("style", "color: #c96100;")
                        linkMascara.setAttribute("target", "_blank");

                   divEntrada.appendChild(linkMascara);


                  var divisoria = document.createElement("hr")
                  divEntrada.appendChild(divisoria);

                }
            }


        } else {




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
            var count = 0;
                for(i = counter; i < alteradosJSONObject.length; i++) {
                if(count >= 5) {
                var botao = document.createElement("button");
                botao.setAttribute("onclick", "clicouAba(" + document.getElementById("especialidadeHidden").value + ", " + document.getElementById("exameHidden").value + ", " + i + ", 0)");
                botao.innerHTML = "Mostrar mais";
                botao.id = "next";

                    document.getElementById("direitadiv").appendChild(botao);

                    break;
                }
                            if(topicosNormaisValidos.includes(alteradosJSONObject[i].fields.topico_normal)) {
                            count++;
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

                    linkAlteracao.setAttribute("target", "_blank");

                   divEntrada.appendChild(linkAlteracao);

                  var divisoria = document.createElement("hr")
                  divEntrada.appendChild(divisoria);


                            }

                }






        }






 if(isScrolledIntoView(document.getElementById("myfooter"))) {
        document.getElementById("myfooter").setAttribute("class", "fixedfooter");
     } else {
        document.getElementById("myfooter").setAttribute("class", "normalfooter");

     }

}





function procurarTudo(counter, resetar) {

if(document.getElementById("next") != null) {
            document.getElementById("next").remove();
        }

          if(resetar == 1) {
            document.getElementById("direitadiv").innerHTML = "";
        }




        if(document.getElementById("procurarFrases").value.length == 1) {
            alert("Digite ao menos dois caracteres para realizar uma busca geral")
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
        var count = 0;



            for(i=counter; i < mascarasJsonObject.length; i++) {



                if(devolverUsuarioMascara(mascarasJsonObject[i].pk).toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(document.getElementById("procurarFrases").value.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")) || mascarasJsonObject[i].fields.nome.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(document.getElementById("procurarFrases").value.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))) {
                    count++;
                    encontrou = true;
                    usuarioResponsavelInt = mascarasJsonObject[i].fields.usuario;


                    for(z=0; z < usuariosObject.length; z++) {
                        if(usuariosObject[z].pk == usuarioResponsavelInt) {
                            usuarioResponsavel = usuariosObject[z].fields.username;

                        }

                    }

                    if(count >= 5 && encontrou) {
                var botao = document.createElement("button");
                botao.setAttribute("onclick", "procurarTudo(" + i + ", 0)");
                botao.innerHTML = "Mostrar mais";
                botao.id = "next";

                    document.getElementById("direitadiv").appendChild(botao);

                    break;
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



                        }

                    }
                    var mascara_topicos = mascarasJsonObject[i].fields.mascara_topicos;

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
                            if(mascara_topicos === true && normaisObject[y].fields.orgao != "Nenhum órgão" && normaisObject[y].fields.relatorio != "") {
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

                    divEntrada.innerHTML = substituirVariaveisMascara(divEntrada.innerHTML, devolverUsuarioMascaraInt(mascarasJsonObject[i].pk));


                  var linkMascara = document.createElement("a");
                  linkMascara.innerHTML = "&lt;Usar Máscara&gt;";
                  linkMascara.setAttribute("href", "../mascaras/" + mascarasJsonObject[i].pk);
                      linkMascara.setAttribute("style", "color: #c96100;")
                        linkMascara.setAttribute("target", "_blank");

                   divEntrada.appendChild(linkMascara);


                  var divisoria = document.createElement("hr")
                  divEntrada.appendChild(divisoria);

                }
            }


        } else {



                var count = 0;

                for(i = counter; i < alteradosJSONObject.length; i++) {



                            if(devolverUsuarioAlteracao(alteradosJSONObject[i].pk).toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(document.getElementById("procurarFrases").value.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")) || alteradosJSONObject[i].fields.nome.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(document.getElementById("procurarFrases").value.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))) {
                        var alteracaoId = alteradosJSONObject[i].pk;
                        encontrou = true;
                        count++;

                        nome = alteradosJSONObject[i].fields.nome;
                        relatorioAlterado = "<span style='font-weight: bold'>Relatório: </span>" + substituirVariaveis(alteradosJSONObject[i].fields.relatorio, devolverUsuarioAlteracaoInt(alteracaoId));
                        conclusaoAlterada = "<span style='font-weight: bold'>Conclusão: </span>" + substituirVariaveis(alteradosJSONObject[i].fields.conclusao, devolverUsuarioAlteracaoInt(alteracaoId));

            if(count >= 5 && encontrou) {
               var botao = document.createElement("button");
                botao.setAttribute("onclick", "procurarTudo(" + i + ", 0)");
                botao.innerHTML = "Mostrar mais";
                botao.id = "next";

                    document.getElementById("direitadiv").appendChild(botao);

                    break;
                }

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

                    linkAlteracao.setAttribute("target", "_blank");


                   divEntrada.appendChild(linkAlteracao);

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





function substituirVariaveisMascara(descricao, usuarioId) {

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



//Execute after page loads
document.addEventListener('DOMContentLoaded', function() {




 if(isScrolledIntoView(document.getElementById("myfooter"))) {
        document.getElementById("myfooter").setAttribute("class", "fixedfooter");
     } else {
        document.getElementById("myfooter").setAttribute("class", "normalfooter");

     }

    }, false);




function isScrolledIntoView(elem)
{
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}