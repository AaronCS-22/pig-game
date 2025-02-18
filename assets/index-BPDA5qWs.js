(function(){const l=document.createElement("link").relList;if(l&&l.supports&&l.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))b(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const d of o.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&b(d)}).observe(document,{childList:!0,subtree:!0});function S(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function b(e){if(e.ep)return;e.ep=!0;const o=S(e);fetch(e.href,o)}})();const g={rondaActual:0,puntosTotales:0};document.querySelector("#app").innerHTML=`
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
`;const v=100;let c=0,t=Object.create(g),n=Object.create(g);const L=document.querySelector("#score--0"),h=document.querySelector("#score--1"),y=document.querySelector("#current--0"),m=document.querySelector("#current--1"),u=document.querySelector(".player--0"),i=document.querySelector(".player--1"),s=document.querySelector(".dice"),f=document.querySelector(".btn--roll"),a=document.querySelector(".btn--hold"),C=document.querySelector(".btn--new");q();f.addEventListener("click",()=>{const r=Math.trunc(Math.random()*6)+1;s.src=`dice-${r}.png`,s.style.display="block",a.disabled=!1,r!==1?c===0?(t.rondaActual+=r,y.textContent=t.rondaActual):(n.rondaActual+=r,m.textContent=n.rondaActual):p()});a.addEventListener("click",()=>{c===0?(t.puntosTotales+=t.rondaActual,p()):(n.puntosTotales+=n.rondaActual,p())});C.addEventListener("click",()=>{q()});function p(){t.rondaActual=0,n.rondaActual=0,a.disabled=!0,L.textContent=t.puntosTotales,h.textContent=n.puntosTotales,y.textContent=t.rondaActual,m.textContent=n.rondaActual,c===0?t.puntosTotales>=v?A(0):(u.classList.remove("player--active"),i.classList.add("player--active"),c=1):n.puntosTotales>=v?A(1):(u.classList.add("player--active"),i.classList.remove("player--active"),c=0)}function A(r){document.querySelector(`.player--${r}`).classList.add("player--winner"),f.disabled=!0,a.disabled=!0,s.style.display="none"}function q(){document.querySelector(`.player--${c}`).classList.remove("player--winner"),s.style.display="none",u.classList.add("player--active"),i.classList.remove("player--active"),t.rondaActual=0,n.rondaActual=0,t.puntosTotales=0,n.puntosTotales=0,c=0,L.textContent=t.puntosTotales,h.textContent=n.puntosTotales,y.textContent=t.rondaActual,m.textContent=n.rondaActual,s.style.display="none",f.disabled=!1,a.disabled=!0}
