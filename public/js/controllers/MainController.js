"use strict";

app.controller("MainCtrl", MainCtrl);

function MainCtrl($scope, socket) {

    // socket.emit('weather', 'Get me weather');
    socket.on('weather',res =>{

    	$scope.apps = res.list
    	
    	for (var i = 0; i < res.list.length; i++) {
    		res.list[i].source = "https://openweathermap.org/img/w/" + res.list[i].weather[0].icon + ".png";
    	}

    });

    // socket.emit('news', 'Get me the news');

    socket.on('news', res => {

        console.log(res)

        $scope.news = res.results

        $('.leftTab').fadeIn('slow');

        console.log(res);

        let headlineTogether = 'News stories for the day.';

        for (var i = 0; i <= 4; i++) {

            let seperator = " .,new story: "

            if (i === 4) {

                seperator = ". end of stories,. I hope the world is not too messed up today good,. luck"

            }

            headlineTogether += (res.results[i].title).replace(/[`~!@#$.%^&*()_|+\-=?;<>\{\}\[\]\\\/]/gi, ' ') + seperator;

        }

        responsiveVoice.speak(headlineTogether, "UK English Male", {rate: 0.8, pitch: 1});
        

    })
}