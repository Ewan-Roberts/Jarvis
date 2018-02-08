"use strict";

const spotify = require('spotify-node-applescript'),
    event = require('./event.js'),
    user = require('./userInformation'),
    storage = require('node-persist');

    storage.init()

    storage.setItem("userHome",true)
// When the user comes home execute the below
event.on("welcomeHome", () => {
    
    storage.getItem("userHome", (err,bool) => {
        
        if(!bool) {

            event.emit("bedroomLight",true)
            event.emit("corridorLight",true);
               
            setTimeout(() => {

                spotify.playTrackInContext(user.track, user.spotifyUser+user.spotifyPlaylist);

            }, 3000);

            event.emit("speechFromBackEnd", "  Welcome home Ewan");

            event.emit("resetUserHome")

        }
    })

});

// Each day reset the time so when a user comes home they are welcomed 
event.on("resetUserHome", () => {storage.setItem("userHome",false)})