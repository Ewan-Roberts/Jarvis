"use strict";

const   five = require("johnny-five");

const   bathroom_sensor = new five.Motion({pin: 22,freq: 1000});
        bathroom_sensor.custom.pause = false;
        bathroom_sensor.on("calibrated", () => {console.log("Hardware loaded - bathroom_motion")}); 

bathroom_sensor.on("motionstart", () => {
	
    console.log("bathroom movement");

    if(!bathroom_sensor.custom.pause){
        
        global.event.emit("bathroomLight", true)

        bathroom_sensor.custom.pause = true;

        setTimeout(()=>{

            bathroom_sensor.custom.pause = false;

        },5000)
    }
}); 
