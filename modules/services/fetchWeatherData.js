"use strict";

const 	request = require("request"),
		user 	= require("../userInformation");

// Pulls from userInformation file
global.event.on("fetchWeatherData", () => {
	
	//If user hasn"t set user info they can still play with this function
	if(user.weather_key) {

	   	request("http://api.openweathermap.org/data/2.5/forecast/daily?q=london&524901&appid="+user.weather_key, (error, response,body) => {

	        if (error) {global.event.emit("error", new Error("fetchweatherData: " + error))}

	        const obj = JSON.parse(body);

			global.event.emit("weather", obj)
	    });

	} else {
		global.event.emit("error", new Error("fetchWeatherData: You have not set an API key for the weather API, go to http://api.openweathermap.org, get on and add it to the userInformation file please, the service being used now is a mock service!"))
	}
});

