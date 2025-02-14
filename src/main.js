import "./style.css";
import { Jugador } from "./Jugador.js";

document.querySelector("#app").innerHTML = `
  <main>
      <section class="player player--0 player--active">
        <h2 class="name" id="name--0">Player 1</h2>
        <p class="score" id="score--0">0</p>
        <div class="current">
          <p class="current-label">Current</p>
          <p class="current-score" id="current--0">0</p>
        </div>
      </section>
      <section class="player player--1">
        <h2 class="name" id="name--1">Player 2</h2>
        <p class="score" id="score--1">0</p>
        <div class="current">
          <p class="current-label">Current</p>
          <p class="current-score" id="current--1">0</p>
        </div>
      </section>

      <img src="dice-5.png" alt="Playing dice" class="dice" />
      <button class="btn btn--new">🔄 New game</button>
      <button class="btn btn--roll">🎲 Roll dice</button>
      <button class="btn btn--hold">📥 Hold</button>
    </main>
`;

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Variables globales ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const puntosGanar = 100;
let jugadorActual = 0;

// Creación de los objetos jugadores
let J1 = Object.create(Jugador);
let J2 = Object.create(Jugador);

// Elementos del DOM
const p0Marcador = document.querySelector(`#score--0`);
const p1Marcador = document.querySelector("#score--1");
const p0Actual = document.querySelector("#current--0");
const p1Actual = document.querySelector("#current--1");
const p0Activo = document.querySelector(".player--0");
const p1Activo = document.querySelector(".player--1");
const dadoImg = document.querySelector(".dice");

// Botones
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const btnNew = document.querySelector(".btn--new");

// Crear nueva partida
nuevaPartida();

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Botones ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// · · Botón Roll · ·

btnRoll.addEventListener("click", () => {
  //Dado aleatorio
  const dado = Math.trunc(Math.random() * 6) + 1;
  dadoImg.src = `dice-${dado}.png`;
  dadoImg.style.display = "block";

  // Permitimos al usuario guardar su puntuación obtenida
  btnHold.disabled = false;

  //El dado es distinto de 1
  if (dado !== 1) {
    //Comporbar el jugador activo
    if (jugadorActual === 0) {
      //Actualizar datos del jugador 1
      J1.rondaActual += dado;
      p0Actual.textContent = J1.rondaActual;
    } else {
      //Actualizar datos del jugador 2
      J2.rondaActual += dado;
      p1Actual.textContent = J2.rondaActual;
    }

    // El dado es igual a 1
  } else {
    nuevaRonda();
  }
});

// · · Botón Hold · ·

btnHold.addEventListener("click", () => {
  // Comprobar qué jugador está actualmente activo
  if (jugadorActual === 0) {
    // Guardar puntos al total del jugador 1
    J1.puntosTotales += J1.rondaActual;
    nuevaRonda();
  } else {
    // Guardar puntos al total del jugador 2
    J2.puntosTotales += J2.rondaActual;
    nuevaRonda();
  }
});

// · · Botón de nueva partida · ·

btnNew.addEventListener("click", () => {
  nuevaPartida();
});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Funciones ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// · · Nueva ronda · ·

function nuevaRonda() {
  // Reiniciar los datos de la ronda
  J1.rondaActual = 0;
  J2.rondaActual = 0;
  btnHold.disabled = true;

  // Actualizar los marcadores
  p0Marcador.textContent = J1.puntosTotales;
  p1Marcador.textContent = J2.puntosTotales;
  p0Actual.textContent = J1.rondaActual;
  p1Actual.textContent = J2.rondaActual;

  // Comprobar quien es el jugador activo
  if (jugadorActual === 0) {
    // Si el jugador ha obtenido la puntuación ganadora, fin del juego con ganador de J1
    if (J1.puntosTotales >= puntosGanar) {
      ganador(0);
    }
    // Si el jugador no ha obtenido la puntuación ganadora, cambiamos de jugador
    else {
      p0Activo.classList.remove("player--active");
      p1Activo.classList.add("player--active");
      jugadorActual = 1;
    }
  } else {
    // Si el jugador ha obtenido la puntuación ganadora, fin del juego con ganador de J2
    if (J2.puntosTotales >= puntosGanar) {
      ganador(1);
    }
    // Si el jugador no ha obtenido la puntuación ganadora, cambiamos de jugador
    else {
      p0Activo.classList.add("player--active");
      p1Activo.classList.remove("player--active");
      jugadorActual = 0;
    }
  }
}

// · · Ganador · ·

function ganador(ganador) {
  // Mostrar el ganador con el color de fondo
  document.querySelector(`.player--${ganador}`).classList.add("player--winner");

  // Impedir que el juego continúe
  btnRoll.disabled = true;
  btnHold.disabled = true;

  // Ocultar el dado
  dadoImg.style.display = "none";
}

// · · Nueva partida · ·

function nuevaPartida() {
  // Limpiar el juego
  document
    .querySelector(`.player--${jugadorActual}`)
    .classList.remove("player--winner");
  dadoImg.style.display = "none";
  p0Activo.classList.add("player--active");
  p1Activo.classList.remove("player--active");

  // Reiniciar los datos
  J1.rondaActual = 0;
  J2.rondaActual = 0;
  J1.puntosTotales = 0;
  J2.puntosTotales = 0;
  jugadorActual = 0;

  // Actualizar los marcadores
  p0Marcador.textContent = J1.puntosTotales;
  p1Marcador.textContent = J2.puntosTotales;
  p0Actual.textContent = J1.rondaActual;
  p1Actual.textContent = J2.rondaActual;

  // Ocultar el dado
  dadoImg.style.display = "none";
}
