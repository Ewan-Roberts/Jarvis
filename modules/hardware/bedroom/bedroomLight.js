"use strict";

const   five    = require("johnny-five"),
        storage = require("node-persist");
 
console.log("Hardware loaded - bedroom_light controller");

//Pass the functionality to a global event handler 
global.event.on("bedroomLight", cmd => {

    console.log("bedroomLight "+cmd)

    global.event.emit("bedroomLeft",cmd);

    global.event.emit("bedroomRight", cmd)

    // //Get from local storage if the right light is synced with the left
    // storage.getItem("bedroomSynced", (err,stored) => {

    //     console.log(stored + " stored shit")

    //     if(stored){

    //         global.event.emit("bedroomRight", bool)

    //     } else {
    //         global.event.emit("bedroomRight", !bool)
    //     }
    // })
    
    //set the state of the collective lights
    storage.setItem("bedroomLight",cmd);

});

global.event.on("bedroomLightFlip", () => {

    storage.getItem("bedroomLight").then(bool => {

        global.event.emit("bedroomLight", !bool)

    })
})

global.event.on("bedroomLightToggle", () => {
    global.event.emit("bedroomRightToggle")
    // storage.getItem("bedroomSynced", (err,bool) => {
        
    //     // Here you're flipping the synced status, so the right light on is off or off is on    
    //     storage.setItem("bedroomSynced",!bool);

    //     //Now get what that collective lights were last set to and try again with the changed sync
    //     storage.getItem("bedroomLight", (err,state) => {
            
    //         global.event.emit("bedroomLight", state)

    //     })
    // })
});

// controls lights together 
global.event.on("allLights", cmd => {

    global.event.emit("bedroomLight",cmd);

    setTimeout(()=>{

        global.event.emit("bathroomLight",cmd);
        
    },500)
})
