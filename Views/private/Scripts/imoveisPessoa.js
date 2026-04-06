
const urlBase = "http://localhost:3000";


function exibeImoveisPessoa(idPessoa){
    fetch(urlBase + "/imoveis/", {
        method: "GET"
    })
    .then((resposta) => {
        if(resposta.ok){
            return resposta.json();
        }
    })
    .then((conteudoJSON) => {
        if(conteudoJSON.status){
            const exibeImoveis = document.getElementById("listaImoveis");
            exibeImoveis.innerHTML = "";
            if(conteudoJSON.imoveis.length == 0){
                mostrarMensagem("warning", "Não existe nenhum imóvel vinculado a essa pessoa!");
            }
            else{

                const imoveisPessoa = conteudoJSON.imoveis.filter(imovel => imovel.pessoa.id == idPessoa);
                
                const nomePessoa = document.getElementById("nomePessoa");
                if(imoveisPessoa.length > 0){
                    nomePessoa.textContent = imoveisPessoa[0].pessoa.nome;
                } else {
                    nomePessoa.textContent = "Nenhum imóvel encontrado para essa pessoa";
                }
                                

                const linha = document.createElement("div");
                linha.className = "row row-cols-1 row-cols-md-2 g-4";
                for(const imovel of imoveisPessoa){
                    const coluna = document.createElement("div");
                    coluna.className = "col";

                    coluna.innerHTML = `
                        <div class="card shadow-sm h-100">
                            <div class="card-body ">
                                <h3 class="card-title">${imovel.titulo}</h3>
                                <p class="card-text">
                                    <strong>Tipo:</strong>
                                    ${imovel.tipo.descricao}
                                </p>
                                <p class="card-text">
                                    <strong>Valor:</strong>
                                    ${imovel.valor}
                                </p>
                            </div>
                        </div>
                    `;
                    
                    linha.appendChild(coluna);
                }

                exibeImoveis.appendChild(linha);
            }
        }
    })
    .catch((erro) => {
        mostrarMensagem("danger", "Erro ao carregar Imóveis" + erro);
    });
}

function mostrarMensagem(tipo ="success", mensagem = "Mensagem Padrão") {
    const divMensagem = document.getElementById("mensagem");
    divMensagem.innerHTML = `
        <div class="alert alert-${tipo} alert-dismissible fade show" role="alert">
            ${mensagem}
        </div>
    `;
    setTimeout(() => {
        divMensagem.innerHTML = "";
    }, 6000);
    
}

exibeImoveisPessoa();

