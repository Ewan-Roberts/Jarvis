"use strict";

const 	five 	= require("johnny-five"),
		board 	= new five.Board(),
		event 	= require("./event"),
		storage = require("node-persist");

//Set up the modules on the ardino board and sets up events.on
board.on("ready", () => {

    console.log("board ready")
		    //Bedroom modules 
    const 	bedroomLightLeft 	= require("./bedroom/bedroomLeft.js"),
    		bedroomLightRight 	= require("./bedroom/bedroomRight.js"),
    		bedroomMotion 		= require("./bedroom/bedroomMotion.js"),
    		
    		//Bathroom modules 
    		bathroomLightServo 	= require("./bathroom/bathroomLight.js"),
    		bathroomMotion 		= require("./bathroom/bathroomMotion.js");
            console.log(bedroomLightLeft)
})

board.on("error", err => {event.emit("error", "boardSetUp: " + err)}); 
