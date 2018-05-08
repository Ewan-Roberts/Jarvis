"use strict";
//Sets up the global event emitter for each event to hook to
let     EventEmitter    = require("events"),   
        obj             = new EventEmitter();

global.event = obj;

//Error handing
global.event.on("error", (err,msg) => {console.error("Error: ", err)})