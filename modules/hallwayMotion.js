
let five = require("johnny-five");

const clock = require('./clock.js')
let eventHandler = require('./eventHandler.js');
let timer = require('./timer.js');

let hallwayMotion = new five.Motion({
    
    pin: 23,

    freq: 200,
    
    calibrationDelay: 50

});

hallwayMotion.on("motionstart", () => {

    eventHandler.emit("welcomeHome", socket); 

    console.log("hit motion")

    if (clock.isItDaytime()) {

        eventHandler.emit("bedroomLightOn")

    }

    timer.resetMovementTimer()

}); 