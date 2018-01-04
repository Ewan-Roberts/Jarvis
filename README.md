# Jarvis
A home automation system that integrates with an ardino

//Event handers for kicking off functions
const eventHandler = require('./modules/eventHandler');

//Turns the bathroom and bedroom lights to on/off

eventHandler.emit("lightsOff")
eventHandler.emit("lightsOn")

//Sends a spanish word to the front end and is read out, spanish words are held in a JSON file at root
eventHandler.emit("spanish")


//In order of events
//Sets computer volume
//Plays a defined spotify track
//Turns on the light
//Reads the weather data for the day
//Reads out loud the weather data for the day
//Reads out loud the politics news from the new york times 
//Reads out a spanish word for the day

eventHandler.emit("morning")



computer.digest(action)
