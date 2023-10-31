const editButton = (linha,campos)=>{
    const button = document.createElement('button');
    button.classList.add('remove-button');
    button.textContent = 'Editar';
    const chaves = Object.keys(linha);
    button.addEventListener('click', function() {
        for(let i = 0; i < campos.length;i++){
            //document.getElementById(campos[i]).setAttribute("value",linha[chaves[i]]);
            document.getElementById(campos[i]).value = linha[chaves[i]];
        }
    });
    return button;
}

const alimentarTabela = async (vetor, tabela, campos) =>{
    const tableBody= tabela.getElementsByTagName('tbody')[0];
    vetor.forEach((linha) => {
        linha.acao = "Editar";
        const newRow = tableBody.insertRow();
        Object.values(linha).forEach((coluna) =>{
            const cell = newRow.insertCell();
            if(coluna != "Editar"){
                cell.textContent = coluna;
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

export { alimentarTabela, limparTabela }