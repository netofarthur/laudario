
function popularMascara(mascaraId) {
        removerTopicos();
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
                indicacoesHeader = mascarasJSONObject[i].fields.indicacoes_header;
                indicacoes = mascarasJSONObject[i].fields.indicacoes;
                tecnicaHeader = mascarasJSONObject[i].fields.tecnica_header;
                tecnica = mascarasJSONObject[i].fields.tecnica;
                relatorioHeader = mascarasJSONObject[i].fields.relatorio_header;
                conclusaoHeader = mascarasJSONObject[i].fields.conclusao_header;
                conclusao = mascarasJSONObject[i].fields.conclusao;


            }
        }
        let counter = 0;

        let counter2 = parseInt(document.getElementById("clicou_remover").value);

        for(i = 0; i < topicosNormaisObject.length; i++) {
            if(topicosNormaisObject[i].fields.mascara == mascaraId) {
                    if(entradasNomesOrgaos[counter] == null) {
                            adicionarEntradaOrgao("adicionar_entrada_orgao" + entradasNomesOrgaos.length + 1);

                    }


                     if(topicosNormaisObject[i].fields.orgao == "Nenhum órgão") {
                    } else {
                        entradasNomesOrgaos[counter].setAttribute("value", topicosNormaisObject[i].fields.orgao);

                    //tem que pegar os tinymce e popular cada um com set, como feito na técnica e conclusão

                     tinymce.get("text_area_orgao" + (counter2)).setContent(topicosNormaisObject[i].fields.relatorio);
                    counter2++;
                    counter++;
                    }



            }
        }

        document.getElementById("exames").value = exame;
        document.getElementById("especialidades").value = especialidade;
        document.getElementById("nome_exame").value = nome;
        document.getElementById("titulo_exame").value = titulo;
        document.getElementById("indicacoes_header").value = indicacoesHeader;
        document.getElementById("indicacoes").value = indicacoes;
        document.getElementById("tecnica_header").value = tecnicaHeader;
        tinymce.get("tecnica").setContent(tecnica);
        document.getElementById("relatorio_header").value = relatorioHeader;
        document.getElementById("conclusao_header").value = conclusaoHeader;
        tinymce.get("conclusao").setContent(conclusao);


}


  function adicionarEntradaOrgao(id) {

    let listaOrgaos = document.getElementById("lista_orgaos");
    let listaNomesOrgaos = document.getElementsByName("orgao");
    let label = document.createElement("label");
    label.setAttribute("for", "orgao");
    label.setAttribute("name", "orgaolabel");
    label.innerHTML = "Tópico: ";

    let orgao = document.createElement("input");
            orgao.style.marginBottom = "5px";

    orgao.setAttribute("type", "text");
    orgao.setAttribute("name", "orgao");
    orgao.style.flex = "2";

    let orgaoDiv = document.createElement("div");
    orgaoDiv.setAttribute("name", "orgao_div");

    let topicoIdHidden = document.createElement("input");
    topicoIdHidden.setAttribute("name", "id_orgao");
    topicoIdHidden.setAttribute("type", "hidden");
    topicoIdHidden.setAttribute("value", "vazio");

    let orgaoDivFlex = document.createElement("div");
    orgaoDivFlex.style.display = "flex";


    let descricaoOrgao = document.createElement("textarea");
    descricaoOrgao.setAttribute("rows", "3");
    descricaoOrgao.setAttribute("type", "text");
    descricaoOrgao.setAttribute("name", "relatorio_orgao");

           if(listaOrgaos.children.length == 0) {
                       descricaoOrgao.setAttribute("id", "text_area_orgao" + (listaOrgaos.children.length + parseInt(document.getElementById("clicou_remover").value)));

           } else {
                                  descricaoOrgao.setAttribute("id", "text_area_orgao" + (listaOrgaos.children.length - 1 + parseInt(document.getElementById("clicou_remover").value)));

           }







        descricaoOrgao.setAttribute("class", "paragrafo_mascara");



    descricaoOrgao.setAttribute("placeholder", "Descrição normal do tópico");


    let br = document.createElement("br");
    br.setAttribute("name", "orgaobr");



    let anchor = document.createElement("button");

    let remover = document.createElement("button");
    remover.setAttribute("type", "button");
    remover.setAttribute("name", "botao_remover");
    remover.setAttribute("class", "botao_remover");
    remover.setAttribute("onclick", "removerEntradaOrgao(this.id)");
     remover.setAttribute("id", listaNomesOrgaos.length);
        remover.style.marginBottom = "5px";
        remover.innerHTML = "Remover";


        anchor.setAttribute("onclick", "adicionarEntradaOrgao(this.id)");
            anchor.setAttribute("type", "button");
            anchor.setAttribute("class", "botao_novo_topico");

        var numero = listaNomesOrgaos.length + 1;

        anchor.setAttribute("id", "adicionar_entrada_orgao" + numero);
        anchor.innerHTML = "Novo tópico";

    document.getElementById(id).parentNode.parentNode.insertBefore(orgaoDiv, document.getElementById(id).parentNode.nextSibling);
        orgaoDiv.appendChild(orgaoDivFlex);
    orgaoDivFlex.appendChild(topicoIdHidden);

   orgaoDivFlex.appendChild(label);
    orgaoDivFlex.appendChild(orgao);
    orgaoDivFlex.appendChild(remover);
    orgaoDiv.appendChild(descricaoOrgao);

    orgaoDiv.appendChild(anchor);



           tinymce.init({

        selector: '#' + descricaoOrgao.getAttribute("id"),
    language: 'pt_BR',
    forced_root_block: false,
        plugins: "table",
          menubar: false,
        toolbar: "bold italic underline forecolor table",
          fontsize_formats: '11px 12px 14px 16px 18px 24px 36px 48px',
            branding: false,
              elementpath: false

      });




  }


function removerEntradaOrgao(id) {
    let listaOrgaos = document.getElementById("lista_orgaos");

  document.getElementById(id).parentNode.parentNode.style.display = "none";

    document.getElementById("clicou_remover").value = parseInt(document.getElementById("clicou_remover").value) + 1;



}


function removerTopicos() {
        let listaOrgaos = document.getElementById("lista_orgaos");
        let counter = listaOrgaos.children.length;
        for(var i = 0; i < counter - 1; i++) {
            removerEntradaOrgao(i);
        }

}


function filtrarMascaras() {
      let especialidadeSelecionada = document.getElementById("especialidades").value;
      let exameSelecionado = document.getElementById("exames").value;
  let todasMascaras = document.getElementsByClassName("botao_diagnostico");

     var mascarasJSONObject = JSON.parse(mascarasJson);



        let mascarasSelecionadasIds = [];

        for(i = 0; i < mascarasJSONObject.length; i++) {
            if(mascarasJSONObject[i].fields.especialidade == especialidadeSelecionada && mascarasJSONObject[i].fields.exame == exameSelecionado) {
                mascarasSelecionadasIds.push((mascarasJSONObject[i].pk).toString());
            }
        }


        for(i = 0; i < todasMascaras.length; i++) {

            if(mascarasSelecionadasIds.includes(todasMascaras[i].getAttribute("id"))) {

                todasMascaras[i].style.display = "block";

             } else {
                todasMascaras[i].style.display = "none";


             }

        }

}