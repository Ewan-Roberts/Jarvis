const spotify = require('spotify-node-applescript');

const childProc = require('child_process');

module.exports = res => {

    switch(res) {
                
        case 'next':
            spotify.next()
            break;

        case 'play':
            spotify.play()
            break;

        case 'pause':
            spotify.pause()
            break;

        case 'back':
            spotify.previous()
            break;

        case 'up':
            childProc.exec('osascript -e "set Volume 6"');
            spotify.volumeUp()
            break;

        case 'down':
            childProc.exec('osascript -e "set Volume 6"');
            spotify.volumeDown()
            break;

        case 'full':
            childProc.exec('osascript -e "set Volume 10"');
            spotify.setVolume(100);
            break;

        case 'half':
            childProc.exec('osascript -e "set Volume 6"');
            spotify.setVolume(50);
            break;

    }
    
}