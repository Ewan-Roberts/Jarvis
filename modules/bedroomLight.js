
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

module.exports = {

    isLightOn: () => {

        return leftLight.value === leftLight.range[1]
    },

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