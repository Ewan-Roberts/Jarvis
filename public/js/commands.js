console.log('commands loaded')

let commands = {

    'let me sleep': function() { 

        var action = true

        socket.emit('keepTheLight', action)

    },

    'keep the lights *action': function(action) { 

        console.log(action)

        socket.emit('keepTheLight', action)

    },

    'open everything': function(action) { 

        socket.emit('screen', action)

    },

    'screen *action': function(action) { 

        socket.emit('screen', action)

    },

    'reload': function() {

        window.location.reload()

    },

    'refresh': function() {

        window.location.reload()

    },

    'bedroom *action': function(action) { 
        
        socket.emit('bedroom', action)

    },

    'bathroom *action': function(action) { 
        
        socket.emit('bathroom', action)

        console.log('hit hit ')

    },

    'lights *action': function(action) { 
        
        socket.emit('lights', action)

        console.log('hit hit ')

    },

    'what is the weather': function() { 
        
        socket.emit('weather')

    },

    'spanish word': function() { 
        
        socket.emit('spanish')

    },

    'what is the time' : function () {

        responsiveVoice.speak("Today is; " + moment().format('dddd') + ", and the time is. " + moment().format('HH:mm'), "UK English Male",{rate: 0.9});

    },

    'stop (stop)' : function () {

        socket.emit('musicControls', 'pause')   

        responsiveVoice.cancel();
        
    },

    'open *application' : function (application) {

        socket.emit('browserControls', application)
        
    },

    '*application search for *video' : function (application,video) {

        res = {

            vessel: application,
            search: video

        }

        socket.emit('applicationSearch', res)
        
    },

    'play *user playlist' : function (user) {

        socket.emit('playUserPlaylist', 'go')

    },

    'play some (music)' : function () {

        socket.emit('playTrack', '2jplimH0b7Abf5LQSPx27A')

        socket.on('trackInfo', function(res) {

            console.log(res)

        }) 
        
    },

    'search for song *name': function(name) {

        //put track and song and artist search in
        $.ajax({

            url: 'https://api.spotify.com/v1/search',

            data: {
                q: name,
                type: 'track'
            },

            success: function (response) {

                socket.emit('playTrack', response.tracks.items[0].id) 

                socket.on('trackInfo', function(res) {

                    console.log(res)

                })

            }
        });

    },

    'search for artist *name': function(name) {
 
        $('.artist').remove()

        getArtistMatches(name)

        annyang.addCommands({

            '*index': index => {
                    
                if(index == (1||"one"||"1"||"first")) {

                    console.log($('.overlay')[0].id)

                    getArtistTopTracks($('.overlay')[0].id)

                }

                else if (index == (2||"two"||"2"||"second")) {

                    console.log($('.overlay')[1].id)

                    getArtistTopTracks($('.overlay')[1].id)
                    
                }

                else if (index == (3||"three"||"3"||"third")) {

                    console.log($('.overlay')[2].id)

                    getArtistTopTracks($('.overlay')[2].id)
                    
                }

            }
        })

    },     

    'Wikipedia *term': function(term) {

        socket.emit('wikiQuery', term)

        socket.on("wikiResult", res => {

            let removeCruft = res.replace(/[`~!@#$%^&*()_|+\-=?;:'"<>\{\}\[\]\\\/]/gi, ' ')

            responsiveVoice.speak(removeCruft, "UK English Male", {rate: 0.9})

        })

    },

    'clear': function() { 

        $('.leftTab').fadeOut('slow') 
        $('.weatherTab').fadeOut('slow')

    },

    'volume up (up)': function() {

        socket.emit('musicControls', 'up')
        socket.on('setVolume', 6)

    },

    'volume down (down)': function() {

        socket.emit('musicControls', 'down')   
        socket.on('setVolume', 6)             

    },

    'volume full (full)': function() {

        socket.emit('musicControls', 'full') 
        socket.on('setVolume', 10)                

    },

    'volume half (half)': function() {

        socket.emit('musicControls', 'half') 
        socket.on('setVolume', 6)               

    },

    'pause (pause)': function() {

        socket.emit('musicControls', 'pause')                

    },


    'cheese (cheese)': function() {

        socket.emit('musicControls', 'pause')                

    },    

    'horse (horse)': function() {

        socket.emit('musicControls', 'pause')                

    },

    'play (play)': function() {

        socket.emit('musicControls', 'play')

    },

    'next (next)': function() {

        socket.emit('musicControls', 'next')

    },   

    'back (back)': function() {

        socket.emit('musicControls', 'back')
        socket.emit('musicControls', 'back')

    },

    'thanks Jarvis': function() {

        responsiveVoice.speak('you are welcome you win', "UK English Male", {rate: 0.9})

    },

    'hi Jarvis': function() {

        responsiveVoice.speak('Hi youwan how are you today?', "UK English Male", {rate: 0.9})

    },

    'what is the news' : function () {

        socket.emit('news', 'Get me the news');

    },
    
    'shutdown everything': function () {

        socket.emit('shutDown', 'go')

    },

    'kill everything': function () {

        socket.emit('shutDown', 'go')

    },

    'resurrection': function () {

        socket.emit('turnOn', 'go')

    }

};