import { renderChordPlayer, renderPractice } from "./render";
import { initGame, initPractice } from "./earPractice";
import { initContent } from "./init";
import { getAccessToken, searchSpotify, getSongInfo } from "./spotify";
const homeButton = document.getElementById("home-btn");
const practiceButton = document.getElementById("practice-btn");

// initContent();
// renderChordPlayer();
// homeButton.addEventListener('click', ()=> {
//     initContent();
//     renderChordPlayer();
// });

// practiceButton.addEventListener('click', ()=> {
//     initContent();
//     renderPractice();
// })

getAccessToken();
searchSpotify("All Apologies", localStorage.getItem("access_token"));
getSongInfo(
  localStorage.getItem("song_id"),
  localStorage.getItem("access_token")
);
