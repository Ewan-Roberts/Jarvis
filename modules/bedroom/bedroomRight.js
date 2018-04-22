"use strict";

const 	five 	= require("johnny-five"),
    	light 	= require("../lightAction"),
    	event 	= require("../event"),
    	storage = require("node-persist");
    	//TODO?
    	storage.initSync()

// Set up the johnny five modules, these are loaded when boardSetUp is called
const 	rightLightRelay = new five.Relay({pin: 24,type: "NC"}),
		rightLight 		= new five.Servo({pin: 6,range: [0,80]});

//Start the lights without power to remove buzzing from servos
rightLightRelay.open();

//Get the last value the servo was at, saved between session locally
rightLight.value = storage.getItemSync((rightLight.pin).toString());

console.log("On load of right light:")
console.log("right light value :" + rightLight.value)

//Pass the functionality to a global event handler 
event.on("bedroomRight", bool => {
    
    console.log("bedroomRight: "+bool)

    light(bool,rightLight,rightLightRelay)

});
