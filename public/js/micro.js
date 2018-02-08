"use strict";

const socket = io();

jQuery(document).ready($ =>{

    setUpMicrophone();

    socket.emit('trackTime');

    socket.on('spotifyTrackInfo', res => {if(!res === null) {$('.musicName').text(res.artist + " - " + res.name )}});

    socket.on('trackTimeInfo', res => {if(!res === null) {$('.timing').animate({"width" : res.position}, 200)}});

    socket.on('speechFromBackEnd', data => {
        
        if(data !== null){
            
            responsiveVoice.speak(data, "UK English Male", {rate: 0.8})    

        }
        
    })

    socket.on('speechFromBackEndSpanish', data => {
        
        responsiveVoice.speak(data.english, "UK English Male", {rate: 0.8, onend: function() {

            responsiveVoice.speak(data.spanish, 'Spanish Female', {rate: 0.9, onend: function() {
                
                socket.emit("spanishCompleteMorning")

            }})

        }})

    })

    socket.on('refreshBrowser', () => {

        window.location.reload()

    })

    socket.on("wikiResult", res => {responsiveVoice.speak(res, "UK English Male", {rate: 0.9})})

    $('.musicPrevious').click(() => {socket.emit('musicControls', 'back');});

    $('.musicNext').click(() => {socket.emit('musicControls', 'next');});

    $('.musicState').click(() =>{

        if ($('.musicState').text() === "ll"){

            $('.musicState').text(">");

            $('.musicState').css({"background-color": "green"});

            socket.emit('musicControls', 'pause');

        } else{

            $('.musicState').text("ll");

            $('.musicState').css({"background-color": "red"});

            socket.emit('musicControls', 'play');

        }
        
    });

    if (annyang) {

        annyang.start();

        annyang.setLanguage('en-GB');

        annyang.addCallback('result', userSaid => {
            
            console.log(userSaid)

            $(".voiceMatch").empty()

            for (var i = 0; i < userSaid.length; i++) {
                
                $(".voiceMatch").append('<div>' + userSaid[i] +'</div>');

            }

        });

        annyang.addCommands(commands);
        
    }

    setInterval(()=>{

       $('.currentTime').html(moment().format('DD MMMM YYYY H:mm:ss')); 
       
    }, 1000);

});