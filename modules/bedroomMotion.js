
const five = require("johnny-five");
const clock = require('./clock.js')
let eventHandler = require('./eventHandler.js');
let timer = require('./timer.js');

let bedroomMotion = new five.Motion({
    
    pin: 48,

    freq: 200,
    
    calibrationDelay: 50

});


bedroomMotion.on("motionstart", () => {

    if (clock.isItDaytime()) {

        eventHandler.emit("bedroomLightOn")

    }

    timer.resetMovementTimer()

}); 