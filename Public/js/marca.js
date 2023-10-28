import { alimentarTabela, limparTabela } from "./modules/functions.mjs";
import { carregarMarcas,cadastrarMarca } from "./modules/marca.mjs";

document.addEventListener('DOMContentLoaded', async function () {
    let marcas = carregarMarcas();
    const tabela = document.getElementById('marcaTable');
    alimentarTabela(await marcas, tabela);
    const marcaForm = document.getElementById('marca-form');
    marcaForm.addEventListener('submit', async function (event) {
        event.preventDefault();
        const nomeMarca = document.getElementById('marca').value;
        const response = await cadastrarMarca(nomeMarca);
        console.log(await response);
        if (response.status == 201) {
            marcas = carregarMarcas();
            limparTabela(tabela);
            alimentarTabela(await marcas,tabela);
        } else {
            const message = await response.json();
            alert(`Erro ${response.status}, ${message.message}`);
        }
});
});