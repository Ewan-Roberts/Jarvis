"use strict";

app.controller("MainCtrl", MainCtrl);

function MainCtrl($scope, socket) {
    
    socket.on('weather', res =>{

    	$scope.apps = res.list;
    	
    	for (var i = 0; i < res.list.length; i++) {

    		res.list[i].source = "https://openweathermap.org/img/w/" + res.list[i].weather[0].icon + ".png";

    	}

    });

    socket.on('news', res => {

        $scope.news = res.results

        $('.leftTab').fadeIn('slow');

        let headlineTogether = 'News stories for the day.';

        for (var i = 0; i <= 2; i++) {

            let seperator = " .,new story: "

            if (i === 2) {

                seperator = ". end of stories,. I hope the world is not too messed up today good,. luck";

            }

            headlineTogether += (res.results[i].title).replace(/[`~!@#$.%^&*()_|+\-=?;<>\{\}\[\]\\\/]/gi, ' ') + seperator;

        }

        responsiveVoice.speak(headlineTogether, "UK English Male", {rate: 0.8, pitch: 1});

    })
    
}