"use strict";

const moment = require('moment');
const welcomeHome = require('./welcomeHome.js')
let eventHandler = require('./eventHandler.js');
const spotify = require('spotify-node-applescript');
let timeSinceMovement = Date.now();

// Timer for when the light should be turned off again
const checkTimeSinceLastMovement = currentTime => {

    return currentTime > (timeSinceMovement + 600000)

}

const timeMatch = hour => {

    if (!moment(hour,"HH:mm").isValid()) {
                
        throw new Error('Time format not valid');
        
    }

    return hour === moment().format("HH:mm");

}

// Send a sentence to the front end when a time is matched
const timeBasedPrompt = (socket, text, time) => {

    if (timeMatch(time)) {

        socket.emit('speechFromBackEnd', text)

    }

}

module.exports = socket => {        

    setInterval(() => {

        let currentTime = moment().format("HH:mm")

        // client = clientio.connect('http://192.168.1.108:3013');
        
        if (currentTime === "06:10") {

            eventHandler.emit("morning", socket)
                
        }

        timeBasedPrompt(socket, "you need to go to work now", "08:20")

        timeBasedPrompt(socket, "Hey man, bed time soon", "23:00")

        welcomeHome.reset(currentTime)

        if (checkTimeSinceLastMovement() && moment().isoWeekday() <= 5) {

            eventHandler.emit("lightsOff");
            
        };
        // spotify.getState((err, state) => {
         
        //     socket.emit("trackTimeInfo", state)

        // }); 

        // spotify.getTrack((err, track) => {

        //     socket.emit('spotifyTrackInfo', track)       

        // })

    }, 60000)


}

module.exports.resetMovementTimer = () => {

    timeSinceMovement = Date.now();
    
} 