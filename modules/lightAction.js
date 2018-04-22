"use strict";

const   event   = require('./event'),
        storage = require('node-persist'),
        digest  = require('./digest');
    

const stateCheck = (bool,light,relay) => {

    //Already in the on state
    if(!bool && (light.value === light.range[0])) {return false}

    //Already in the off state
    if(bool && (light.value === light.range[1])) {return false}

    return true
}

// Take in a bool for on or off, any light class and relay
module.exports = (bool,light,relay) => {

    if(stateCheck(bool,light,relay)){
        
        relay.close();

        bool?light.max():light.min()

        // Give the servo some time to move before shutting off the power
        setTimeout(() => {

            storage.setItemSync((light.pin).toString(),light.value); 

            relay.open()

        }, 400);  
    }
}

// controls lights together 
event.on("allLights", cmd => {

    const bool = digest(cmd)

    event.emit("bedroomLight",bool);

    setTimeout(()=>{

        event.emit("bathroomLight",bool);
        
    },500)
})
