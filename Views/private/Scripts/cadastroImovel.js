
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
            for(const tipo of conteudoJSON.tiposImovel){
                const  opcao = document.createElement("option");
                opcao.value = tipo.id;
                opcao.textContent = tipo.descricao;
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

function buscarImovel(){
    fetch(urlBackend + "/imoveis", {
        method: "GET"
    })
    .then((resposta) => {
        if(resposta.ok){
            return resposta.json();
        }
    })
    .then((conteudoJSON) => {
        if(conteudoJSON.status){
            if(conteudoJSON.imoveis.length == 0){
                mostrarMensagem("warning", "Nenhum imóvel foi encontrado!");

            }
            else{
                const exibeImoveis = document.getElementById("exibeImoveis");
                exibeImoveis.innerHTML = "";
                const tabelaImo = document.createElement("table");
                tabelaImo.className = "table table-hover table-bordered table-striped table-bordered";

                const cabecalhoTabela = document.createElement("thead");
                cabecalhoTabela.innerHTML = `
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Título Imóvel</th>
                        <th scope="col">Valor do Imóvel</th>
                        <th scope="col">Tipo do Imóvel</th>
                        <th scope="col">Pessoa interessada</th>
                        <th scope="col"></th>
                    </tr>
                `;

                tabelaImo.appendChild(cabecalhoTabela);
                const corpoTabela = document.createElement("tbody");
                for(const imovel of conteudoJSON.imoveis){
                    const linhaTabela = document.createElement("tr");
                    linhaTabela.innerHTML = `
                        <td>${imovel.id}</td>
                        <td>${imovel.titulo}</td>
                        <td>${imovel.valor}</td>
                        <td>${imovel.tipo.descricao}</td>
                        <td>${imovel.pessoa.nome}</td>
                        <td><button  onclick="selecionarImovel(${imovel.id}, 
                                                                '${imovel.titulo}', 
                                                                ${imovel.valor},
                                                                 ${imovel.tipo.id},  
                                                                ${imovel.pessoa.id})">
                            Selecionar</button></td>
                    `;

                    corpoTabela.appendChild(linhaTabela);
                }

                tabelaImo.appendChild(corpoTabela);
                exibeImoveis.appendChild(tabelaImo);
            }
        }
        else{
            mostrarMensagem("danger", conteudoJSON.mensagem);
        }
    })
    .catch((erro) => {
        mostrarMensagem("danger", "Erro ao obter os imoveis!" + erro);
    });
}

function cadastrarImovel(){
    const formulario = document.getElementById("formImoveis");
    if(formulario.checkValidity()){
        const imovel = {
            titulo: document.getElementById("tituloImovel").value,
            valor: Number(document.getElementById("valorImovel").value),
             tipo: {
                id: document.getElementById("tipoImovel").value
            },
            pessoa: {
                id: document.getElementById("pessoa").value
            }
        }

        fetch(urlBackend + "/imoveis", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(imovel)
        })
        .then((resposta) => {
            if(resposta.ok){
                return resposta.json();
            }
        })
        .then((conteudoJSON) => {
            if(conteudoJSON.status){
                mostrarMensagem("success", conteudoJSON.mensagem);
                limparFormulario();
                buscarImovel();
            }
            else{
                mostrarMensagem("danger", conteudoJSON.mensagem);
            }
        })
        .catch((erro) => {
            mostrarMensagem("danger", "Erro ao cadastrar o imóvel!" + erro.message);
        });
    }
    else{
        formulario.classList.add("was-validated");
    }
}

function atualizar(){
    const formulario = document.getElementById("formImoveis");
    if(formulario.checkValidity()){
        const imovel = {
            id: document.getElementById("idImovel").value,
            titulo: document.getElementById("tituloImovel").value,
            valor: Number(document.getElementById("valorImovel").value),
            tipo: {
                id: document.getElementById("tipoImovel").value
            },
            pessoa: {
                id: document.getElementById("pessoa").value
            }
        }

        fetch(urlBackend + "/imoveis" + "/" + imovel.id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(imovel)
        })
        .then((resposta) => {
            if(resposta.ok){
                return resposta.json();
            }
        })
        .then((conteudoJSON) => {
            if(conteudoJSON.status){
                mostrarMensagem("success", conteudoJSON.mensagem);
                limparFormulario();
                buscarImovel();
            }
            else{
                mostrarMensagem("danger", conteudoJSON.mensagem);
            }
        })        
        .catch((erro) => {
            mostrarMensagem("danger", "Erro ao atualizar o imóvel!" + erro.message);
        });
    }
    else{
        formulario.classList.add("was-validated");
    }
}

function excluir(id){
    fetch(urlBackend + "/imoveis/" + id, {
        method: "DELETE"
    })
    .then((resposta) => {
        if(resposta.ok){
            return resposta.json();
        }
    })
    .then((conteudoJSON) => {
        if(conteudoJSON.status){
            mostrarMensagem("success", conteudoJSON.mensagem);
            limparFormulario();
            buscarImovel();
        }
        else{
            mostrarMensagem("danger", conteudoJSON.mensagem);
        }
    })
    .catch((erro) => {
        mostrarMensagem("danger", "Erro ao excluir o imóvel DEU RUIM MAIS OU MENOS!" + erro.message);
    });
}

function limparFormulario(){
    const formulario = document.getElementById("formImoveis");
    formulario.classList.remove("was-validated");
    formulario.reset();
}
function selecionarImovel(idImovel, tituloImovel, valorImovel, tipoImovel, pessoa){
    document.getElementById("idImovel").value = idImovel;
    document.getElementById("tituloImovel").value = tituloImovel;
    document.getElementById("valorImovel").value = valorImovel;
    document.getElementById("tipoImovel").value = tipoImovel;
    document.getElementById("pessoa").value = pessoa;
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
buscarImovel();

const btnCadastrar = document.getElementById("cadastrar");
btnCadastrar.onclick = cadastrarImovel;

const btnAtualizar = document.getElementById("atualizar");
btnAtualizar.onclick = atualizar;

const btnExcluir = document.getElementById("excluir");
btnExcluir.onclick = function () {
    const id = document.getElementById("idImovel").value;
    if (confirm("Tem certeza que deseja excluir esse imovel?")) {
         if(id){
            const formulario = document.getElementById("formImoveis");
            if(formulario.checkValidity()){
                excluir(id);
                limparFormulario();
                // Não consegui falar no vídeo, mas eu usei essa função para que a minha tela pudesse atualizar toda vez que eu excluísse um imóvel. A necessidade surgiu quando eu só tinha um imóvel cadastrado e a tela não atualizava com chamada da função.
                window.location.reload();
            }
            else{
                formulario.classList.add("was-validated");
            }
           
        }
        else{
            mostrarMensagem("danger", "Por favor, escolha uma pessoa para excluir.");
        }
    }
}
const btnLimpar = document.getElementById("limpar");
btnLimpar.onclick = limparFormulario;