// import { renderChordPlayer, renderPractice, renderMetronome } from "./render";
// import { initContent } from "./init";
import { getAccessToken, searchSpotify, getSongInfo } from "./spotify";
// const homeButton = document.getElementById("home-btn");
// const practiceButton = document.getElementById("practice-btn");
// const metronomeButton = document.getElementById("metronome-btn")
// initContent();
// renderChordPlayer();
// homeButton.addEventListener('click', ()=> {
//     initContent();
//     renderChordPlayer();
// });

// practiceButton.addEventListener('click', ()=> {
//     initContent();
//     renderPractice();
// })

// metronomeButton.addEventListener('click', ()=> {
//   initContent();
//   renderMetronome();
// })
import { autoCompleteSearch } from "./metronome";
getAccessToken();
const songInput = document.getElementById("search-input");
songInput.addEventListener('keyup', autoCompleteSearch);