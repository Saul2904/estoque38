import { validateLogin } from "./modules/validate.mjs"
import { alimentarTabela, limparTabela } from "./modules/functions.mjs";
import { carregarMarcas,cadastrarMarca,atualizarMarca } from "./modules/marca.mjs";

validateLogin();
document.addEventListener('DOMContentLoaded', async function () {
    let marcas = carregarMarcas();
    const campos = ['id_marca', 'marca'];
    const tabela = document.getElementById('marcaTable');
    alimentarTabela(await marcas, tabela,campos);
    const marcaForm = document.getElementById('marca-form');

    document.getElementById('limpar').addEventListener('click', ()=>{
        document.getElementById('marca').value = "";
        document.getElementById('id_marca').value = "";
    })

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
            alimentarTabela(await marcas,tabela, campos);
            document.getElementById('marca').value = "";
            document.getElementById('id_marca').value = "";
        } else {
            const message = await response.json();
            alert(`Erro ${response.status}, ${message.message}`);
        }
});
});