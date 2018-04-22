"use strict";

const   spotify = require("spotify-node-applescript"),
        event   = require("./event"),
        user    = require("./userInformation"),
        storage = require("node-persist");

storage.init()

//Assume the user is home on start up 
storage.setItem("userHome",true)

// When the user comes home execute the below
event.on("welcomeHome", () => {
    
    storage.getItem("userHome", (err,bool) => {
        
        if(!bool) {

            spotify.playTrackInContext(user.track, user.spotifyUser+user.spotifyPlaylist);

            event.emit("speechFromBackEnd", "  Welcome home " + user.userName);

            storage.setItem("userHome",true)
        }
    })
});

// Each day reset the time so when a user comes home they are welcomed 
event.on("resetUserHome", () => {storage.setItem("userHome",false)})