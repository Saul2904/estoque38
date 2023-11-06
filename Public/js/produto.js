import { validateLogin } from "./modules/validate.mjs"
import { carregarMarcas } from "./modules/marca.mjs";
import { carregarTipos } from "./modules/tipo.mjs";
import { carregarProdutos, cadastrarProduto, atualizarProduto } from "./modules/produto.mjs";
import { alimentarTabela, limparTabela } from "./modules/functions.mjs";

validateLogin();

const alimentarSelect = (vetor, campo, valor, texto)=>{
    const selectCampo = document.getElementById(campo);
    vetor.sort((r1, r2) => (r1[texto] > r2[texto]) ? 1 : (r1[texto] < r2[texto]) ? -1 : 0);

    vetor.forEach(element =>{
        let opcao = document.createElement("option");
        opcao.setAttribute("value", element[valor]);
        opcao.textContent = element[texto];
        selectCampo.appendChild(opcao);
    })
}

addEventListener('DOMContentLoaded',async ()=>{
    const marcas =  carregarMarcas();
    const tipos = carregarTipos();
    const produtos = carregarProdutos();

    alimentarSelect(await marcas,'marca','mc_id', 'mc_nome');
    alimentarSelect(await tipos,'tipo','tp_id', 'tp_descricao');
})