"use strict";

let five = require("johnny-five"),
    event = require('./event.js'),
    computer = require('./computer.js'),
    light = require('./lightAction');

// Set up the johnny five modules, these are loaded when boardSetUp is called
let bathroomRelay = new five.Relay({
    
    pin: 10,
    type: "NC"

});

let bathroomLight = new five.Servo({
    
    pin: 11,
    range: [35,175]

});

//Start the lights without power to remove buzzing from servos
bathroomRelay.open()

//Pass the functionality for the lights to the global event handler 
event.on("bathroomLight", cmd => {
    
    let bool = computer.digest(cmd)

    light(!bool,bathroomLight,bathroomRelay);

});