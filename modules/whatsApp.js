"use strict";

const request = require('request')

request('https://web.whatsapp.com/', (error, response,body) => {
	
	
	console.log(body)
   

});
