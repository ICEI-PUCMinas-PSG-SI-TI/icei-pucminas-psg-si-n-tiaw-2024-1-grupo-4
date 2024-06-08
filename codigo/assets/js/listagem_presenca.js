// Arquivo: listagem_presenca.js

if (!usuarioCorrente.matricula) {
    window.location ='../../index.html';
}

const params = new URLSearchParams(window.location.search);

function listaAlunos() {

    let aulas = JSON.parse(localStorage.getItem('aulas'));
    let db_turmas = JSON.parse(localStorage.getItem('db_turmas'));
    let db_alunos = JSON.parse(localStorage.getItem('db_alunos'));
    
    let tableAlunos = document.getElementById("table-alunos");
    
    let aula = aulas.find(aula => aula.id == params.get("aula"));
    let turma = db_turmas.turmas.find(turma => turma.id === aula.turma);

    // Popula a tabela com os registros do banco de dados
    for (i = 0; i < turma.alunos.length; i++) {
        let aluno = db_alunos.alunos.find(aluno => aluno.id === turma.alunos[i]);

        if(!aula.apurada) {
            console.log("não apuarada")
            tableAlunos.innerHTML += `<tr><td>${aluno.id}</td>
                                            <td>${aluno.nome}</td>
                                            <td>${aluno.matricula}</td>
                                            <td><button class="btn btn-success" onclick="toggleButton(this)" id="botaoPresenca">Presente</button></td>
                                        </tr>`;
        } else {

            if (aula.alunosPresentes.find(alunoAux => alunoAux == aluno.id)){
                buttonAux = '<td><button class="btn btn-success" onclick="toggleButton(this)" id="botaoPresenca">Presente</button></td>'
            } else {
                buttonAux = '<td><button class="btn btn-danger" onclick="toggleButton(this)" id="botaoPresenca">Ausente</button></td>'
            }

            tableAlunos.innerHTML += `<tr><td>${aluno.id}</td>
                                            <td>${aluno.nome}</td>
                                            <td>${aluno.matricula}</td>
                                            ${buttonAux}
                                        </tr>`;
        }
    }
}

function toggleButton(button) {            
    if (button.innerText === "Ausente") {
        button.innerText = "Presente";
        button.classList.remove('btn-danger');
        button.classList.add('btn-success');
    } else {
        button.innerText = "Ausente";
        button.classList.remove('btn-success');
        button.classList.add('btn-danger');
    }

    return false;
}

function salvarPresenca(event){
    event.preventDefault();

    let aulas = JSON.parse(localStorage.getItem('aulas'));
    let tableAlunos = document.getElementById("table-alunos");

    if(event.submitter.id == "botaoSalvar"){
        let aula = aulas.find(aula => aula.id == params.get("aula"));
        
        aula.apurada = true;

        tableAlunos.childNodes.forEach(linhaAluno => {
            let alunoAux = linhaAluno.textContent.split("\n");
            if(alunoAux.length === 5){
                if(alunoAux[3].trim() == "Presente"){
                    if (!aula.alunosPresentes.find(aluno => aluno == parseInt(alunoAux[0])))
                        aula.alunosPresentes.push(parseInt(alunoAux[0]));
                } else {
                    if (aula.alunosPresentes.find(aluno => aluno == parseInt(alunoAux[0])))
                        aula.alunosPresentes.splice(aula.alunosPresentes.indexOf(parseInt(alunoAux[0])), 1);
                }
            }
        });
        
        localStorage.setItem('aulas', JSON.stringify(aulas));

        window.location.href = 'listagem_turmas.html';
    }
}