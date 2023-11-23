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
import {
  increaseTempoListener,
  decreaseTempoListener,
  tempoSliderListener,
  increaseBeatsListener,
  decreaseBeatsListener,
  startMetronomeListener,
  selectNewSongListener,
} from "./metronome";
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
  let leftDiv = createElement("div", "left", "");
  let rightDiv = createElement("div", "right", "");
  let orSpan = createElement("span", "or-span", "OR");
  let standardMetronomeDiv = createElement(
    "div",
    "standard-metronome",
    "STANDARD METRONOME"
  );
  let searchInput = document.createElement("input");
  searchInput.setAttribute("type", "text");
  searchInput.id = "search-input";
  searchInput.setAttribute("placeholder", "Search for a song...");
  searchInput.setAttribute("autocomplete", "off");
  let autoCompleteUl = createElement("ul", "autocomplete-results", "");
  leftDiv.appendChild(searchInput);
  leftDiv.appendChild(autoCompleteUl);
  rightDiv.append(standardMetronomeDiv);
  searchDiv.appendChild(leftDiv);
  searchDiv.append(orSpan);
  searchDiv.appendChild(rightDiv);
  contentDiv.appendChild(searchDiv);
  const standardMetronomeBtn = document.querySelector(".standard-metronome");
  standardMetronomeBtn.addEventListener("click", () => {
    console.log("hello");
    initContent();
    renderMetronome(
      "Metronome",
      "Standard",
      "../src/assets/images/standard-metronome.png",
      "140",
      "4"
    );
  });
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
  sliderInput.value = tempo;
  const increaseTempoBtn = createElement(
    "div",
    "adjust-tempo-btn increase-tempo",
    "+"
  );
  sliderInput.addEventListener("input", tempoSliderListener);
  decreaseTempoBtn.addEventListener("click", decreaseTempoListener);
  increaseTempoBtn.addEventListener("click", increaseTempoListener);
  const measures = createElement("div", "measures", "");
  const subtractBeats = createElement("div", "subtract-beats stepper", "-");
  subtractBeats.addEventListener("click", decreaseBeatsListener);
  const measureCount = createElement("div", "measure-count", time_signature);
  const addBeats = createElement("div", "add-beats stepper", "+");
  addBeats.addEventListener("click", increaseBeatsListener);
  const choiceDiv = createElement("div", "choice-div", "");
  const startBtn = createElement("div", "start-stop", "START");
  startBtn.addEventListener("click", startMetronomeListener);
  const selectSongBtn = createElement(
    "div",
    "select-song",
    "EXIT"
  );
  selectSongBtn.addEventListener("click", selectNewSongListener);
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
  renderStartButton,
  renderMetronome,
  renderMetronomeSearch,
};
