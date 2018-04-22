"use strict";

const   event   = require('../event'),
        digest  = require('../digest'),
        storage = require('node-persist'),
        five    = require("johnny-five"),
        light   = require("../lightAction");
    
const   bathroomRelay   = new five.Relay({pin: 10,type: "NC"}),
        bathroomLight   = new five.Servo({pin: 11,range: [0,200]});

//Start the lights without power to remove buzzing from servos
bathroomRelay.open()

//Get the last value the servo was at, saved between session locally
bathroomLight.value = storage.getItemSync((bathroomLight.pin).toString())

//Pass the functionality for the lights to the global event handler 
event.on("bathroomLight", cmd => {
    
    //Digest the bool that match to key words in the digest file
    const bool = digest(cmd)
    
    console.log(bool + "bathroom light")

    light(bool,bathroomLight,bathroomRelay)

    storage.setItemSync("bathroomLight",bool);

});

event.on("bathroomLightFlip", () => {

    const state = storage.getItemSync("bathroomLight")

    console.log("bathboom hit flip state " + state)

    light(!bool,bathroomLight,bathroomRelay)

});




