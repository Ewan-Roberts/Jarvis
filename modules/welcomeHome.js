
const spotify = require('spotify-node-applescript');

const childProc = require('child_process');

let eventHandler = require('./eventHandler');

let userHome = true 

//Put user ID here

let spotifyUser = ''

//Put playlist link here

let spotifyPlaylist = ''

eventHandler.on("welcomeHome", socket => {

    if(!userHome) {

        spotify.setVolume(100);

        spotify.pause()
           
        setTimeout(() => {

            spotify.playTrackInContext('spotify:track:2fb0t9Ob7hY5UBmoo9SZNH', 'spotify:user:'+spotifyUser+':playlist:'+spotifyPlaylist);

        }, 3000);
        
        eventHandler.emit("bedroomLightOn")

        socket.emit('speechFromBackEnd', '  Welcome home')

        userHome = true

    }

})

module.exports.reset = hour => {

    if (hour === "17:00") {

        userHome = false

    }

}