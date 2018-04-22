"use strict";

const   five    = require("johnny-five"),
        digest  = require("../digest.js"),
        light   = require("../lightAction.js"),
        event   = require("../event.js"),
        storage = require("node-persist");
        //TODO?
        storage.init()
 
//Pass the functionality to a global event handler 
event.on("bedroomLight", cmd => {
    console.log("bedroomLight HIT")
    //Digest the bool that match to key words in the digest.js file
    const bool = digest(cmd)

    event.emit("bedroomLeft",bool);
    
    //Get from local storage if the right light is synced with the left
    storage.getItem("bedroomSynced", (err,stored) => {

        if(stored){

            event.emit("bedroomRight", bool)

        } else {
            event.emit("bedroomRight", !bool)
        }
    })
    
    //set the state of the collective lights
    storage.setItem("bedroomLight",bool);

});

event.on("bedroomLightFlip", () => {

    storage.getItem("bedroomLight").then(bool => {

        event.emit("bedroomLight", !bool)

    })
})

event.on("bedroomLightToggle", () => {
    
    storage.getItem("bedroomSynced", (err,bool) => {
        
        // Here you're flipping the synced status, so the right light on is off or off is on    
        storage.setItem("bedroomSynced",!bool);

        //Now get what that collective lights were last set to and try again with the changed sync
        storage.getItem("bedroomLight", (err,state) => {
            
            event.emit("bedroomLight", state)

        })
    })
});
