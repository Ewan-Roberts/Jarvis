"use strict";

let five = require("johnny-five"),
    light = require("./lightAction.js"),
    event = require("./event.js"),
    storage = require("node-persist");
    //TODO?
    storage.init()

// Set up the johnny five modules, these are loaded when boardSetUp is called
let bathroomRelay = new five.Relay({pin: 10,type: "NC"});

let bathroomLight = new five.Servo({pin: 11,range: [0,200]});

//Start the lights without power to remove buzzing from servos
bathroomRelay.open()

//Get the last value the servo was at, saved between session locally
bathroomLight.value = storage.getItem((bathroomLight.pin).toString())

//Pass the functionality for the lights to the global event handler 
event.on("bathroomServo", bool => {console.log(bool);light(bool,bathroomLight,bathroomRelay)});