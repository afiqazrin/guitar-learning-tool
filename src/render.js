const contentDiv = document.getElementById("content");
import { populateChordList } from "./chordPlayer";
import { buttonList } from "./chordPlayer";
import { createElement } from "./createElement";
import {
  correctChord,
  initPractice,
  practiceChordList,
  checkChoice,
} from "./practice";
import { initContent } from "./init";

function renderChordPlayer() {
  document.body.style.backgroundImage =
    "url(../src/assets/images/background.jpg)";
  let gridDiv = createElement("div", "grid-container", "");
  contentDiv.appendChild(gridDiv);
  populateChordList();
  buttonList.forEach((button) => {
    gridDiv.appendChild(button);
    button.addEventListener("click", function () {
      var audio = new Audio();
      audio.src = `../src/assets/sounds/${button.textContent}.wav`;
      audio.addEventListener("canplaythrough", function () {
        this.play();
      });
    });
  });
}

function renderStartButton() {
  document.body.style.backgroundImage =
    "url(../src/assets/images/practice.png)";
  let flexDiv = createElement("div", "flex-container", "");
  const startPracticeButton = createElement(
    "button",
    "start-practice-btn",
    "START"
  );
  startPracticeButton.addEventListener("click", renderPractice);
  flexDiv.appendChild(startPracticeButton);
  contentDiv.appendChild(flexDiv);
}
function renderPractice() {
  document.body.style.backgroundImage =
    "url(../src/assets/images/practice.png)";
  initContent();
  initPractice();
  let flexDiv = createElement("div", "flex-container", "");
  var audio = new Audio();
  audio.src = `../src/assets/sounds/${correctChord}.wav`;
  audio.addEventListener("canplaythrough", function () {
    this.play();
  });
  let topDiv = createElement(
    "div",
    "flex-top",
    `<button id=${correctChord} data-chord=${correctChord}>Repeat Chord</button>
      <button id="refresh">Refresh</button>
    `
  );

  flexDiv.append(topDiv);
  let resultsDiv = createElement("div", "results", "");
  let bottomDiv = createElement("div", "flex-bottom", "");
  flexDiv.appendChild(bottomDiv);

  practiceChordList.forEach((button) => {
    button.addEventListener("click", function () {
      if (button.textContent === correctChord) {
        resultsDiv.classList.remove("wrong");
        resultsDiv.classList.add("correct");
        resultsDiv.textContent = "Thats right!";
        setTimeout(() => {
          renderPractice();
        }, 1000);
      } else {
        resultsDiv.classList.add("wrong");
        resultsDiv.classList.remove("correct");
        resultsDiv.textContent = "That's wrong! Try Again.";
      }
    });
    bottomDiv.appendChild(button);
    bottomDiv.appendChild(resultsDiv);
  });
  contentDiv.appendChild(flexDiv);
  const correctButton = document.getElementById(correctChord);
  correctButton.addEventListener("click", function () {
    var audio = new Audio();
    audio.src = `../src/assets/sounds/${correctChord}.wav`;
    audio.addEventListener("canplaythrough", function () {
      this.play();
    });
  });
  const refreshButton = document.getElementById("refresh");
  refreshButton.addEventListener("click", function () {
    renderPractice();
  });
}

function renderMetronomeSearch() {
  initContent();
  document.body.style.backgroundImage =
    "url(../src/assets/images/metronome.jpg)";
  initContent();
  let searchDiv = createElement("div", "search-container", "");
  let searchInput = document.createElement("input");
  searchInput.setAttribute("type", "text");
  searchInput.id = "search-input";
  searchInput.setAttribute("placeholder", "Search for a song...");
  searchInput.setAttribute("autocomplete", "off");
  let autoCompleteUl = createElement("ul", "autocomplete-results", "");
  searchDiv.appendChild(searchInput);
  searchDiv.appendChild(autoCompleteUl);
  contentDiv.appendChild(searchDiv);
}

function renderMetronome(
  songName,
  songArtist,
  songImageUrl,
  tempo,
  time_signature
) {
  const metronomeContainer = createElement("div", "metronome-container", "");
  const metronome = createElement("div", "metronome", "");
  const bpmDisplay = createElement("div", "bpm-display", "");
  const tempoSpan = createElement("span", "tempo", tempo);
  const bpmSpan = createElement("span", "bpm", "BPM");
  const songDetailsDiv = createElement("div", "song-details", "");
  const songImageElement = document.createElement("img");
  songImageElement.src = songImageUrl;
  songImageElement.alt = "Song Album Cover";
  const tempoText = createElement(
    "div",
    "tempo-text",
    `${songName} - ${songArtist}`
  );
  const tempoSettings = createElement("div", "tempo-settings", "");
  const decreaseTempoBtn = createElement(
    "div",
    "adjust-tempo-btn decrease-tempo",
    "-"
  );
  const sliderInput = createElement("input", "slider");
  sliderInput.type = "range";
  sliderInput.min = "20";
  sliderInput.max = "280";
  sliderInput.step = "1";
  const increaseTempoBtn = createElement(
    "div",
    "adjust-tempo-btn increase-tempo",
    "+"
  );
  const measures = createElement("div", "measures", "");
  const subtractBeats = createElement("div", "subtract-beats stepper", "-");
  const measureCount = createElement("div", "measure-count", time_signature);
  const addBeats = createElement("div", "add-beats stepper", "+");
  const choiceDiv = createElement("div", "choice-div", "");
  const startBtn = createElement("div", "start-stop", "START");
  const selectSongBtn = createElement(
    "div",
    "select-song",
    "SELECT ANOTHER SONG"
  );
  bpmDisplay.appendChild(tempoSpan);
  bpmDisplay.appendChild(bpmSpan);
  songDetailsDiv.appendChild(songImageElement);
  songDetailsDiv.appendChild(tempoText);
  tempoSettings.appendChild(decreaseTempoBtn);
  tempoSettings.appendChild(sliderInput);
  tempoSettings.appendChild(increaseTempoBtn);
  measures.appendChild(subtractBeats);
  measures.appendChild(measureCount);
  measures.appendChild(addBeats);
  choiceDiv.appendChild(startBtn);
  choiceDiv.appendChild(selectSongBtn);
  metronome.appendChild(bpmDisplay);
  metronome.appendChild(songDetailsDiv);
  metronome.appendChild(tempoSettings);
  metronome.appendChild(measures);
  metronome.appendChild(choiceDiv);
  metronomeContainer.appendChild(metronome);
  contentDiv.appendChild(metronomeContainer);
}
export {
  renderChordPlayer,
  renderPractice,
  renderMetronomeSearch,
  renderStartButton,
  renderMetronome,
};
