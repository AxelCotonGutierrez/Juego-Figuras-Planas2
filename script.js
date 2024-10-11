// Cargar archivos de audio para las preguntas, las figuras, felicitaciones e inténtalo de nuevo
const audioPreguntaRojo = new Audio('https://raw.githubusercontent.com/AxelCotonGutierrez/Juego-Figuras-Planas2/master/audio/PreguntaRojo.mp3');
const audioPreguntaVerde = new Audio('https://raw.githubusercontent.com/AxelCotonGutierrez/Juego-Figuras-Planas2/master/audio/PreguntaVerde.mp3');
const audioPreguntaAzul = new Audio('https://raw.githubusercontent.com/AxelCotonGutierrez/Juego-Figuras-Planas2/master/audio/PreguntaAzul.mp3');
const audioTriangulo = new Audio('https://raw.githubusercontent.com/AxelCotonGutierrez/Juego-Figuras-Planas2/master/audio/Triangulo.mp3');
const audioCuadrado = new Audio('https://raw.githubusercontent.com/AxelCotonGutierrez/Juego-Figuras-Planas2/master/audio/Cuadrado.mp3');
const audioCirculo = new Audio('https://raw.githubusercontent.com/AxelCotonGutierrez/Juego-Figuras-Planas2/master/audio/Circulo.mp3');
const felicidadesAudio = new Audio('https://raw.githubusercontent.com/AxelCotonGutierrez/Juego-Figuras-Planas2/master/audio/Felicidades.mp3');
const intentarAudio = new Audio('https://raw.githubusercontent.com/AxelCotonGutierrez/Juego-Figuras-Planas2/master/audio/Intentar.mp3');

const shapesContainer = document.getElementById('shapes');
const questionElement = document.getElementById('question');
const resultElement = document.getElementById('result');

document.getElementById('next-question').addEventListener('click', newQuestion);

newQuestion();

function newQuestion() {
    resultElement.textContent = '';
    shapesContainer.innerHTML = '';

    const colors = ['red', 'green', 'blue'];
    const shapes = ['triangle', 'square', 'circle'];
    const shuffledShapes = shuffleArray([...shapes]);
    const colorQuestion = colors[Math.floor(Math.random() * colors.length)];

    shuffledShapes.forEach(shape => {
        const color = colors.splice(Math.floor(Math.random() * colors.length), 1)[0];
        const shapeElement = document.createElement('div');
        shapeElement.classList.add('shape', shape);
        if (shape === 'triangle') {
            shapeElement.style.borderBottomColor = color;
        } else {
            shapeElement.style.backgroundColor = color;
        }
        shapesContainer.appendChild(shapeElement);

        if (color === colorQuestion) {
            window.correctAnswer = shape;
        }
    });

    const colorQuestionTraducida = traducirColorAlEspanol(colorQuestion);
    questionElement.textContent = `¿Qué figura es de color ${colorQuestionTraducida}?`;
}

function playAudioPregunta() {
    switch (questionElement.textContent) {
        case '¿Qué figura es de color rojo?':
            audioPreguntaRojo.play();
            break;
        case '¿Qué figura es de color verde?':
            audioPreguntaVerde.play();
            break;
        case '¿Qué figura es de color azul?':
            audioPreguntaAzul.play();
            break;
    }
}

function playAudioFigura(shape) {
    switch (shape) {
        case 'triangle':
            audioTriangulo.play();
            break;
        case 'square':
            audioCuadrado.play();
            break;
        case 'circle':
            audioCirculo.play();
            break;
    }
}

function guess(shape) {
    const correctAnswerTraducida = traducirFormaAlEspanol(window.correctAnswer);

    if (shape === window.correctAnswer) {
        resultElement.textContent = '¡Correcto! Felicitaciones.';
        resultElement.style.color = 'green';
        felicidadesAudio.play(); // Reproduce el audio de felicitaciones
    } else {
        resultElement.textContent = `Incorrecto. La respuesta correcta era ${correctAnswerTraducida}. ¡Inténtalo de nuevo!`;
        resultElement.style.color = 'red';
        intentarAudio.play(); // Reproduce el audio de inténtalo de nuevo
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function traducirColorAlEspanol(colorIngles) {
    const traducciones = {
        'red': 'rojo',
        'green': 'verde',
        'blue': 'azul'
    };
    return traducciones[colorIngles] || colorIngles;
}

function traducirFormaAlEspanol(formaIngles) {
    const traducciones = {
        'triangle': 'triángulo',
        'square': 'cuadrado',
        'circle': 'círculo'
    };
    return traducciones[formaIngles] || formaIngles;
}
