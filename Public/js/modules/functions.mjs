const editButton = (linha,campos)=>{
    const button = document.createElement('button');
    button.classList.add('remove-button');
    button.textContent = 'Editar';
    const chaves = Object.keys(linha);
    button.addEventListener('click', function() {
        let coluna = 0;
        for(let i = 0; i < campos.length;i++){
            const campo = document.getElementById(campos[i]);
            campo.value = linha[chaves[coluna]];
            if(campo.tagName == "SELECT"){
                coluna++;
            }
            coluna++;
        }
    });
    return button;
}

const alimentarTabela = async (vetor, tabela, campos) =>{
    const tableBody= tabela.getElementsByTagName('tbody')[0];
    vetor.forEach((linha) => {
        
        linha.acao = "Editar";
        const newRow = tableBody.insertRow();
        Object.values(linha).forEach((value, key) =>{
            const cell = newRow.insertCell();
            if(value != "Editar"){
                cell.textContent = value;
                cell.setAttribute("name",`td_${key}`)
            }else{
                cell.appendChild(editButton(linha, campos));
            }
        })
    });
}

const limparTabela = (tabela) => {
    const tableBody= tabela.getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';
}

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

export { alimentarTabela, limparTabela, alimentarSelect }