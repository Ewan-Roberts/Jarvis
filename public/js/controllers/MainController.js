"use strict";

app.controller("MainCtrl", MainCtrl);

function MainCtrl($scope, socket) {
    
    socket.on("weather", res =>{
        
    	$scope.apps = res.list;
    	
        $(".weatherTab").fadeIn();

        (res.list).forEach(day => {day.source = "https://openweathermap.org/img/w/" + day.weather[0].icon + ".png";})
                
        responsiveVoice.speak("Good morning Ewan todays weather is, "+res.list[0].weather[0].description+" and the temperature will be. "+(res.list[0].temp.day).toString()+" celsius, have a mega dope day ", "UK English Male", {rate: 0.8}); 

    });

    socket.on("news", res => {

        $scope.news = res.results

        $(".leftTab").fadeIn("slow");

        let headlineTogether = "Todays news .";

        for (var i = 0; i <= 2; i++) {

            headlineTogether += (res.results[i].title).replace(/[`~!@#$.%^&*()_|+\-=?;<>\{\}\[\]\\\/]/gi, " ") + " ., ";

        }

        responsiveVoice.speak(headlineTogether, "UK English Male", {rate: 0.8});

    })
    
}