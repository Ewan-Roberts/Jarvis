"use strict";

//External libraries
const childProc = require('child_process'),
    spotify = require('spotify-node-applescript'),
    //Internal libraries
    app = require('./modules/speechServer.js'),
    boardSetUp = require('./modules/boardSetUp.js'),
    computer = require('./modules/computer.js'),
    morning = require('./modules/morning.js'),
    fetchNewsData = require('./modules/fetchNewsData.js'),
    fetchWeatherData = require('./modules/fetchWeatherData.js'),
    welcomeHome = require('./modules/welcomeHome.js'),
    event = require('./modules/event'),
    timer = require('./modules/timer.js'),
    applicationSearch = require('./modules/applicationSearch.js'),
    piServer = require('./modules/piServer.js'),
    spanish = require('./modules/spanish.js'),
    io = require('socket.io').listen(server),
    musicControls = require('./modules/musicControls.js'),
    wikiQuery = require('./modules/wikiQuery.js'),
    setVolume = require('./modules/setVolume.js'),
    browserControls = require('./modules/browserControls.js'),
    userInformation = require('./modules/userInformation.js')

//Establish link with the front end and handle socket events
io.on('connection', socket => { 
    console.log("hi")
    // event.emit('morning')

    socket.on('error', err => {new Error(err)}); 

    socket.on('musicControls', res => {event.emit("musicControls",res)});

    socket.on('wikiQuery', res => {event.emit("wikiQuery",res)});

    socket.on('setVolume', volume => {setVolume(volume)}); 

    socket.on('browserControls', res => {event.emit("browserControls",res)});

    socket.on('setSpotifyVolume', int => {spotify.setVolume(int)});

    socket.on('bedroom', cmd => {event.emit('bedroomLight',cmd)});

    socket.on('bedroomToggle', () => {event.emit('bedroomLightToggle')});

    socket.on('lights', cmd => {event.emit('bedroomLight',cmd);event.emit('bathroomLight',cmd)});

    socket.on('bathroom', cmd => {event.emit('bathroomLight',cmd)});

    socket.on('screen', action => {computer.digest(action) ? computer.screenWake():computer.screenSleep()});

    socket.on('playUserPlaylist', res => {spotify.playTrackInContext('spotify:track:4H1QorBfrOrShDyHZAxQoM', userInformation.spotifyUser+userInformation.spotifyPlaylist)});

    socket.on('playTrack', res => {spotify.playTrack('spotify:track:' + res)});

    socket.on('applicationSearch', res => {event.emit("applicationSearch", res)});

    socket.on('spanish', () => {event.emit('spanish')});

    socket.on('override', () => {event.emit('override')});

    socket.on('news', () => {fetchNewsData(data => {event.emit('news', data)})});

    socket.on('weather', () => {fetchWeatherData(data => {event.emit('weather', data)})});

    socket.on('corridorMotion', () => {event.emit('corridorMotion')});

    socket.on("weatherCompleteMorning", () => {

        fetchNewsData(data => {

            data.morning = true;
            event.emit('news', data)

        });

    });

    socket.on("newsCompleteMorning", () => {

        event.emit('musicControls','play');

        setTimeout(() => {
            
            event.emit('musicControls','pause');
            event.emit("spanish", socket);
            
        }, 60000);

    });

    event.on("speechFromBackEnd", text => {socket.emit("speechFromBackEnd", text)});

    event.on('wikiResult', context => {socket.emit('wikiResult', context)});

    event.on("weather", data => {socket.emit("weather", data)});

    event.on("news", data => {socket.emit("news", data)});

    event.on("speechFromBackEndSpanish", text => {socket.emit("speechFromBackEndSpanish", text)});

    event.on("updateSpotifyStates", () => {

        spotify.getState((err, state) => {
         
            socket.emit("trackTimeInfo", state);

        }); 

        spotify.getTrack((err, track) => {

            socket.emit('spotifyTrackInfo', track);      

        });

    });

});

event.on('checkStatus', () => {
    
    let sessionData = io.nsps["/"].connected;

    if (Object.keys(sessionData).length===0) {
            
        childProc.exec('open -a "Google Chrome" --new --args https://localhost:3003 --ignore-certificate-errors')  ;  
    
    } else {

        console.log('Session already exists');

    }

});

setTimeout(() => {

    event.emit('checkStatus')

}, 6000);