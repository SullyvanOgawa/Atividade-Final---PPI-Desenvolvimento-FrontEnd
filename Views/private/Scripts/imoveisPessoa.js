
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

               const imoveisDaPessoa = conteudoJSON.imoveis.filter(imovel => imovel.pessoa.id == idPessoa);

               if(imoveisDaPessoa.length == 0){
                    mostrarMensagem("warning", "Nenhum imóvel foi encontrado!");
               }

                const linha = document.createElement("div");
                linha.className = "row row-cols-1 row-cols-md-3 g-4";
                for(const imovel of imoveisDaPessoa){
                    const coluna = document.createElement("div");
                    coluna.className = "col";

                    coluna.innerHTML = `
                        <div class="card h-100 shadow-sm m-3">
                            <div class="card-body px-4 py-3">
                                <h2 class="card-title">${imovel.titulo}</h2>
                                <p class="card-text">${imovel.tipo.descricao}</p>
                                <p class="card-text">${imovel.valor}</p>
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
    }, 5000);
    
}

exibeImoveisPessoa();

