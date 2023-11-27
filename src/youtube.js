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

// function playAudio(audioData) {
//     // Implement your audio playback logic here
//     // For example, you can create an AudioContext and play the audio
//     const audioContext = new (window.AudioContext || window.webkitAudioContext)();
//     audioContext.decodeAudioData(audioData.buffer, function(buffer) {
//         const source = audioContext.createBufferSource();
//         source.buffer = buffer;
//         source.connect(audioContext.destination);
//         source.start();
//     });
// }

function playAudio(audioData, chordArray) {
    const audioBlob = new Blob([audioData], { type: 'audio/mp3' });
    const audioUrl = URL.createObjectURL(audioBlob);

    const audioElement = new Audio(audioUrl);
    audioElement.controls = true;
    document.body.appendChild(audioElement);

    audioElement.addEventListener('ended', () => {
        // Remove the audio element when playback is finished
        document.body.removeChild(audioElement);
        // Optionally, you can perform other actions when playback ends
    });

    audioElement.addEventListener('timeupdate', function() {
        const currentTime = audioElement.currentTime;
        console.log(currentTime)
        // Find the chord at the current time
        const currentChord = chordArray.find(chord => currentTime >= chord[1] && currentTime < chord[1] + 1);

        if (currentChord !== undefined) {
            // Update the HTML display
            console.log(`Current chord: ${currentChord[0]} at ${currentChord[1]} seconds.`);
        }
    });
    
    audioElement.play();

    // Update seek slider position and current time display as the audio plays
}

export { queryYoutube };


