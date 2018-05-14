"use strict";



//External libraries
const   childProc       = require("child_process"),
        storage         = require("node-persist"),
        event           = require("./modules/event"),
        
        //Service calls
        fetchNewsData   = require("./modules/services/fetchNewsData"),
        fetchWeatherData = require("./modules/services/fetchWeatherData"),
        wikiQuery       = require("./modules/services/wikiQuery"),
        spanishQuizz    = require("./modules/services/spanishQuizz"),
        spanish         = require("./modules/services/spanish"),
        
        //Internal libraries
        app             = require("./modules/speechServer"),
        boardSetUp      = require("./modules/hardware/boardSetUp"),
        morning         = require("./modules/morning"),
        welcomeHome     = require("./modules/welcomeHome"),
        timer           = require("./modules/timer"),
        piServer        = require("./modules/piServer"),
        io              = require("socket.io").listen(server),

        //Over-ride kernal level functions
        musicControls   = require("./modules/kernal-overide/musicControls"),
        browserControls = require("./modules/kernal-overide/browserControls");


//Establish link with the front end and handle socket events
io.on("connection", socket => { 
        
    storage.init()

    // console.log(global.event)

    //Binds events to sockets: Sockets must be named after their event in order to stay tidy
    global.event.eventNames().forEach(name => {socket.on(name, res => {global.event.emit(name,res)})})

    //Binds sockets to events: Events must be named after their socket in order to stay tidy
    const socket_list = ["speechFromBackEnd","wikiResult","news","speechFromBackEndSpanish","weather","spotifyTrackInfo","trackTimeInfo"]

    socket_list.forEach(name => {global.event.on(name, res => {socket.emit(name,res)})})

});

global.event.emit("checkStatus", () => {
    
    let session_data = io.nsps["/"].connected;

    if (Object.keys(session_data).length === 0) {
    
        global.event.emit("openApplication", "Jarvis") 
    }
});


