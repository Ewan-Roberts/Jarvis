"use strict";

const   five        = require("johnny-five"),
        storage     = require("node-persist"),
        light_model = require("../light_model");

// Set up the johnny five modules, these are loaded when boardSetUp is called
let bedroom_right = new light_model(

    new five.Servo({pin: 6,range: [0,80]}),
    new five.Relay({pin: 24,type: "NC"})

)

console.log("Hardware loaded - bedroom_right");

global.event.on("bedroomRightToggle",()=>{
    console.log("boom boom")
    bedroom_right.invert()
})

//Pass the functionality to a global event handler 
global.event.on("bedroomRight", bool => {
    
    console.log("bedroomRight: "+bool)
    bedroom_right.action(bool)

});

// global.event.emit("bedroomRight",true)
