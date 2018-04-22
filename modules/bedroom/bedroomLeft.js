"use strict";

const 	five 	= require("johnny-five"),
    	light 	= require("../lightAction"),
    	event 	= require("../event"),
    	storage = require("node-persist");
    	//TODO?
    	storage.initSync()

// Set up the johnny five modules, these are loaded when boardSetUp is called
const 	leftLightRelay 	= new five.Relay({pin: 9,type: "NC"}),
		leftLight 		= new five.Servo({pin: 8,range: [70,175]});

//Start the lights without power to remove buzzing from servos
leftLightRelay.open();

console.log("loaded bedroom left")

//Get the last value the servo was at, saved between session locally
leftLight.value = storage.getItemSync((leftLight.pin).toString());

//Pass the functionality to a global event handler 
event.on("bedroomLeft", bool => {
    
    console.log("bedroomLeft: "+bool)

    light(bool,leftLight,leftLightRelay)

});

console.log(event)