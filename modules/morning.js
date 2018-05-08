"use strict";

const   spotify = require("spotify-node-applescript"),
        user    = require("./userInformation")

// the below fires on conditions in timer.js
global.event.on("morning", () => {

    spotify.playTrack(user.morning_track);

    global.event.emit("musicControls","half");
    
    global.event.emit("musicControls","play");

    // give the user some time to wake up before you start turning on lights and telling the news 
    setTimeout(() => {global.event.emit("fetchWeatherData")
    }, 48000);

    setTimeout(() => {global.event.emit("fetchNewsData")
    }, 60000);

    setTimeout(() => {global.event.emit("spanish")
    }, 140000);
})

