
const urlBackend = "http://localhost:3000";

function obterPessoas(){
    fetch(urlBackend + "/pessoa", {
        method: "GET"
        
    })
    .then((resposta) => {
        if(resposta.ok){
            return resposta.json();
        }
       
    })
    .then((conteudoJSON) => {
        if(conteudoJSON.status){
            if(conteudoJSON.pessoa.length == 0){
                mostrarMensagem("warning", "Desculpe, nenhuma pessoa foi encontrada.");
            }
            else{
                const exibePessoa = document.getElementById("exibePessoa");
                exibePessoa.innerHTML = "";
                const tabelaPes = document.createElement("table");
                tabelaPes.className = "table table-hover table-bordered table-striped";

                const cabecalhoTabela = document.createElement("thead");
                cabecalhoTabela.innerHTML = `
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">CPF</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Telefone</th>
                        <th scope="col">Email</th>
                        <th scope="col"></th>
                    </tr>
                `;

                tabelaPes.appendChild(cabecalhoTabela); 
                const corpoTabela = document.createElement("tbody");
                for(const pessoa of conteudoJSON.pessoa){
                    const linhaTabela = document.createElement("tr");
                    linhaTabela.innerHTML = `
                        <th>${pessoa.id}</th>
                        <td>${pessoa.cpf}</td>
                        <td>${pessoa.nome}</td>
                        <td>${pessoa.telefone}</td>
                        <td>${pessoa.email}</td>
                        <td><button type="button" onclick="selecionarPessoa(${pessoa.id}, 
                                                                                        '${pessoa.cpf}', 
                                                                                        '${pessoa.nome}', 
                                                                                        '${pessoa.telefone}', 
                                                                                        '${pessoa.email}')">Selecionar</button></td>
                    `;
                    
                    corpoTabela.appendChild(linhaTabela);
                }

                tabelaPes.appendChild(corpoTabela);
                exibePessoa.appendChild(tabelaPes);
            }
        }
        else{
            mostrarMensagem("danger", conteudoJSON.mensagem);
        }
    })
    .catch((erro) => {
        mostrarMensagem("danger", "Ocorreu um erro ao obter as pessoas cadastradas. Tente mais tarde!" + erro);
    });
}

function cadastrarPessoa(){
    const formPessoas = document.getElementById("formPessoas");
    if(formPessoas.checkVisibility()){

        const pessoa = {
            cpf: document.getElementById("cpf").value,
            nome: document.getElementById("nome").value,
            telefone: document.getElementById("telefone").value,
            email: document.getElementById("email").value
        }

        fetch(urlBackend + "/pessoa", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(pessoa)
        })
        .then((resposta) =>{
            if(resposta.ok){
                return resposta.json();
            }
        })
        .then((conteudoJSON) => {
            if(conteudoJSON.status){
                mostrarMensagem("success", conteudoJSON.mensagem);
                obterPessoas();
            }
            else{
                mostrarMensagem("danger", conteudoJSON.mensagem);
            }
        })
        .catch((erro) => {
            mostrarMensagem("danger", "Ocorreu um erro ao cadastrar a pessoa. Tente mais tarde!" + erro);
        });

       
    }
}

function selecionarPessoa(id, cpf, nome, telefone, email){
    document.getElementById("id").value = id;
    document.getElementById("cpf").value = cpf;
    document.getElementById("nome").value = nome;
    document.getElementById("telefone").value = telefone;
    document.getElementById("email").value = email;

    document.getElementById("cadastrar").disabled = false;
    document.getElementById("atualizar").disabled = true;
    document.getElementById("excluir").disabled = true;
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



obterPessoas();

const cadastrarPes = document.getElementById("cadastrar");
cadastrarPes.onclick = cadastrarPessoa;