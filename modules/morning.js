"use strict";

const spotify = require("spotify-node-applescript"),
    user = require("./userInformation"),
    event = require("./event.js");

// the below fires on conditions in timer.js
event.on("morning", () => {
    console.log("hit on morning")
    event.emit("checkStatus");

    spotify.playTrack(user.morningTrack);

    event.emit("musicControls","half");

    event.emit("musicControls","play");

    // give the user some time to wake up before you start turning on lights and telling the news 
    setTimeout(() => {

        spotify.getState((err, obj) => {
            
            //If the user has paused the music, stop the process
            if(obj.state === "playing") {
                // it is morning
                event.emit("fetchWeatherData")

                event.emit("musicControls","low");
                
            }

        });

    }, user.morningWaitTillMusic);

})

