"use strict";

const socket = io();

jQuery(document).ready($ =>{

    // setUpMicrophone();

    socket.on("spotifyTrackInfo", res => {if(res) {$(".musicName").text(res.artist + " - " + res.name )}});

    socket.on("trackTimeInfo", res => {if(res) {$(".timing").animate({"width" : res.position}, 200)}});

    socket.on("speechFromBackEnd", res => {if(res){responsiveVoice.speak(res, "UK English Male", {rate: 0.8})}})

    socket.on("speechFromBackEndSpanish", data => {
        
        responsiveVoice.speak(data.english, "UK English Male", {rate: 0.8, onend: function() {

            responsiveVoice.speak(data.spanish, "Spanish Female", {rate: 0.9})

        }})

        $(".leftTab").fadeOut("slow") 
                
        $(".weatherTab").fadeOut("slow")

    })

    socket.on("refreshBrowser", () => {window.location.reload()})

    socket.on("spanishWord", res => {

        console.log(res)

        responsiveVoice.speak(res.name, "Spanish Female", {rate: 0.9, onend: () => {

            annyang.addCommands({[res.detail]: () => {
                
                console.log('nailed it')

            }});

            console.log(annyang)

        }})

    })

    socket.on("wikiResult", res => {responsiveVoice.speak(res, "UK English Male", {rate: 0.9})})

    $(".musicPrevious").click(() => {socket.emit("musicControls", "back");});

    //This is just for rough testing 
    $(".inputTime").keyup(function() {
        var value = $( this ).val();
        
        if(value === "toggle on"){
            socket.emit("bedroomRightToggle")
        }
        if(value === "toggle off"){
            socket.emit("bedroomRightToggle")
        }
        if(value === "bathroom on"){
            socket.emit("bathroomLight", true)
        }
        
        if(value === "bathroom off"){
            socket.emit("bathroomLight", false)
        }
        if(value === "bedroom on"){
            socket.emit("bedroomLight", true)
        }
        if(value === "bedroom off"){
            socket.emit("bedroomLight", false)
        }
        if(value === "weather"){
            socket.emit("fetchWeatherData")
        } 
        if(value === "news"){
            socket.emit("fetchNewsData")
        } 
        if(value === "override"){
            socket.emit("override",true)
        }       
        if(value === "morning"){
            socket.emit("morning")
        }
        if(value === "quizz"){
            socket.emit("spanishQuestion")
        } 
        console.log(value)

    }).keyup();

    $(".musicNext").click(() => {socket.emit("musicControls", "next");});

    $(".musicState").click(() =>{

        if ($(".musicState").text() === "ll"){

            $(".musicState").text(">");

            $(".musicState").css({"background-color": "green"});

            socket.emit("musicControls", "pause");

        } else{

            $(".musicState").text("ll");

            $(".musicState").css({"background-color": "red"});

            socket.emit("musicControls", "play");

        }
        
    });

    if (annyang) {

        annyang.start()

        annyang.setLanguage("en-GB");

        annyang.addCallback("result", userSaid => {

            $(".voiceMatch").empty()

            userSaid.forEach(word => {$(".voiceMatch").append("<div>" + word +"</div>")})

        });

        annyang.addCommands(commands);
        
    }

    setInterval(()=>{$(".currentTime").html(moment().format("DD MMMM YYYY H:mm:ss"))}, 1000);

});