(()=>{"use strict";function t(t,n,e){let o=document.createElement(`${t}`);return o.className=`${n}`,o.innerHTML=`${e}`,o}const n=["C","D","E","F","G","A","B","Em","Am","Dm"];var e=[],o="",d=[];function i(){document.getElementById("content").innerHTML=""}const c=document.getElementById("content");function a(){let o=t("div","grid-container","");c.appendChild(o),function(){e=[];for(let o=0;o<n.length;o++){let d=t("button","grid-item",n[o]);e.push(d)}}(),e.forEach((t=>{o.appendChild(t),t.addEventListener("click",(function(){var n=new Audio;n.src=`../src/assets/sounds/${t.textContent}.wav`,n.addEventListener("canplaythrough",(function(){this.play()}))}))}))}function r(){i(),function(){o="",d=[];let e=function(t){for(let n=t.length-1;n>0;n--){const e=Math.floor(Math.random()*(n+1));[t[n],t[e]]=[t[e],t[n]]}return t}(n).slice(0,4);for(let n=0;n<e.length;n++){let o=t("button","",e[n]);d.push(o)}o=e[Math.floor(Math.random()*e.length)]}();let e=t("div","flex-container","");var a=new Audio;a.src=`../src/assets/sounds/${o}.wav`,a.addEventListener("canplaythrough",(function(){this.play()})),console.log(d);let s=t("div","flex-top",`<button id=${o} data-chord=${o}>Play Chord Again</button>\n      <button id="refresh">Refresh</button>\n    `);e.append(s);let l=t("div","results",""),u=t("div","flex-bottom","");e.appendChild(u),d.forEach((t=>{t.addEventListener("click",(function(){t.textContent===o?(l.textContent="Thats right!",setTimeout((()=>{r()}),1e3)):l.textContent="That's wrong! Try Again."})),u.appendChild(t),u.appendChild(l)})),c.appendChild(e),document.getElementById(o).addEventListener("click",(function(){var t=new Audio;t.src=`../src/assets/sounds/${o}.wav`,t.addEventListener("canplaythrough",(function(){this.play()}))})),document.getElementById("refresh").addEventListener("click",(function(){r()}))}const s=document.getElementById("home-btn"),l=document.getElementById("practice-btn");i(),a(),s.addEventListener("click",(()=>{i(),a()})),l.addEventListener("click",(()=>{i(),r()}))})();