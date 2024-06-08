// Arquivo: listagem_datas.js

if (!usuarioCorrente.matricula) {
    window.location ='../../index.html';
}

const diasDaSemana = [
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira"
];

function listarDatas() {
    const params = new URLSearchParams(window.location.search);

    let statusAux;
    let aulas = JSON.parse(localStorage.getItem('aulas'));
    let listaAulas = document.getElementById("lista-aulas");
    listaAulas.innerHTML = ""; // Limpa a lista antes de atualizar

    aulas.sort(function(a,b) {
        return a.data < b.data ? -1 : a.data > b.data ? 1 : 0;
    });

    aulas.forEach(aula => {
        if(aula.turma == params.get('turma')) {
            data = new Date(aula.data);
            statusAux = aula.apurada ? "Apurada" : "Não Apurada"

            listaAulas.innerHTML += `
                <li class="list-group-item">
                    <a href="listagem_de_presenca.html?aula=${aula.id}">${data.toLocaleDateString()} - ${diasDaSemana[data.getDay()]} - ${statusAux}
                </a></li>
            `;
        }
    });
            
    if(listaAulas.innerHTML == ""){
        listaAulas.innerHTML += "Nenhuma aula cadastrada para essa turma!";
    }
}
