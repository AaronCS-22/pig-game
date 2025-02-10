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

let jugadorActual = 0;

let J1 = Object.create(Jugador);
let J2 = Object.create(Jugador);
const puntosGanar = 10;

const p0Marcador = document.querySelector(`#score--0`);
const p1Marcador = document.querySelector("#score--1");
const p0Actual = document.querySelector("#current--0");
const p1Actual = document.querySelector("#current--1");
const p0Activo = document.querySelector(".player--0");
const p1Activo = document.querySelector(".player--1");

const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const btnNew = document.querySelector(".btn--new");
const dadoImg = document.querySelector(".dice");

function update() {
  p0Marcador.textContent = J1.puntosTotales;
  p1Marcador.textContent = J2.puntosTotales;
  p0Actual.textContent = J1.rondaActual;
  p1Actual.textContent = J2.rondaActual;
}

btnRoll.addEventListener("click", () => {
  const dado = Math.trunc(Math.random() * 6) + 1;
  dadoImg.src = `dice-${dado}.png`;
  btnHold.disabled = false;

  if (dado !== 1) {
    if (jugadorActual === 0) {
      J1.rondaActual += dado;
      p0Actual.textContent = J1.rondaActual;
    } else {
      J2.rondaActual += dado;
      p1Actual.textContent = J2.rondaActual;
    }
  } else {
    nuevaRonda();
  }
});

btnHold.addEventListener("click", () => {
  guardarPuntos();
});

function guardarPuntos() {
  if (jugadorActual === 0) {
    J1.puntosTotales += J1.rondaActual;
    nuevaRonda();
  } else {
    J2.puntosTotales += J2.rondaActual;
    nuevaRonda();
  }
}

function nuevaRonda() {
  J1.rondaActual = 0;
  J2.rondaActual = 0;
  btnHold.disabled = true;
  update();
  if (jugadorActual === 0) {
    if (J1.puntosTotales >= puntosGanar) {
      ganador(0);
    } else {
      p0Activo.classList.remove("player--active");
      p1Activo.classList.add("player--active");
      jugadorActual = 1;
    }
  } else {
    if (J2.puntosTotales >= puntosGanar) {
      ganador(1);
    } else {
      p0Activo.classList.add("player--active");
      p1Activo.classList.remove("player--active");
      jugadorActual = 0;
    }
  }
}

function nuevaPartida() {
  console.log(jugadorActual);
  document
    .querySelector(`.player--${jugadorActual}`)
    .classList.remove("player--winner");
  J1.rondaActual = 0;
  J2.rondaActual = 0;
  J1.puntosTotales = 0;
  J2.puntosTotales = 0;
  p0Activo.classList.add("player--active");
  p1Activo.classList.remove("player--active");
  btnRoll.disabled = false;
  update();
  jugadorActual = 0;
}

btnNew.addEventListener("click", () => {
  console.log("Nueva partida");
  nuevaPartida();
});

function ganador(ganador) {
  document.querySelector(`.player--${ganador}`).classList.add("player--winner");

  btnRoll.disabled = true;
  btnHold.disabled = true;
}
