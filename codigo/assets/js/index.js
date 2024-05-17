// Trabalho Interdisciplinar - Aplicações Web
//
// Módulo inicial para realização do login dos usuários
//
// Autor: Gabriel Torres Silva
// Data: 17/05/2024


const LOGIN_URL = "login.html";

let db_admins = {};
let db_alunos = {};
let db_professores = {};

let usuarioCorrente = {};

function initLoginApp() {

    usuarioCorrenteJSON = sessionStorage.getItem('usuarioCorrente');
    if (usuarioCorrenteJSON) {
        usuarioCorrente = JSON.parse(usuarioCorrenteJSON);
    }
    
    let adminsJSON = localStorage.getItem('db_admins');
    let alunosJSON = localStorage.getItem('db_alunos');
    let professoresJSON = localStorage.getItem('db_professores');

    if (!adminsJSON) { 
        alert('Dados de admins não encontrados no localStorage. \n -----> Fazendo carga inicial.');
        db_admins = dadosIniciaisAdm;
        localStorage.setItem('db_admins', JSON.stringify(dadosIniciaisAdm));
    }
    else  {
        db_admins = JSON.parse(adminsJSON);    
    }

    if (!alunosJSON) { 
        alert('Dados de alunos não encontrados no localStorage. \n -----> Fazendo carga inicial.');
        db_alunos = dadosIniciaisAlunos;
        localStorage.setItem('db_alunos', JSON.stringify(dadosIniciaisAlunos));
    }
    else  {
        db_alunos = JSON.parse(alunosJSON);    
    }

    if (!professoresJSON) { 
        alert('Dados de professores não encontrados no localStorage. \n -----> Fazendo carga inicial.');
        db_professores = dadosIniciaisProfessores;
        localStorage.setItem('db_professores', JSON.stringify(dadosIniciaisProfessores));
    }
    else  {
        db_professores = JSON.parse(professoresJSON);    
    }
};

// Verifica se o login do usuário está ok e, se positivo, direciona para a página inicial
function loginUser(event) {
    event.preventDefault();
    
    let matricula = document.getElementById('matricula').value;
    let senha = document.getElementById('senha').value;
    let perfil = document.getElementById('perfil').value;

    if(perfil == "1") {
        for (let i = 0; i < db_admins.admins.length; i++) {
            let admin = db_admins.admins[i];
            
            if (matricula == admin.matricula && senha == admin.senha) {
                usuarioCorrente.matricula = admin.matricula;
                usuarioCorrente.nome = admin.nome;
                
                // Salva os dados do usuário corrente no Session Storage, mas antes converte para string
                sessionStorage.setItem('usuarioCorrente', JSON.stringify(usuarioCorrente));
                
                window.location.href = '../../cadastro_pessoas.html';
                return true;
            }
        }
    }

    alert("Usuário ou senha inválidos")
}

// Apaga os dados do usuário corrente no sessionStorage
function logoutUser () {
    usuarioCorrente = {};
    sessionStorage.setItem ('usuarioCorrente', JSON.stringify(usuarioCorrente));
    window.location = LOGIN_URL;
}

// Inicializa as estruturas utilizadas pelo LoginApp
initLoginApp();