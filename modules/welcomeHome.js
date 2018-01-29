"use strict";

const spotify = require('spotify-node-applescript'),
    childProc = require('child_process'),
    event = require('./event.js'),
    userInformation = require('./userInformation');
    
let userHome = true;

//Put Spotify user ID here
let spotifyUser = userInformation.spotifyUser;

//Put Spotify user playlist link here
let spotifyPlaylist = userInformation.spotifyPlaylist;

// When the user comes home execute the below
event.on("welcomeHome", () => {
    
    if(!userHome) {

        event.emit("bedroomLight",true)
        event.emit('corridorLight',true);
           
        setTimeout(() => {

            spotify.playTrackInContext('spotify:track:2fb0t9Ob7hY5UBmoo9SZNH', spotifyUser+spotifyPlaylist);

        }, 3000);

        event.emit("speechFromBackEnd", '  Welcome home Ewan');

        userHome = true;

    }

});

// Each day reset the time so when a user comes home they are welcomed 
event.on('resetUserHome', () => {

    userHome = false;

})