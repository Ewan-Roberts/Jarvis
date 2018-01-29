"use strict";

const computer = require('./computer.js');


//I want to lights on

    // let bool = computer.digest(cmd)

    // if(typeof(bool) !== "boolean") {
    //     console.log('not a bool!')
    // }

    // if(light.value === null) {
        
    //     if(bool){
    //         light.value = light.range[0]    
    //     } else {
    //         light.value = light.range[1]
    //     }
        
    // }
    // // if (light.value !== (light.range[1] || light.range[0])){
    // //     console.log('hit on error')
    // //     console.log("light in neither on or off state it is : " + light.value)
    // //     return
    // // }

    // if((light.value === light.range[1]) && bool) {

    //     console.log('light already in this state')
    //     return
    // }


    // if((light.value === light.range[0]) && !bool) {

    //     console.log('light already in this state')
    //     return

    // }



// Take in a bool for on or off, any light class and relay
module.exports = (bool,light,relay) => {
    if(!bool && (light.value === light.range[0])) {
        console.log('already off')
        return
    }

    if(bool && (light.value === light.range[1])) {
        console.log('already on')
        return
    }

    relay.close();

    bool?light.max():light.min()
        
    setTimeout(() => {relay.open()}, 500);   

}








