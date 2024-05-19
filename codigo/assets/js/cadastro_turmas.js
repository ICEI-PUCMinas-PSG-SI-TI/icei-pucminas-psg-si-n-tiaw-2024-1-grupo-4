// Trabalho Interdisciplinar - Aplicações Web
//
// Esse módulo realiza as operações de CRUD para o cadastro de turmas.
//
// Autor: Gabriel Torres Silva
// Data: 19/05/2024

if (!usuarioCorrente.matricula) {
    window.location ='../../index.html';
}

let db_turmas = {};
let db_disciplinas = {};
let alunosDisponiveis = [];
let alunosNaTurma = [];

function initTurmas() {
    let turmasJSON = localStorage.getItem('db_turmas');

    if (!turmasJSON) { 
        db_turmas = dadosIniciaisTurmas;
        localStorage.setItem('db_turmas', JSON.stringify(db_turmas));
    }
    else  {
        db_turmas = JSON.parse(turmasJSON);
    }

    let disciplinasJSON = localStorage.getItem('db_disciplinas');

    if (!disciplinasJSON) { 
        db_disciplinas = dadosIniciaisDisciplinas;
        localStorage.setItem('db_disciplinas', JSON.stringify(db_disciplinas));
    }
    else  {
        db_disciplinas = JSON.parse(disciplinasJSON);
    }

    let selectTurma = document.getElementById("select-turma");
    
    // Popula o select de turmas
    for (i = 0; i < db_turmas.turmas.length; i++) {
        let turma = db_turmas.turmas[i];

        selectTurma.innerHTML += `<option value="${turma.id}">${turma.id}</option>`;
    }

    let selectProfessor = document.getElementById("select-professor");
    
    // Popula o select de professores
    for (i = 0; i < db_professores.professores.length; i++) {
        let professor = db_professores.professores[i];

        selectProfessor.innerHTML += `<option value="${professor.id}">${professor.nome}</option>`;
    }

    let selectDisciplinas = document.getElementById("select-disciplina");
    
    // Popula o select de disciplinas
    for (i = 0; i < db_disciplinas.disciplinas.length; i++) {
        let disciplina = db_disciplinas.disciplinas[i];

        selectDisciplinas.innerHTML += `<option value="${disciplina.id}">${disciplina.codigo} - ${disciplina.nome}</option>`;
    }

    let listAlunosDisponiveis = document.getElementById("list-alunos-disponiveis");

    //orderna os alunos em ordem alfabética
    db_alunos.alunos.sort(function(a,b) {
        return a.nome < b.nome ? -1 : a.nome > b.nome ? 1 : 0;
    });

    // Popula o select de disciplinas
    for (i = 0; i < db_alunos.alunos.length; i++) {
        let aluno = db_alunos.alunos[i];
        
        listAlunosDisponiveis.innerHTML += `<li class="list-group-item" id="group-aluno${aluno.id}">
                                                <input class="form-check-input me-1" type="checkbox" 
                                                value="${aluno.id}" id="aluno${aluno.id}">
                                                <label class="form-check-label" for="aluno${aluno.id}">${aluno.nome}</label>
                                            </li>
                                            `;
    
    }
}

function addAlunoNaTurma() {

    // Selecionando o elemento pai
    let alunosDisponiveis = document.getElementById("list-alunos-disponiveis");
    let alunosTurma = document.getElementById("list-alunos-turma");

    for(let i=0; i<db_alunos.alunos.length; i++){
        // Selecionando o elemento a ser removido
        let ckeckBoxAluno = document.getElementById("aluno" + db_alunos.alunos[i].id);

        if(ckeckBoxAluno && ckeckBoxAluno.checked){
            let elementoRemover = document.getElementById("group-aluno" + db_alunos.alunos[i].id);

            // Removendo o elemento da página
            alunosDisponiveis.removeChild(elementoRemover);
            
            alunosTurma.appendChild(elementoRemover);
            alunosNaTurma.push(db_alunos.alunos[i].id)
        }
    }
}

function removeAlunoNaTurma() {

    // Selecionando o elemento pai
    let alunosDisponiveis = document.getElementById("list-alunos-disponiveis");
    let alunosTurma = document.getElementById("list-alunos-turma");
    let removeIds = [];

    for(let i=0; i < alunosNaTurma.length; i++){
        // Selecionando o elemento a ser removido
        let ckeckBoxAluno = document.getElementById("aluno" + alunosNaTurma[i]);

        if(ckeckBoxAluno && ckeckBoxAluno.checked){
            let elementoRemover = document.getElementById("group-aluno" +alunosNaTurma[i]);

            // Removendo o elemento da página
            alunosTurma.removeChild(elementoRemover);
            
            alunosDisponiveis.appendChild(elementoRemover);
            removeIds.push(i);
        }
    }

    for(let i=0; i<removeIds.length; i++) {
        alunosNaTurma.splice(removeIds[i], 1);
    }
}

function listaAlunosNaTurma(){
    let listaAlunosDisponiveis = document.getElementById("list-alunos-disponiveis");
    let listaAlunosNaTurma = document.getElementById("list-alunos-turma");

    // Popula o select de disciplinas
    for (i = 0; i < alunosNaTurma.length; i++) {
        let aluno = alunosNaTurma[i];
        let nomeAluno = getNomeAlunoById(aluno);

        // Remove da lista de disponiveis
        let elementoRemover = document.getElementById("group-aluno" + alunosNaTurma[i]);
        if(elementoRemover)
            listaAlunosDisponiveis.removeChild(elementoRemover);

        
        listaAlunosNaTurma.innerHTML += `<li class="list-group-item" id="group-aluno${aluno}">
                                                <input class="form-check-input me-1" type="checkbox" 
                                                value="${aluno}" id="aluno${aluno}">
                                                <label class="form-check-label" for="aluno${aluno}">${nomeAluno}</label>
                                            </li>`;
    
    }
}

function limpaAlunosNaTurma(){
    let listaAlunosNaTurma = document.getElementById("list-alunos-turma");

    // Popula o select de disciplinas
    for (i = 0; i < alunosNaTurma.length; i++) {
        let elementoRemover = document.getElementById("group-aluno" + alunosNaTurma[i]);

        // Removendo o elemento da página
        listaAlunosNaTurma.removeChild(elementoRemover);
    }
}

function selecionaTurma() {
    
    let turma = document.getElementById("select-turma").value;

    if(turma == "0") {
        window.location.reload();
    } else {
        //Preenchimento dos dados nos campos no modal de edição
        for (let i = 0; i < db_turmas.turmas.length; i++) {
            if (db_turmas.turmas[i].id == turma){
                document.getElementById('select-disciplina').value = db_turmas.turmas[i].disciplina;
                document.getElementById('select-disciplina').setAttribute("disabled", "true");
                
                document.getElementById('select-professor').value = db_turmas.turmas[i].professor;
                document.getElementById('select-professor').setAttribute("disabled", "true");

                limpaAlunosNaTurma();
                alunosNaTurma = db_turmas.turmas[i].alunos;
                listaAlunosNaTurma();
            }
        }
    }
}

function salvarTurma(){
    let proximoId = 0;
    let turma = {};

    if(db_turmas.turmas.length > 0){
        proximoId = db_turmas.turmas[db_turmas.turmas.length-1].id;
    }
    
    //Soma mais um gerando o ID
    proximoId += 1;

    // Obtem os valores dos campos do formulário
    let campoTurma = document.getElementById('select-turma').value;
    let campoDisciplina = document.getElementById('select-disciplina').value;
    let campoProfessor = document.getElementById('select-professor').value;

    if(campoTurma == "0"){
        if(campoDisciplina == "0"){
            alert("Selecione uma disciplina");
            return false;
        }

        if(campoProfessor == "0"){
            alert("Selecione professor");
            return false;
        }

        if(alunosNaTurma.length <= 0){
            alert("É necessário incluir pelo menos um aluno na turma");
            return false;
        }

        // Cria um objeto com os dados do contato
        turma = { id: proximoId,
            disciplina: parseInt(campoDisciplina), 
            professor: parseInt(campoProfessor), 
            alunos: alunosNaTurma };
            
            
        // Inclui o novo usuario no banco de dados baseado em JSON
        db_turmas.turmas.push(turma);
    } else {
        for (let i = 0; i < db_turmas.turmas.length; i++) {
            if (db_turmas.turmas[i].id === parseInt(campoTurma)){
                db_turmas.turmas[i].alunos = alunosNaTurma;
            }
        }
    }

    // Salva o banco de dados com o novo usuário no localStorage
    localStorage.setItem('db_turmas', JSON.stringify(db_turmas));

    //Força o recarregamento da página para exibir a tabela atualizada
    window.location.reload();
}

function getNomeAlunoById(id){
    //Preenchimento dos dados nos campos no modal de edição
    for (let i = 0; i < db_alunos.alunos.length; i++) {
        if (db_alunos.alunos[i].id === id){
            return db_alunos.alunos[i].nome;
        }
    }
}

initTurmas()