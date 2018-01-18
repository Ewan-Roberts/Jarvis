"use strict";

const childProc = require('child_process');

const spotify = require('spotify-node-applescript');

const request = require('request');

// put in news API Key here: 
let newsKey = '';

// put in weather API Key here:
let weatherKey = '';

module.exports = {

    fetchNewsdata: callback => {

        request('http://api.nytimes.com/svc/mostpopular/v2/mostviewed/politics/1.json?&api-key='+newsKey, (error, response,body) => {

            if (error) throw 'Error with the news API' + error;

            callback(JSON.parse(body));

        });

    },

    fetchWeaterData: callback => {

        request('http://api.openweathermap.org/data/2.5/forecast/daily?q=london&APPID='+weatherKey, (error, response,body) => {

            if (error) throw 'Error with the weather API' + error;

            callback(JSON.parse(body));

        });

    }

};