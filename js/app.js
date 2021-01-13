//variables

const formulario = document.querySelector('#formulario');
const lista = document.querySelector('#lista');
let tweets = [];


//Event listeners

eventlisteners()

function eventlisteners() {
    formulario.addEventListener('submit', agregarIdea);

     // Borrar Tweets
     lista.addEventListener('click', borrarTweet);

     // Contenido cargado
     document.addEventListener('DOMContentLoaded', () => {
          tweets = JSON.parse( localStorage.getItem('tweets') ) || []  ;
          console.log(tweets);
          crearHTML();
     });
}

//Funciones

function agregarIdea(e) {
    e.preventDefault();

    //text area

    const tweet = document.querySelector('#texto').value;

    if (tweet === '') {
        mostrarError('El mensaje no puede estar vacio');
        return; //se evita que se ejecuten mas lineas de codigo
    }

    const tweetObj = {
        id: Date.now(),
        texto: tweet
    }

    tweets = [...tweets, tweetObj];

    //Crear html
    crearHTML();

//reiniciar el form
formulario.reset();


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

//Muestra listado de ideas

function crearHTML() {
     limpiarHTML();
     
     if(tweets.length > 0 ) {
          tweets.forEach( tweet =>  {
               // crear boton de eliminar
               const botonBorrar = document.createElement('a');
               botonBorrar.classList = 'borrar-tweet';
               botonBorrar.innerText = '✔';
     
               // Crear elemento y añadirle el contenido a la lista
               const li = document.createElement('li');

               // Añade el texto
               li.innerText = tweet.texto;

               // añade el botón de borrar al tweet
               li.appendChild(botonBorrar);

               // añade un atributo único...
               li.dataset.tweetId = tweet.id;

               // añade el tweet a la lista
               lista.appendChild(li);
          });
     }

     sincronizarStorage();
}

// Elimina el Tweet del DOM
function borrarTweet(e) {
    e.preventDefault();

    // console.log(e.target.parentElement.dataset.tweetId);
    const id = e.target.parentElement.dataset.tweetId;
    tweets = tweets.filter( tweet => tweet.id != id  );
    crearHTML();
}

// Agrega tweet a local storage
function sincronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

function limpiarHTML () {
    while ( lista.firstChild){
        lista.removeChild(lista.firstChild);
    }
}