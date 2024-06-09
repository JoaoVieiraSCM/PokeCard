async function main() {
    try {
        const data = await fetch('nomes.json').then((response)=>response.json()).catch(error=>console.log(error));
        const valoresEsperados = data.valoresEsperados;
        const dataList = document.querySelector('#valoresLista');

        valoresEsperados.forEach(valor => {
            let option = document.createElement('option');
            option.value = valor;
            dataList.appendChild(option);
        });
    } catch (error) {
        console.error('Erro ao carregar o JSON:', error);
    }
}

window.onload=main;