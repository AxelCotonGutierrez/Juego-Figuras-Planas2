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
let gameOver = false; // Variable para controlar el estado del juego

document.getElementById('next-question').addEventListener('click', newQuestion);

newQuestion();

function newQuestion() {
    resultElement.textContent = '';
    shapesContainer.innerHTML = '';
    gameOver = false; // Reiniciar el estado del juego
    enableGuessButtons(); // Habilitar botones de respuesta

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

function guess(shape) {
    if (gameOver) return; // Si el juego ha terminado, no se permiten más respuestas

    const correctAnswerTraducida = traducirFormaAlEspanol(window.correctAnswer);

    if (shape === window.correctAnswer) {
        resultElement.textContent = '¡Correcto! Felicitaciones.';
        resultElement.style.color = 'green';
        playAudio(felicidadesAudio); // Reproduce el audio de felicitaciones
        gameOver = true; // Marcar el juego como terminado
        incrementarContadorFirebase("Infantil/Matemáticas/Geometría/FormasBásicas", "figurasgeometricas2");
        disableGuessButtons(); // Deshabilitar los botones de respuesta
    } else {
        resultElement.textContent = `Incorrecto. La respuesta correcta era ${correctAnswerTraducida}. ¡Inténtalo de nuevo!`;
        resultElement.style.color = 'red';
        playAudio(intentarAudio); // Reproduce el audio de inténtalo de nuevo
        gameOver = true; // Marcar el juego como terminado
        incrementarContadorFirebase("Infantil/Matemáticas/Geometría/FormasBásicas", "figurasgeometricas2");
        disableGuessButtons(); // Deshabilitar los botones de respuesta
    }
}

function playAudioFigura(shape) {
    let audioElement;
    switch (shape) {
        case 'triangle':
            audioElement = audioTriangulo;
            break;
        case 'square':
            audioElement = audioCuadrado;
            break;
        case 'circle':
            audioElement = audioCirculo;
            break;
    }
    playAudio(audioElement);
}

function playAudioPregunta() {
    switch (questionElement.textContent) {
        case '¿Qué figura es de color rojo?':
            playAudio(audioPreguntaRojo);
            break;
        case '¿Qué figura es de color verde?':
            playAudio(audioPreguntaVerde);
            break;
        case '¿Qué figura es de color azul?':
            playAudio(audioPreguntaAzul);
            break;
    }
}

function playAudio(audioElement) {
    if (document.getElementById('sound-control').checked) { // Verificar si el sonido está activado
        audioElement.play().then(() => {
            console.log('Audio reproducido correctamente');
        }).catch(error => {
            console.error('Error al reproducir el audio:', error);
        });
    }
}

// Función para deshabilitar solo los botones de respuesta
function disableGuessButtons() {
    const guessButtons = document.querySelectorAll(".guess-button:not(#next-question)");
    guessButtons.forEach(button => {
        button.disabled = true;
    });
}

// Función para habilitar los botones de respuesta
function enableGuessButtons() {
    const guessButtons = document.querySelectorAll(".guess-button:not(#next-question)");
    guessButtons.forEach(button => {
        button.disabled = false;
    });
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
// Llamar a la función para mostrar el contador al cargar la página
mostrarContador("Infantil/Matemáticas/Geometría/FormasBásicas", "figurasgeometricas2");