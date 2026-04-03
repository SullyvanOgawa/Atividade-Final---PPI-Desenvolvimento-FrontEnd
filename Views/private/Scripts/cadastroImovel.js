
const urlBackend = "http://localhost:3000";

function buscarPessoas(){
    const elementPessoa = document.getElementById("pessoa");

    fetch(urlBackend + "/pessoas", {
        method: "GET"
    })
    .then((resposta) =>{
        if(resposta.ok){
            return resposta.json();
        }
    })
    .then((conteudoJSON) => {
        if(conteudoJSON.status){
            for(const pessoa of conteudoJSON.pessoas){
                const  opcao = document.createElement("option");
                opcao.value = pessoa.id;
                opcao.textContent = pessoa.nome;
                elementPessoa.appendChild(opcao);
            }
        }
        else{
            mostrarMensagem("danger", conteudoJSON.mensagem);
        }
    })
    .catch((erro) => {
        mostrarMensagem("danger", "Erro ao obter as pessoas!" + erro);
    });

}

function buscarTipoImovel(){

    const elementTipoImovel = document.getElementById("tipoImovel");

    fetch(urlBackend + "/tiposImovel", {
        method: "GET"
    })
    .then((resposta) => {
        if(resposta.ok){
            return resposta.json();
        }
    })
    .then((conteudoJSON) => {
        if(conteudoJSON.status){
            for(const tipoImovel of conteudoJSON.tiposImovel){
                const  opcao = document.createElement("option");
                opcao.value = tipoImovel.id;
                opcao.textContent = tipoImovel.descricao;
                elementTipoImovel.appendChild(opcao);
            }
        }
        else{
            mostrarMensagem("danger", conteudoJSON.mensagem);
        }
    })
    .catch((erro) => {
        mostrarMensagem("danger", "Erro ao obter os tipos de imovel!" + erro);
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



buscarPessoas();
buscarTipoImovel();