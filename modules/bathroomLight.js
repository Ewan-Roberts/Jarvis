
let five = require("johnny-five");

console.log('loaded bathroom light module')

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

module.exports = {

    isLightOn1: () => {
        // console.log(bathroomLight)
        // console.log(bathroomLight.range)
        return bathroomLight.value === bathroomLight.range[1];
    },
        
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

        let currentState = module.exports.isLightOn1()

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