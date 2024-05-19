if (!usuarioCorrente.matricula) {
    window.location = '../../index.html';
}

function listaAlunos() {
    let tableAlunos = document.getElementById("table-alunos");
    
    // Popula a tabela com os registros do banco de dados
    for (i = 0; i < db_alunos.alunos.length; i++) {
        let aluno = db_alunos.alunos[i];

        tableAlunos.innerHTML += `<tr><td>${aluno.id}</td>
                                        <td>${aluno.nome}</td>
                                        <td>${aluno.matricula}</td>
                                        <td>******</td>
                                        <td>
                                            <button class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#editAlunoModal" onclick="carregaDados(${aluno.id})">Editar</button>
                                            <button class="btn btn-danger btn-sm" onclick="deleteAluno(${aluno.id})">Excluir</button>
                                        </td>
                                    </tr>`;
    }
}

function createAluno(){

    let proximoId = 0;

    if(db_alunos.alunos.length > 0){
        proximoId = db_alunos.alunos[db_alunos.alunos.length-1].id;
    }
    
    //Soma mais um gerando o ID
    proximoId += 1;

    // Obtem os valores dos campos do formulário
    let campoNome = document.getElementById('nome-aluno').value;
    let campoMatricula = document.getElementById('matricula-aluno').value;
    let campoSenha = document.getElementById('senha-aluno').value;

    // Cria um objeto com os dados do contato
    let aluno = { id: proximoId,
        nome: campoNome, 
        matricula: campoMatricula, 
        senha: campoSenha };

    // Inclui o novo usuario no banco de dados baseado em JSON
    db_alunos.alunos.push(aluno);

    // Salva o banco de dados com o novo usuário no localStorage
    localStorage.setItem('db_alunos', JSON.stringify(db_alunos));

    //Força o recarregamento da página para exibir a tabela atualizada
    window.location.reload();
}

function carregaDados(id){
    
    //Preenchimento dos dados nos campos no modal de edição
    for (let i = 0; i < db_alunos.alunos.length; i++) {
        if (db_alunos.alunos[i].id === id){
            document.getElementById('edit-id-aluno').value = db_alunos.alunos[i].id;
            document.getElementById('edit-nome-aluno').value = db_alunos.alunos[i].nome;
            document.getElementById('edit-matricula-aluno').value = db_alunos.alunos[i].matricula;
            document.getElementById('edit-senha-aluno').value = db_alunos.alunos[i].senha;
        }
    }
}

function updateAluno(){

    // Obtem os valores dos campos do formulário
    let id = document.getElementById('edit-id-aluno').value;
    let nome = document.getElementById('edit-nome-aluno').value;
    let matricula = document.getElementById('edit-matricula-aluno').value;
    let senha = document.getElementById('edit-senha-aluno').value;

    //Encontra o aluno e o atualiza
    for (let i = 0; i < db_alunos.alunos.length; i++) {
        if (db_alunos.alunos[i].id == id){
            db_alunos.alunos[i].nome = nome;
            db_alunos.alunos[i].matricula = matricula;
            db_alunos.alunos[i].senha = senha;
        }
    }
    
    //Atualiza o localStorage
    localStorage.setItem('db_alunos', JSON.stringify(db_alunos));

    //Força o recarregamento da página para exibir a tabela atualizada
    window.location.reload();
}

function deleteAluno(id){

    let nome = "";
    let indexExclusao = 0;

    //Encontra o aluno para obter seu nome e id
    for (let i = 0; i < db_alunos.alunos.length; i++) {
        if (db_alunos.alunos[i].id == id){
            indexExclusao = i;
            nome = db_alunos.alunos[i].nome;
        }
    }

    if(confirm(`Tem certeza que deseja excluir o(a) ${nome}?`)){
        db_alunos.alunos.splice(indexExclusao, 1);
        localStorage.setItem('db_alunos', JSON.stringify(db_alunos));
    }

    //Força o recarregamento da página para exibir a tabela atualizada
    window.location.reload();
}