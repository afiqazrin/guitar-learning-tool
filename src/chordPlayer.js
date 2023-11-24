import { createElement } from "./createElement";

const guitarChords = ["C", "D", "E", "F", "G", "A", "B", "Em", "Am", "Dm"];

export var buttonList = [];
function populateChordList() {
  buttonList = [];
  for (let i = 0; i < guitarChords.length; i++) {
    let chordButton = createElement("button", "grid-item", guitarChords[i]);
    buttonList.push(chordButton);
  }
  return buttonList;
}
export { guitarChords, populateChordList };

// <img alt="Dm guitar chord" title="Dm guitar chord" src="https://www.scales-chords.com/chord-charts/guitar-Dm-d-n-l-h-x-x-0-2-3-1.jpg">