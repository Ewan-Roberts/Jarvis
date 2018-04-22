"use strict";

const childProc = require("child_process"),
    event = require("./event"),
    spotify = require("spotify-node-applescript"),
    digest = require("./digest"),
    user = require("./userInformation");

event.on("openApplication", res => {

    switch (res) {

        case "Spotify": childProc.exec("open /applications/Spotify.app");
        break;

        case "Jarvis": childProc.exec("open -a 'Google Chrome' --new --args https://localhost:" + user.port + " --ignore-certificate-errors");
        break;

        case "Facebook": childProc.exec("open -a 'Google Chrome' --new --args --ingognito https://www.facebook.com/");
        break;

        //ssh pssh pi@192.168.1.103 "~/n/bin/node Desktop/hallwayPi/piServer"
        case "Raspberry": childProc.exec("ssh pi@192.168.1.103 'cd Desktop/hallway; killall node;~/n/bin/node piServer'");
        break;

        case "YouTube": childProc.exec("open -a 'Google Chrome' --new --args --ingognito https://www.youtube.com/");
        break;

        default: event.emit("error", new Error("browserControl: An unsupported website was passed in"));
    }
})

event.on("applicationSearch", res => {

    if(res.vessel === "Facebook") {childProc.exec("open -a 'Google Chrome' --new --args https://www.facebook.com/search/top/?q=" + res.search)}

    if(res.vessel === "YouTube") {childProc.exec("open -a 'Google Chrome' --new --args -ingognito https://www.youtube.com/results?search_query=" + res.search)}

})

event.on("screen", cmd => {

    const bool = digest(cmd)

    bool?childProc.exec("caffeinate -u"):childProc.exec("pmset displaysleepnow")

});

event.on("updateSpotifyStates", () => {

    // spotify.getState(state => {event.emit("trackTimeInfo", state)});

    // spotify.getTrack(track => {event.emit("spotifyTrackInfo", track)});

});


