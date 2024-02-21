import {
  renderMetronomeSearch,
  renderMetronome,
  renderHome,
  renderPracticeSelection,
  renderYtSearch,
  renderYtAudioPlayer,
  renderStrum,} from "./render";
import { initContent } from "./init";
import { getAccessToken, searchSpotify, getSongInfo } from "./spotify";
import { autoCompleteSearch } from "./songSearch";
const homeButton = document.getElementById("home-btn");
const practiceButton = document.getElementById("practice-btn");
const metronomeButton = document.getElementById("metronome-btn");
const chordDetectButton = document.getElementById("chord-detect-btn");
const strumButton = document.getElementById("strum-btn");
require("../src/scales-chords-api");
initContent();
renderHome();
homeButton.addEventListener("click", () => {
  initContent();
  renderHome();
});

import { dropdownTitle } from "./arrays";
import { queryYoutube } from "./youtube";
import { generateFixedPattern, generateNonFixedPattern, generateRandomChord } from "./strum";

practiceButton.addEventListener("click", () => {
  initContent();
  renderPracticeSelection();
});

metronomeButton.addEventListener("click", () => {
  getAccessToken();
  initContent();
  renderMetronomeSearch();
  const songInput = document.getElementById("search-input");
  songInput.addEventListener("keyup", autoCompleteSearch);
});

// chordDetectButton.addEventListener("click", () => {
//   initContent();
//   renderYtSearch();
//   const searchInput = document.getElementById("search-input");
//   searchInput.addEventListener("keydown", function (event) {
//     if (event.key === "Enter") {
//       queryYoutube(searchInput.value);
//       searchInput.value = "";
//       initContent();
//       document.getElementById("content").innerHTML =
//         "<div class='main-title'>Loading...</div>";
//     }
//   });
// });

strumButton.addEventListener("click", () => {
  initContent();
  renderStrum();
  generateRandomChord();
  const fixedFirstInput = document.getElementById('fix-first')
  fixedFirstInput.addEventListener('click', ()=>{
    const beatsSlider = document.getElementById('beats-in-bar')
    const strumsSlider = document.getElementById('total-strums')
    if (fixedFirstInput.checked) {
      generateFixedPattern(beatsSlider.value, strumsSlider.value)
    }
    else {
      generateNonFixedPattern(beatsSlider.value, strumsSlider.value)
    }
  })
  const randomChordButton = document.querySelector(".randomise-chord")
  randomChordButton.addEventListener('click', generateRandomChord)
  const randomPatternButton = document.querySelector('.randomise-pattern')
  randomPatternButton.addEventListener('click', ()=>{
    const beatsSlider = document.getElementById('beats-in-bar')
    const strumsSlider = document.getElementById('total-strums')
    if (fixedFirstInput.checked) {
      generateFixedPattern(beatsSlider.value, strumsSlider.value)
    }
    else {
      generateNonFixedPattern(beatsSlider.value, strumsSlider.value)
    }  })
});
