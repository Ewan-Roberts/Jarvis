"use strict";

let five = require("johnny-five"),
    digest = require("./digest.js"),
    light = require("./lightAction.js"),
    flip = require("./lightFlip"),
    event = require("./event.js"),
    storage = require("node-persist");
    //TODO?
    storage.init()

//Pass the functionality to a global event handler 
event.on("bedroomLight", cmd => {
    
    //Digest the bool that match to key words in the digest.js file
    let bool = digest(cmd)

    event.emit("bedroomLeft",bool);
    
    //Get from local storage if the right light is synced
    storage.getItem("lightSynced", (err,stored) => {
        
        stored?event.emit("bedroomRight",bool):event.emit("bedroomRight",!bool);

    })
    
    storage.setItem("bedroomLight",bool);
    
    // event.emit("screen",bool)

});

event.on("bedroomLightFlip", () => {flip("bedroomLight")});

event.on("bedroomLightToggle", () => {

    storage.getItem("lightSynced", (err,bool) => {
        
        storage.setItem("lightSynced",!bool);

        storage.getItem("bedroomLight", (err,bool) => {
            
            event.emit("bedroomLight", bool)

        })

    })

});