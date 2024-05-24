// Arquivo: codigo/assets/js/aulas.js

const dadosIniciaisAulas = {
    aulas: [
        {
            id: 1,
            turma: 2,
            disciplina: "COMP101",
            data: "2024-05-15"
        },
        {
            id: 2,
            turma: 1,
            disciplina: "MATH101",
            data: "2024-05-17"
        },
        {
            id: 3,
            turma: 3,
            disciplina: "COMP301",
            data: "2024-05-13"
        },
        {
            id: 4,
            turma: 2,
            disciplina: "COMP201",
            data: "2024-05-14"
        },
        {
            id: 5,
            turma: 3,
            disciplina: "MATH101",
            data: "2024-05-16"
        }
    ]
};

document.addEventListener("DOMContentLoaded", function () {
    // Carregar aulas existentes do armazenamento local ou dados iniciais
    let aulas = JSON.parse(localStorage.getItem('aulas')) || dadosIniciaisAulas.aulas;

    // Imprimir todas as aulas existentes no console
    console.log("Aulas existentes:", aulas);

    // Manipulador de envio do formulário
    document.getElementById("classForm").addEventListener("submit", function (event) {
        event.preventDefault();

        const turma = document.getElementById("classGroup").value;
        const disciplina = document.getElementById("subject").value;
        const diaDaSemana = document.getElementById("dayOfWeek").value;
        const dataTermino = new Date(document.getElementById("dataTermino").value);

        const diasDaSemana = {
            "Segunda-feira": 1,
            "Terça-feira": 2,
            "Quarta-feira": 3,
            "Quinta-feira": 4,
            "Sexta-feira": 5
        };

        let proximaData = new Date();
        proximaData.setDate(proximaData.getDate() + (7 + diasDaSemana[diaDaSemana] - proximaData.getDay()) % 7);

        while (proximaData <= dataTermino) {
            aulas.push({
                id: aulas.length + 1,
                turma: parseInt(turma),
                disciplina: disciplina,
                data: proximaData.toISOString().split('T')[0]
            });
            proximaData.setDate(proximaData.getDate() + 7);
        }

        // Salvar lista de aulas atualizada no armazenamento local
        localStorage.setItem('aulas', JSON.stringify(aulas));

        // Imprimir todas as aulas, incluindo as novas entradas, no console
        console.log("Aulas atualizadas:", aulas);

        // Resetar o formulário
        event.target.reset();
    });
});
