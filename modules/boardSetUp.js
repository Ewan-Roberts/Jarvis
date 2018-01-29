"use strict";

const five = require("johnny-five"),
	board = new five.Board();

board.on("ready", () => {

    //Set up the modules on the ardino board and sets up events.on
    const bedroomLight = require('./bedroomLight.js')

    const bathroomLight = require('./bathroomLight.js')

    const bedroomMotion = require('./bedroomMotion.js')
    
})

board.on("error", function(err) {
    
    throw new Error("There was an error " + err);   
                                   
}); 
