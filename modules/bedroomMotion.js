"use strict";

const five = require("johnny-five"),
    event = require("./event.js"),
    isItDaytime = require("./isItDaytime.js")

// Set up the johnny five modules, these are loaded when boardSetUp is called
const bedroomSensor = new five.Motion(22);

const hallwaySensor = new five.Motion(23);

const motionStart = () => {

    if(isItDaytime()) {

        event.emit("welcomeHome");

        event.emit("bedroomLight", true);

        event.emit("corridorLight", true);

    }

    event.emit("resetMovementTimer");

}

// all below fire when the sensors see motion 
bedroomSensor.on("motionstart", () => {event.emit("motion",motionStart)}); 

hallwaySensor.on("motionstart", () => {event.emit("motion",motionStart)}); 

event.on("corridorMotion", () => {event.emit("motion",motionStart)}); 
