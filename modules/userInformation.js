"use strict";

// User set information that customises every function
module.exports = {

	// for greating when user gets home
	user_name: 			"",
	override: 			false,

	// for Spotify controls
	spotify_user: 			"",
	spotify_playlist: 		"",
	track: 				"",

	//Morning Settings
	morning_track: 			"",
	morning_wait_till_music: 	80000,
	morning_alarm: 			"08:00",
	
	// which port local host will run on
	port: 				3014,

	// for API calls
	weather_key: 			"",
	news_key: 			"",

	// when to start and stop turning on the lights 
	daytime: 			["08:30","21:20"],
	reset_user: 			"17:00",
	bedtime: 			"23:00"
}
