const contentDiv = document.querySelector(".content");
import { createButtons } from "./chordPlayer";
import { buttonList } from "./chordPlayer";

function renderChordPlayer() {
  let gridDiv = document.createElement("div");
  gridDiv.className = "grid-container";
  contentDiv.appendChild(gridDiv);
  createButtons();
  buttonList.forEach((button) => {
    gridDiv.appendChild(button);
    button.addEventListener("click", function () {
      var audio = new Audio();
      audio.src = `/src/assets/sounds/${button.textContent}.wav`;
      audio.addEventListener("canplaythrough", function () {
        this.play();
      });
    });
  });
}
export { renderChordPlayer };
