import { alimentarTabela, limparTabela } from "./modules/functions.mjs";
import { carregarMarcas,cadastrarMarca,atualizarMarca } from "./modules/marca.mjs";

document.addEventListener('DOMContentLoaded', async function () {
    let marcas = carregarMarcas();
    const campos = ['id_marca', 'marca'];
    const tabela = document.getElementById('marcaTable');
    alimentarTabela(await marcas, tabela,campos);
    const marcaForm = document.getElementById('marca-form');

    marcaForm.addEventListener('submit', async function (event) {
        event.preventDefault();
        const nomeMarca = document.getElementById('marca').value;
        const idMarca = document.getElementById('id_marca').value;
        if(document.getElementById('id_marca').value==""){
            var response = await cadastrarMarca(nomeMarca);
        }else{
            var response = await (atualizarMarca(idMarca,nomeMarca));
        }
       
        if (response.status == 201) {
            marcas = carregarMarcas();
            limparTabela(tabela);
            alimentarTabela(await marcas,tabela, campos);
        } else {
            const message = await response.json();
            alert(`Erro ${response.status}, ${message.message}`);
        }
});
});