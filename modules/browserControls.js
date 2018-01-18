"use strict";

const childProc = require('child_process');

module.exports = res => {

    switch (res) {

        case 'Spotify':

            childProc.exec('open /applications/Spotify.app');

        break;

        case 'Jarvis':

            childProc.exec('open -a "Google Chrome" --new --args https://localhost:3001/microphone');

        break;

        case 'Facebook':

            childProc.exec('open -a "Google Chrome" --new --args --ingognito https://www.facebook.com/');

        break;

        case 'YouTube':

            childProc.exec('open -a "Google Chrome" --new --args --ingognito https://www.youtube.com/');

        break;

    }
    
}