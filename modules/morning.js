"use strict";

const spotify = require('spotify-node-applescript'),
    fetchWeatherData = require('./fetchWeatherData.js'),
    event = require('./event.js');

event.on("morning", () => {

    event.emit('checkStatus');

    event.emit('musicControls','half');

    spotify.playTrack('spotify:track:0eHymWFSXpFrD2FqFfvlZw');

    setTimeout(() => {
        
        event.emit('bedroomLight',true);
        event.emit('bathroomLight',true);
        event.emit('corridorLight',true);

        spotify.getState((err, obj) => {
            
            //If the user has paused the music, stop the process
            if(obj.state === "playing") {
                
                fetchWeatherData(data => {
                       
                    data.morning = true;
        
                    event.emit('weather', data);

                });

                event.emit('musicControls','pause');
            
            }

        });

    }, 19000);

})