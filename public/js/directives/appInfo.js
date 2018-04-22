"use strict";

app.directive("appInfo", () => { 

	return { 
		restrict: "E", 
		scope: { 
		  info: "=" 
		},
		templateUrl: "js/directives/appInfo.html" 
	};
   
});