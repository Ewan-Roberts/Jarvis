const spotify = require('spotify-node-applescript');

module.exports = volume => {

    if(volume <= 2) {

            childProc.exec('osascript -e "set Volume 2"');

        }

        if(volume > 2 <= 6) {

            childProc.exec('osascript -e "set Volume 6"');

        }

        if(volume > 6) {

            childProc.exec('osascript -e "set Volume 10"');

        } 
    
}