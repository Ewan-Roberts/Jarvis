"use strict";

//External libraries
const childProc = require("child_process"),
    spotify = require("spotify-node-applescript"),
    storage = require("node-persist"),
    
    //Public Libraries
    app = require("./modules/speechServer.js"),
    boardSetUp = require("./modules/boardSetUp.js"),
    digest = require("./modules/digest.js"),
    morning = require("./modules/morning.js"),
    fetchNewsData = require("./modules/fetchNewsData.js"),
    fetchWeatherData = require("./modules/fetchWeatherData.js"),
    welcomeHome = require("./modules/welcomeHome.js"),
    event = require("./modules/event"),
    timer = require("./modules/timer.js"),
    piServer = require("./modules/piServer.js"),
    spanish = require("./modules/spanish.js"),
    io = require("socket.io").listen(server),
    musicControls = require("./modules/musicControls.js"),
    wikiQuery = require("./modules/wikiQuery.js"),
    browserControls = require("./modules/browserControls.js"),
    bedroomLight = require("./modules/bedroomLight.js"),
    bathroomLight = require("./modules/bathroomLight.js");



//Establish link with the front end and handle socket events
io.on("connection", socket => { 
    
    storage.init()

    // Fires  errors
    event.on("error", (msg) => {console.error("Error on emitter ", msg)})

    //Binds events to sockets: Sockets must be named after their event in order to stay tidy
    event.eventNames().forEach(name => {console.log(name);socket.on(name, res => {event.emit(name,res)})})

    //Binds sockets to events: Events must be named after their socket in order to stay tidy
    const socketList = ["speechFromBackEnd","wikiResult","news","speechFromBackEndSpanish","weather","spotifyTrackInfo","trackTimeInfo"]

    socketList.forEach(name => {event.on(name, res => {socket.emit(name,res)})})

});

event.once("checkStatus", () => {
    
    let sessionData = io.nsps["/"].connected;

    if (Object.keys(sessionData).length === 0) {
    
        event.once("openApplication", "Jarvis") 

    } else {

        console.log("Session already exists");

    }

});

    // //Initiate local storage
    // storage.init()

    // const eventList = event.eventNames()

    // //Binds events to sockets: Sockets must be named after their event in order to stay tidy
    // eventList.forEach(name => {

    //     console.log(name)
        
    //     socket.on(name, res => {event.emit(name,res)})

    // })

    // //Binds sockets to events: Events must be named after their socket in order to stay tidy
    // const socketList = ["speechFromBackEnd","wikiResult","news","speechFromBackEndSpanish","weather","spotifyTrackInfo","trackTimeInfo"]

    // socketList.forEach(name => {event.on(name, res => {socket.emit(name,res)})})
