const alimentarTabela = async (vetor, tabela) =>{
    const tableBody= tabela.getElementsByTagName('tbody')[0];
    vetor.forEach((linha) => {
        const newRow = tableBody.insertRow();
        Object.values(linha).forEach((coluna) =>{
            const cell = newRow.insertCell();
            cell.textContent = coluna;
        })
    });
}

const limparTabela = (tabela) => {
    const tableBody= tabela.getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';
}

export { alimentarTabela, limparTabela }