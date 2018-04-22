"use strict";
//Sets up the global event emitter for each event to hook to
const EventEmitter = require("events");

module.exports = new EventEmitter();

//Error handing
module.exports.on("error", (err,msg) => {console.error("Error: ", err)})