// Arquivo: listagem_disciplinas.js

if (!usuarioCorrente.matricula) {
    window.location ='../../index.html';
}

let db_turmas = {}
let db_disciplinas= {};
let aulas = []

function init() {
    aulas = JSON.parse(localStorage.getItem('aulas')) || dadosIniciaisAulas.aulas;
    let turmasJSON = localStorage.getItem('db_turmas');
    let disciplinasJSON = localStorage.getItem('db_disciplinas');

    localStorage.setItem('aulas', JSON.stringify(aulas));

    // Verifica se existem dados já armazenados no localStorage
    if (!turmasJSON) {  // Se NÃO há dados no localStorage

        // Copia os dados iniciais para o banco de dados 
        db_turmas = dadosIniciaisTurmas;

        // Salva os dados iniciais no local Storage convertendo-os para string antes
        localStorage.setItem('db_turmas', JSON.stringify(db_turmas));
    }
    else  {  // Se há dados no localStorage
        // Converte a string JSON em objeto colocando no banco de dados baseado em JSON
        db_turmas = JSON.parse(turmasJSON);
    }

    if (!disciplinasJSON) {  // Se NÃO há dados no localStorage

        // Copia os dados iniciais para o banco de dados 
        db_disciplinas = dadosIniciaisDisciplinas;

        // Salva os dados iniciais no local Storage convertendo-os para string antes
        localStorage.setItem('db_disciplinas', JSON.stringify(db_disciplinas));
    }
    else  {  // Se há dados no localStorage
        // Converte a string JSON em objeto colocando no banco de dados baseado em JSON
        db_disciplinas = JSON.parse(disciplinasJSON);
    }
}

function listarDisciplinas() {
    let divTurmas = document.getElementById("cards-disciplinas");
    divTurmas.innerHTML = "";

    db_turmas.turmas.forEach(turma => {
        if(turma.alunos.find(aluno => aluno === usuarioCorrente.id)) {
            let qtdAulas = 0;
            let qtdPresencas = 0;

            aulas.forEach(aula => {
                if(aula.apurada && aula.turma == turma.id){
                    qtdAulas++;
                    if(aula.alunosPresentes.find(aluno => aluno === usuarioCorrente.id)) {
                        qtdPresencas++;
                    }
                }
            });
            
            let percentualPresenca;
            if(qtdAulas > 0)
                percentualPresenca = (qtdPresencas * 100) / qtdAulas;
            else
                percentualPresenca = 100;

            if(percentualPresenca >= 75) {
                divTurmas.innerHTML += `
                    <div class="card" style="width: 18rem;">
                        <div class="card-body">
                            <h5 class="card-title">${db_disciplinas.disciplinas.find(disciplina => disciplina.id === turma.disciplina).nome}</h5>
                            <p class="card-text">Percentual de presença em aulas.</p>
                            <div class="progress">
                                <div class="progress-bar bg-success" role="progressbar" style="width: ${percentualPresenca}%;" aria-valuenow="${percentualPresenca}1" aria-valuemin="0" aria-valuemax="100">
                                    ${percentualPresenca}%
                                </div>
                            </div><br>
                            <a href="listagem_datas_aluno.html?turma=${turma.id}" class="btn btn-primary">Verificar aulas</a>
                        </div>
                    </div>
                `;
            } else {
                if(percentualPresenca == 0){
                    percentualPresenca = 100;
                }
                
                divTurmas.innerHTML += `
                    <div class="card" style="width: 18rem;">
                        <div class="card-body">
                            <h5 class="card-title">${db_disciplinas.disciplinas.find(disciplina => disciplina.id === turma.disciplina).nome}</h5>
                            <p class="card-text">Percentual de presença em aulas.</p>
                            <div class="progress">
                                <div class="progress-bar bg-danger" role="progressbar" style="width: ${percentualPresenca}%;" aria-valuenow="${percentualPresenca}1" aria-valuemin="0" aria-valuemax="100">
                                    ${percentualPresenca == 100 ? "0" : percentualPresenca}%
                                </div>
                            </div><br>
                            <a href="listagem_datas_aluno.html?turma=${turma.id}" class="btn btn-primary">Verificar aulas</a>
                        </div>
                    </div>
                `;
            }
            
        }
    });
            
    if(divTurmas.innerHTML == ""){
        divTurmas.innerHTML += "Você ainda não possui nenhuma turma!";
    }
}

// Chamada da função init() para inicializar o carregamento dos dados ao carregar a página
init();
