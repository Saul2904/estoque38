import { validateLogin,logOut } from "./validate.mjs";

const carregarProdutos = async ()=>{
    const response = await fetch('http://127.0.0.1:3333/products', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('token')
        }
    });
    if (response.ok) {
        const data = response.json(); 
        return data;
    }else{
        const erro = await response.json();
        if(erro.message =='Failed to authenticate token.'){
            alert("Seu token de acesso expirou, efetue login novamente para continuar usando o sistema.")
            logOut();
            validateLogin();
        }
    }
}

const cadastrarProduto = async (marca, tipo, modelo, descricao)=>{
    const response = await fetch('http://127.0.0.1:3333/product', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('token')
        },
        body: JSON.stringify({ 'brand':marca, 'type':tipo, 'model':modelo, 'desc':descricao })
    });
    if(response.status == 201){
        response.message = "Cadastro realizado com sucesso";
    }
    return response;
}

const atualizarProduto = async (idProduto,marca, tipo, modelo, descricao)=>{
    const response = await fetch(`http://127.0.0.1:3333/product/${idProduto}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('token')
        },
        body: JSON.stringify({'brand':marca, 'type':tipo, 'model':modelo, 'desc':descricao})
    });
    if(response.status == 202){
        response.message = "Alteração realizada com sucesso";
    }
    return response;
}

export {carregarProdutos, cadastrarProduto, atualizarProduto}