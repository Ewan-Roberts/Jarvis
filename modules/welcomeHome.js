"use strict";

const   spotify = require("spotify-node-applescript"),
        user    = require("./userInformation"),
        storage = require("node-persist");

storage.init()

storage.setItem("userHome",true)

global.event.on("welcomeHome", () => {
    
    storage.getItem("userHome", (err,bool) => {
        
        if(!bool) {

            spotify.playTrackInContext(user.track, user.spotify_user+user.spotify_playlist);

            global.event.emit("speechFromBackEnd", "  Welcome home " + user.user_name);

            storage.setItem("userHome",true)
        }
    })
});

global.event.on("resetUserHome", () => {storage.setItem("userHome",false)})