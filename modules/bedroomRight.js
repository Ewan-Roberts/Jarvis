"use strict";

let five = require("johnny-five"),
    light = require("./lightAction.js"),
    event = require("./event.js"),
    storage = require("node-persist");
    //TODO?
    storage.init()

// Set up the johnny five modules, these are loaded when boardSetUp is called
let rightLightRelay = new five.Relay({pin: 24,type: "NC"});

let rightLight = new five.Servo({pin: 6,range: [0,70]});

//Start the lights without power to remove buzzing from servos
rightLightRelay.open();

//Get the last value the servo was at, saved between session locally
rightLight.value = storage.getItem((rightLight.pin).toString())

//Pass the functionality to a global event handler 
event.on("bedroomRight", bool => {light(bool,rightLight,rightLightRelay)});
