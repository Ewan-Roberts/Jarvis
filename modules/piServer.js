const clientio  = require('socket.io-client');

const client    = clientio.connect('http://192.168.1.108:3013');

client.on("circleButton", () => { //button 1
        
    console.log("Circle Button pressed")

    bedroomLight.lightsToggle()

}) 

client.on("squareButton", () => { 
       
    console.log("Square Button pressed")

    bathroomLight.lightsToggle1()

})