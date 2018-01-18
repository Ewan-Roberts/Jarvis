"use strict";

const spotify = require('spotify-node-applescript');

const childProc = require('child_process');

const api = require('./api.js');

let eventHandler = require('./eventHandler.js');

eventHandler.on("morning", socket => {

    spotify.setVolume(60);

    eventHandler.emit('checkStatus', bool => {

        if(!bool){
            
            childProc.exec('open -a "Google Chrome" --new --args https://localhost:3002 --ignore-certificate-errors')    
        
        } else {

            console.log('Session already exists')

        }
        
    })

    childProc.exec('osascript -e "set Volume 4"');

    spotify.playTrack('spotify:track:0eHymWFSXpFrD2FqFfvlZw')

    setTimeout(() => {
        
        eventHandler.emit('bedroomLightOn')
        
        eventHandler.emit('bathroomLightOn')
        
        api.fetchWeaterData(data => {
            
            data.morning = true
            
            socket.emit('weather', data)

        });

        spotify.pause();

    }, 40000);

    setTimeout(() => {

        spotify.play();
        
        spotify.setVolume(70);   

    }, 50000);

    setTimeout(() => {
        
        spotify.pause();

        api.fetchNewsdata(data => {

            socket.emit('news', data)

        });
        
    }, 70000);

    setTimeout(() => {
        
        spotify.pause();

        eventHandler.emit("spanish", socket);
        
    }, 120000);

    setTimeout(() => {

        spotify.play();
        
    }, 180000);

    setTimeout(() => {

        spotify.pause();
        
    }, 280000);

})