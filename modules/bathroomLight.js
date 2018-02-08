"use strict";

let five = require("johnny-five"),
    event = require('./event.js'),
    digest = require('./digest.js'),
    flip = require('./lightFlip'),
    storage = require('node-persist');

//Pass the functionality for the lights to the global event handler 
event.on("bathroomLight", cmd => {
	
	//Digest the bool that match to key words in the digest.js file
    let bool = digest(cmd)

    event.emit("bathroomServo",!bool);

    storage.setItem("bathroomLight",bool);

});

event.on("bathroomLightFlip", () => {flip("bathroomLight")});
