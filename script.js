// Array de objetos que contiene todas las preguntas, opciones y la respuesta correcta.
// Puedes agregar más preguntas aquí fácilmente.
const questions = [
    {
        question: "¿Cuál es la capital de Francia?",
        answers: [
            { text: "Berlín", correct: false },
            { text: "Madrid", correct: false },
            { text: "París", correct: true },
            { text: "Roma", correct: false }
        ]
    },
    {
        question: "¿Cuál es el río más largo del mundo?",
        answers: [
            { text: "Río Nilo", correct: false },
            { text: "Río Amazonas", correct: true },
            { text: "Río Yangtsé", correct: false },
            { text: "Río Misisipi", correct: false }
        ]
    },
    {
        question: "¿En qué continente se encuentra el desierto del Sahara?",
        answers: [
            { text: "Asia", correct: false },
            { text: "América", correct: false },
            { text: "África", correct: true },
            { text: "Australia", correct: false }
        ]
    }
     {
        question: "¿Cuál es el nombre del Director de la Institución?",
        answers: [
            { text: "Carlos Fabricio", correct: false },
            { text: "Luis Francisco", correct: false },
            { text: "Luis Vinicio", correct: true },
            { text: "Luis Felipe", correct: false }
        ]
    }
];

let currentQuestionIndex = 0; // Lleva la cuenta de la pregunta actual
let score = 0; // Lleva la cuenta de la puntuación

const questionElement = document.getElementById("question-text");
const answerButtonsElement = document.getElementById("answer-buttons");
const quizContainer = document.getElementById("quiz-container");
const questionContainer = document.getElementById("question-container");
const scoreContainer = document.getElementById("score-container");
const scoreValueElement = document.getElementById("score-value");
const totalQuestionsElement = document.getElementById("total-questions");
const restartButton = document.getElementById("restart-button");

// Función para empezar o reiniciar el quiz
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    scoreContainer.classList.add("hidden"); // Oculta el contenedor de la puntuación
    questionContainer.classList.remove("hidden"); // Muestra el contenedor de preguntas
    showQuestion(); // Llama a la función para mostrar la primera pregunta
}

// Función para mostrar una pregunta específica
function showQuestion() {
    // Limpia los botones anteriores
    resetState();

    // Obtiene la pregunta actual
    let currentQuestion = questions[currentQuestionIndex];
    // Muestra el texto de la pregunta
    questionElement.textContent = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;

    // Itera sobre las respuestas de la pregunta actual
    currentQuestion.answers.forEach(answer => {
        // Crea un nuevo botón por cada respuesta
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("bg-gray-200", "text-gray-800", "font-medium", "py-2", "px-4", "rounded-lg", "shadow", "hover:bg-gray-300", "transition-colors");

        // Asigna la propiedad 'correct' al botón
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        
        // Agrega un evento de clic al botón
        button.addEventListener("click", selectAnswer);
        // Agrega el botón al contenedor de respuestas
        answerButtonsElement.appendChild(button);
    });
}

// Función para limpiar los botones antes de mostrar la siguiente pregunta
function resetState() {
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

// Función que se ejecuta cuando el usuario selecciona una respuesta
function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";
    
    // Revisa si la respuesta seleccionada es correcta
    if (isCorrect) {
        selectedButton.classList.remove("bg-gray-200", "hover:bg-gray-300");
        selectedButton.classList.add("bg-green-500", "text-white");
        score++;
    } else {
        selectedButton.classList.remove("bg-gray-200", "hover:bg-gray-300");
        selectedButton.classList.add("bg-red-500", "text-white");
    }

    // Desactiva todos los botones después de que el usuario responda
    Array.from(answerButtonsElement.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.remove("bg-gray-200");
            button.classList.add("bg-green-500", "text-white");
        }
        button.disabled = true;
    });
    
    // Prepara para la siguiente pregunta
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            showScore();
        }
    }, 1000); // Espera 1 segundo antes de pasar a la siguiente pregunta o al resultado
}

// Función para mostrar la puntuación final
function showScore() {
    resetState();
    questionContainer.classList.add("hidden");
    scoreContainer.classList.remove("hidden");
    scoreValueElement.textContent = score;
    totalQuestionsElement.textContent = questions.length;
}

// Agrega el evento de clic al botón de reiniciar
restartButton.addEventListener("click", startQuiz);

// Inicia el quiz cuando se carga la página
startQuiz();

