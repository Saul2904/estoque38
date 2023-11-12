import { validateLogin } from "./modules/validate.mjs"
import { carregarMarcas } from "./modules/marca.mjs";
import { carregarTipos } from "./modules/tipo.mjs";
import { carregarProdutos, cadastrarProduto, atualizarProduto } from "./modules/produto.mjs";
import { alimentarTabela, limparTabela, alimentarSelect } from "./modules/functions.mjs";

validateLogin();

const marcas =  carregarMarcas();
const tipos = carregarTipos();
let produtos = carregarProdutos();

addEventListener('DOMContentLoaded',async ()=>{
    const campos = ['idProd','marca', 'tipo','modelo', 'descricao'];
    const tabela = document.getElementById('produtoTable');

    alimentarSelect(await marcas,'marca','mc_id', 'mc_nome');
    alimentarSelect(await tipos,'tipo','tp_id', 'tp_descricao');
    alimentarTabela(await produtos, tabela,campos);

    const prodForm = document.getElementById('produtoForm');

    prodForm.addEventListener('submit', async function (event) {
        event.preventDefault();
        const id = document.getElementById('idProd');
        const marca = document.getElementById('marca');
        const modelo = document.getElementById('modelo');
        const tipo = document.getElementById('tipo');
        const descricao = document.getElementById('descricao');
        if(id.value==""){
            var response = await cadastrarProduto(marca.value, tipo.value, modelo.value, descricao.value);
        }else{
            var response = await atualizarProduto(id.value,marca.value, tipo.value, modelo.value, descricao.value);
        }
       
        if (response.status == 201 || response.status == 202) {
            produtos = carregarProdutos();
            alert(response.message);
            limparTabela(tabela);
            prodForm.reset();
            alimentarTabela(await produtos, tabela,campos);
            
        } else {
            const message = await response.json();
            alert(`Erro ${response.status}, ${message.message}`);
        }
});
})