"use strict";

let timer;

function Timer (callback, delay) {

    let timerId, start, remaining = delay;

    this.pause = () => {
        
        clearTimeout(timerId);
        
        remaining -= new Date() - start;
    
    };

    this.resume = () => {

        start = new Date();

        clearTimeout(timerId);

        timerId = setInterval(callback, remaining);

    };

    this.reset = () => {

        start = new Date();

        clearTimeout(timerId);

        remaining = 0;

    };

    this.resume();

}

let commands = {

    "timer for *mins": mins => { 

        let seconds = (mins * 60000)*60

        $(".countdown").slideDown()

        $(".countdown").text(seconds + " seconds")

        responsiveVoice.speak("Timer started for " + mins + " minutes", "UK English Male", {rate: 0.9});

        timer = new Timer(()=> {

            $(".countdown").text(seconds + " seconds")

            seconds -= 1;

            if(seconds===0){

                $(".countdown").fadeOut()

                responsiveVoice.speak("Timer finished", "UK English Male",{rate: 0.9});

                clearInterval(timer)

            }

        }, 1000);

    },

    "timer reset": () => { 

        $(".countdown").fadeOut()

        clearInterval(timer)

        responsiveVoice.speak("Timer reset", "UK English Male", {rate: 0.9});

        timer.reset()

    },

    "timer stop": () => { 

        $(".countdown").fadeOut()

        responsiveVoice.speak("Timer stopped", "UK English Male", {rate: 0.9});

        timer.pause()

    },

    "timer resume": () => { 

        $(".countdown").fadeIn()

        responsiveVoice.speak("Timer resummed", "UK English Male", {rate: 0.9});

        timer.resume()

    },
    
    "screen *action": action => {socket.emit("screen", action)},
    
    "reload": () => {window.location.reload()},

    "refresh": () => {window.location.reload()},

    "bedroom *action": action => {socket.emit("bedroomLight", action)},
    
    "cargo": () => {socket.emit("bedroomLightToggle")},
    
    "Argo": () => {socket.emit("bedroomLightToggle")},
    
    "Cargill": () => {socket.emit("bedroomLightToggle")},
    
    "toggle": () => {socket.emit("bedroomLightToggle")},

    "flip": () => {socket.emit("bedroomLightToggle")},

    "coral": () => {socket.emit("bedroomLightToggle")},

    "bathroom *action": action => {socket.emit("bathroomLight", action)},

    "lights *action": action => {socket.emit("allLights", action)},

    "what is the news" : () => {socket.emit("fetchNewsData")},

    "get the news" : () => {socket.emit("fetchNewsData")},

    "what is the weather": () => {socket.emit("fetchWeatherData")},

    "whats the weather": () => {socket.emit("fetchWeatherData")},

    "get the weather": () => {socket.emit("fetchWeatherData")},

    "where does isabella live": () => {responsiveVoice.speak("Nw1 6dn", "UK English Male",{rate: 0.9})},

    "spanish word": () => {socket.emit("spanish")},

    "what is the time" : () => {responsiveVoice.speak("Today is; " + moment().format("dddd") + ", and the time is. " + moment().format("HH:mm"), "UK English Male",{rate: 0.9});},

    "stop (stop)" : () => {
        socket.emit("musicControls", "pause");
        responsiveVoice.cancel();
    },

    "open *application" : application => {socket.emit("openApplication", application)},

    "*application search for *video" : (application,video) => {

        let res = {
            vessel: application,
            search: video
        }

        socket.emit("applicationSearch", res)
        
    },

    "play *user playlist" : user => {socket.emit("playUserPlaylist")},

    "play some (music)" : () => {socket.emit("playTrack", "2jplimH0b7Abf5LQSPx27A")},   

    "Wikipedia *term": term => {socket.emit("wikiQuery", term)},

    "override": () => {console.log('override done'); socket.emit("override",true)},

    "clear": () => { 

        $(".leftTab").fadeOut("slow") 
        $(".weatherTab").fadeOut("slow")

    },

    "volume up (up)": () => {socket.emit("musicControls", "up")},

    "volume down (down)": () => {socket.emit("musicControls", "down")},

    "morning": () => {socket.emit("morning")}, 

    "volume full (full)": () => {socket.emit("musicControls", "full")},

    "volume half (half)": () => {socket.emit("musicControls", "half")},

    "pause (pause)": () => {socket.emit("musicControls", "pause")},

    "cheese (cheese)": () => {socket.emit("musicControls", "pause")},    

    "horse (horse)": () => {socket.emit("musicControls", "pause")},

    "play (play)": () => {socket.emit("musicControls", "play")},

    "next (next)": () => {socket.emit("musicControls", "next")},   

    "back": () => {

        socket.emit("musicControls", "back")
        socket.emit("musicControls", "back")

    },

    "bat": () => {

        socket.emit("musicControls", "back")
        socket.emit("musicControls", "back")

    },

    "thanks Jarvis": () => {responsiveVoice.speak("you are very welcome", "UK English Male", {rate: 0.9})},

    "hi Jarvis": () => {responsiveVoice.speak("Hi there how are you today?", "UK English Male", {rate: 0.9})}
};


    // "search for song *name": name => {

    //     //TODO : all calls should be on the BE

    //     $.ajax({

    //         url: "https://api.spotify.com/v1/search",

    //         data: {
    //             q: name,
    //             type: "track"
    //         },

    //         success: response => {

    //             socket.emit("playTrack", response.tracks.items[0].id) 

    //         }

    //     });

    // },

        // "search for artist *name": name => {
 
    //     $(".artist").remove()

    //     getArtistMatches(name)

    //     annyang.addCommands({

    //         "*index": index => {
                    
    //             if(index == (1||"one"||"1"||"first")) {

    //                 getArtistTopTracks($(".overlay")[0].id)

    //             }

    //             else if (index == (2||"two"||"2"||"second")) {

    //                 getArtistTopTracks($(".overlay")[1].id)
                    
    //             }

    //             else if (index == (3||"three"||"3"||"third")) {

    //                 getArtistTopTracks($(".overlay")[2].id)
                    
    //             }

    //         }
    //     })

    // },  