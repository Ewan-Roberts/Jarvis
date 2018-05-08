"use strict";

const   moment      = require("moment"),
        user        = require('./userInformation'),
        isItDaytime = require("./isItDaytime");

//If the user wants to override the motion sensing, refereshs each server reboot
user.override = false;

let amount = user.override?100:60;

//Time untill, after not being reset the lights will turn themselves off
let time_diff = moment().add(amount,"minutes").format("HH:mm");

// Send a sentence to the front end when a time is matched
const time_event = (time, diff, event_name,cmd) => {

    if (time === diff) {
           
        global.event.emit(event_name, cmd);    
    }
}

// Minute clock that triggers time based prompts
setInterval(() => {

    let current_time = moment().format("HH:mm");

    if(!user.override) {

        time_event(current_time,user.morning_alarm, "morning");
        time_event(current_time,user.reset_user, "resetUserHome");
        time_event(current_time,user.bedtime, "speechFromBackEnd", "bedtime Ewan");

    }

    time_event(current_time,time_diff,"override",false);
    time_event(current_time,time_diff,"allLights",false);

}, 60000);


//When motion is sensed reset the time since last movement
global.event.on("resetMovementTimer", () => {time_diff = moment().add((user.override?100:60),"minutes").format("HH:mm")});

//Stop certain functionality if the user overrides
global.event.on("override", bool => {

    if(bool === undefined){
        bool = !user.override
    }

    if(bool){

        user.override = true
        global.event.emit("speechFromBackEnd", "Everything disabled for " + (user.override?"2 hours":"1 hour"));  
        global.event.emit("allLights",false);
       
    } else {

        user.override = false

    }
});



// //On startup chgeck if the piServer is connected and if the browser is open
// setTimeout(() => {

//     global.event.emit('checkStatus');

//     global.event.emit('checkPiStatus');

// }, 20000);
