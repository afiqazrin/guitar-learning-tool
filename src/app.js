import {
  renderChordPlayer,
  renderPractice,
  renderMetronomeSearch,
  renderStartButton,
  renderMetronome,
} from "./render";
import { initContent } from "./init";
import { getAccessToken, searchSpotify, getSongInfo } from "./spotify";
import { autoCompleteSearch } from "./songSearch";
const homeButton = document.getElementById("home-btn");
const practiceButton = document.getElementById("practice-btn");
const metronomeButton = document.getElementById("metronome-btn");

initContent();
renderChordPlayer();
homeButton.addEventListener("click", () => {
  initContent();
  renderChordPlayer();
});

practiceButton.addEventListener("click", () => {
  initContent();
  renderStartButton();
});

metronomeButton.addEventListener("click", () => {
  getAccessToken();
  initContent();
  renderMetronomeSearch();
  const songInput = document.getElementById("search-input");
  songInput.addEventListener("keyup", autoCompleteSearch);

});
