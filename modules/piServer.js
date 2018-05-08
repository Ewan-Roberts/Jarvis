"use strict";

const 	user 	= require("./userInformation"),
		client  = require("socket.io-client")("http://192.168.1.100:" + user.port),
		storage = require("node-persist");

if(!client.connected) {global.event.emit("openApplication", "Raspberry")}

// Set up the connection with the raspberry pi 
global.event.on("corridorLight", bool => {client.emit("corridorLight", bool)})

client.on("circleButton", () => {
    
	global.event.emit("bedroomLightFlip");

}) 

client.on("squareButton", () => {

	global.event.emit("bathroomLightFlip")
})

// Check if a connection with the pi module is set up, fire erorr if not
global.event.once("checkPiStatus", () => {
	
	if(!client.connected) {

		global.event.emit("error", "Set up piServer : github.com/Ewan-Roberts/Jarvis-RaspberryPiExtention")
	}
})