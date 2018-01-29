"use strict";

const five = require("johnny-five"),
    moment = require('moment'),
    event = require('./event.js'),
    timer = require('./timer.js'),
    computer = require('./computer.js')

// Set up the johnny five modules, these are loaded when boardSetUp is called
let bedroomSensor = new five.Motion({
    
    pin: 22,
    freq: 200,
    calibrationDelay: 50

});

let hallwaySensor = new five.Motion({
    
    pin: 23,
    freq: 200,
    calibrationDelay: 50

});

const motionStart = () => {

    //If this monday to Friday welcome the user home
    if (moment().isoWeekday() <= 7 && timer.checkTimeSinceLastMovementSince(Date.now()) && computer.isItDaytime()) {
        
        event.emit("welcomeHome");

        event.emit("bedroomLight", true);

    }
    event.emit("resetMovementTimer");

}

bedroomSensor.on("motionstart", () => {motionStart()}); 

hallwaySensor.on("motionstart", () => {motionStart()}); 

event.on("corridorMotion", () => {motionStart()});