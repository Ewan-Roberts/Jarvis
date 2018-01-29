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

    'timer for *mins': mins => { 
        
        let milli = mins * 60000

        let seconds = mins*60

        $('.countdown').slideDown()

        $('.countdown').text(seconds + " seconds")

        responsiveVoice.speak("Timer started for " + mins + " minutes", "UK English Male", {rate: 0.9});

        timer = new Timer(()=> {

            $('.countdown').text(seconds + " seconds")

            seconds -= 1;

            if(seconds===0){

                $('.countdown').fadeOut()

                responsiveVoice.speak("Timer finished", "UK English Male",{rate: 0.9});

                clearInterval(timer)

            }

        }, 1000);

    },

    'timer reset': () => { 

        $('.countdown').fadeOut()

        clearInterval(timer)

        responsiveVoice.speak("Timer reset", "UK English Male", {rate: 0.9});

        timer.reset()

    },

    'timer stop': () => { 

        $('.countdown').fadeOut()

        responsiveVoice.speak("Timer stopped", "UK English Male", {rate: 0.9});

        timer.pause()

    },

    'timer resume': () => { 

        $('.countdown').fadeIn()

        responsiveVoice.speak("Timer resummed", "UK English Male", {rate: 0.9});

        timer.resume()

    },

    'screen *action': action => { 

        socket.emit('screen', action)

    },

    'reload': () => {

        window.location.reload()

    },

    'refresh': () => {

        window.location.reload()

    },

    'bedroom *action': action => { 
        
        socket.emit('bedroom', action)    
        
    },

    'toggle': () => { 

        socket.emit('bedroomToggle')
    },

    'bathroom *action': action => { 
    
        socket.emit('bathroom', action)

    },

    'lights *action': action => { 
        
        socket.emit('lights', action)

    },

    'what is the weather': () => { 
        
        socket.emit('weather')

    },

    'where does isabella live': () => { 
        
        responsiveVoice.speak("Nw1 6dn", "UK English Male",{rate: 0.9});

    },

    'spanish word': () => { 
        
        socket.emit('spanish')

    },

    'what is the time' : () => {

        responsiveVoice.speak("Today is; " + moment().format('dddd') + ", and the time is. " + moment().format('HH:mm'), "UK English Male",{rate: 0.9});

    },

    'stop (stop)' : () => {

        socket.emit('musicControls', 'pause')   

        responsiveVoice.cancel();
        
    },

    'open *application' : application => {

        socket.emit('browserControls', application)
        
    },

    '*application search for *video' : (application,video) => {

        let res = {

            vessel: application,

            search: video

        }

        socket.emit('applicationSearch', res)
        
    },

    'play *user playlist' : user => {

        socket.emit('playUserPlaylist')

    },

    'play some (music)' : () => {

        socket.emit('playTrack', '2jplimH0b7Abf5LQSPx27A')
        
    },

    'search for song *name': name => {

        //TODO : all calls should be on the BE

        $.ajax({

            url: 'https://api.spotify.com/v1/search',

            data: {
                q: name,
                type: 'track'
            },

            success: response => {

                socket.emit('playTrack', response.tracks.items[0].id) 

            }

        });

    },

    'search for artist *name': name => {
 
        $('.artist').remove()

        getArtistMatches(name)

        annyang.addCommands({

            '*index': index => {
                    
                if(index == (1||"one"||"1"||"first")) {

                    getArtistTopTracks($('.overlay')[0].id)

                }

                else if (index == (2||"two"||"2"||"second")) {

                    getArtistTopTracks($('.overlay')[1].id)
                    
                }

                else if (index == (3||"three"||"3"||"third")) {

                    getArtistTopTracks($('.overlay')[2].id)
                    
                }

            }
        })

    },     

    'Wikipedia *term': term => {

        socket.emit('wikiQuery', term)

    },

    'override': () => {

        socket.emit('override')

    },

    'clear': () => { 

        $('.leftTab').fadeOut('slow') 
        $('.weatherTab').fadeOut('slow')

    },

    'volume up (up)': () => {

        socket.emit('musicControls', 'up')
        socket.on('setVolume', 6)

    },

    'volume down (down)': () => {

        socket.emit('musicControls', 'down')   
        socket.on('setVolume', 6)             

    },

    'volume full (full)': () => {

        socket.emit('musicControls', 'full') 
        socket.on('setVolume', 10)                

    },

    'volume half (half)': () => {

        socket.emit('musicControls', 'half') 
        socket.on('setVolume', 6)               

    },

    'pause (pause)': () => {

        socket.emit('musicControls', 'pause')                

    },


    'cheese (cheese)': () => {

        socket.emit('musicControls', 'pause')                

    },    

    'horse (horse)': () => {

        socket.emit('musicControls', 'pause')                

    },

    'play (play)': () => {

        socket.emit('musicControls', 'play')

    },

    'next (next)': () => {

        socket.emit('musicControls', 'next')

    },   

    'back (back)': () => {

        socket.emit('musicControls', 'back')
        socket.emit('musicControls', 'back')

    },

    'thanks Jarvis': () => {

        responsiveVoice.speak('you are very welcome', "UK English Male", {rate: 0.9})

    },

    'hi Jarvis': () => {

        responsiveVoice.speak('Hi there how are you today?', "UK English Male", {rate: 0.9})

    },

    'what is the news' : () => {

        socket.emit('news');

    }

};