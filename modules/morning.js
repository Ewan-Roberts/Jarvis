"use strict";

const spotify = require('spotify-node-applescript');
const childProc = require('child_process');
const api = require('./api.js');
let eventHandler = require('./eventHandler.js');


eventHandler.on("morning", socket => {

    spotify.setVolume(60);

    childProc.exec('osascript -e "set Volume 6"');

    spotify.playTrack('spotify:track:0eHymWFSXpFrD2FqFfvlZw')

    setTimeout(() => {
        
        eventHandler.emit("lightsOn")
        
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
      
        eventHandler.emit("lightsOn");
        
    }, 60000);

    setTimeout(() => {
        
        spotify.pause();

        api.fetchNewsdata(data => {

            socket.emit('news', data)

        });
        
    }, 70000);

    setTimeout(() => {

        socket.emit("spanish");
        
    }, 100000);

    setTimeout(() => {

        spotify.play();
        
    }, 180000);

    setTimeout(() => {

        spotify.pause();
        
    }, 280000);

})