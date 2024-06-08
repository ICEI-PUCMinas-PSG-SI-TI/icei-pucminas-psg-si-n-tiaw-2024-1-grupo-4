// Trabalho Interdisciplinar - Aplicações Web
//
// Módulo inicial para realização do login dos usuários
//
// Autor: Gabriel Torres Silva
// Data: 17/05/2024

let db_admins = {};
let db_alunos = {};
let db_professores = {};

let usuarioCorrente = {};

function initLoginApp() {
    let adminsJSON = localStorage.getItem('db_admins');
    let alunosJSON = localStorage.getItem('db_alunos');
    let professoresJSON = localStorage.getItem('db_professores');

    if (!adminsJSON) { 
        //alert('Dados de admins não encontrados no localStorage. \n -----> Fazendo carga inicial.');
        db_admins = dadosIniciaisAdm;
        localStorage.setItem('db_admins', JSON.stringify(dadosIniciaisAdm));
    } else {
        db_admins = JSON.parse(adminsJSON);    
    }

    if (!alunosJSON) { 
        //alert('Dados de alunos não encontrados no localStorage. \n -----> Fazendo carga inicial.');
        db_alunos = dadosIniciaisAlunos;
        localStorage.setItem('db_alunos', JSON.stringify(dadosIniciaisAlunos));
    } else {
        db_alunos = JSON.parse(alunosJSON);    
    }

    if (!professoresJSON) { 
        //alert('Dados de professores não encontrados no localStorage. \n -----> Fazendo carga inicial.');
        db_professores = dadosIniciaisProfessores;
        localStorage.setItem('db_professores', JSON.stringify(dadosIniciaisProfessores));
    } else {
        db_professores = JSON.parse(professoresJSON);    
    }

    // Usuário logado
    let usuarioCorrenteJSON = sessionStorage.getItem('usuarioCorrente');
    if (usuarioCorrenteJSON) {
        usuarioCorrente = JSON.parse(usuarioCorrenteJSON);
    }
}

function redirectIfLogged() {
    let usuarioCorrenteJSON = sessionStorage.getItem('usuarioCorrente');
    if (usuarioCorrenteJSON) {
        usuarioCorrente = JSON.parse(usuarioCorrenteJSON);

        if (usuarioCorrente.matricula !== undefined && usuarioCorrente.nome !== undefined && usuarioCorrente.perfil !== undefined) {
            switch (usuarioCorrente.perfil) {
                case "1":
                    window.location.href = '../codigo/pages/adm/cadastro_pessoas.html';
                    break;
                case "2":
                    window.location.href = '../codigo/pages/professores/listagem_turmas.html';
                    break;
                case "3":
                    window.location.href = '../codigo/pages/alunos/listagem_de_diciplina.html';
                    break;
            }
        }
    }
}

// Verifica se o login do usuário está ok e, se positivo, direciona para a página inicial
function loginUser(event) {
    event.preventDefault();

    let matricula = document.getElementById('matricula').value;
    let senha = document.getElementById('senha').value;
    let perfil = document.getElementById('perfil').value;
    
    if (perfil == "0") {
        alert("Selecione o PERFIL");
        return false;
    }

    let usuarioValido = null;

    switch (perfil) {
        case "1": // Admin
            usuarioValido = db_admins.admins.find(admin => admin.matricula === matricula && admin.senha === senha);
            break;
        case "2": // Professor
            usuarioValido = db_professores.professores.find(professor => professor.matricula === matricula && professor.senha === senha);
            break;
        case "3": // Aluno
            usuarioValido = db_alunos.alunos.find(aluno => aluno.matricula === matricula && aluno.senha === senha);
            break;
    }

    if (usuarioValido) {
        usuarioCorrente.matricula = usuarioValido.matricula;
        usuarioCorrente.nome = usuarioValido.nome;
        usuarioCorrente.perfil = perfil;

        // Salva os dados do usuário corrente no Session Storage, mas antes converte para string
        sessionStorage.setItem('usuarioCorrente', JSON.stringify(usuarioCorrente));

        switch (perfil) {
            case "1":
                window.location.href = '../codigo/pages/adm/cadastro_pessoas.html';
                break;
            case "2":
                window.location.href = '../codigo/pages/professores/listagem_turmas.html';
                break;
            case "3":
                window.location.href = '../codigo/pages/alunos/listagem_de_diciplina.html';
                break;
        }
    } else {
        alert("Usuário ou senha inválidos");
    }
}

// Apaga os dados do usuário corrente no sessionStorage
function logoutUser() {
    usuarioCorrente = {};
    sessionStorage.removeItem('usuarioCorrente');
    window.location.href = '../../index.html';
}

// Inicializa as estruturas utilizadas pelo LoginApp
initLoginApp();
