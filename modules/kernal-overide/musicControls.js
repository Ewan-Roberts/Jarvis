"use strict";

const   spotify     = require("spotify-node-applescript"),
        childProc   = require("child_process"),
        event       = require("../event"),
        user        = require("../userInformation");

event.on("musicControls", res => {

    switch(res) {
                
        case "next":spotify.next();
            break;

        case "back":spotify.previous();
            break;

        case "play":spotify.play();
            break;

        case "pause":spotify.pause();
            break;

        case "up":

            childProc.exec("osascript -e 'set Volume 6'");
            
            spotify.getState(obj => {
                if (obj === null){return}
                const volume = obj.state;

                if(volume <= 80) {spotify.volumeUp()}

            })
            
            break;

        case "down":

            childProc.exec("osascript -e 'set Volume 6'");
            
            spotify.getState(obj => {
                if (obj === null) {return}
                const volume = obj.state;
                
                if(volume >= 20) {spotify.volumeDown()}

            })

            break;

        case "full":

            childProc.exec("osascript -e 'set Volume 10'");

            spotify.setVolume(100);

            break;

        case "half":

            childProc.exec("osascript -e 'set Volume 3'");

            spotify.setVolume(50);

            break;

        case "low":

            childProc.exec("osascript -e 'set Volume 2'");

            spotify.setVolume(40);

            break;

        case "high":

            childProc.exec("osascript -e 'set Volume 6'");

            spotify.setVolume(60);

            break;
    }
})

event.on("playTrack", uri => {

    if(typeof uri !== 'undefined') {

        spotify.playTrack("spotify:track:" + uri)
    
    } else {

        spotify.playTrack("spotify:track:" + user.track)
    }
})

event.on("playUserPlaylist", () => {spotify.playTrackInContext(user.track, user.spotifyUser+user.spotifyPlaylist)})

