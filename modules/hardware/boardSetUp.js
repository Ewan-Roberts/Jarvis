"use strict";

const 	five 	= require("johnny-five"),
		board 	= new five.Board();

console.log("Hardware initialised");
//Set up the modules on the ardino board and sets up events.on
board.on("ready", () => {

    console.log("Hardware loaded - Board Set Up");
		    //Bedroom modules 
    const 	bedroom_light       = require("./bedroom/bedroomLight.js"),
            bedroom_light_left 	= require("./bedroom/bedroomLeft.js"),
    		bedroom_light_right = require("./bedroom/bedroomRight.js"),
    		bedroom_motion 		= require("./bedroom/bedroomMotion.js"),

    		//Bathroom modules 
    		bathroom_light 	    = require("./bathroom/bathroomLight.js"),
    		bathroom_motion 	= require("./bathroom/bathroomMotion.js");
})

board.on("error", err => {global.event.emit("error", "boardSetUp: " + err)}); 
