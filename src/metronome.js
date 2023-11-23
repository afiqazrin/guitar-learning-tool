import { initContent } from "./init";
import { renderMetronomeSearch } from "./render";
import { autoCompleteSearch } from "./songSearch";
const click1 = new Audio("../src/assets/sounds/Synth_Block_A_hi.wav");
const click2 = new Audio("../src/assets/sounds/Synth_Block_A_lo.wav");
let count = 0;
let isRunning = false;
let timer;

function decreaseTempoListener() {
  const tempoDisplay = document.querySelector(".tempo");
  const tempoSlider = document.querySelector(".slider");
  let bpm = tempoDisplay.textContent;
  if (bpm <= 20) {
    return;
  }
  bpm--;
  tempoDisplay.textContent = bpm;
  tempoSlider.value = bpm;
  window.clearInterval(timer);
  timer = window.setInterval(function () {
    playClick();
  }, 60000 / bpm);
}

function increaseTempoListener() {
  const tempoDisplay = document.querySelector(".tempo");
  const tempoSlider = document.querySelector(".slider");
  let bpm = tempoDisplay.textContent;
  if (bpm >= 280) {
    return;
  }
  bpm++;
  tempoDisplay.textContent = bpm;
  tempoSlider.value = bpm;
  window.clearInterval(timer);
  timer = window.setInterval(function () {
    playClick();
  }, 60000 / bpm);
}

function tempoSliderListener() {
  const tempoDisplay = document.querySelector(".tempo");
  const tempoSlider = document.querySelector(".slider");
  let bpm = tempoSlider.value;
  tempoDisplay.textContent = bpm;
  tempoSlider.value = bpm;
  window.clearInterval(timer);
  timer = window.setInterval(function () {
    playClick();
  }, 60000 / bpm);
}

function decreaseBeatsListener() {
  const tempoDisplay = document.querySelector(".tempo");
  const decreaseBeats = document.querySelector(".subtract-beats");
  const measureCount = document.querySelector(".measure-count");
  let beatsPerMeasure = measureCount.textContent;
  let bpm = tempoDisplay.textContent;
  if (beatsPerMeasure <= 2) {
    return;
  }
  beatsPerMeasure--;
  measureCount.textContent = beatsPerMeasure;
  window.clearInterval(timer);
  timer = window.setInterval(function () {
    playClick();
  }, 60000 / bpm);
}

function increaseBeatsListener() {
  const tempoDisplay = document.querySelector(".tempo");
  const increaseBeats = document.querySelector(".add-beats");
  const measureCount = document.querySelector(".measure-count");
  let beatsPerMeasure = measureCount.textContent;
  let bpm = tempoDisplay.textContent;
  if (beatsPerMeasure >= 12) {
    return;
  }
  beatsPerMeasure++;
  measureCount.textContent = beatsPerMeasure;
  window.clearInterval(timer);
  timer = window.setInterval(function () {
    playClick();
  }, 60000 / bpm);
}

function startMetronomeListener() {
  const tempoDisplay = document.querySelector(".tempo");
  console.log(isRunning);
  let bpm = tempoDisplay.textContent;

  console.log("bpm " + bpm);
  if (!isRunning) {
    timer = window.setInterval(function () {
      playClick();
    }, 60000 / bpm);
    isRunning = true;
    this.textContent = "STOP";
  } else {
    window.clearInterval(timer);
    count = 0;
    console.log("stopping");
    isRunning = false;
    this.textContent = "START";
  }
}

function playClick() {
  console.log(count);
  const measureCount = document.querySelector(".measure-count");
  let beatsPerMeasure = measureCount.textContent;
  console.log(beatsPerMeasure);
  if (count == beatsPerMeasure) {
    count = 0;
  }
  if (count == 0) {
    click1.play();
    click1.currentTime = 0;
  } else {
    click2.play();
    click2.currentTime = 0;
  }
  count++;
}

function selectNewSongListener() {
  window.clearInterval(timer);
  isRunning = false;
  count = 0;
  initContent();
  renderMetronomeSearch();
  const songInput = document.getElementById("search-input");
  songInput.addEventListener("keyup", autoCompleteSearch);
}
export {
  decreaseTempoListener,
  increaseTempoListener,
  tempoSliderListener,
  increaseBeatsListener,
  decreaseBeatsListener,
  selectNewSongListener,
  startMetronomeListener,
};
