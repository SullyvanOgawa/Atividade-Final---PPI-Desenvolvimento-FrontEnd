const urlBase = "http://localhost:3000";

function exibirImoveis(){
    fetch(urlBase + "/imoveis", {
        method: "GET"
    })
    .then((resposta) => {
        if(resposta.ok){
            return resposta.json();
        }
    })
    .then((conteudoJSON) => {

        if(conteudoJSON.status){

            const container = document.getElementById("exibirImoveis");
            container.innerHTML = "";

            if(conteudoJSON.imoveis.length == 0){
                mostrarMensagem("warning", "Nenhum imóvel foi encontrado!");
                return;
            }

            const linha = document.createElement("div");
            linha.className = "row row-cols-1 row-cols-md-3 g-4";

            for(const imovel of conteudoJSON.imoveis){

                const coluna = document.createElement("div");
                coluna.className = "col";

                coluna.innerHTML = `
                    <div class="card h-100 shadow-sm">

                        <div class="card-body">
                            <h5 class="card-title ">${imovel.titulo}</h5>

                            <p class="card-text">
                                <strong>Valor:</strong> 
                                ${Number(imovel.valor).toLocaleString('pt-BR', {
                                    style: 'currency',
                                    currency: 'BRL'
                                })}
                            </p>

                            <p class="card-text">
                                <strong>Tipo:</strong> ${imovel.tipo.descricao}
                            </p>
                        </div>

                    </div>
                `;

                linha.appendChild(coluna);
            }

            container.appendChild(linha);

        }
        else{
            mostrarMensagem("danger", conteudoJSON.mensagem);
        }

    })
    .catch((erro) => {
        mostrarMensagem("danger", "Erro ao obter os imóveis! " + erro);
    });
}

exibirImoveis();

setInterval(() => {
    exibirImoveis();
}, 3000);