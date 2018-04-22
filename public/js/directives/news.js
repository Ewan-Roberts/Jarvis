"use strict";

app.directive("appNews", () => { 

	return { 
		restrict: "E", 
		scope: { 
		  info: "=" 
		},
		templateUrl: "js/directives/news.html" 
	};

});