"use strict";

const five = require("johnny-five"),
	board = new five.Board(),
	event = require("./event.js");

//Set up the modules on the ardino board and sets up events.on
board.on("ready", () => {

    const bedroomLightLeft = require("./bedroomLeft.js")

    const bedroomLightRight = require("./bedroomRight.js")

    const bathroomLightServo = require("./bathroomLightServo.js")

    const bedroomMotion = require("./bedroomMotion.js")
    
})

board.on("error", err => {event.emit("error", new Error("boardSetUp: " + err))}); 
