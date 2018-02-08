"use strict";

app.controller("MainCtrl", MainCtrl);

function MainCtrl($scope, socket) {
    
    socket.on('weather', res =>{
        console.log(res)
    	$scope.apps = res.list;
    	
    	for (var i = 0; i < res.list.length; i++) {

    		res.list[i].source = "https://openweathermap.org/img/w/" + res.list[i].weather[0].icon + ".png";

    	}
        
        $(".weatherTab").fadeIn();
        console.log(res)
        if(res.morning) {

            responsiveVoice.speak("Good morning Ewan. Today is " + moment().format('dddd') + " and todays weather will be, " + res.list[0].weather[0].description + " and the temperature is. " + (res.list[0].temp.day).toString(), "UK English Male", {rate: 0.8, onend: () => {

                socket.emit("weatherCompleteMorning")

            }});       

        } else {
                
            responsiveVoice.speak("todays weather status is, " + res.list[0].weather[0].description + " and the temperature will be. " + (res.list[0].temp.day).toString(), "UK English Male", {rate: 0.8}); 

        }

    });

    socket.on('news', res => {

        $scope.news = res.results

        $('.leftTab').fadeIn('slow');

        let headlineTogether = 'Todays news stories.';

        for (var i = 0; i <= 2; i++) {

            let seperator = " ., "

            if (i === 2) {

                seperator = "., Go and have a shower " + res.name;

            }

            headlineTogether += (res.results[i].title).replace(/[`~!@#$.%^&*()_|+\-=?;<>\{\}\[\]\\\/]/gi, ' ') + seperator;

        }

        responsiveVoice.speak(headlineTogether, "UK English Male", {rate: 0.8, pitch: 1, onend: () => {
            
            if (res.morning){socket.emit("newsCompleteMorning")}

        }});

    })
    
}