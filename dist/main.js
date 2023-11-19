(()=>{"use strict";const t=document.querySelector(".autocomplete-results");function e(t){const e=t.currentTarget.dataset.songId;console.log(`Clicked item with ID: ${e}`)}fetch("https://accounts.spotify.com/api/token",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:"grant_type=client_credentials&client_id=96fd8f0b535344928da701ea7025bcfa&client_secret=78aa06cc5c08438a900f68a07fde2170"}).then((function(t){return t.json()})).then((function(t){const e=t.access_token;return localStorage.setItem("access_token",e),e})).catch((function(t){console.error("Error getting access token:",t)})),document.getElementById("search-input").addEventListener("keyup",(function(n){!function(t,e){const n=[],o=`https://api.spotify.com/v1/search?q=${encodeURIComponent(t)}&type=track`;fetch(o,{method:"GET",headers:{Authorization:`Bearer ${e}`}}).then((function(t){if(!t.ok)throw new Error(`HTTP error! Status: ${t.status}`);return t.json()})).then((function(t){for(let e=0;e<t.tracks.items.length;e++)n.push({id:t.tracks.items[e].id,name:t.tracks.items[e].name,artist:t.tracks.items[0].artists[0].name,image:t.tracks.items[e].album.images[0].url});localStorage.setItem("songsArray",JSON.stringify(n))})).catch((function(t){console.error("Error searching Spotify:",t)}))}(n.target.value,localStorage.getItem("access_token")),t.innerHTML="";const o=JSON.parse(localStorage.getItem("songsArray"))||[];for(let n=0;n<o.length;n++){const a=document.createElement("li");a.dataset.songId=o[n].id,a.innerHTML=`\n            <img src="${o[n].image}" alt="album image">\n            <div class="list-detail">\n                <div class="top">\n                    <h4>${o[n].name}</h4>\n                </div>\n                <div class="bottom">\n                    <h5>${o[n].artist}</h5>\n                </div>\n            </div>\n        `,a.addEventListener("click",e),t.appendChild(a)}}))})();