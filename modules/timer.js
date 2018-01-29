"use strict";

const moment = require('moment'),
    event = require('./event.js');

// Timer for when the light should be turned off again
let timeSinceMovement = Date.now();

//If the user wants to override the motion sensing turning on the lights
let override = false;

//Time untill, after not being reset the lights will turn themselves off
let timeTillOff = 600000;

// Send a sentence to the front end when a time is matched
const timeBasedPrompt = (text, time) => {

    if (!moment(time,"HH:mm").isValid()) {
                
        throw new Error('Time format not valid');
        
    }

    if (time === moment().format("HH:mm")) {

        event.emit('speechFromBackEnd', text)

    }

}

module.exports.checkTimeSinceLastMovementSince = currentTime => {

    return currentTime > (timeSinceMovement + timeTillOff)

}

setInterval(() => {

    let currentMinute = moment().format("HH:mm");

    console.log(currentMinute)

    if (currentMinute === "06:00") {event.emit("morning")};

    if (currentMinute === "17:00") {event.emit("resetUserHome")};

    if (currentMinute === "23:30") {event.emit("corridorLight",false)};

    //Reminders that are removed if the user overrides
    if(!override) {

        timeBasedPrompt("Wake up, you have to progam me to do more", "06:10");
        
        //No movement for 'timeTillOff' time above has been reached, is it Mon-Friday, is it overridded by the user
        if (module.exports.checkTimeSinceLastMovementSince(Date.now()) && moment().isoWeekday() <= 7) {

            event.emit("bedroomLight",false);
            event.emit("bathroomLight",false);
            event.emit("corridorLight",false);
        
        };
    }
    
    //Reminders through the day
    timeBasedPrompt("Hey man, bed time soon", "23:00");

}, 60000);

//Every 2000 millseconds update the front end with info about the current song
setInterval(() => {event.emit("updateSpotifyStates")},10000);

//When motion is sensed reset the time since last movement
event.on("resetMovementTimer", () => {timeSinceMovement = Date.now()});

//Stop certain functionality if the user overrides
event.on("override", () => {override = !override});