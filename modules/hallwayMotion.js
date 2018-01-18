"use scrict";

let five = require("johnny-five");

let eventHandler = require('./eventHandler.js');

// Set up the johnny five modules, these are loaded when boardSetUp is called
let timer = require('./timer.js');

let hallwayMotion = new five.Motion({
    
    pin: 23,
    freq: 200,
    calibrationDelay: 50

});

//Pass the functionality to a global event handler 
hallwayMotion.on("motionstart", () => {

    eventHandler.emit("welcomeHome", socket); 

    if (moment().isoWeekday() <= 5) {

        // eventHandler.emit("bedroomLightOn")

    }

    timer.resetMovementTimer()

}); 