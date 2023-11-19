import { clientId, clientSecret } from "./secret";

function getAccessToken() {
    const url = "https://accounts.spotify.com/api/token";

    return fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`,
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            const accessToken = data.access_token;
            localStorage.setItem("access_token", accessToken);
            return accessToken;
        })
        .catch(function(error) {
            console.error("Error getting access token:", error);
        });
}

function searchSpotify(query, token) {
    const songsArray = []
    const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(
    query
  )}&type=track`;

    fetch(url, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(function(response) {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(function(data) {

            for (let i = 0; i < data.tracks.items.length; i++) {
                songsArray.push({
                    id: data.tracks.items[i].id,
                    name: data.tracks.items[i].name,
                    artist: data.tracks.items[0].artists[0].name,
                    image: data.tracks.items[i].album.images[0].url,
                });
            }
            localStorage.setItem("songsArray", JSON.stringify(songsArray))
        })
        .catch(function(error) {
            console.error("Error searching Spotify:", error);
        });
}

function getSongInfo(id, token) {
    const url = `https://api.spotify.com/v1/audio-analysis/${id}`;
    fetch(url, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(function(response) {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(function(data) {
            console.log(data)
            localStorage.setItem("tempo", Math.round(data.track.tempo))
            localStorage.setItem("time_signature", data.track.time_signature)
        })
        .catch(function(error) {
            console.error("Error searching Spotify:", error);
        });
}
export { getAccessToken, getSongInfo, searchSpotify };