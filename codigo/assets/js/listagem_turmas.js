// Arquivo: listagem_turmas.js

if (!usuarioCorrente.matricula) {
    window.location ='../../index.html';
}

let db_turmas = {}
let db_disciplinas= {};

function init() {
    let aulas = JSON.parse(localStorage.getItem('aulas')) || dadosIniciaisAulas.aulas;
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

function listarTurmas() {
    let divTurmas = document.getElementById("cards-turmas");
    divTurmas.innerHTML = ""; // Limpa a tabela antes de atualizar

    // Iterar sobre as disciplinas carregadas e adicionar linhas na tabela
    db_turmas.turmas.forEach(turma => {
        if(turma.professor == usuarioCorrente.id) {
            divTurmas.innerHTML += `
                <div class="col-md-4">
                    <div class="card" style="margin: 5px;">
                        <div class="card-body">
                            <h5 class="card-title">${db_disciplinas.disciplinas.find(disciplina => disciplina.id === turma.disciplina).nome}</h5>
                            <p class="card-text">Essa turma possui ${turma.alunos.length} alunos.</p>
                            <a href="listagem_datas.html?turma=${turma.id}" class="btn btn-primary">Realizar chamada</a>
                        </div>
                    </div>
                </div>
            `;
        }
    });
            
    if(divTurmas.innerHTML == ""){
        divTurmas.innerHTML += "Você ainda não possui nenhuma turma!";
    }
}

// Chamada da função init() para inicializar o carregamento dos dados ao carregar a página
init();
