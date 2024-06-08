// Arquivo: codigo/assets/js/aulas.js

document.addEventListener("DOMContentLoaded", function () {
    // Carregar aulas existentes do armazenamento local ou dados iniciais
    let aulas = JSON.parse(localStorage.getItem('aulas')) || dadosIniciaisAulas.aulas;

    // Imprimir todas as aulas existentes no console
    console.log("Aulas existentes:", aulas);

    // Manipulador de envio do formulário
    document.getElementById("classForm").addEventListener("submit", function (event) {
        event.preventDefault();

        const turma = document.getElementById("classGroup").value;
        const diaDaSemana = document.getElementById("dayOfWeek").value;
        const dataInicio = new Date(document.getElementById("dataInicio").value);
        const dataTermino = new Date(document.getElementById("dataTermino").value);

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
    
            while (proximaData <= dataTermino) {
                if(!aulas.find(aula => aula.turma === parseInt(turma) && aula.data === proximaData.toISOString().split('T')[0])){
                    aulas.push({
                        id: aulas.length + 1,
                        turma: parseInt(turma),
                        data: proximaData.toISOString().split('T')[0],
                        apurada: false,
                        alunosPresentes: []
                    });
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
