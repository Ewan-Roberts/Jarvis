"use strict";

const request = require('request'),
	userInformation = require('./userInformation')

// Pulls from userInformation file
const weatherKey = userInformation.weatherKey;

module.exports = callback => {
	//For demo purposes
	if(!weatherKey) {

	   request('http://samples.openweathermap.org/data/2.5/forecast/daily?id=524901&appid=b1b15e88fa797225412429c1c50c122a1', (error, response,body) => {

	        if (error) throw 'Error with the weather API' + error;

	        callback(JSON.parse(body));

	    });

	} else {

    	request('http://api.openweathermap.org/data/2.5/forecast/daily?q=london&APPID='+userInformation.weatherKey, (error, response,body) => {

	        if (error) throw 'Error with the weather API' + error;

	        callback(JSON.parse(body));

	    });

	}

};