"use strict";

const 	five 	= require("johnny-five"),
    	daytime = require("../../isItDaytime"),
        user    = require("../../userInformation");

// Set up the johnny five modules, these are loaded when boardSetUp is called

const   bedroom_sensor = new five.Motion({pin: 48,freq: 1000});	
        bedroom_sensor.custom.pause = false;
        bedroom_sensor.on("calibrated", () => {console.log("Hardware loaded - bedroom_motion")}); 

//arp -na | grep -i b8:27:eb
// all below fire when the sensors see motion 

bedroom_sensor.on("motionstart", () => {
    
    console.log("bedroom movement ");

    if(!bedroom_sensor.custom.pause && !user.override && daytime()){
        
        global.event.emit("welcomeHome");
        global.event.emit("bedroomLight", true);
        global.event.emit("resetMovementTimer");    
        global.event.emit("screen","on")
        bedroom_sensor.custom.pause = true;

        setTimeout(()=>{

            bedroom_sensor.custom.pause = false;

        },10000)
    }
}); 










