
function popularMascara(mascaraId) {

        var entradasNomesOrgaos = document.getElementsByName("orgao");
        var entradasRelatorios = document.getElementsByName("relatorio_orgao");
        var orgaoLabels = document.getElementsByName("orgaolabel");
        var orgaoSpans = document.getElementsByName("orgaospan");
        var orgaoBrs = document.getElementsByName("orgaobr");

         var mascarasJSONObject = JSON.parse(mascarasJson);

        var topicosNormaisObject = JSON.parse(topicosNormais);


        let listaOrgaos = document.getElementById("lista_orgaos");


       while (listaOrgaos.firstChild) {
            listaOrgaos.removeChild(listaOrgaos.firstChild);
        }



        var nome;
        var titulo;
        var tecnicaHeader;
        var tecnica;
        var relatorioHeader;
        var conclusaoHeader;
        var conclusao;

        for(i = 0; i < mascarasJSONObject.length; i++) {
            if(mascarasJSONObject[i].pk == mascaraId) {
                nome = mascarasJSONObject[i].fields.nome;
                titulo = mascarasJSONObject[i].fields.titulo;
                tecnicaHeader = mascarasJSONObject[i].fields.tecnica_header;
                tecnica = mascarasJSONObject[i].fields.tecnica;
                relatorioHeader = mascarasJSONObject[i].fields.relatorio_header;
                conclusaoHeader = mascarasJSONObject[i].fields.conclusao_header;
                conclusao = mascarasJSONObject[i].fields.conclusao;


            }
        }
        let counter = 0;
        for(i = 0; i < topicosNormaisObject.length; i++) {
            if(topicosNormaisObject[i].fields.mascara == mascaraId) {
                    if(entradasNomesOrgaos[counter] == null) {
                            adicionarEntradaOrgao();

                    }
                    entradasNomesOrgaos[counter].setAttribute("value", topicosNormaisObject[i].fields.orgao);
                    entradasRelatorios[counter].setAttribute("value", topicosNormaisObject[i].fields.relatorio);
                    counter++;


            }
        }

        document.getElementById("nome_exame").value = nome;
        document.getElementById("titulo_exame").value = titulo;
        document.getElementById("tecnica_header").value = tecnicaHeader;
        document.getElementById("tecnica").value = tecnica;
        document.getElementById("relatorio_header").value = relatorioHeader;
        document.getElementById("conclusao").value = conclusao;
        document.getElementById("conclusao_header").value = conclusaoHeader;
        document.getElementById("conclusao").value = conclusao;


}

  function adicionarEntradaOrgao() {

    let listaOrgaos = document.getElementById("lista_orgaos");
    let label = document.createElement("label");
    label.setAttribute("for", "orgao");
    label.setAttribute("name", "orgaolabel")
    label.innerHTML = "Órgão: ";

    let orgao = document.createElement("input");
    orgao.setAttribute("type", "text");
    orgao.setAttribute("name", "orgao");


    let descricaoOrgao = document.createElement("input");
    descricaoOrgao.setAttribute("type", "text");
    descricaoOrgao.setAttribute("name", "relatorio_orgao");
    descricaoOrgao.setAttribute("placeholder", "Descrição normal do órgão");

    let span = document.createElement("span");
    span.setAttribute("name", "orgaospan");

    span.innerHTML = " : ";
    let br = document.createElement("br");
    br.setAttribute("name", "orgaobr");



    let anchor = document.getElementById("adicionar_entrada_orgao");


    if(listaOrgaos.contains(anchor)) {
        listaOrgaos.removeChild(anchor);

    } else {
        anchor = document.createElement("a");
        anchor.setAttribute("href", "javascript:adicionarEntradaOrgao()");
        anchor.setAttribute("id", "adicionar_entrada_orgao");
        anchor.innerHTML = "Novo órgão";

    }


    listaOrgaos.appendChild(label);
    listaOrgaos.appendChild(orgao);
    listaOrgaos.appendChild(span);
    listaOrgaos.appendChild(descricaoOrgao);
    listaOrgaos.appendChild(br);
    listaOrgaos.appendChild(anchor);



  }

