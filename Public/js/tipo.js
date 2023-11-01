import { validateLogin } from "./modules/validate.mjs"
import { alimentarTabela, limparTabela } from "./modules/functions.mjs";
import { carregarTipos,cadastrarTipo,atualizarTipo } from "./modules/tipo.mjs";

validateLogin();
document.addEventListener('DOMContentLoaded', async function () {
    let tipos = carregarTipos();
    const campos = ['id_tipo', 'tipo'];
    const tabela = document.getElementById('tipoTable');
    alimentarTabela(await tipos, tabela,campos);
    const tipoForm = document.getElementById('tipoForm');

    document.getElementById('limpar').addEventListener('click', ()=>{
        document.getElementById('tipo').value = "";
        document.getElementById('id_tipo').value = "";
    })

    tipoForm.addEventListener('submit', async function (event) {
        event.preventDefault();
        const nomeTipo = document.getElementById('tipo');
        const idTipo = document.getElementById('id_tipo');
        if(idTipo.value==""){
            var response = await cadastrarTipo(nomeTipo.value);
        }else{
            var response = await atualizarTipo(idTipo.value,nomeTipo.value);
        }
       
        if (response.status == 201 || response.status == 202) {
            tipos = carregarTipos();
            limparTabela(tabela);
            alert(response.message);
            alimentarTabela(await tipos,tabela, campos);
            document.getElementById('tipo').value = "";
            document.getElementById('id_tipo').value = "";
        } else {
            const message = await response.json();
            alert(`Erro ${response.status}, ${message.message}`);
        }
});
});