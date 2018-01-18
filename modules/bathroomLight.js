"use strict";

let five = require("johnny-five");

let eventHandler = require('./eventHandler.js');

const light = require('./lightAction');

// Set up the johnny five modules, these are loaded when boardSetUp is called
let bathroomRelay = new five.Relay({
    
    pin: 10,
    type: "NC"

})

let bathroomLight = new five.Servo({
    
    pin: 11,
    range: [35,175]

});

bathroomRelay.open()

//Pass the functionality to a global event handler 

eventHandler.on("bathroomLightOn", () => {
    console.log('hir for on')
    light(false,bathroomLight,bathroomRelay)

})

eventHandler.on("bathroomLightOff", () => {
    console.log('hir for off')
    light(true,bathroomLight,bathroomRelay)

})

eventHandler.on("bathroomLightToggle", () => {

    let currentState = checkSum(bathroomLight.value,bathroomLight.range[1])

    light(!currentState,bathroomLight,bathroomRelay)

})

/*
"use strict";

let five = require("johnny-five");

let eventHandler = require('./eventHandler.js');

let bathroomRelay = new five.Relay({
    pin: 10,
    type: "NC"
})

let bathroomLight = new five.Servo({
    pin: 11,
    range: [35,175]
});

bathroomLight.on("move:complete", () => {
    
    setTimeout(() => {
        
        bathroomRelay.open()

    },400)

})

const checkSum = (value1,value2) => {

    return value1 === value2

}

let lightAction = ()=>

module.exports = {

        
    action1: bool => {

        let currentState = module.exports.isLightOn1()

        if (!bool && !currentState) {

            bathroomRelay.close();
                
            bathroomLight.max();

            setTimeout(() => {

                bathroomRelay.open();

            }, 1000);
            

        } 

        if(bool && currentState){

            bathroomRelay.close();
            
            bathroomLight.min();

            setTimeout(() => {

                bathroomRelay.open();

            }, 1000);

        }

    },

    lightsToggle1: () => {

        let currentState = checkSum(bathroomLight.value,bathroomLight.range[1])

        if (!currentState) {

            bathroomRelay.close()
                
            bathroomLight.max()

            setTimeout(() => {

                bathroomRelay.open()

            }, 1000);
            

        } else {
            
            bathroomRelay.close()
                
            bathroomLight.min()

            setTimeout(() => {

                bathroomRelay.open()

            }, 1000);
        }
        
    }

}

eventHandler.on("bathroomLightOn", () => {

    let currentState = checkSum(bathroomLight.value,bathroomLight.range[1])

    if (!bool && !currentState) {

        bathroomRelay.close();
            
        bathroomLight.max();

        setTimeout(() => {

            bathroomRelay.open();

        }, 1000);
        

    } 

    if (bool && currentState){

        bathroomRelay.close();
        
        bathroomLight.min();

        setTimeout(() => {

            bathroomRelay.open();

        }, 1000);

    }

})

eventHandler.on("bathroomLightOff", () => {

    if(bathroomLight.isLightOn()){
        
        bathroomLight.action1(false)

    }

})*/