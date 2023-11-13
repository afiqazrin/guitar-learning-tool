import { renderChordPlayer, renderPractice} from "./render";
import { initGame, initPractice } from "./earPractice";
import { initContent } from "./init";

const homeButton = document.getElementById('home-btn');
const practiceButton = document.getElementById('practice-btn');

initContent();
renderChordPlayer();
homeButton.addEventListener('click', ()=> {
    initContent();
    renderChordPlayer();
});

practiceButton.addEventListener('click', ()=> {
    initContent();
    renderPractice();
})