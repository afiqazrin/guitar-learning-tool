import { getSongInfo, searchSpotify } from "./spotify";
import { initContent } from "./init";
import { renderMetronome } from "./render";
async function handleListClick(event) {
  const clickedItemId = event.currentTarget.dataset.songId;
  const clickedSongName = event.currentTarget.dataset.songName;
  const clickedSongArtist = event.currentTarget.dataset.songArtist;
  const clickedImageUrl = event.currentTarget.dataset.songImageUrl;
  await getSongInfo(clickedItemId, localStorage.getItem("access_token"));
  console.log(
    "songSearch.js",
    localStorage.getItem("tempo") + " " + localStorage.getItem("time_signature")
  );
  initContent();
  renderMetronome(
    clickedSongName,
    clickedSongArtist,
    clickedImageUrl,
    localStorage.getItem("tempo"),
    localStorage.getItem("time_signature")
  );
}

function autoCompleteSearch(event) {
  const songsUl = document.querySelector(".autocomplete-results");
  if (
    (event.target.value != "" && event.keyCode != 8) ||
    (event.target.value != "" && event.keyCode == 8)
  ) {
    searchSpotify(event.target.value, localStorage.getItem("access_token"));

    songsUl.innerHTML = "";

    const songsArray = JSON.parse(localStorage.getItem("songsArray")) || [];

    for (let i = 0; i < songsArray.length; i++) {
      const autoList = document.createElement("li");
      autoList.dataset.songName = songsArray[i].name;
      autoList.dataset.songArtist = songsArray[i].artist;
      autoList.dataset.songImageUrl = songsArray[i].image;
      autoList.dataset.songId = songsArray[i].id;

      autoList.innerHTML = `
            <img src="${songsArray[i].image}" alt="album image">
            <div class="list-detail">
                <div class="top">
                    <h4>${songsArray[i].name}</h4>
                </div>
                <div class="bottom">
                    <h5>${songsArray[i].artist}</h5>
                </div>
            </div>
        `;

      autoList.addEventListener("click", handleListClick);

      songsUl.appendChild(autoList);
    }
  } else if (
    event.target.value == null ||
    (event.target.value == "" && event.keyCode == 8)
  ) {
    localStorage.removeItem("songsArray");
    songsUl.innerHTML = "";
  }
}

export { autoCompleteSearch };
