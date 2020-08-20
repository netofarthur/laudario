
function popularMascara(mascaraId) {

        var usuarioSelecionadoId;
        var mascaras = JSON.parse(mascarasJson);


        for(mascara of mascaras) {
                if(mascara.pk == mascaraId) {
                    usuarioSelecionadoId = mascara.fields.usuario;
                }

        }

        document.getElementById("usuario_id_alteracao").value = usuarioSelecionadoId;
        document.getElementById("mascara_aproveitada").value = mascaraId;

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

        var exame;
        var especialidade;
        var nome;
        var titulo;
        var tecnicaHeader;
        var tecnica;
        var relatorioHeader;
        var conclusaoHeader;
        var conclusao;


        for(i = 0; i < mascarasJSONObject.length; i++) {
            if(mascarasJSONObject[i].pk == mascaraId) {
                exame = mascarasJSONObject[i].fields.exame;
                especialidade = mascarasJSONObject[i].fields.especialidade;
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


                     if(topicosNormaisObject[i].fields.orgao == "Nenhum órgão") {
                    } else {
                        entradasNomesOrgaos[counter].setAttribute("value", topicosNormaisObject[i].fields.orgao);

                    //tem que pegar os tinymce e popular cada um com set, como feito na técnica e conclusão
                    entradasRelatorios[counter].innerHTML = topicosNormaisObject[i].fields.relatorio;

                    counter++;
                    }



            }
        }

        document.getElementById("exames").value = exame;
        document.getElementById("especialidades").value = especialidade;
        document.getElementById("nome_exame").value = nome;
        document.getElementById("titulo_exame").value = titulo;
        document.getElementById("tecnica_header").value = tecnicaHeader;
        tinymce.get("tecnica").setContent("<p>" + tecnica + "</p>");
        document.getElementById("relatorio_header").value = relatorioHeader;
        document.getElementById("conclusao_header").value = conclusaoHeader;
        tinymce.get("conclusao").setContent("<p>" + conclusao + "</p>");


}


  function adicionarEntradaOrgao() {

    let listaOrgaos = document.getElementById("lista_orgaos");
    let label = document.createElement("label");
    label.setAttribute("for", "orgao");
    label.setAttribute("name", "orgaolabel");
    label.innerHTML = "Órgão: ";

    let orgao = document.createElement("input");
            orgao.style.marginBottom = "5px";

    orgao.setAttribute("type", "text");
    orgao.setAttribute("name", "orgao");
    orgao.style.flex = "2";

    let orgaoDiv = document.createElement("div");
    orgaoDiv.setAttribute("name", "orgao_div");

    let orgaoDivFlex = document.createElement("div");
    orgaoDivFlex.style.display = "flex";


    let descricaoOrgao = document.createElement("textarea");
    descricaoOrgao.setAttribute("rows", "3");
    descricaoOrgao.setAttribute("type", "text");
    descricaoOrgao.setAttribute("name", "relatorio_orgao");


        descricaoOrgao.setAttribute("id", "text_area_orgao" + listaOrgaos.children.length);





        descricaoOrgao.setAttribute("class", "paragrafo_mascara");



    descricaoOrgao.setAttribute("placeholder", "Descrição normal do órgão");


    let br = document.createElement("br");
    br.setAttribute("name", "orgaobr");



    let anchor = document.getElementById("adicionar_entrada_orgao");

    let remover = document.createElement("button");
    remover.setAttribute("type", "button");
    remover.setAttribute("onclick", "removerEntradaOrgao(this.id)");
     remover.setAttribute("id", listaOrgaos.children.length);
        remover.style.marginBottom = "5px";
        remover.innerHTML = "Remover";

    if(listaOrgaos.contains(anchor)) {

        listaOrgaos.removeChild(anchor);

    } else {
        anchor = document.createElement("a");
        anchor.setAttribute("href", "javascript:adicionarEntradaOrgao()");
        anchor.setAttribute("id", "adicionar_entrada_orgao");
        anchor.innerHTML = "Novo órgão";

    }
    listaOrgaos.appendChild(orgaoDiv);
        orgaoDiv.appendChild(orgaoDivFlex);

   orgaoDivFlex.appendChild(label);
    orgaoDivFlex.appendChild(orgao);
    orgaoDivFlex.appendChild(remover);
    orgaoDiv.appendChild(descricaoOrgao);
           tinymce.init({
        selector: '#' + descricaoOrgao.getAttribute("id"),
        plugins: "table",
          menubar: false,
        toolbar: "bold italic underline forecolor table",
          fontsize_formats: '11px 12px 14px 16px 18px 24px 36px 48px',
            branding: false,
              elementpath: false

      });
    listaOrgaos.appendChild(anchor);

  }


function removerEntradaOrgao(id) {
    let listaOrgaos = document.getElementById("lista_orgaos");
    listaOrgaos.removeChild(document.getElementById(id).parentNode.parentNode);
    document.getElementById("clicou_remover").value = parseInt(document.getElementById("clicou_remover").value) + 1;




}

