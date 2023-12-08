import { createElement } from "./createElement";

function updateBeatsValue() {
  const beatsSlider = document.getElementById("strum-slider");
  const beatsValue = document.querySelector(".beats-value");
  const strumGrid = document.querySelector(".strum-grid");
  const strumSlider = document.getElementById("num-strums");
  const strumValue = document.querySelector(".strum-value");
  strumGrid.innerHTML = ""; // Clear existing content

  const value = beatsSlider.value;
  let strumBeatsText = "";
  for (let i = 1; i <= beatsSlider.value; i++) {
    strumBeatsText += `${i}+`;
  }
  const strumBeats = createElement("div", "strum-beats", strumBeatsText);
  strumGrid.appendChild(strumBeats);

  beatsValue.textContent = value;
  strumSlider.setAttribute("max", beatsSlider.value*2)
  if(strumSlider.value > beatsSlider.value){
    strumSlider.setAttribute("value", beatsSlider.value*2)
  }
  strumValue.textContent = strumSlider.value;
}

function updateStrumsValue() {
  const strumSlider = document.getElementById("num-strums");
  const strumValue = document.querySelector(".strum-value");
  strumValue.textContent = strumSlider.value;
}

function generateStrummingPattern(num_of_strums) {
  const randomOddArray = ["↓", "&nbsp;"];
  const randomEvenArray = ["↑", "&nbsp;"];
  let strummingPattern = "";

  for (let i = 1; i <= num_of_strums; i++) {
    // Determine if the current strum is odd or even
    const isOddStrum = i % 2 !== 0;

    // Choose a random symbol based on odd or even strum
    const randomSymbol = isOddStrum
      ? randomOddArray[Math.floor(Math.random() * randomOddArray.length)]
      : randomEvenArray[Math.floor(Math.random() * randomEvenArray.length)];

    // Append the chosen symbol to the strumming pattern
    strummingPattern += randomSymbol;
  }
  
}

export { updateBeatsValue, updateStrumsValue };


// ↑↓