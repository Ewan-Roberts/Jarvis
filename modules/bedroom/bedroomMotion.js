"use strict";

const 	five 	= require("johnny-five"),
    	event 	= require("../event"),
    	daytime = require("../isItDaytime");

// Set up the johnny five modules, these are loaded when boardSetUp is called

const bedroomSensor = new five.Motion({pin: 48,freq: 1000});	

bedroomSensor.on("calibrated", () => {console.log("bedroomSensor calibrated")}); 

const motionStart = () => {
	
	if(daytime()){

	    event.emit("welcomeHome");

	    event.emit("bedroomLight", true);

	    event.emit("resetMovementTimer");		
	}
}

//arp -na | grep -i b8:27:eb

// all below fire when the sensors see motion 

bedroomSensor.on("motionstart", () => {
    console.log("bedroom movement");
    event.emit("motion",motionStart)
    event.emit("motionBuffer")
}); 



