import { searchSpotify } from "./spotify";
import { initContent } from "./init";
function handleListClick(event) {
  const clickedItemId = event.currentTarget.dataset.songId;
  const clickedSongName = event.currentTarget.dataset.songName;
  const clickedSongArtist = event.currentTarget.dataset.songArtist;
  const clickedImageUrl = event.currentTarget.dataset.songImageUrl;
  console.log(
    `Clicked item with ID, Name, Arist, Image Url: ${clickedItemId}, ${clickedSongName}, ${clickedSongArtist}, ${clickedImageUrl}`
  );
  initContent();
}

function autoCompleteSearch(event) {
  const songsUl = document.querySelector(".autocomplete-results");
  if (
    (event.target.value != null && event.keyCode != 8) ||
    (event.target.value != null && event.keyCode == 8)
  ) {
    searchSpotify(event.target.value, localStorage.getItem("access_token"));

    // // Clear previous search results
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

      // Add event listener to each list item
      autoList.addEventListener("click", handleListClick);

      // Append the list item to the ul element
      songsUl.appendChild(autoList);
    }
  }
}

export { autoCompleteSearch };
