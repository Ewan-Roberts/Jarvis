"use strict";

const spotify = require('spotify-node-applescript'),
    childProc = require('child_process'),
    event = require('./event.js');

event.on("musicControls", res => {

    switch(res) {
                
        case 'next':
            spotify.next();
            break;

        case 'play':
            spotify.play();
            break;

        case 'pause':
            spotify.pause();
            break;

        case 'back':
            spotify.previous();
            break;

        case 'up':

            childProc.exec('osascript -e "set Volume 6"');
            
            spotify.getState((err, obj) => {

                let state = obj.state;

                if(state <= 80) {
                    
                    spotify.volumeUp();

                }

            })
            
            break;

        case 'down':

            childProc.exec('osascript -e "set Volume 6"');
            
            spotify.getState((err, obj) => {

                let state = obj.state;

                if(state => 20) {
                    
                    spotify.volumeDown();

                }

            })

            break;

        case 'full':
            childProc.exec('osascript -e "set Volume 10"');
            spotify.setVolume(100);
            break;

        case 'half':
            childProc.exec('osascript -e "set Volume 6"');
            spotify.setVolume(50);
            break;

    }
    
})

