// Arquivo: disciplinas.js

let db_disciplinas = []; // Array para armazenar as disciplinas carregadas do JSON

function init() {
    // Carregar dados de disciplinas do arquivo JSON usando fetch
    fetch('../db/disciplinas.json')
        .then(response => response.json())
        .then(data => {
            db_disciplinas = data.disciplinas;
            listarDisciplinas(); // Após carregar os dados, listar as disciplinas na tabela
        })
        .catch(error => {
            console.error('Erro ao carregar disciplinas:', error);
            alert('Erro ao carregar dados de disciplinas. Por favor, tente novamente mais tarde.');
        });

    // Carregar códigos de disciplinas para o dropdown de códigos de disciplinas
    fetch('../db/codigo_disciplinas.json')
        .then(response => response.json())
        .then(data => {
            const selectCodigoDisciplina = document.getElementById('codigo-disciplina');

            // Limpar o dropdown antes de adicionar novas opções
            selectCodigoDisciplina.innerHTML = '';

            // Preencher o dropdown com os códigos de disciplinas disponíveis
            data.codigos_disciplinas.forEach(disciplina => {
                const option = document.createElement('option');
                option.value = disciplina.codigo;
                option.text = `${disciplina.codigo} - ${disciplina.nome}`;
                selectCodigoDisciplina.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Erro ao carregar códigos de disciplinas:', error);
            alert('Erro ao carregar dados de códigos de disciplinas. Por favor, tente novamente mais tarde.');
        });

    // Carregar dados de professores para o dropdown de professores
    const selectProfessorDisciplina = document.getElementById('professor-disciplina');
    selectProfessorDisciplina.innerHTML = ''; // Limpar o dropdown antes de adicionar novas opções

    // Carregar dados de professores do arquivo JSON
    fetch('../db/professores.json')
        .then(response => response.json())
        .then(data => {
            // Preencher o dropdown com os dados dos professores disponíveis
            data.professores.forEach(professor => {
                const option = document.createElement('option');
                option.value = professor.id;
                option.text = professor.nome;
                selectProfessorDisciplina.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Erro ao carregar dados de professores:', error);
            alert('Erro ao carregar dados de professores. Por favor, tente novamente mais tarde.');
        });
}

function listarDisciplinas() {
    let tableDisciplinas = document.getElementById("table-disciplinas");
    tableDisciplinas.innerHTML = ""; // Limpa a tabela antes de atualizar

    // Iterar sobre as disciplinas carregadas e adicionar linhas na tabela
    db_disciplinas.forEach(disciplina => {
        tableDisciplinas.innerHTML += `<tr>
            <td>${disciplina.id}</td>
            <td>${disciplina.codigo}</td>
            <td>${disciplina.nome}</td>
            <td>${disciplina.professor}</td>
            <td>
                <button class="btn btn-primary btn-sm" onclick="editarDisciplina(${disciplina.id})">Editar</button>
                <button class="btn btn-danger btn-sm" onclick="excluirDisciplina(${disciplina.id})">Excluir</button>
            </td>
        </tr>`;
    });
}

function adicionarDisciplina() {
    let codigo = document.getElementById('codigo-disciplina').value;
    let nome = document.querySelector('#codigo-disciplina option:checked').text.split(' - ')[1]; // Obter o nome da disciplina pelo código selecionado
    let professorId = document.getElementById('professor-disciplina').value;
    let professorNome = document.getElementById('professor-disciplina').options[document.getElementById('professor-disciplina').selectedIndex].text;

    let proximoId = db_disciplinas.length > 0 ? db_disciplinas[db_disciplinas.length - 1].id + 1 : 1;

    let disciplina = {
        id: proximoId,
        codigo: codigo,
        nome: nome,
        professor: professorNome
    };

    db_disciplinas.push(disciplina); // Adicionar nova disciplina ao array
    salvarDisciplinasNoArquivo(); // Salvar disciplinas no arquivo JSON
    listarDisciplinas(); // Atualizar a tabela de disciplinas na interface

    // Limpar os campos do formulário após adicionar a disciplina
    document.getElementById('codigo-disciplina').value = '';
    document.getElementById('professor-disciplina').selectedIndex = 0; // Resetar para a primeira opção

    // Fechar o modal após adicionar a disciplina
    let modalElement = document.getElementById('addDisciplinaModal');
    let modal = bootstrap.Modal.getInstance(modalElement);
    modal.hide();
}

function excluirDisciplina(id) {
    if (confirm('Tem certeza que deseja excluir esta disciplina?')) {
        db_disciplinas = db_disciplinas.filter(d => d.id !== id); // Remover disciplina do array
        salvarDisciplinasNoArquivo(); // Salvar alterações no arquivo JSON
        listarDisciplinas(); // Atualizar a tabela de disciplinas na interface
    }
}

function salvarDisciplinasNoArquivo() {
    // Salvar dados de disciplinas de volta para o arquivo JSON
    fetch('../db/disciplinas.json', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ disciplinas: db_disciplinas })
    })
    .catch(error => {
        console.error('Erro ao salvar disciplinas:', error);
        alert('Erro ao salvar dados de disciplinas. Por favor, tente novamente mais tarde.');
    });
}

// Função para preencher automaticamente o nome da disciplina ao selecionar um código
function preencherNomeDisciplina() {
    let codigoSelecionado = document.getElementById('codigo-disciplina').value;
    let nomeDisciplina = document.querySelector(`#codigo-disciplina option[value="${codigoSelecionado}"]`).text.split(' - ')[1];
    document.getElementById('nome-disciplina').value = nomeDisciplina;
}

// Chamada da função init() para inicializar o carregamento dos dados ao carregar a página
init();
