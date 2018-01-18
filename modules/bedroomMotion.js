"use strict";

const five = require("johnny-five");

let eventHandler = require('./eventHandler.js');

let timer = require('./timer.js');

const moment = require('moment');

// Set up the johnny five modules, these are loaded when boardSetUp is called
let bedroomMotion = new five.Motion({
    
    pin: 48,
    freq: 200,
    calibrationDelay: 50

});

//Pass the functionality to a global event handler 
//If this monday to Friday welcome the user home
bedroomMotion.on("motionstart", () => {

    if (moment().isoWeekday() <= 5) {

        // eventHandler.emit("bedroomLightOn")

    }

    timer.resetMovementTimer()

}); 