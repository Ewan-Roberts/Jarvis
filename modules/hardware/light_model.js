"use strict";

const   storage = require('node-persist'),
        digest  = require('../digest');

console.log("Hardware loaded - model_light switch");

module.exports  = function (servo, relay) {
    
    this.relay  = relay;
    this.servo  = servo;
    this.state  = true;
    this.invert = ()=>{
        if(this.servo.value === this.servo.range[0]){
            this.servo.value = this.servo.range[1]
        } else {
            this.servo.value = this.servo.range[0]
        }

        this.servo.range.reverse()
    }

    this.servo.value    = storage.getItem((servo.pin).toString()).then(res=>{
        
        this.servo.value    = res
        this.state          = (res == this.servo.range[0])?false:true;
        
    });
    
    this.action = cmd =>{

        const bool = digest(cmd)

        //Already in the on state
        if(!bool && (this.servo.value === this.servo.range[0])) {return false}
        //Already in the off state
        if(bool && (this.servo.value === this.servo.range[1])) {return false}

        this.relay.close();

        bool?this.servo.max():this.servo.min()

        // Give the servo some time to move before shutting off the power
        setTimeout(() => {

            storage.setItem((this.servo.pin).toString(),this.servo.value); 

            this.relay.open()

            this.state = bool;

        }, 400); 
    };

    relay.open()
    
}

