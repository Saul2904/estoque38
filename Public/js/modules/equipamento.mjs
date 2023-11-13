import { validateLogin,logOut } from "./validate.mjs";

const carregarEquipamentos = async ()=>{
    const response = await fetch('http://127.0.0.1:3333/equipments', {
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

const cadastrarEquipamento = async (produto, patrimonio, serial, observacao)=>{
    const response = await fetch('http://127.0.0.1:3333/equipment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('token')
        },
        body: JSON.stringify({ 'product':produto, 'patrimony':patrimonio, 'serial':serial, 'observation':observacao })
    });
    if(response.status == 201){
        response.message = "Cadastro realizado com sucesso";
    }
    return response;
}

const atualizarEquipamento = async (idEquip,produto, patrimonio, serial, observacao)=>{
    const response = await fetch(`http://127.0.0.1:3333/equipment/${idEquip}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('token')
        },
        body: JSON.stringify({'product':produto, 'patrimony':patrimonio, 'serial':serial, 'observation':observacao})
    });
    if(response.status == 202){
        response.message = "Alteração realizada com sucesso";
    }
    return response;
}

const buscarEquipamento = async(patrimonio, serial)=>{
    if(patrimonio != ''){
        var url = `http://127.0.0.1:3333/equipment/patrimony/${patrimonio}`
    }else if(serial != ''){
        var url = `http://127.0.0.1:3333/equipment/serial/${serial}`
    }

    const response = await fetch(url, {
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

export {carregarEquipamentos, cadastrarEquipamento, atualizarEquipamento,buscarEquipamento}