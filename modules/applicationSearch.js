"use strict";

const childProc = require('child_process'),
	event = require('./event.js');

event.on("applicationSearch", res => {

    if(res.vessel === 'Facebook') {
    	
    	childProc.exec('open -a "Google Chrome" --new --args -ingognito https://www.facebook.com/search/top/?q=' + res.search)
    
    }

    if(res.vessel === 'YouTube') {

    	childProc.exec('open -a "Google Chrome" --new --args -ingognito https://www.youtube.com/results?search_query=' + res.search)

    }

})