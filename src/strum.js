import { dropdownTitle, chordsJSONObject } from "./arrays";
import { createElement } from "./createElement";
import { scales_chords_api_onload } from "./scales-chords-api";

function generateRandomChord() {
  const randomChordDiv = document.querySelector('.strum-right')
  const imageDiv = document.querySelector('.img-div')
  imageDiv.innerHTML = ""
  // Directly select a random value from dropdownTitle to use as the key
  const randomKey = dropdownTitle[Math.floor(Math.random() * dropdownTitle.length)];
  console.log("Selected Key:", randomKey);

  // Access the chords array using the random key
  const chordsArray = chordsJSONObject[randomKey.replace(/\s/g, "")];

  // Do something with chordsArray
  console.log("Selected Chords Array:", chordsArray);

  // Generate a random index within the range of the selected chordsArray
  const randomChordIndex = Math.floor(Math.random() * chordsArray.length);

  // Access the random chord using the generated index
  const randomChord = chordsArray[randomChordIndex];
  console.log("Random Chord:", randomChord);
  const chordModal = createElement("div", "", "");
  imageDiv.appendChild(chordModal)
  randomChordDiv.appendChild(imageDiv);

  // Create image element for chord
  const chordImage = createElement("ins", "scales_chords_api", "");
  chordImage.setAttribute("chord", randomChord);
  chordImage.setAttribute("output", "image");
  chordModal.appendChild(chordImage);
  scales_chords_api_onload();

}

function updateBeats() {
  const firstFixedInput = document.getElementById('fix-first')
  const strumsSlider = document.getElementById('total-strums')
  const beatsSlider = document.getElementById('beats-in-bar')
  const beatsSliderLabel = document.getElementById('beats-in-bar-label')
  const strumsSliderLabel = document.getElementById('total-strums-label')
  beatsSliderLabel.textContent = beatsSlider.value
  strumsSlider.setAttribute("max", beatsSlider.value * 2)
  strumsSliderLabel.textContent = strumsSlider.value
  const patternOutputDiv = document.querySelector('.pattern-output')
  patternOutputDiv.style.gridTemplateColumns = `repeat(${beatsSlider.value * 2}, 2fr)`;
  if (firstFixedInput.checked) {
    generateFixedPattern(beatsSlider.value, strumsSlider.value)
  }
  else {
    generateNonFixedPattern(beatsSlider.value, strumsSlider.value)
  }

}

function updateStrums() {
  const firstFixedInput = document.getElementById('fix-first')
  const beatsSlider = document.getElementById('beats-in-bar')
  const strumsSlider = document.getElementById('total-strums')
  const strumsSliderLabel = document.getElementById('total-strums-label')
  strumsSliderLabel.textContent = strumsSlider.value
  if (firstFixedInput.checked) {
    generateFixedPattern(beatsSlider.value, strumsSlider.value)
  }
  else {
    generateNonFixedPattern(beatsSlider.value, strumsSlider.value)
  }
}

function generateFixedPattern(numBeats, numStrums) {
  let strumArray = [];
  let numOfBlanks = numBeats * 2 - numStrums;
  const patternOutputDiv = document.querySelector('.pattern-output')
  patternOutputDiv.innerHTML = ""
  for (let i = 1; i <= numBeats; i++) {
    const downBeatLabel = createElement('div', 'beats-div', `${i}`)
    const upBeatLabel = createElement('div', "beats-div", "+")
    patternOutputDiv.appendChild(downBeatLabel)
    patternOutputDiv.appendChild(upBeatLabel)
  }
  for (let i = 1; i <= numBeats * 2; i++) {
    if (i % 2 === 0) {
      strumArray.push("⬆");
    } else {
      strumArray.push("⬇");
    }
  }
  const usedIndices = [];
  for (let i = 1; i <= numOfBlanks; i++) {
    let randomIndex;
    do {
      randomIndex = Math.floor(1 + Math.random() * (strumArray.length - 1));
    } while (usedIndices.includes(randomIndex));
    usedIndices.push(randomIndex);
  }
  for (let i = 0; i <= usedIndices.length; i++) {
    const currentIndex = usedIndices[i];
    strumArray[currentIndex] = "-"
  }
  for (let i = 0; i < strumArray.length; i++) {
    const strummingPatternDiv = createElement("div", 'pattern-div', `${strumArray[i]}`)
    patternOutputDiv.appendChild(strummingPatternDiv)
  }
}
function generateNonFixedPattern(numBeats, numStrums) {
  let strumArray = [];
  let numOfBlanks = numBeats * 2 - numStrums;
  const patternOutputDiv = document.querySelector('.pattern-output')
  patternOutputDiv.innerHTML = ""
  for (let i = 1; i <= numBeats; i++) {
    const downBeatLabel = createElement('div', 'beats-div', `${i}`)
    const upBeatLabel = createElement('div', "beats-div", "+")
    patternOutputDiv.appendChild(downBeatLabel)
    patternOutputDiv.appendChild(upBeatLabel)
  }
  for (let i = 1; i <= numBeats * 2; i++) {
    if (i % 2 === 0) {
      strumArray.push("⬆");
    } else {
      strumArray.push("⬇");
    }
  }

  const usedIndices = [];
  for (let i = 1; i <= numOfBlanks; i++) {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * (strumArray.length - 1));
    } while (usedIndices.includes(randomIndex));
    usedIndices.push(randomIndex);
  }
  for (let i = 0; i <= usedIndices.length; i++) {
    const currentIndex = usedIndices[i];
    strumArray[currentIndex] = "-"
  }
  for (let i = 0; i < strumArray.length; i++) {
    const strummingPatternDiv = createElement("div", 'pattern-div', `${strumArray[i]}`)
    patternOutputDiv.appendChild(strummingPatternDiv)
  }
}

export { generateRandomChord, updateBeats, updateStrums, generateFixedPattern, generateNonFixedPattern };
