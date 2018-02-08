"use strict";

const moment = require("moment"),
    event = require("./event.js");

//If the user wants to override the motion sensing, refereshs each server reboot
let override = false;

//Time untill, after not being reset the lights will turn themselves off
let timeDiff = moment().add(20,"minutes").format("HH:mm");

// Send a sentence to the front end when a time is matched
const timeEvent = (time, diff, eventName,cmd) => {

    if (time === diff) {
           
        event.emit(eventName, cmd);
        
    }
}

setInterval(() => {

    let time = moment().format("HH:mm");
    timeEvent(time,"05:55","morning");
    timeEvent(time,"17:00","resetUserHome");
    timeEvent(time,"23:30","corridorLight",false);

    if(!override) {
        
        console.log(time)
        timeEvent(time,"06:10","speechFromBackEnd","Wake up, you have to program me to do more")
        timeEvent(time,timeDiff,"allLights",false)
        timeEvent(time,timeDiff,"override",false)

    }


}, 60000);

// When motion from any sensor is detected and override is false do the callback
event.on("motion", callback => {
    
    if(!override){

        callback()

    }

})

//Every 2000 millseconds update the front end with info about the current song
setInterval(() => {event.emit("updateSpotifyStates")},10000);

setTimeout(() => {

    event.emit('checkStatus')

    event.emit('checkPiStatus')

}, 10000);

//When motion is sensed reset the time since last movement
event.on("resetMovementTimer", () => {
    
    let amount = override?60:20;
    
    timeDiff = moment().add(amount,"minutes").format("HH:mm");
    

});

//Stop certain functionality if the user overrides
event.on("override", bool => {

    if (typeof bool !== 'undefined') {
        
        override = bool;

    } else {

        override = !override;

        event.emit("resetMovementTimer");

        event.emit("bedroomLight",false);

        event.emit("bathroomLight",false);
    }

});