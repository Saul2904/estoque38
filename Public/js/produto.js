import { carregarMarcas } from "./modules/marca.mjs";

addEventListener('DOMContentLoaded',async ()=>{
    const data = await carregarMarcas();
    const selectMarca = document.getElementById('marca');
    data.sort((r1, r2) => (r1.mc_nome > r2.mc_nome) ? 1 : (r1.mc_nome < r2.mc_nome) ? -1 : 0);
    
    data.forEach(element => {
        let opcao = document.createElement("option");
        opcao.setAttribute("value",element.mc_id);
        opcao.textContent = element.mc_nome;
        selectMarca.appendChild(opcao);
    });

})