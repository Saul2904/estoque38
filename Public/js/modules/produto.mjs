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
    }
}

const cadastrarPrpduto = async (marca, tipo, modelo, descricao)=>{
    const response = await fetch('http://127.0.0.1:3333/product', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('token')
        },
        body: JSON.stringify({ 'brand':marca,'type':tipo,'model':modelo,'desc':descricao})
    });
    if(response.status == 201){
        response.message = "Cadastro realizado com sucesso";
    }
    return response;
}

const atualizarTipo = async (idTipo,descTipo)=>{
    const response = await fetch(`http://127.0.0.1:3333/type/${idTipo}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('token')
        },
        body: JSON.stringify({ 'type':descTipo})
    });
    if(response.status == 202){
        response.message = "Alteração realizada com sucesso";
    }
    return response;
}

export {carregarTipos, cadastrarTipo, atualizarTipo}