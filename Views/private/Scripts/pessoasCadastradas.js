const urlBackend = "http://localhost:3000";


function exibePessoas(){
    fetch(urlBackend + "/pessoas", {
        method: "GET"
    })
    .then((resposta) => {
        if(resposta.ok){
            return resposta.json();
        }
    })
    .then((conteudoJSON) => {
        if(conteudoJSON.status){

            const container = document.getElementById("exibirPessoas");
            container.innerHTML = "";

            if(conteudoJSON.pessoas.length == 0){
                mostrarMensagem("warning", "Nenhuma pessoa foi encontrada!");
            }
            else{

                const linha = document.createElement("div");
                linha.className = "row row-cols-1 row-cols-md-3 g-4";

                for(const pessoa of conteudoJSON.pessoas){
                    const coluna = document.createElement("div");
                    coluna.className = "col";

                    coluna.innerHTML = `
                        <div class="card h-100 shadow-sm m-3">
                            <div class="card-body px-4 py-3">
                                <p class="card-text mb-2">
                                    <strong>Nome:</strong> ${pessoa.nome}
                                </p>

                                <p class="card-text mb-2">
                                    <strong>CPF:</strong> ${pessoa.cpf}
                                </p>

                                <p class="card-text mb-2">
                                    <strong>Telefone:</strong> ${pessoa.telefone}
                                </p>

                                <p class="card-text mb-3">
                                    <strong>Email:</strong> ${pessoa.email}
                                </p>

                                <div class="text">
                                    <button class="btn btn-primary px-4" onclick="exibeImoveisPessoa(${pessoa.id})">Ver detalhes</button>
                                </div>
                            </div>
                        </div>
                    `;

                    linha.appendChild(coluna);
                }

                container.appendChild(linha);

            }
        }
    })
    .catch((erro) => {
        mostrarMensagem("danger", "Erro ao visualizar Pessoas! " + erro);
    });

}

function exibeImoveisPessoa(id){
    window.location.href = `exibeImovelPessoa.html?id=${id}`;
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


exibePessoas();

setInterval(() => {
    exibePessoas();
}, 3000);