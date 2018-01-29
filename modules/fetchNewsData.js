"use strict";

const request = require('request'),
	userInformation = require('./userInformation')

// Pulls from userInformation file
const newsKey = userInformation.newsKey;

module.exports = callback => {

    request('http://api.nytimes.com/svc/mostpopular/v2/mostviewed/politics/1.json?&api-key='+newsKey, (error, response,body) => {

        if (error) throw 'Error with the news API' + error;
        
        let obj = JSON.parse(body);
        
        if(userInformation.userName) {

        	obj.name = userInformation.userName;

        }

        callback(obj);

    });

};