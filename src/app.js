import {
    renderMetronomeSearch,
    renderMetronome,
    renderHome,
    renderPracticeSelection,
} from "./render";
import { initContent } from "./init";
import { getAccessToken, searchSpotify, getSongInfo } from "./spotify";
import { autoCompleteSearch } from "./songSearch";
const homeButton = document.getElementById("home-btn");
const practiceButton = document.getElementById("practice-btn");
const metronomeButton = document.getElementById("metronome-btn");
require('../src/scales-chords-api');
initContent();
renderHome();
homeButton.addEventListener("click", () => {
    initContent();
    renderHome();
});



import { dropdownTitle } from "./arrays";

practiceButton.addEventListener("click", () => {
    initContent()
    renderPracticeSelection()
});

metronomeButton.addEventListener("click", () => {
    getAccessToken();
    initContent();
    renderMetronomeSearch();
    const songInput = document.getElementById("search-input");
    songInput.addEventListener("keyup", autoCompleteSearch);

});
