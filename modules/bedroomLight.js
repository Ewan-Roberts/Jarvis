"use strict";

let five = require("johnny-five");

const computer = require('./computer.js')

const light = require('./lightAction.js');

let eventHandler = require('./eventHandler.js');

// Set up the johnny five modules, these are loaded when boardSetUp is called
let leftLightRelay = new five.Relay({
    
    pin: 9,
    type: "NC"

})

let rightLightRelay = new five.Relay({
    
    pin: 24,
    type: "NC"

})

rightLightRelay.open()
leftLightRelay.open()

let rightLight = new five.Servo({
    
    pin: 6,
    range: [0,70]

});

let leftLight = new five.Servo({
    
    pin: 8,
    range: [70,175]

});

let hallSwitchSynced = true;

//Pass the functionality to a global event handler 
eventHandler.on("bedroomLightOn", () => {
    
    light(true,leftLight,leftLightRelay);

    light(!hallSwitchSynced,rightLight,rightLightRelay);

    // computer.screenWake();

})

eventHandler.on("bedroomLightOff", () => {

    light(false,leftLight,leftLightRelay);

    light(hallSwitchSynced,rightLight,rightLightRelay);    
    
    // computer.screenSleep()

})

eventHandler.on("bedroomLightToggle", () => {
    
    console.log("toggle hit bro")
    
    if(rightLight.position === rightLight.range[1]){

        hallSwitchSynced = false;

        light(hallSwitchSynced,rightLight,rightLightRelay);   

    } else {

        hallSwitchSynced = true;

        light(hallSwitchSynced,rightLight,rightLightRelay);

    }

})

/*

let five = require("johnny-five");

console.log('loaded bedroom light module')

let leftLightRelay = new five.Relay({
    pin: 9,
    type: "NC"
})

let leftLight = new five.Servo({
    pin: 8,
    range: [80,180]
});

let rightLightRelay = new five.Relay({
    pin: 24,
    type: "NC"
})

let rightLight = new five.Servo({
    pin: 22,
    range: [20,100]
});

leftLight.on("move:complete", () => {

    setTimeout(() => {
        
        leftLightRelay.open()

    }, 1000);

});

rightLight.on("move:complete", () => {
    
    setTimeout(() => {
        
        rightLightRelay.open()

    }, 1000);
    
});

let light = (bool,light,relay) => {

    let currentState = checkSum(light.value,light.range[1])

    if(bool === !currentState) {

        relay.close();
    
        if(bool) {
            light.max();    
        }else{
            light.min();
        }

        setTimeout(() => {

            relay.open();

        }, 1000);

    } else {

        console.log("already in that state")

    }

}

module.exports = {

    action: bool => {
        
        leftLightRelay.open();
        rightLightRelay.open();
        
        let currentState = module.exports.isLightOn()

        if (bool && !currentState) {
            
            leftLightRelay.close()
            rightLightRelay.close()

            leftLight.max()
            rightLight.min()

            setTimeout(() => {

                rightLightRelay.open()
                leftLightRelay.open()

            }, 1000);

        } 

        if (!bool && currentState) {
            
            leftLightRelay.close();
            rightLightRelay.close();

            leftLight.min();
            rightLight.max();


            setTimeout(() => {

                rightLightRelay.open();
                leftLightRelay.open();

            }, 1000);
                    
        }

    },

    lightsToggle: () => {
        
        let currentState = module.exports.isLightOn()

        if(!currentState){
            
            leftLightRelay.close()
            rightLightRelay.close()
            
            setTimeout(() => {

                leftLight.max(100)
                rightLight.min(100) 

            },1000)

        } else {
            
            leftLightRelay.close()
            rightLightRelay.close()

            setTimeout(() => {

                leftLight.min(100)
                rightLight.max(100)  

            },1000)
            
        }
        
    }

}

eventHandler.on("bedroomLightOn", () => {

    light(true,bathroomLight,bathroomRelay)

})

eventHandler.on("bedroomLightOff", () => {

    light(false,bathroomLight,bathroomRelay)

})

eventHandler.on("bedroomLightToggle", () => {

    let currentState = checkSum(bathroomLight.value,bathroomLight.range[1])

    light(!currentState,bathroomLight,bathroomRelay)

})*/