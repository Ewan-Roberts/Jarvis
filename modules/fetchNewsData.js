"use strict";

const   request = require("request"),
        moment  = require("moment"),
        user    = require("./userInformation"),
        event   = require("./event");

// Pulls from userInformation file
event.on("fetchNewsData", () => {

    console.log("news call")
	// needs athe api key and user name to work
	if(user.newsKey && user.userName) {

	    request("http://api.nytimes.com/svc/mostpopular/v2/mostviewed/politics/1.json?&api-key="+user.newsKey, (error, response,body) => {

	        if (error){event.emit("error", "fetchNewsData: " + error)}

	        const obj = JSON.parse(body);

	       	obj.name = user.userName

	        event.emit("news", obj);
	    });		
	
	} else {

	    event.emit("error", "fetchNewsData: You have not set an API key and name for the news API, go to http://api.nytimes.com, get one and add it to the userInformation file please")
	}
});


