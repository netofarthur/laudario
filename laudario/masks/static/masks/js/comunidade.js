function clicouAba(especialidadeid, exameid) {






        var alteradosJSONObject = JSON.parse(alterados);
        var mascarasJsonObject = JSON.parse(mascarasJson);
        var normaisObject = JSON.parse(normais);
        var nome;
        var relatorioAlterado;


        var mascarasValidas = [];
        var topicosNormaisValidos = [];



        if(document.getElementById("mascarasRadio").checked) {


             document.getElementById("direitadiv").innerHTML = "";
            for(i=0; i < mascarasJsonObject.length; i++) {
                if(mascarasJsonObject[i].fields.especialidade == especialidadeid && mascarasJsonObject[i].fields.exame == exameid) {

                    var tituloExame = mascarasJsonObject[i].fields.titulo;
                    var paragrafo = document.createElement("p");

                    paragrafo.innerHTML = tituloExame;
                  document.getElementById("direitadiv").appendChild(paragrafo);
                }
            }


        } else {


             document.getElementById("direitadiv").innerHTML = "";


            for(i=0; i < mascarasJsonObject.length; i++) {
                if(mascarasJsonObject[i].fields.especialidade == especialidadeid && mascarasJsonObject[i].fields.exame == exameid) {
                    mascarasValidas.push(mascarasJsonObject[i].pk);
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

                        paragrafo = document.createElement("p");

                paragrafo.innerHTML = relatorioAlterado;
                  document.getElementById("direitadiv").appendChild(paragrafo);


                            }

                }


        }



}

