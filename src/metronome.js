import { searchSpotify } from "./spotify";

const songsUl = document.querySelector(".autocomplete-results");

function handleListClick(event) {
    const clickedItemId = event.currentTarget.dataset.songId;
    console.log(`Clicked item with ID: ${clickedItemId}`);
    // Perform additional actions with the clicked ID if needed
}

function autoCompleteSearch(event) {
    searchSpotify(event.target.value, localStorage.getItem("access_token"));

    // Clear previous search results
    songsUl.innerHTML = '';

    const songsArray = JSON.parse(localStorage.getItem("songsArray")) || [];

    for (let i = 0; i < songsArray.length; i++) {
        const autoList = document.createElement("li");
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
        autoList.addEventListener('click', handleListClick);

        // Append the list item to the ul element
        songsUl.appendChild(autoList);
    }
}

export { autoCompleteSearch };