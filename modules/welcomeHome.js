
const spotify = require('spotify-node-applescript');

const childProc = require('child_process');

let eventHandler = require('./eventHandler');

let userHome = true;

//Put Spotify user ID here
let spotifyUser = ''

//Put Spotify user playlist link here
let spotifyPlaylist = ''

// When the user comes home execute the below
eventHandler.on("welcomeHome", socket => {

    if(!userHome) {

        spotify.setVolume(100);
           
        setTimeout(() => {

            spotify.playTrackInContext('spotify:track:2fb0t9Ob7hY5UBmoo9SZNH', 'spotify:user:'+spotifyUser+':playlist:'+spotifyPlaylist);

        }, 3000);
        
        eventHandler.emit("bedroomLightOn");

        socket.emit('speechFromBackEnd', '  Welcome home Ewan');

        userHome = true;

    }

});

// Each day reset the time so when a user comes home they are welcomed 
module.exports.reset = hour => {

    if (hour === "17:00") {

        userHome = false;

    }

}