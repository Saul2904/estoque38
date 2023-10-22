const alimentarTabela = async (vetor) =>{
    const marcaTable= document.getElementById('marcaTable').getElementsByTagName('tbody')[0];
    vetor.forEach((linha) => {
        const newRow = marcaTable.insertRow();
        Object.values(linha).forEach((coluna) =>{
            const cell = newRow.insertCell();
            cell.textContent = coluna;
        })
    });
}

const carregarMarcas = async ()=>{
    const response = await fetch('http://127.0.0.1:3333/getAllBrands', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('token')
        }
    });
    if (response.ok) {
        const data = response.json(); 
        return data;
    }
}

document.addEventListener('DOMContentLoaded', async function () {
    let marcas = await carregarMarcas();
    alimentarTabela(marcas);
    const marcaForm = document.getElementById('marca-form');
    
    marcaForm.addEventListener('submit', async function (event) {
       event.preventDefault();

        const nomeMarca = document.getElementById('marca').value;

        const response = await fetch('http://127.0.0.1:3333/cadBrand', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ 'brand':nomeMarca })
        });
        if (response.status == 201) {
            const marcas = carregarMarcas();
            var bodyRef = document.getElementById('marcaTable').getElementsByTagName('tbody')[0]; 
            bodyRef.innerHTML = '';
            alimentarTabela(await marcas);
        } else {
            const message = await response.json();
            console.log(message);
            alert(`Erro ${response.status}, ${message.message}`);
        }
    });
});