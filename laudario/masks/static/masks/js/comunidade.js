function clicouBotaoRadio() {
    var especialidadeid = document.getElementById("especialidadeHidden").value;
    var exameid = document.getElementById("exameHidden").value;
    clicouAba(especialidadeid, exameid);
}


function clicouAba(especialidadeid, exameid) {


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

        } else if(document.getElementById("popularRadio").checked) {
              mascarasJsonObject = JSON.parse(mascarasJsonPopulares);
              alteradosJSONObject = JSON.parse(alteradosPopulares);

        } else {
              mascarasJsonObject = JSON.parse(mascarasJsonUsuario);
              alteradosJSONObject = JSON.parse(alteradosUsuario);

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

                    var tituloExame = mascarasJsonObject[i].fields.titulo;
                    var paragrafo = document.createElement("p");

                    paragrafo.setAttribute("style", "text-transform: " + capitalizacao + "; color: " + cor_titulo + "; text-align: " + alinhamento_titulo + "; font-size: " + tamanho_titulo + "; font-weight: bold;")

                    var paragrafoNome = document.createElement("p");

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
                paragrafoNome.innerHTML = mascarasJsonObject[i].fields.nome;

                    paragrafo.innerHTML = tituloExame;

                    var paragrafoUsuario = document.createElement("p");
                    paragrafoUsuario.style.fontWeight = "bold";

                    paragrafoUsuario.innerHTML = usuarioResponsavel;
                    divEntrada.appendChild(paragrafoNome);
                    divEntrada.appendChild(paragrafoUsuario);
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
                            paragrafoRelatorio.innerHTML = normaisObject[y].fields.relatorio;
                            paragrafoRelatorio.setAttribute("style", "margin-top: 0; font-size: " + tamanho_fonte + "; font-family: " + fonte + "; color: " + cor_mascara + "; margin-bottom: " + espacamento_topicos + "; line-height: " + altura_linha);
                              divGeral.appendChild(paragrafoRelatorio);


                        }
                    }

                  divEntrada.appendChild(paragrafoConclusaoHeader);
                  divEntrada.appendChild(paragrafoConclusao);


                  var linkMascara = document.createElement("a");
                  linkMascara.innerHTML = "Usar";
                  linkMascara.setAttribute("href", "../mascaras/" + mascarasJsonObject[i].pk);
                   divEntrada.appendChild(linkMascara);


                  var divisoria = document.createElement("hr")
                  divEntrada.appendChild(divisoria);

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
                        nome = alteradosJSONObject[i].fields.nome;
                        relatorioAlterado = alteradosJSONObject[i].fields.relatorio;
                        conclusaoAlterada = alteradosJSONObject[i].fields.conclusao;

                        var paragrafo = document.createElement("p");
                        var paragrafoConclusao = document.createElement("p");
                        var paragrafoUsuarioAlt = document.createElement("p");
                        paragrafoUsuarioAlt.style.fontWeight = "bold";

                        var paragrafonome = document.createElement("p");
                    paragrafonome.setAttribute("class", "nome_entrada");


                paragrafo.innerHTML = relatorioAlterado;
                 paragrafoConclusao.innerHTML = conclusaoAlterada;
                  paragrafoUsuarioAlt.innerHTML = usuarioResponsavel;
                  paragrafonome.innerHTML = alteradosJSONObject[i].fields.nome;

                      var divEntrada = document.createElement("div");


                      divEntrada.appendChild(paragrafonome);

                    divEntrada.appendChild(paragrafoUsuarioAlt);

                  divEntrada.appendChild(paragrafo);
                divEntrada.appendChild(paragrafoConclusao);


                                document.getElementById("direitadiv").appendChild(divEntrada);


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


                    linkAlteracao.setAttribute("href", "../mascaras/alteracao/" + mascaraId + "/" + topicoParaAlterar + "/" + alteracaoId);

                   divEntrada.appendChild(linkAlteracao);

                  var divisoria = document.createElement("hr")
                  divEntrada.appendChild(divisoria);


                            }

                }


        }



}


function procurarEntradas(id) {
  // Declare variables
  var input, filter, li, i, txtValue;
  input = document.getElementById(id);
  filter = input.value.toUpperCase();
  li = document.getElementsByClassName('nome_entrada');

  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < li.length; i++) {
    txtValue = li[i].innerHTML;
    if (txtValue.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase().indexOf(filter.normalize("NFD").replace(/[\u0300-\u036f]/g, "")) > -1) {
      li[i].parentNode.style.display = "block";
    } else {
      li[i].parentNode.style.display = "none";
    }

  }
}





