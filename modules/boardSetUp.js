"use strict";

const five = require("johnny-five");

const board = new five.Board();

board.on("ready", () => {

    //Set up the modules on the ardino board and sets up events.on

    const bedroomLight = require('./bedroomLight.js')

    const bathroomLight = require('./bathroomLight.js')

    const bedroomMotion = require('./bedroomMotion.js')

    const hallwayMotion = require('./hallwayMotion.js')
    
})

board.on("error", function(err) {
    
    console.log("There was an error" + err);   
                                   
}); 
