"use strict";

let five = require("johnny-five"),
    computer = require('./computer.js'),
    light = require('./lightAction.js'),
    event = require('./event.js');

// Set up the johnny five modules, these are loaded when boardSetUp is called
let leftLightRelay = new five.Relay({
    
    pin: 9,
    type: "NC"

});

let rightLightRelay = new five.Relay({
    
    pin: 24,
    type: "NC"

});

let rightLight = new five.Servo({
    
    pin: 6,
    range: [0,70]

});

let leftLight = new five.Servo({
    
    pin: 8,
    range: [70,175]

});

let hallSwitchSynced = true;

let lastAction = true;

//Start the lights without power to remove buzzing from servos
rightLightRelay.open();
leftLightRelay.open();

//Pass the functionality to a global event handler 
event.on("bedroomLight", cmd => {
    
    let bool = computer.digest(cmd)
    light(bool,leftLight,leftLightRelay);
    
    if(hallSwitchSynced){
        light(bool,rightLight,rightLightRelay);
    } else {
        light(!bool,rightLight,rightLightRelay);
    }

    // computer.screenWake();

});

event.on("bedroomLightToggle", () => {

    hallSwitchSynced = !hallSwitchSynced;

    event.emit("bedroomLight", lastAction)


});