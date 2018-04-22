"use strict";

const	user 	= require("./userInformation"),
	client  = require("socket.io-client")("http://192.168.1.100:" + user.port),
	event 	= require("./event"),
	storage = require("node-persist");

if(!client.connected) {event.emit("openApplication", "Raspberry")}

// Set up the connection with the raspberry pi 
event.on("corridorLight", bool => {client.emit("corridorLight", bool)})

client.on("circleButton", () => {event.emit("bedroomLightFlip")}) 

client.on("squareButton", () => {event.emit("bathroomLightFlip")})

// Check if a connection with the pi module is set up, fire erorr if not
event.once("checkPiStatus", () => {
	
	if(!client.connected) {

		event.emit("error", "Set up piServer : github.com/Ewan-Roberts/Jarvis-RaspberryPiExtention")
	}
})
