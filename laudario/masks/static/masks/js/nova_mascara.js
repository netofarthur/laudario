
  function adicionarEntradaOrgao() {

    let listaOrgaos = document.getElementById("lista_orgaos");
    let label = document.createElement("label");
    label.setAttribute("for", "orgao");
    label.innerHTML = "Órgão: ";

    let orgao = document.createElement("input");
    orgao.setAttribute("type", "text");
    orgao.setAttribute("id", "orgao");
    orgao.setAttribute("name", "orgao");

    let descricaoOrgao = document.createElement("input");
    descricaoOrgao.setAttribute("type", "text");
    descricaoOrgao.setAttribute("id", "relatorio_orgao");
    descricaoOrgao.setAttribute("name", "relatorio_orgao");
    descricaoOrgao.setAttribute("placeholder", "Descrição normal do órgão");

    let span = document.createElement("span");
    span.innerHTML = " : ";
    let br = document.createElement("br");

    let anchor = document.getElementById("adicionar_entrada_orgao");

    listaOrgaos.removeChild(anchor);
    listaOrgaos.appendChild(label);
    listaOrgaos.appendChild(orgao);
    listaOrgaos.appendChild(span);
    listaOrgaos.appendChild(descricaoOrgao);
    listaOrgaos.appendChild(br);
    listaOrgaos.appendChild(anchor);


  }

