"use strict";

const user = require("./userInformation"),
	client  = require("socket.io-client")("http://192.168.1.103:" + user.port),
	event = require("./event.js"),
	storage = require("node-persist");

// Set up the connection with the raspberry pi 
event.on("corridorLight", bool => {client.emit("corridorLight", bool)})

client.on("circleButton", () => {event.emit("bedroomLightFlip")}) 

client.on("squareButton", () => {console.log('square Button'); event.emit("bathroomLightFlip")})

client.on("corridorMotion", () => {event.emit("corridorMotion")});

// Check if a connection with the pi module is set up, fire erorr if not
event.once("checkPiStatus", () => {
	console.log('firing pi status hopefully once')
	if(!client.connected) {
		
		event.emit("error", "piServer not connected, consider setting it up here https://github.com/vanguard12/Jarvis-RaspberryPiExtention set up hallway server")
	
	}

})