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
  console.log(practiceChordList);
  let topDiv = createElement(
    "div",
    "flex-top",
    `<button id=${correctChord} data-chord=${correctChord}>Play Chord Again</button>
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
        resultsDiv.textContent = "Thats right!";
        setTimeout(() => {
          renderPractice();
        }, 1000);
      } else {
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
export { renderChordPlayer, renderPractice, renderMetronomeSearch };
