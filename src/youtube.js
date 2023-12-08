import { renderYtAudioPlayer } from "./render";

function queryYoutube(query) {
    fetch("http://127.0.0.1:5000/query_yt", {
        method: "POST",
        body: query,
    })
    .then(function(response) {
        return response.json();
    })
    .then(data => {
        // Process the chords and audio data as needed
        console.log('Chords:', data.chords);

        // Decode the base64 audio data
        const audioData = Uint8Array.from(atob(data.audio_data), c => c.charCodeAt(0));

        renderYtAudioPlayer(audioData, data.chords)
        // Use the audio data as needed, for example, play it
    })
    .catch(function(error) {
        console.error("Error:", error);
    });
}

export {queryYoutube}