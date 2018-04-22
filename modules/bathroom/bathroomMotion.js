"use strict";

const 	five 	= require("johnny-five"),
    	event 	= require("../event");

const bathroomSensor = new five.Motion({pin: 22,freq: 1000})

bathroomSensor.on("calibrated", () => {console.log("bathroomSensor calibrated")}); 

bathroomSensor.on("motionstart", () => {
	
    console.log("bathroom movement");
	event.emit("bathroomLight", true)

}); 
