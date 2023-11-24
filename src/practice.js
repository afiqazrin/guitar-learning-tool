import { guitarChords } from "./chordPlayer";
import { createElement } from "./createElement";
import { chordsJSONObject } from "./arrays";
function shuffleChordsCategory(key) {
  const chordsArray = chordsJSONObject[key];
  if (!chordsArray) {
    return null; 
  }

  const shuffledChords = chordsArray.slice().sort(() => Math.random() - 0.5);

  let otherChords = shuffledChords.slice(0, 4);

  let correctChord = otherChords[Math.floor(Math.random() * otherChords.length)];
  return {
    correctChord,
    otherChords,
  };
}

export { shuffleChordsCategory };
