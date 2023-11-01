const carregarTipos = async ()=>{
    const response = await fetch('http://127.0.0.1:3333/types', {
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

const cadastrarTipo = async (tipo)=>{
    const response = await fetch('http://127.0.0.1:3333/type', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('token')
        },
        body: JSON.stringify({ 'type':tipo })
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