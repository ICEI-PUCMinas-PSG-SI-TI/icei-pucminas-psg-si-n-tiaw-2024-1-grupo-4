// Trabalho Interdisciplinar - Aplicações Web
//
// Esse módulo realiza as operações de CRUD para o cadastro de professores,
// tendo como base o arquivo professores.json localizado na pasta db.
//
// Autor: Gabriel Torres Silva
// Data: 10/05/2024

if (!usuarioCorrente.matricula) {
    window.location ='../../index.html';
}

function listaProfessores() {
    let tableProfessores = document.getElementById("table-professores");
    
    // Popula a tabela com os registros do banco de dados
    for (i = 0; i < db_professores.professores.length; i++) {
        let professor = db_professores.professores[i];

        tableProfessores.innerHTML += `<tr><td>${professor.id}</td>
                                        <td>${professor.nome}</td>
                                        <td>${professor.matricula}</td>
                                        <td>******</td>
                                        <td>
                                            <button class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#editProfessorModal" onclick="carregaDados(${professor.id})">Editar</button>
                                            <button class="btn btn-danger btn-sm" onclick="deleteProfessor(${professor.id})">Excluir</button>
                                        </td>
                                    </tr>`;
    }
}

function createProfessor(){

    let proximoId = 0;

    if(db_professores.professores.length > 0){
        proximoId = db_professores.professores[db_professores.professores.length-1].id;
    }
    
    //Soma mais um gerando o ID
    proximoId += 1;

    // Obtem os valores dos campos do formulário
    let campoNome = document.getElementById('nome-professor').value;
    let campoMatricula = document.getElementById('matricula-professor').value;
    let campoSenha = document.getElementById('senha-professor').value;

    // Cria um objeto com os dados do contato
    let professor = { id: proximoId,
        nome: campoNome, 
        matricula: campoMatricula, 
        senha: campoSenha };

    // Inclui o novo usuario no banco de dados baseado em JSON
    db_professores.professores.push(professor);

    // Salva o banco de dados com o novo usuário no localStorage
    localStorage.setItem('db_professores', JSON.stringify(db_professores));

    //Força o recarregamento da página para exibir a tabela atualizada
    window.location.reload();
}

function carregaDados(id){
    
    //Preenchimento dos dados nos campos no modal de edição
    for (let i = 0; i < db_professores.professores.length; i++) {
        if (db_professores.professores[i].id === id){
            document.getElementById('edit-id-professor').value = db_professores.professores[i].id;
            document.getElementById('edit-nome-professor').value = db_professores.professores[i].nome;
            document.getElementById('edit-matricula-professor').value = db_professores.professores[i].matricula;
            document.getElementById('edit-senha-professor').value = db_professores.professores[i].senha;
        }
    }
}

function updateProfessor(){

    // Obtem os valores dos campos do formulário
    let id = document.getElementById('edit-id-professor').value;
    let nome = document.getElementById('edit-nome-professor').value;
    let matricula = document.getElementById('edit-matricula-professor').value;
    let senha = document.getElementById('edit-senha-professor').value;

    //Encontra o professor e o atualiza
    for (let i = 0; i < db_professores.professores.length; i++) {
        if (db_professores.professores[i].id == id){
            db_professores.professores[i].nome = nome;
            db_professores.professores[i].matricula = matricula;
            db_professores.professores[i].senha = senha;
        }
    }
    
    //Atualiza o localStorage
    localStorage.setItem('db_professores', JSON.stringify(db_professores));

    //Força o recarregamento da página para exibir a tabela atualizada
    window.location.reload();
}

function deleteProfessor(id){

    let nome = "";
    let indexExclusao = 0;

    //Encontra o professor para obter seu nome e id
    for (let i = 0; i < db_professores.professores.length; i++) {
        if (db_professores.professores[i].id == id){
            indexExclusao = i;
            nome = db_professores.professores[i].nome;
        }
    }

    if(confirm(`Tem certeza que deseja excluir o(a) ${nome}?`)){
        db_professores.professores.splice(indexExclusao, 1);
        localStorage.setItem('db_professores', JSON.stringify(db_professores));
    }

    //Força o recarregamento da página para exibir a tabela atualizada
    window.location.reload();
}
