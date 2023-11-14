const contentDiv = document.getElementById("content");
import { populateChordList } from "./chordPlayer";
import { buttonList } from "./chordPlayer";
import { createElement } from "./createElement";
import {
  correctChord,
  initPractice,
  practiceChordList,
  checkChoice,
} from "./earPractice";
import { initContent } from "./init";

function renderChordPlayer() {
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
        // Example of refreshing after 3 seconds
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
export { renderChordPlayer, renderPractice };
