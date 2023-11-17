const clientId = "96fd8f0b535344928da701ea7025bcfa";
const clientSecret = "78aa06cc5c08438a900f68a07fde2170";

// Function to get access token
function getAccessToken() {
  const url = "https://accounts.spotify.com/api/token";

  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`,
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      const accessToken = data.access_token;
      localStorage.setItem("access_token", accessToken);
      return accessToken;
    })
    .catch(function (error) {
      console.error("Error getting access token:", error);
    });
}

// Function to search Spotify
function searchSpotify(query, token) {
  const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(
    query
  )}&type=track`;

  fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(function (response) {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(function (data) {
      // Handle the search results
      console.log("Search Results:", data.tracks.items[0]);
      console.log("id: ", data.tracks.items[0].id);
      localStorage.setItem("song_id", data.tracks.items[0].id);
    })
    .catch(function (error) {
      console.error("Error searching Spotify:", error);
    });
}

// Function to get song info
function getSongInfo(id, token) {
  const url = `https://api.spotify.com/v1/audio-analysis/${id}`;
  fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(function (response) {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(function (data) {
      // Handle the search results
      console.log(data)
      localStorage.setItem("tempo", Math.round(data.track.tempo))
      localStorage.setItem("time_signature", data.track.time_signature)
    })
    .catch(function (error) {
      console.error("Error searching Spotify:", error);
    });
}
export { getAccessToken, getSongInfo, searchSpotify };
