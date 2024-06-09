// Arquivo: listagem_datas_alunos.js

if (!usuarioCorrente.matricula) {
    window.location ='../../index.html';
}

const params = new URLSearchParams(window.location.search);

const diasDaSemana = [
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira"
];

let db_abonos = {};
let aulas = [];

function listarDatas() {

    aulas = JSON.parse(localStorage.getItem('aulas'));
    let tableAulas = document.getElementById("table-frequencia");
    tableAulas.innerHTML = ""; // Limpa a lista antes de atualizar

    let abonosJSON = localStorage.getItem('db_abonos');

    if (!abonosJSON) {  
        // Copia os dados iniciais para o banco de dados 
        db_abonos = {abonos: []};

        // Salva os dados iniciais no local Storage convertendo-os para string antes
        localStorage.setItem('db_abonos', JSON.stringify(db_abonos));
    }
    else {
        // Converte a string JSON em objeto colocando no banco de dados baseado em JSON
        db_abonos = JSON.parse(abonosJSON);
    }

    aulas.sort(function(a,b) {
        return a.data < b.data ? -1 : a.data > b.data ? 1 : 0;
    });

    aulas.forEach(aula => {
        if(aula.apurada && aula.turma == params.get('turma')) {
            data = new Date(aula.data);
            let statusAux = "Ausente";
            let abonoAux;
            let satusAbono = "Não solicitado"

            if(aula.alunosPresentes.find(aluno => aluno === usuarioCorrente.id)) {
                statusAux = "Presente";
            }

            if(abonoAux = db_abonos.abonos.find(abono => abono.aluno === usuarioCorrente.id && abono.aula === aula.id)) {
                satusAbono = abonoAux.status;
            }

            if(statusAux == "Ausente") {
                tableAulas.innerHTML += `<tr>
                    <td>${data.toLocaleDateString()}</td>
                    <td>${statusAux}</td>
                    <td>
                        <button class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#justificativaFaltaModal" onclick="carregaDados(${aula.id}, '${satusAbono}')">Solicitar Abono</button>
                    </td>
                    <td>${satusAbono}</td>
                    </tr>`;
            } else {
                tableAulas.innerHTML += `<tr>
                    <td>${data.toLocaleDateString()}</td>
                    <td>${statusAux}</td>
                    <td></td>
                    <td>N/A</td>
                    </tr>`;
            }
        }
    });
}

function carregaDados(id, status){
    
    //Preenchimento dos dados nos campos no modal de edição
    for (let i = 0; i < aulas.length; i++) {
        if (aulas[i].id === id){
            document.getElementById('id-aula').value = aulas[i].id;
            document.getElementById('data-aula').value = new Date(aulas[i].data).toLocaleDateString();
            document.getElementById('status').value = status;
            if(status != "Não solicitado") {
                document.getElementById('justificativa').value = db_abonos.abonos.find(abono => abono.aluno === usuarioCorrente.id && abono.aula === aulas[i].id).justificativa;
            }
        }
    }
}

function justificarFalta(event) {
    event.preventDefault();

    let status = document.getElementById('status').value;
    let justificativa = document.getElementById('justificativa').value;

    if(status != "Não solicitado") {
        alert("Abono já foi solicitado anteriormente! Permitido somente a visualização");
        return false;
    }

    let proximoId = db_abonos.abonos.length > 0 ? db_abonos.abonos[db_abonos.abonos.length - 1].id + 1 : 1;

    let abono = {
        id: proximoId,
        justificativa: justificativa,
        aluno: usuarioCorrente.id,
        aula: parseInt(document.getElementById('id-aula').value),
        status: "Em Análise"
    };

    db_abonos.abonos.push(abono);
    
    localStorage.setItem('db_abonos', JSON.stringify(db_abonos));

    alert("Abono enviado à secretaria para análise com sucesso!");

    window.location.reload();
}
