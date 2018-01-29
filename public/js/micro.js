"use strict";

const socket = io();

jQuery(document).ready($ =>{

    setUpMicrophone();

    // socket.emit('screen', false)

    // socket.emit('weather')

    // socket.emit('spanish')

    // socket.emit('wikiQuery', 'term')

    // socket.emit('news');

    socket.emit("bedroom",true)

    socket.emit('trackTime');

    socket.on('spotifyTrackInfo', res => {
        if(res === null) {
            console.log('no track defined');
        } else {
            $('.musicName').text(res.artist + " - " + res.name );    
        }
        

    });

    socket.on('trackTimeInfo', res => {

        $('.timing').animate({"width" : res.position}, 200)

    });

    socket.on('speechFromBackEnd', data => {

        responsiveVoice.speak(data, "UK English Male", {rate: 0.8})

    })

    socket.on('speechFromBackEndSpanish', data => {
        
        responsiveVoice.speak(data.english, "UK English Male", {rate: 0.8, onend: function() {

            responsiveVoice.speak(data.spanish, 'Spanish Female', {rate: 0.7})

        }})

    })


    socket.on('weather', res => {
        
        $(".weatherTab").fadeIn();

        if(res.morning) {

            responsiveVoice.speak("Good morning Ewan. Today is " + moment().format('dddd') + " and todays weather will be, " + res.list[0].weather[0].description + " and the temperature is. " + (res.list[0].temp.day).toString(), "UK English Male", {rate: 0.8, onend: () => {

                socket.emit("weatherCompleteMorning")

            }});       

        } else {
                
            responsiveVoice.speak("todays weather status is, " + res.list[0].weather[0].description + " and the temperature will be. " + (res.list[0].temp.day).toString(), "UK English Male", {rate: 0.8}); 

        }

    }); 

    socket.on('refreshBrowser', () => {

        window.location.reload()

    })

    socket.on("wikiResult", res => {

        responsiveVoice.speak(res, "UK English Male", {rate: 0.9})

    })

    socket.on('pi', response => {

        console.log(response);

    });

    $('.musicPrevious').click(() => {

        socket.emit('musicControls', 'back');

    });


    $('.musicNext').click(() => {

        socket.emit('musicControls', 'next');
        
    });


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