import { validateLogin } from "./modules/validate.mjs"
import { carregarProdutos } from "./modules/produto.mjs";
import { carregarEquipamentos, cadastrarEquipamento, atualizarEquipamento  } from "./modules/equipamento.mjs";
import { alimentarTabela, limparTabela, alimentarSelect } from "./modules/functions.mjs";

validateLogin();

const produtos = carregarProdutos();
let equipamentos = carregarEquipamentos();

const ocultarColunas = ((ocultar, tabela)=>{
    let celulas = tabela.getElementsByTagName('td');
    Object.values(celulas).forEach((celula) =>{
        if(ocultar.includes(celula.getAttribute("name"))){
            celula.setAttribute("class","hiden");
        }
    });
})

const preencherCampos = ((produtos, selectProd)=>{
    const produtoSelecionado = produtos.filter((prod)=>{
        return prod.id == selectProd.value;
    })[0];

    marca.value = produtoSelecionado.marca;
    modelo.value = produtoSelecionado.modelo;
    tipo.value = produtoSelecionado.tipo;
})

addEventListener('DOMContentLoaded',async ()=>{
    const tabela = document.getElementById('equipamentosTable');
    const equipForm = document.getElementById('equipamentoForm');

    const id = document.getElementById('idEquip');
    const selectProd = document.getElementById('produto');
    const marca = document.getElementById('marca');
    const modelo = document.getElementById('modelo');
    const tipo = document.getElementById('tipo');
    const patrimonio = document.getElementById('patrimonio');
    const serie = document.getElementById('serie');
    const observacao = document.getElementById('observacao');

    const ocultar = ["td_1","td_5"];
    const campos = ['idEquip','produto', 'marca','modelo', 'tipo','patrimonio','serie','observacao'];

    const produto = Object.values(await produtos).map((item)=>{    
        const descricao = `${item.tp_descricao} ${item.mc_nome} ${item.pr_modelo}`;
        const objeto = {"descricao":descricao, "id":item.pr_id,"marca": item.mc_nome, "modelo": item.pr_modelo, "tipo": item.tp_descricao};
        return objeto;
    })

    alimentarSelect(produto,'produto','id', 'descricao');
    preencherCampos(produto, selectProd);
    alimentarTabela(await equipamentos, tabela,campos);

    ocultarColunas(ocultar, tabela);

    selectProd.addEventListener("change",()=>preencherCampos(produto, selectProd));

    equipForm.addEventListener("reset",(e)=>{
        e.preventDefault();
        selectProd.value = produto[0].id;
        id.value = "";
        patrimonio.value = "";
        serie.value = "";
        observacao.value="";
        preencherCampos(produto, selectProd);
    });

    equipForm.addEventListener('submit', async function (event) {
        event.preventDefault();
        if(id.value==""){
            var response = await cadastrarEquipamento(selectProd.value, patrimonio.value, serie.value, observacao.value);
        }else{
            var response = await atualizarEquipamento(id.value,selectProd.value, patrimonio.value, serie.value, observacao.value);
        }
       
        if (response.status == 201 || response.status == 202) {
            equipamentos = carregarEquipamentos();
            alert(response.message);
            limparTabela(tabela);
            equipForm.reset();
            alimentarTabela(await equipamentos, tabela,campos);
            ocultarColunas(ocultar, tabela);
            
        } else {
            const message = await response.json();
            alert(`Erro ${response.status}, ${message.message}`);
        }
});
})