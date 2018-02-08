"use strict";

const request = require("request"),
	user = require("./userInformation"),
	moment = require("moment"),
	event = require("./event.js");

// Pulls from userInformation file
event.on("fetchWeatherData", () => {
	console.log("weather data called")
	//If user hasn"t set user info they can still play with this function
	if(!user.weatherKey) {

		event.emit("error", new Error("fetchWeatherData: You have not set an API key for the weather API, go to http://api.openweathermap.org, get on and add it to the userInformation file please, the service being used now is a mock service!"))

	   	request("http://samples.openweathermap.org/data/2.5/forecast/daily?id=524901&appid=b1b15e88fa797225412429c1c50c122a1", (error, response,body) => {

	        if (error) {event.emit("error", new Error("fetchweatherData: " + error))}

	        let obj = JSON.parse(body);

	       	if(moment().isBefore(moment(user.daytime[0], "HH:mm"))){
	    		obj.morning = true;	
	    	}
	    	
			event.emit("weather", obj)

	    });

	} else {

    	request("http://api.openweathermap.org/data/2.5/forecast/daily?q=london&APPID="+user.weatherKey, (error, response,body) => {

	        if (error) throw "Error with the weather API" + error;

	        let obj = JSON.parse(body);

	       	if(moment().isBefore(moment(user.daytime[0], "HH:mm"))){
	    		obj.morning = true;
	    	}
	    	console.log(obj)
	        event.emit("weather", obj)

	    });

	}

});

event.on("weatherCompleteMorning", () => {event.emit("fetchNewsData")})

