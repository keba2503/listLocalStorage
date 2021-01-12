//variables

const formulario = document.querySelector('#formulario');
const lista = document.querySelector('#lista');
let ideas = [];


//Event listeners

eventlisteners()

function eventlisteners () {
    formulario.addEventListener('submit', agregarIdea);
}

//Funciones

function agregarIdea(e) {
    e.preventDefault();

    //text area

    const texto = document.querySelector('#texto').value;

    if(texto === ''){
        mostrarError('El mensaje no puede estar vacio');
        return; //se evita que se ejecuten mas lineas de codigo
    }

}

function mostrarError(error) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    //insertar en el contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    setTimeout(() => {
        mensajeError.remove();
    }, 2000);
}