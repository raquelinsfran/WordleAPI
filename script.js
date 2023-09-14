let palabra; 
let intentos = 6;

function init() {
    const button = document.getElementById("guess-button");
    button.addEventListener("click", intentar);
    const restartButton = document.getElementById("restart-button");
    restartButton.addEventListener("click", reiniciarJuego); 
 
   // Obtener una palabra aleatoria del diccionario
 fetch('https://random-word-api.herokuapp.com/word?length=5&&number=1&&lang=es')
 .then(response => response.json())
 .then(response => {
  palabra = response[0].toUpperCase();
  console.log(palabra);
})
 .catch(err => console.error(err));
}

function intentar() {
  const INTENTO = leerIntento();
  const GRID = document.getElementById("grid");
  const ROW = document.getElementById('div');
  ROW.className = 'row';

  if (INTENTO === palabra) {
    terminar("<h1><span style='color: red;'>¡GANASTE!😀</span></h1>");
    //console.log(¡GANASTE!)
    return;
  }
  const resultadoIntento = document.createElement("div"); // Crear un nuevo div para el intento
  resultadoIntento.className = "intent-result"; // Agregar una clase CSS para dar estilo al resultado del intento


  for (let i in palabra) {
    const SPAN = document.createElement('span');
    SPAN.className = 'letter';
    
    if (INTENTO[i] === palabra[i]) {
      SPAN.innerHTML = INTENTO[i];
      SPAN.style.backgroundColor = '#79b851';
    } else if (palabra.includes(INTENTO[i])) {
      SPAN.innerHTML = INTENTO[i];
      SPAN.style.backgroundColor = '#f3c237';
    } else {
      SPAN.innerHTML = INTENTO[i];
      SPAN.style.backgroundColor = '#a4aec4';
    }
    
    resultadoIntento.appendChild(SPAN);
  }
  
  GRID.appendChild(ROW);

  const guessesContainer = document.getElementById("guesses");
  guessesContainer.appendChild(resultadoIntento);

  intentos--;

  if (intentos === 0) {
    terminar(("<h1><span style='color: red;'>¡PERDISTE!😖</span></h1>"));
    //console.log(¡PERDISTE!)
  }
 
}

function leerIntento() {
    let intento = document.getElementById("guess-input").value;
    
    if (intento.length === 5) {
      intento = intento.toUpperCase();
    } else {
      alert("Debe ingresar una palabra de 5 letras");
    }
    
    return intento;
  }

  function terminar(mensaje) {
    const INPUT = document.getElementById("guess-input");
    INPUT.disabled = true;
    const boton = document.getElementById("guess-button");
    boton.disabled = true;
    let contenedor = document.getElementById('guesses');
    contenedor.innerHTML = mensaje;
  }
  
  // Llama a la función init() cuando se carga la página
  window.onload = init;

  function reiniciarJuego() {
    location.reload(); // Esto recargará la página y reiniciará el juego
}