"use strict";

const event = require('./event'),
    storage = require('node-persist');

const stateCheck = (bool,light,relay) => {

    //Already in the on state
    if(!bool && (light.value === light.range[0])) return false

    //Already in the off state
    if(bool && (light.value === light.range[1])) return false

    return true

}

// Take in a bool for on or off, any light class and relay
module.exports = (bool,light,relay) => {

    if(stateCheck(bool,light,relay)){

        relay.close();

        bool?light.max():light.min()

        // Give the servo some time to move before shutting off the power
        setTimeout(() => {
            storage.setItem((light.pin).toString(),light.value); 
            relay.open()
        }, 500);  

    }

}

// controls lights together 
event.on("allLights", bool => {

    event.emit("bedroomLight",bool);
    event.emit("bathroomLight",bool);
    event.emit("corridorLight",bool); 
    event.emit("musicControls","pause");

})
