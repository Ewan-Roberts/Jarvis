const five = require("johnny-five");

const board = new five.Board();

const computer = require('./computer.js')

let eventHandler = require('./eventHandler.js');

console.log('board setting up')
//TODO do i need this? Why am i exporting? 
module.exports = () => {

	board.on("ready", () => {

	    /// Johnny-five modules

	    const bedroomLight = require('./bedroomLight.js')

	    const bathroomLight = require('./bathroomLight.js')

	    const bedroomMotion = require('./bedroomMotion.js')

	    const hallwayMotion = require('./hallwayMotion.js')

	    eventHandler.on("lightsOff", () => {

	    	console.log('lights off')

	    	if(bedroomLight.isLightOn()){
	    	 	
	    	 	bedroomLight.action(false)

            	bathroomLight.action1(false)

            	computer.screenSleep()

	    	}

	    })

	   	eventHandler.on("lightsOn", () => {
	    	
	    	console.log('lights on')

	    	if(!bedroomLight.isLightOn()){
	    	 	
	    	 	bedroomLight.action(true)

            	bathroomLight.action1(true)

            	computer.screenWake();

	    	}

	    })

	    eventHandler.on("bedroomLightOn", () => {

	    	if(!bedroomLight.isLightOn()){
	    	 	
	    	 	bedroomLight.action(true)

	    	}

	    })

	    eventHandler.on("bedroomLightOff", () => {

	    	if(bedroomLight.isLightOn()){
	    	 	
	    	 	bedroomLight.action(false)

	    	}

	    })

	    eventHandler.on("bathroomLightOn", () => {

	    	if(!bathroomLight.isLightOn()){
	    	 	
	    	 	bathroomLight.action1(true)

	    	}

	    })

	    eventHandler.on("bathroomLightOff", () => {

	    	if(bathroomLight.isLightOn()){
	    	 	
	    	 	bathroomLight.action1(false)

	    	}

	    })
	    
	})

}

