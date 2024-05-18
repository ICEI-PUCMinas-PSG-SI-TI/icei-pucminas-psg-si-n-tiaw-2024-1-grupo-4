// Arquivo: disciplinas.js

if (!usuarioCorrente.matricula) {
    window.location ='../../index.html';
}

let db_disciplinas = {}; // Array para armazenar as disciplinas carregadas do JSON

function init() {
    let disciplinasJSON = localStorage.getItem('db_disciplinas');

    // Verifica se existem dados já armazenados no localStorage
    if (!disciplinasJSON) {  // Se NÃO há dados no localStorage
        
        // Informa sobre localStorage vazio e e que serão carregados os dados iniciais
        alert('Dados de disciplinas não encontrados no localStorage. \n -----> Fazendo carga inicial.');

        // Copia os dados iniciais para o banco de dados 
        db_disciplinas = dadosIniciaisDisciplinas;

        // Salva os dados iniciais no local Storage convertendo-os para string antes
        localStorage.setItem('db_disciplinas', JSON.stringify(dadosIniciaisDisciplinas));
    }
    else  {  // Se há dados no localStorage
        // Converte a string JSON em objeto colocando no banco de dados baseado em JSON
        db_disciplinas = JSON.parse(disciplinasJSON);
    }
}

function listarDisciplinas() {
    let tableDisciplinas = document.getElementById("table-disciplinas");
    tableDisciplinas.innerHTML = ""; // Limpa a tabela antes de atualizar

    // Iterar sobre as disciplinas carregadas e adicionar linhas na tabela
    db_disciplinas.disciplinas.forEach(disciplina => {
        tableDisciplinas.innerHTML += `<tr>
            <td>${disciplina.id}</td>
            <td>${disciplina.codigo}</td>
            <td>${disciplina.nome}</td>
            <td>
                <button class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#editDisciplinaModal" onclick="carregaDados(${disciplina.id})">Editar</button>
                <button class="btn btn-danger btn-sm" onclick="excluirDisciplina(${disciplina.id})">Excluir</button>
            </td>
        </tr>`;
    });
}

function adicionarDisciplina() {
    let codigo = document.getElementById('codigo-disciplina').value;
    let nome = document.getElementById('nome-disciplina').value;

    let proximoId = db_disciplinas.disciplinas.length > 0 ? db_disciplinas.disciplinas[db_disciplinas.disciplinas.length - 1].id + 1 : 1;

    let disciplina = {
        id: proximoId,
        codigo: codigo,
        nome: nome
    };

    db_disciplinas.disciplinas.push(disciplina); // Adicionar nova disciplina ao array
    
    localStorage.setItem('db_disciplinas', JSON.stringify(db_disciplinas));

    window.location.reload();
}

function carregaDados(id){
    
    //Preenchimento dos dados nos campos no modal de edição
    for (let i = 0; i < db_disciplinas.disciplinas.length; i++) {
        if (db_disciplinas.disciplinas[i].id === id){
            document.getElementById('edit-id-disciplina').value = db_disciplinas.disciplinas[i].id;
            document.getElementById('edit-codigo-disciplina').value = db_disciplinas.disciplinas[i].codigo;
            document.getElementById('edit-nome-disciplina').value = db_disciplinas.disciplinas[i].nome;
        }
    }
}

function editarDisciplina(){

    // Obtem os valores dos campos do formulário
    let id = document.getElementById('edit-id-disciplina').value;
    let codigo = document.getElementById('edit-codigo-disciplina').value;
    let nome = document.getElementById('edit-nome-disciplina').value;

    //Encontra a disciplina e a atualiza
    for (let i = 0; i < db_disciplinas.disciplinas.length; i++) {
        if (db_disciplinas.disciplinas[i].id == id){
            db_disciplinas.disciplinas[i].codigo = codigo;
            db_disciplinas.disciplinas[i].nome = nome;
        }
    }
    
    //Atualiza o localStorage
    localStorage.setItem('db_disciplinas', JSON.stringify(db_disciplinas));

    //Força o recarregamento da página para exibir a tabela atualizada
    window.location.reload();
}

function excluirDisciplina(id) {
    if (confirm('Tem certeza que deseja excluir esta disciplina?')) {
        db_disciplinas.disciplinas = db_disciplinas.disciplinas.filter(d => d.id !== id); // Remover disciplina do array
        localStorage.setItem('db_disciplinas', JSON.stringify(db_disciplinas));
    }

    window.location.reload();
}

// Chamada da função init() para inicializar o carregamento dos dados ao carregar a página
init();
