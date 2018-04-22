"use strict";

//External libraries
const   childProc       = require("child_process"),
        spotify         = require("spotify-node-applescript"),
        storage         = require("node-persist"),
    
    //Internal libraries
        app             = require("./modules/speechServer"),
        boardSetUp      = require("./modules/boardSetUp"),
        digest          = require("./modules/digest"),
        morning         = require("./modules/morning"),
        fetchNewsData   = require("./modules/fetchNewsData"),
        fetchWeatherData = require("./modules/fetchWeatherData"),
        welcomeHome     = require("./modules/welcomeHome"),
        event           = require("./modules/event"),
        timer           = require("./modules/timer"),
        piServer        = require("./modules/piServer"),
        spanish         = require("./modules/spanish"),
        io              = require("socket.io").listen(server),
        musicControls   = require("./modules/musicControls"),
        wikiQuery       = require("./modules/wikiQuery"),
        browserControls = require("./modules/browserControls"),
        user            = require("./modules/userInformation");

//Establish link with the front end and handle socket events
io.on("connection", socket => { 
        
    storage.init()

    //Binds events to sockets: Sockets must be named after their event in order to stay tidy
    event.eventNames().forEach(name => {socket.on(name, res => {event.emit(name,res)})})

    socket.on("bedroomLight", res=>{
        console.log(res)
        event.emit("bedroomLight",res)
    })

    socket.on("bathroomLight", res=>{
        console.log(res)
        event.emit("bathroomLight",res)
    })

    //Binds sockets to events: Events must be named after their socket in order to stay tidy
    const socketList = ["speechFromBackEnd","wikiResult","news","speechFromBackEndSpanish","weather","spotifyTrackInfo","trackTimeInfo"]

    socketList.forEach(name => {event.on(name, res => {socket.emit(name,res)})})

});

event.once("checkStatus", () => {
    
    let sessionData = io.nsps["/"].connected;

    if (Object.keys(sessionData).length === 0) {
    
        event.emit("openApplication", "Jarvis") 
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
