"use strict";

const clientio  = require('socket.io-client');

let eventHandler = require('./eventHandler.js');

const client    = clientio.connect('http://192.168.1.108:3013');

// Set up the connection with the raspberry pi 
client.on("circleButton", () => {

    eventHandler.emit("bedroomLightToggle")

}) 

client.on("squareButton", () => { 

    eventHandler.emit("bathroomLightToggle")

})