import { validateLogin } from "./modules/validate.mjs"
import { alimentarTabela, limparTabela, alimentarSelect } from "./modules/functions.mjs";
import { carregarMarcas,cadastrarMarca,atualizarMarca } from "./modules/marca.mjs";

validateLogin();

let marcas = carregarMarcas();

document.addEventListener('DOMContentLoaded', async function () {
    const campos = ['id_marca', 'marca'];
    const tabela = document.getElementById('marcaTable');
    alimentarTabela(await marcas, tabela,campos);
    const marcaForm = document.getElementById('marca-form');

    marcaForm.addEventListener('submit', async function (event) {
        event.preventDefault();
        const nomeMarca = document.getElementById('marca');
        const idMarca = document.getElementById('id_marca');
        if(idMarca.value==""){
            var response = await cadastrarMarca(nomeMarca.value);
        }else{
            var response = await atualizarMarca(idMarca.value,nomeMarca.value);
        }
       
        if (response.status == 201 || response.status == 202) {
            marcas = carregarMarcas();
            limparTabela(tabela);
            alert(response.message);
            marcaForm.reset();
            alimentarTabela(await marcas,tabela, campos);
        } else {
            const message = await response.json();
            alert(`Erro ${response.status}, ${message.message}`);
        }
});
});