"use strict";

//External libraries
const childProc = require('child_process');
const spotify = require('spotify-node-applescript');

//internal libraries
const app = require('./modules/speechServer.js');
let boardSetUp = require('./modules/boardSetUp.js')
const computer = require('./modules/computer.js');
const morning = require('./modules/morning.js');
const api = require('./modules/api.js');
const eventHandler = require('./modules/eventHandler');
const timer = require('./modules/timer.js');
const piServer = require('./modules/piServer.js');
const spanish = require('./modules/spanish.js');
const io = require('socket.io').listen(server);
const musicControls = require('./modules/musicControls.js');
const wikiQuery = require('./modules/wikiQuery.js');
const setVolume = require('./modules/setVolume.js');
const browserControls = require('./modules/browserControls.js');

io.on('connection', socket => { 

    timer(socket)

    socket.on('error', err => {console.log(err)});

    socket.on('musicControls', res => {musicControls(res)})

    socket.on('wikiQuery', res => {wikiQuery(res,socket)}) 

    socket.on('setVolume', volume => {setVolume(volume)});
    
    socket.on('spanish', () => {
        console.log('hit spanish'); 
        eventHandler.emit('spanish', socket)
    });

    socket.on('browserControls', res => {browserControls(res)})

    socket.on('setSpotifyVolume', int => {spotify.setVolume(int)})

    socket.on('screen', action => {

        if (computer.digest(action)) {

            computer.screenWake()

        } else {

            computer.screenSleep()

        }
        
    });

    socket.on('bedroom', cmd => {

        if(computer.digest(cmd)) {
        
            eventHandler.emit('bedroomLightOn');

        } else {

            eventHandler.emit('bedroomLightOff');

        }

    });

    socket.on('lights', cmd => {

        if(computer.digest(cmd)) {

            eventHandler.emit('bedroomLightOn')
        
            eventHandler.emit('bathroomLightOn')

        } else {

            eventHandler.emit('bedroomLightOff')
        
            eventHandler.emit('bathroomLightOff')
        }
        

    });

    socket.on('bathroom', cmd => {

        if(computer.digest(cmd)) {

            eventHandler.emit('bathroomLightOn')

        } else {

            eventHandler.emit('bathroomLightOff')

        }

    });

    socket.on('bedroomToggle', () => {

        eventHandler.emit('bedroomLightToggle')

    });

    socket.on('news', res => {

        api.fetchNewsdata(data => {

            socket.emit('news', data)

        });

    });

    socket.on('weather', () => {
        
        api.fetchWeaterData(data => {
            
            data.morning = false;

            socket.emit('weather', data)
            
        });

    });

    socket.on('applicationSearch', res => {

        switch(res.vessel) {

            case 'Facebook':

                childProc.exec('open -a "Google Chrome" --new --args -ingognito https://www.facebook.com/search/top/?q=' + res.search);

            break;

            case 'YouTube':

                childProc.exec('open -a "Google Chrome" --new --args -ingognito https://www.youtube.com/results?search_query=' + res.search);

            break;
        }

    })

    socket.on('playUserPlaylist', res => {

        spotify.setVolume(80);

        spotify.playTrackInContext('spotify:track:4H1QorBfrOrShDyHZAxQoM', 'spotify:user:1130242707:playlist:6Gj9EYigkSxPRFox6rLSC8');

    })

    socket.on('playTrack', res => {

        spotify.playTrack('spotify:track:' + res, () => {
            
            spotify.getTrack((err, track) => {
                
                if(error) throw 'error in playing track ' + error;

                socket.emit('trackInfo', track)

            });

        });

    })

});

eventHandler.on('checkStatus', callback => {
    
    let sessionData = io.nsps["/"].connected;
    
    let bool = Object.keys(sessionData).length>0

    callback(bool);

})

setTimeout(() => {

    eventHandler.emit('checkStatus', bool => {

        if(!bool){
            
            childProc.exec('open -a "Google Chrome" --new --args https://localhost:3002 --ignore-certificate-errors')    
        
        } else {

            console.log('Session already exists')

        }
        
    })

}, 2000);