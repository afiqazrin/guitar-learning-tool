import { guitarChords } from "./chordPlayer";
import { createElement } from "./createElement";
var correctChord = "";
var practiceChordList = [];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function initPractice() {
  correctChord = "";
  practiceChordList = [];
  let shuffledChords = shuffleArray(guitarChords).slice(0, 4);

  for (let i = 0; i < shuffledChords.length; i++) {
    let chordButton = createElement("button", "", shuffledChords[i]);
    practiceChordList.push(chordButton);
  }
  correctChord =
    shuffledChords[Math.floor(Math.random() * shuffledChords.length)];
}

export { initPractice, practiceChordList, correctChord };
