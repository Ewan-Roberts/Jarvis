"use strict";

const   spotify = require("spotify-node-applescript"),
        user    = require("./userInformation"),
        event   = require("./event");

// the below fires on conditions in timer.js
event.on("morning", () => {

    console.log("start morning")

    event.emit("checkStatus");

    spotify.playTrack(user.morningTrack);

    event.emit("musicControls","half");

    event.emit("musicControls","play");

    // give the user some time to wake up before you start turning on lights and telling the news 
    setTimeout(() => {
                        
        event.emit("fetchWeatherData")

    }, 48000);

    setTimeout(() => {
             
        event.emit("fetchNewsData")

    }, 60000);

    setTimeout(() => {
             
        event.emit("spanish")

    }, 140000);
})

