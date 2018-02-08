"use strict";

const storage = require('node-persist'),
    event = require('./event.js');

// Take in a seroName and flips its state
module.exports = servoName => {

    storage.getItem(servoName, (err,bool) => {
        console.log('stored bool ' + !bool)
        event.emit(servoName, !bool)

    })

}
