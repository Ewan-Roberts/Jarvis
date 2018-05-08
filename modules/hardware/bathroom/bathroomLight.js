"use strict";

const   storage         = require('node-persist'),
        five            = require("johnny-five"),
        light_model     = require("../light_model");

let bathroom_light = new light_model (

    new five.Servo({pin: 11,range: [10,100]}),
    new five.Relay({pin: 10,type: "NC"})

)

console.log("Hardware loaded - bathroom_servo");

//Pass the functionality for the lights to the global event handler 
global.event.on("bathroomLight", cmd => {
    
    console.log(cmd + " bathroom light")

    bathroom_light.action(cmd)

    // storage.setItem("bathroomLight",bool);

});

global.event.on("bathroomLightFlip", () => {

    console.log("bathboom hit flip state " + state)

    storage.getItem("bathroomLight").then(res=>{

        console.log("bathboomLight res: " + res)

        bathroom_light.action(!this.state)

        storage.setItem("bathroomLight",!this.state);

    })

});


// function light_switch (servo, relay) {
    
//     this.relay  = relay;
//     relay.open()
//     this.servo  = servo;
//     this.servo.value = storage.getItem((servo.pin).toString()).then(res=>{this.servo.value=res});
//     this.state  = true;
//     this.action = cmd =>{

//         const bool = digest(cmd)

//         //Already in the on state
//         if(!bool && (this.servo.value === this.servo.range[0])) {return false}

//         //Already in the off state
//         if(bool && (this.servo.value === this.servo.range[1])) {return false}

//         this.relay.close();

//         bool?this.servo.max():this.servo.min()

//         // Give the servo some time to move before shutting off the power
//         setTimeout(() => {

//             storage.setItem((this.servo.pin).toString(),this.servo.value); 

//             this.relay.open()

//         }, 400); 
//     };
    
//     console.log("The light is centered and good to go!");
// }

