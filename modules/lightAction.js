"use strict";

// Check if the servo motion has comppleted and its state
const checkSum = light => {

    return light.value === light.range[1]

}

// Check if the servo motion has comppleted and its state
module.exports = (bool,light,relay) => {

    // Allow electricty to the servo
    relay.close();
    
    if(bool) {

        light.max();    

    }else{

        light.min();

    }

    setTimeout(() => {

        light.center()

    },300)

    // Allow some time for the servo to transition
    setTimeout(() => {

        relay.open();

    }, 500);

}