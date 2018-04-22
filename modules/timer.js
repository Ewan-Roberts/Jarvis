"use strict";

const   moment      = require("moment"),
        user        = require('./userInformation'),
        event       = require("./event"),
        isItDaytime = require("./isItDaytime");

//If the user wants to override the motion sensing, refereshs each server reboot
let override = false;

let amount = override?200:100;

//Time untill, after not being reset the lights will turn themselves off
let timeDiff = moment().add(amount,"minutes").format("HH:mm");

// Send a sentence to the front end when a time is matched
const timeEvent = (time, diff, eventName,cmd) => {

    if (time === diff) {
           
        event.emit(eventName, cmd);    
    }
}

// Minute clock that triggers time based prompts
setInterval(() => {

    let currentTime = moment().format("HH:mm");

    console.log(currentTime)

    // console.log("--" + timeDiff)

    if(!override) {

        timeEvent(currentTime,user.morningAlarm, "morning");

        timeEvent(currentTime,user.resetUser, "resetUserHome");

        timeEvent(currentTime,user.bedtime, "speechFromBackEnd", "bedtime Ewan");

    }

    timeEvent(currentTime,timeDiff,"override",false);

    timeEvent(currentTime,timeDiff,"allLights",false);

}, 60000);

// When motion from any sensor is detected and override is false do the callback
event.on("motion", callback => {

    if(!override && isItDaytime()){

        callback()
    }
})

//On startup chgeck if the piServer is connected and if the browser is open
setTimeout(() => {

    event.emit('checkStatus');

    event.emit('checkPiStatus');

}, 20000);

//When motion is sensed reset the time since last movement
event.on("resetMovementTimer", () => {timeDiff = moment().add((override?200:100),"minutes").format("HH:mm")});

//Stop certain functionality if the user overrides
event.on("override", bool => {
    console.log('override = ' + bool)

    if(bool === undefined){
        bool = !override
    }

    if(bool){

        override = true
        
        event.emit("speechFromBackEnd", "Everything disabled for " + (override?"2 hours":"1 hour"));  

        event.emit("allLights",false);
       
    } else {

        override = false

        event.emit("allLights",true);
    }
});