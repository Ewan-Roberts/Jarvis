"use strict";

const 	request = require("request"),
		user 	= require("./userInformation"),
		moment 	= require("moment"),
		event 	= require("./event");

// Pulls from userInformation file
event.on("fetchWeatherData", () => {
	
	console.log('weather')
	//If user hasn"t set user info they can still play with this function
	if(user.weatherKey) {

	   	request("http://api.openweathermap.org/data/2.5/forecast/daily?q=london&524901&appid="+user.weatherKey, (error, response,body) => {

	        if (error) {event.emit("error", new Error("fetchweatherData: " + error))}

	        const obj = JSON.parse(body);

			event.emit("weather", obj)
	    });

	} else {
		event.emit("error", new Error("fetchWeatherData: You have not set an API key for the weather API, go to http://api.openweathermap.org, get on and add it to the userInformation file please, the service being used now is a mock service!"))
	}
});

