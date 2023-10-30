const carregarMarcas = async ()=>{
    const response = await fetch('http://127.0.0.1:3333/brands', {
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

const cadastrarMarca = async (nomeMarca)=>{
    const response = await fetch('http://127.0.0.1:3333/brand', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('token')
        },
        body: JSON.stringify({ 'brand':nomeMarca })
    });
    return response;
}

const atualizarMarca = async (id_marca,nomeMarca)=>{
    const response = await fetch(`http://127.0.0.1:3333/brand/${id_marca}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('token')
        },
        body: JSON.stringify({ 'brand':nomeMarca })
    });
    return response;
}


export {carregarMarcas, cadastrarMarca, atualizarMarca}