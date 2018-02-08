"use strict";

const request = require("request"),
	moment = require("moment"),
	user = require("./userInformation"),
	event = require("./event.js");


// Pulls from userInformation file
event.on("fetchNewsData", () => {

	// needs athe api key and user name to work
	if(!!user.newsKey && !!user.userName) {
		console.log("get info for news")
	    request("http://api.nytimes.com/svc/mostpopular/v2/mostviewed/politics/1.json?&api-key="+user.newsKey, (error, response,body) => {

	        if (error){event.emit("error", new Error("fetchNewsData: " + error))}

	        let obj = JSON.parse(body);

	       	obj.name = user.userName

	       	if(moment().isBefore(moment(user.daytime[0], "HH:mm"))){
	    		obj.morning = true;	
	    	}

	    	console.log(obj)

	        event.emit("news",obj);

	    });		
	
	} else {

	    event.emit("error", new Error("fetchNewsData: You have not set an API key and name for the news API, go to http://api.nytimes.com, get one and add it to the userInformation file please"))

	}

});

event.on("newsCompleteMorning", () => {

	event.emit("musicControls","play");

	event.emit("musicControls","half");

	event.emit("bathroomLight",true);

    setTimeout(() => {

    	event.emit("playTrack","2JuAnIQsr6keMTBaL9lY2f");

        event.emit("bedroomLight",true);

        event.emit("musicControls","half");

        event.emit("spanish");
        
    }, 60000);

})


