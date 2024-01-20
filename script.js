// Axel Cotón Gutiérrez Copyright 2023
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

    // Llamada a la nueva función para traducir nombres
    const colorQuestionTraducida = traducirColorAlEspanol(colorQuestion);
    questionElement.textContent = `¿Qué figura es de color ${colorQuestionTraducida}?`;
}

function guess(shape) {
    // Llamada a la nueva función para traducir nombres
    const correctAnswerTraducida = traducirFormaAlEspanol(window.correctAnswer);

    if (shape === window.correctAnswer) {
        resultElement.textContent = '¡Correcto! Felicidades.';
        resultElement.style.color = 'green';
    } else {
        resultElement.textContent = `Incorrecto. La respuesta correcta era ${correctAnswerTraducida}. ¡Inténtalo de nuevo!`;
        resultElement.style.color = 'red';
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Nuevas funciones de traducción
function traducirColorAlEspanol(colorIngles) {
    const traducciones = {
        'red': 'rojo',
        'green': 'verde',
        'blue': 'azul'
        // Puedes agregar más traducciones según sea necesario
    };

    return traducciones[colorIngles] || colorIngles;
}

function traducirFormaAlEspanol(formaIngles) {
    const traducciones = {
        'triangle': 'triángulo',
        'square': 'cuadrado',
        'circle': 'círculo'
        // Puedes agregar más traducciones según sea necesario
    };

    return traducciones[formaIngles] || formaIngles;
}

// Navegaciòn"  
 
document.addEventListener('DOMContentLoaded', function() {
    var menuToggle = document.querySelector('.menu-toggle');
    var menu = document.querySelector('.menu');
        
    menuToggle.addEventListener('click', function() {
    menu.classList.toggle('active');
    });
  });