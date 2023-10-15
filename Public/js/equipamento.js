addEventListener('DOMContentLoaded',async ()=>{
    const response = await fetch('http://127.0.0.1:3333/getAllBrands', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('token')
        }
    });
    if (response.ok) {
        const selectMarca = document.getElementById('marca');
        const data = await response.json(); 
        
       data.forEach(element => {
            let opcao = document.createElement("option");
            opcao.setAttribute("value",element.mc_id);
            opcao.textContent = element.mc_nome;
            selectMarca.appendChild(opcao);
        });
    }

})