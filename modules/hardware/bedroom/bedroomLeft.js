"use strict";

const 	five 	   = require("johnny-five"),
    	storage    = require("node-persist"),
        light_model = require("../light_model");

// Set up the johnny five modules, these are loaded when boardSetUp is called
let bedroom_left = new light_model(

    new five.Servo({pin: 8,range: [70,175]}),
    new five.Relay({pin: 9,type: "NC"})

)

console.log("Hardware loaded - bedroom_left");

//Pass the functionality to a global event handler 
global.event.on("bedroomLeft", bool => {
    
    console.log("bedroomLeft: "+bool)

    bedroom_left.action(bool)

});

// console.log(global.event)