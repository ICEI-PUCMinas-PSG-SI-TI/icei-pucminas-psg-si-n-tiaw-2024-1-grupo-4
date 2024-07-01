if (!usuarioCorrente.matricula) {
    window.location ='../../index.html';
}

function cadastraUsuario() {
    let nome = document.getElementById('nome').value;
    let matricula = document.getElementById('matricula').value;
    let senha = document.getElementById('senha').value;
    let perfil = document.getElementById('perfil').value;

    if(perfil === "1") {
        let proximoId = db_admins.admins.length > 0 ? db_admins.admins[db_admins.admins.length - 1].id + 1 : 1;

        let admin = {
            id: proximoId,
            nome: nome,
            matricula: matricula,
            senha: senha
        };

        db_admins.admins.push(admin);
        
        localStorage.setItem('db_admins', JSON.stringify(db_admins));

        alert("Admin cadastrado com sucesso!");

    } else if(perfil === "2"){
        let proximoId = db_professores.professores.length > 0 ? db_professores.professores[db_professores.professores.length - 1].id + 1 : 1;

        let professor = {
            id: proximoId,
            nome: nome,
            matricula: matricula,
            senha: senha
        };

        db_professores.professores.push(professor);
        
        localStorage.setItem('db_professores', JSON.stringify(db_professores));

        alert("Professor cadastrado com sucesso!");

    } else if(perfil === "3"){
        let proximoId = db_alunos.alunos.length > 0 ? db_alunos.alunos[db_alunos.alunos.length - 1].id + 1 : 1;

        let aluno = {
            id: proximoId,
            nome: nome,
            matricula: matricula,
            senha: senha
        };

        db_alunos.alunos.push(aluno);
        
        localStorage.setItem('db_alunos', JSON.stringify(db_alunos));

        alert("Aluno cadastrado com sucesso!");

    } else {
        alert("Obrigatório a seleção do perfil do usuário.")
        return false;
    }
}