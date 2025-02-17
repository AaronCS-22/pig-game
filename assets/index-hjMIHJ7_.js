(function(){const l=document.createElement("link").relList;if(l&&l.supports&&l.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))f(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const u of o.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&f(u)}).observe(document,{childList:!0,subtree:!0});function S(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function f(e){if(e.ep)return;e.ep=!0;const o=S(e);fetch(e.href,o)}})();const A={rondaActual:0,puntosTotales:0};document.querySelector("#app").innerHTML=`
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
`;const b=100;let c=0,t=Object.create(A),n=Object.create(A);const g=document.querySelector("#score--0"),L=document.querySelector("#score--1"),y=document.querySelector("#current--0"),m=document.querySelector("#current--1"),d=document.querySelector(".player--0"),i=document.querySelector(".player--1"),s=document.querySelector(".dice"),h=document.querySelector(".btn--roll"),a=document.querySelector(".btn--hold"),C=document.querySelector(".btn--new");q();h.addEventListener("click",()=>{const r=Math.trunc(Math.random()*6)+1;s.src=`dice-${r}.png`,s.style.display="block",a.disabled=!1,r!==1?c===0?(t.rondaActual+=r,y.textContent=t.rondaActual):(n.rondaActual+=r,m.textContent=n.rondaActual):p()});a.addEventListener("click",()=>{c===0?(t.puntosTotales+=t.rondaActual,p()):(n.puntosTotales+=n.rondaActual,p())});C.addEventListener("click",()=>{q()});function p(){t.rondaActual=0,n.rondaActual=0,a.disabled=!0,g.textContent=t.puntosTotales,L.textContent=n.puntosTotales,y.textContent=t.rondaActual,m.textContent=n.rondaActual,c===0?t.puntosTotales>=b?v(0):(d.classList.remove("player--active"),i.classList.add("player--active"),c=1):n.puntosTotales>=b?v(1):(d.classList.add("player--active"),i.classList.remove("player--active"),c=0)}function v(r){document.querySelector(`.player--${r}`).classList.add("player--winner"),h.disabled=!0,a.disabled=!0,s.style.display="none"}function q(){document.querySelector(`.player--${c}`).classList.remove("player--winner"),s.style.display="none",d.classList.add("player--active"),i.classList.remove("player--active"),t.rondaActual=0,n.rondaActual=0,t.puntosTotales=0,n.puntosTotales=0,c=0,g.textContent=t.puntosTotales,L.textContent=n.puntosTotales,y.textContent=t.rondaActual,m.textContent=n.rondaActual,s.style.display="none"}
