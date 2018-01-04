"use strict";

const clock = require('./clock.js')
const childProc = require('child_process');
const moment = require('moment');
const welcomeHome = require('./welcomeHome.js')
let eventHandler = require('./eventHandler.js');
const spotify = require('spotify-node-applescript');

let timeSinceMovement = Date.now();

const checkTimeSinceLastMovement = () => {

    return Date.now() > (timeSinceMovement + 600000)

}

const timeMatch = hour => {

    return hour === moment().format("HH:mm");

}

const timeBasedPrompt = (socket, text, time) => {

    if (timeMatch(time)) {

        childProc.exec('osascript -e "set Volume 6"');

        socket.emit('speechFromBackEnd', text)

    }

}

module.exports = socket => {        

    setInterval(() => {

        let currentTime = moment().format("HH:mm")

        console.log(currentTime)

        // client = clientio.connect('http://192.168.1.108:3013');
        if (currentTime === "07:30") {

            eventHandler.emit("morning", socket)
                
        }
        
        if (currentTime === "10:16") {

            eventHandler.emit("morning", socket)
                
        }

        timeBasedPrompt(socket, "you need to go to work now", "08:20")

        timeBasedPrompt(socket, "Hey man, bed time soon", "23:00")

        welcomeHome.reset(currentTime)

        if (checkTimeSinceLastMovement() && clock.isItDaytime()) {

            eventHandler.emit("lightsOff");
            
        };


    }, 60000)

    setInterval(() => {

        spotify.getState(function(err, state){
 
            socket.emit("trackTimeInfo", state)

        }); 

        spotify.getTrack((err, track) => {

            socket.emit('spotifyTrackInfo', track)       

        })
            
    }, 2000);

}

module.exports.resetMovementTimer = () => {

    timeSinceMovement = Date.now();
    
} 




