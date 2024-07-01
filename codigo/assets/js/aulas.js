// Arquivo: codigo/assets/js/aulas.js

document.addEventListener("DOMContentLoaded", function () {
    // Carregar aulas existentes do armazenamento local ou dados iniciais
    let db_professores = JSON.parse(localStorage.getItem('db_professores'));
    let db_turmas = JSON.parse(localStorage.getItem('db_turmas'));

    let aulas;
    let aulasJSON = localStorage.getItem('aulas');

    if (!aulasJSON) { 
        aulas = dadosIniciaisAulas.aulas;
        localStorage.setItem('aulas', JSON.stringify(aulas));
    }
    else  {
        aulas = JSON.parse(aulasJSON);
    }

    // Imprimir todas as aulas existentes no console
    console.log("Aulas existentes:", aulas);

    // Manipulador de envio do formulário
    document.getElementById("classForm").addEventListener("submit", function (event) {
        event.preventDefault();

        const turma = document.getElementById("classGroup").value;
        const diaDaSemana = document.getElementById("dayOfWeek").value;
        const dataInicio = new Date(document.getElementById("dataInicio").value);
        const dataTermino = new Date(document.getElementById("dataTermino").value);
        const horario = document.getElementById("horario").value;

        const diasDaSemana = {
            "Segunda-feira": 0,
            "Terça-feira": 1,
            "Quarta-feira": 2,
            "Quinta-feira": 3,
            "Sexta-feira": 4
        };

        if(dataInicio < dataTermino){
            let proximaData = dataInicio;
            proximaData.setDate(dataInicio.getDate() + (7 + diasDaSemana[diaDaSemana] - dataInicio.getDay()) % 7);
            let professor = db_turmas.turmas.find(turmaAux => turmaAux.id == parseInt(turma)).professor;

            while (proximaData <= dataTermino) {
                if(!aulas.find(aula => aula.turma === parseInt(turma) && aula.data === proximaData.toISOString().split('T')[0] && aula.horario == parseInt(horario))){
                    for(let i=0; i<aulas.length; i++) {
                        let turmaAux = db_turmas.turmas.find(turmaAux => turmaAux.id == aulas[i].turma);
                        if(turmaAux && turmaAux.professor == professor){
                            if(aulas[i].data == proximaData.toISOString().split('T')[0] && aulas[i].horario == parseInt(horario)) {
                                alert("Esse professor já possui aulas no mesmo dia e horário em outra turma!");
                                return false;
                            }
                        }
                    }

                    aulas.push({
                        id: aulas.length + 1,
                        turma: parseInt(turma),
                        data: proximaData.toISOString().split('T')[0],
                        apurada: false,
                        alunosPresentes: [],
                        horario: parseInt(horario)
                    });
                } else {
                    alert("Já existe aulas para a turma nas datas e horarios selecionados!");
                    return false;
                }
                proximaData.setDate(proximaData.getDate() + 7);
            }
    
            // Salvar lista de aulas atualizada no armazenamento local
            localStorage.setItem('aulas', JSON.stringify(aulas));
    
            // Imprimir todas as aulas, incluindo as novas entradas, no console
            console.log("Aulas atualizadas:", aulas);

            alert("As aulas foram cridas com sucesso!");
        } else {
            alert("Data início não pode ser posterior a data fim! Verifique as datas.");
        }

        // Resetar o formulário
        event.target.reset();
    });
});
