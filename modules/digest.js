"use strict";

const event = require("./event");

// This is the list of phases or *spats* that resolve to a boolean statement
module.exports = input => {

    switch (input) {

        case "true":
        case "fan":
        case "M":
        case "en":
        case "ID":
        case "go":
        case "on":
        case "turn on":
        case "begin":
        case "start":
        case "wake":
        case "arm":
        case "home":
        case "art":
        case true:

            return true;

        break;

        case "false":
        case "off":
        case "office":
        case "art":
        case "turn off":
        case "stop":
        case "halt":
        case "en":
        case null:
        case false:

            return false;

        break;

        default: event.emit("error", input + ": is not a recognised word")
    }
}
