"use strict";

const childProc = require('child_process');
const spotify = require('spotify-node-applescript');
const server = require('http');

module.exports = {

    fetchNewsdata: func => {

        // put in API key here: 

        let apiKey = ''

        const options = {

            host: 'api.nytimes.com',
            
            path: '/svc/mostpopular/v2/mostviewed/politics/1.json?&api-key=' + apiKey

        };

        let callback = response => {
            
            let str = '';

            response.on('data', chunk => {
                
                str += chunk;

            });

            response.on('end', () => {

                str = JSON.parse(str);

                func(str);

            });

        };

        server.request(options, callback).end();

    },

    fetchWeaterData : func => {

        // put in API key here:

        let apiKey = ''

        const options = {

            host: 'api.openweathermap.org',

            path: "/data/2.5/forecast/daily?q=london&APPID=" + apiKey
            
        }; 
     
        let callback = response => {
            
            let str = '';

            response.on('data', chunk => { 

                str += chunk;

            });

            response.on('end', () => {

                str = JSON.parse(str);

                func(str);

            });

        };

        server.request(options, callback).end();

    }

}
