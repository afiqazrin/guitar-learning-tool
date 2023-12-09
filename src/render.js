const contentDiv = document.getElementById("content");
let isDropDownVisible = false;

import { populateChordList } from "./chordPlayer";
import { buttonList } from "./chordPlayer";
import { createElement } from "./createElement";
import {
  correctChord,
  initPractice,
  practiceChordList,
  checkChoice,
  getRandomChords,
  shuffleChordsCategory,
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
import { chordsJSONObject, dropdownTitle } from "./arrays";
import {
  audioStop,
  playAudio3,
  scales_chords_api_onload,
} from "./scales-chords-api";
import { updateBeats, updateStrums } from "./strum";

function renderPracticeSelection() {
  document.body.style.backgroundImage =
    "url(../src/assets/images/practice.png)";
  initContent();
  const practiceContainer = createElement("div", "practice-container", "");
  const practiceTitle = createElement(
    "div",
    "practice-title",
    "Category Selection"
  );
  const categoryDiv = createElement("div", "category-div", "");
  const randomCategoryBtn = createElement(
    "div",
    "category-btn",
    "Random Chords"
  );
  practiceContainer.appendChild(practiceTitle);
  practiceContainer.appendChild(categoryDiv);
  contentDiv.appendChild(practiceContainer);
  for (let i = 0; i < dropdownTitle.length; i++) {
    const categoryBtn = createElement(
      "div",
      "category-btn",
      `${dropdownTitle[i]}`
    );
    categoryDiv.appendChild(categoryBtn);
    categoryBtn.addEventListener("click", () => {
      renderPractice(categoryBtn.textContent);
    });
  }
  categoryDiv.appendChild(randomCategoryBtn);
}

function renderPractice(category) {
  initContent();
  const chords = shuffleChordsCategory(category.replace(/\s/g, ""));
  console.log(chords.correctChord);
  console.log(chords.otherChords);
  const gameContainer = createElement("div", "game-container", "");
  gameContainer.style.visibility = "hidden";
  const gameTop = createElement("div", "game-top", "");
  const playChordBtn = createElement("ins", "scales_chords_api", "");
  const playChordDiv = createElement("div", "play-chord-btn", "");
  playChordBtn.setAttribute("chord", chords.correctChord);
  playChordBtn.setAttribute("output", "sound");
  playChordDiv.appendChild(playChordBtn);
  const refreshBtn = createElement("div", "refresh-btn", "Refresh");
  const gameBottomDiv = createElement("div", "game-bottom", "");
  const selectionGrid = createElement("div", "selection-choice-grid", "");
  const resultsDiv = createElement("div", "results-div", "");
  gameTop.appendChild(playChordDiv);
  gameTop.appendChild(refreshBtn);
  gameContainer.appendChild(gameTop);
  gameBottomDiv.appendChild(selectionGrid);
  for (let i = 0; i < chords.otherChords.length; i++) {
    const choiceBtn = createElement(
      "div",
      "choice-btn",
      `${chords.otherChords[i]}`
    );
    selectionGrid.appendChild(choiceBtn);
    choiceBtn.addEventListener("click", () => {
      if (choiceBtn.textContent === chords.correctChord) {
        resultsDiv.classList.remove("wrong");
        resultsDiv.classList.add("correct");
        resultsDiv.textContent = "That's right!";
        setTimeout(() => {
          renderPractice(category);
        }, 1500);
      } else {
        resultsDiv.classList.add("wrong");
        resultsDiv.classList.remove("correct");
        resultsDiv.textContent = "That's wrong! Try again.";
      }
    });
  }
  refreshBtn.addEventListener("click", () => {
    renderPractice(category);
  });
  gameBottomDiv.appendChild(resultsDiv);
  gameContainer.appendChild(gameBottomDiv);
  contentDiv.appendChild(gameContainer);
  scales_chords_api_onload();
  setTimeout(() => {
    gameContainer.style.visibility = "visible";
    const chordAudioObject = document.getElementById("scapiobjid1");
    const chordId = chordAudioObject
      .querySelector("audio")
      .id.replace("music", "");
    const chordButton = chordAudioObject.querySelector(`#playbut_${chordId}`);
    // chordButton.style.width = "100%";
    // chordButton.style.height = "100%";
    playChordDiv.onclick = function () {
      playAudio3(chordId);
    };
    playAudio3(chordId);
    chordAudioObject.querySelector("audio").onended = function () {
      audioStop(chordId);
    };
  }, 1500);
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
  const selectSongBtn = createElement("div", "select-song", "EXIT");
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

function renderHome() {
  // Render home section
  document.body.style.backgroundImage =
    "url(../src/assets/images/background.jpg)";
  const homeContainer = createElement("div", "home-container", "");
  const homeHeader = createElement(
    "div",
    "home-header",
    '<div class="home-left"><div class="dropdown-btn">Chords</div><ul class="dropdown"></ul></div><div class="home-right"><div class="input-div"><input type="text" name="chord-input" id="chord-input" placeholder="Search for a chord..."><div class="search-icon"><i class="fa fa-search"></i></div></div></div>'
  );
  const mainTitle = createElement("div", "main-title", "");
  const homeMain = createElement("div", "home-main", "");

  homeContainer.appendChild(homeHeader);
  homeContainer.appendChild(mainTitle);
  homeContainer.appendChild(homeMain);
  contentDiv.appendChild(homeContainer);
  for (let i = 0; i < dropdownTitle.length; i++) {
    const dropDownUl = document.querySelector(".dropdown");
    const dropdownList = createElement("li", "", `${dropdownTitle[i]}`);
    dropdownList.addEventListener("click", () =>
      renderChordGrid(dropdownTitle[i])
    );
    dropDownUl.appendChild(dropdownList);
  }
  const dropDownBtn = document.querySelector(".dropdown-btn");
  const dropDown = document.querySelector(".dropdown");
  dropDownBtn.addEventListener("click", () => {
    isDropDownVisible = !isDropDownVisible; // Toggle the visibility status

    if (isDropDownVisible) {
      dropDown.style.display = "block";
    } else {
      dropDown.style.display = "none";
    }
  });
  const chordSearch = document.getElementById("chord-input");

  chordSearch.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      renderChordModal(chordSearch.value);
      chordSearch.value = "";
    }
  });
}

function renderChordGrid(chordTitle) {
  const dropDown = document.querySelector(".dropdown");
  const mainTitleDiv = document.querySelector(".main-title");
  const homeMainDiv = document.querySelector(".home-main");
  homeMainDiv.innerHTML = "";
  mainTitleDiv.textContent = chordTitle;
  isDropDownVisible = false;
  dropDown.style.display = "none";

  const tempArray = chordsJSONObject[chordTitle.replace(/\s/g, "")];

  tempArray.forEach((element) => {
    const chordBtn = createElement("button", "chord-btn", element);
    chordBtn.dataset.chord = element;
    chordBtn.addEventListener("click", () => {
      renderChordModal(element);
    });
    homeMainDiv.appendChild(chordBtn);
  });
}

function renderChordModal(chord) {
  const chordModal = createElement("div", "chord-modal", "");
  chordModal.style.visibility = "hidden";
  contentDiv.appendChild(chordModal);

  // Create image element for chord
  const chordImage = createElement("ins", "scales_chords_api", "");
  chordImage.setAttribute("chord", chord);
  chordImage.setAttribute("output", "image");
  chordModal.appendChild(chordImage);

  // Create play button with sound
  const playBtnContainer = createElement("div", "play-btn", "");
  const playBtn = createElement("ins", "scales_chords_api", "");
  playBtn.setAttribute("chord", chord);
  playBtn.setAttribute("output", "sound");
  playBtnContainer.appendChild(playBtn);
  chordModal.appendChild(playBtnContainer);

  // Create modal overlay
  const modalOverlay = createElement("div", "modal-overlay", "");
  contentDiv.appendChild(modalOverlay);

  // Add an event listener to the modalOverlay
  modalOverlay.addEventListener("click", function (event) {
    // Check if the click occurred outside the chordModal
    if (!chordModal.contains(event.target)) {
      // Remove both the chordModal and modalOverlay from the document
      chordModal.remove();
      modalOverlay.remove();
    }
  });

  scales_chords_api_onload();

  setTimeout(() => {
    chordModal.style.visibility = "visible";
    const chordImageObject = document.getElementById("scapiobjid1");
    const chordAudioObject = document.getElementById("scapiobjid2");
    const chordImage = chordImageObject.querySelector("img");
    console.log(chordImage.src);
    const chordId = chordAudioObject
      .querySelector("audio")
      .id.replace("music", "");
    const chordButton = chordAudioObject.querySelector(`#playbut_${chordId}`);
    chordButton.onclick = function () {
      playAudio3(chordId);
    };
    chordAudioObject.querySelector("audio").onended = function () {
      audioStop(chordId);
    };
  }, 1500);
}

function renderYtSearch() {
  // Render home section
  document.body.style.backgroundImage = "url(../src/assets/images/youtube.jpg)";
  const youtubeContainer = createElement(
    "div",
    "youtube-container",
    "<input type='text' name='youtube-search' autocomplete='off' id='search-input' placeholder='Search for a song from YouTube...'>"
  );
  contentDiv.appendChild(youtubeContainer);
}

function renderYtAudioPlayer(audioData, chordArray) {
  initContent();
  const youtubeContainer = createElement(
    "div",
    "youtube-container",
    "<div class='yt-top'><div class='yt-title'>Current Chord:</div><div class='chord-name'></div></div>"
  );
  contentDiv.appendChild(youtubeContainer);
  const audioBlob = new Blob([audioData], { type: "audio/mp3" });
  const audioUrl = URL.createObjectURL(audioBlob);

  const audioElement = new Audio(audioUrl);
  audioElement.class = "yt-audio";
  audioElement.controls = true;
  youtubeContainer.appendChild(audioElement);
  audioElement.addEventListener("timeupdate", function () {
    const currentTime = audioElement.currentTime;
    const currentChordDiv = document.querySelector(".chord-name");

    // Check if currentChordDiv is still available
    if (currentChordDiv) {
      // Find the chord at the current time
      const currentChord = chordArray.find(
        (chord) => currentTime >= chord[1] && currentTime < chord[1] + 1
      );

      if (currentChord !== undefined && currentChord[0] !== "N") {
        // Update the HTML display
        currentChordDiv.textContent = currentChord[0] + " chord";
      } else if (currentChord && currentChord[0] === "N") {
        currentChordDiv.textContent = "No chord detected";
      }
    }
  });

  audioElement.play();
}

function renderStrum() {
  contentDiv.innerHTML = "<div class='strum-container'><div class='strum-top'><div class='strum-left'><label for='beats-in-bar'>Beats to a bar: <span id='beats-in-bar-label'>4</span></label><input type='range' id='beats-in-bar' min='2' max='8' value='4'><label for='total-strums'>Total strums: <span id='total-strums-label'>4</span></label><input type='range' id='total-strums' min='1' max='16' value='4' max='8'><label for='fix-first'>Fix first strum: </label><input type='checkbox' id='fix-first'></div><div class='strum-right'>Random Chord<div class='img-div'></div></div></div><div class='strum-bottom'><div class='randomise-pattern'>Randomise Pattern</div><div class='randomise-chord'>Randomise Chord</div></div><div class='pattern-output'><div class='beats-div'>1</div><div class='beats-div'>+</div><div class='beats-div'>2</div><div class='beats-div'>+</div><div class='beats-div'>3</div><div class='beats-div'>+</div><div class='beats-div'>4</div><div class='beats-div'>+</div><div class='pattern-div'>⬇</div><div class='pattern-div'>⬆</div><div class='pattern-div'>⬇</div><div class='pattern-div'>⬆</div><div class='pattern-div'>⬇</div><div class='pattern-div'>⬆</div><div class='pattern-div'>⬇</div><div class='pattern-div'>⬆</div></div></div>";
  const beatsSlider = document.getElementById('beats-in-bar');
  const strumsSlider = document.getElementById('total-strums');
  beatsSlider.addEventListener('input', updateBeats)
  strumsSlider.addEventListener('input', updateStrums)
}
export {
  renderPracticeSelection,
  renderMetronome,
  renderMetronomeSearch,
  renderHome,
  renderYtSearch,
  renderYtAudioPlayer,
  renderStrum
};
