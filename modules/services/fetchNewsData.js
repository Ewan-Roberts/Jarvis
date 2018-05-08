"use strict";

const   request = require("request"),
        user    = require("../userInformation");

// Pulls from userInformation file
global.event.on("fetchNewsData", () => {

	// needs athe api key and user name to work
	if(user.news_key && user.user_name) {

	    request("http://api.nytimes.com/svc/mostpopular/v2/mostviewed/politics/1.json?&api-key="+user.news_key, (error, response,body) => {

	        if (error){global.event.emit("error", "fetchNewsData: " + error)}

	        const obj = JSON.parse(body);

	       	obj.name = user.user_name

	        global.event.emit("news", obj);
	    });		
	
	} else {

	    global.event.emit("error", "fetchNewsData: You have not set an API key and name for the news API, go to http://api.nytimes.com, get one and add it to the userInformation file please")
	}
});


