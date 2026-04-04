
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
                        <td>${imovel.tituloImovel}</td>
                        <td>${imovel.imovelValor}</td>
                        <td>${imovel.imovelTipo.id}</td>
                        <td>${imovel.pessoa.nome}</td>
                        <td><button  onclick="selecionarImovel(${imovel.id}, 
                                                                '${imovel.tituloImovel}', 
                                                                ${imovel.imovelValor}, 
                                                                ${imovel.imovelTipo.id}, 
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
            tituloImovel: document.getElementById("tituloImovel").value,
            valorImovel: Number(document.getElementById("valorImovel").value),
            imovelTipo: {
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