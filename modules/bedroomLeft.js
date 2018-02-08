"use strict";

let five = require("johnny-five"),
    light = require("./lightAction.js"),
    event = require("./event.js"),
    storage = require("node-persist");
    //TODO?
    storage.init()

// Set up the johnny five modules, these are loaded when boardSetUp is called
let leftLightRelay = new five.Relay({pin: 9,type: "NC"});

let leftLight = new five.Servo({pin: 8,range: [70,175]});

//Start the lights without power to remove buzzing from servos
leftLightRelay.open();

//Get the last value the servo was at, saved between session locally
leftLight.value = storage.getItem((leftLight.pin).toString())

//Pass the functionality to a global event handler 
event.on("bedroomLeft", bool => {light(bool,leftLight,leftLightRelay)});