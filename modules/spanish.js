
"use strict";

const 	event 	= require("./event"),
		fs 		= require("fs"),
		// Loads the JSON file on disk
		spanishWords = require("../spanishWords.json"),
		storage = require("node-persist");

//Reads the current word the user is up to in the array
const readIncrement = new Promise((resolve,reject) => {

	fs.readFile("./globalStates.json", "utf8", (err,data) => {
                
        if (err) return console.log(err);

        const obj = JSON.parse(data)

		resolve(obj)

    });

})

//Increments the spanish word and resets if the end of the array is hit
const writeIncrement = obj => {

	if(obj[0].counter > 11466) {

		obj[0].counter = 0;

	} else {

		obj[0].counter += 18;

	}

    obj = JSON.stringify(obj);

 	fs.writeFile("./globalStates.json", obj, err => {if (err) throw err});
 	
}

// Stip out the object and construct a string that can be sent to the front end as the word of the day
const stripSpanishWords = obj => {

	let schema = {
		english : "",
		spanish : ""
	}
	
	let infinativeSpanish = " la palabra en Infinativo es: " + obj.infinitive + ", otro vez,.  " + obj.infinitive ;
	
	let tense = "., Ahora, estamos aprendiendo la forma,. " + obj.tense;
	
	let forms = "., las formas son : yo " + obj.form_1s + ", tu " + obj.form_2s + ", el " + obj.form_3s + ", Nosotros " + obj.form_1p + ", Ellos " + obj.form_3p + ", Te dije que si te veía con isaballa te mataría... te veo ok?";

	schema.english = "The Spanish word of the day is " + obj.infinitive_english

	schema.spanish = infinativeSpanish + tense + forms

	return schema;

};

// Bind the event globally and send it to the front end
event.on("spanish", () => {

	console.log("start spanish")
	
	readIncrement.then(obj => {

		storage.getItem("spanishCounter", (err,stored) => {

        	event.emit("speechFromBackEndSpanish", stripSpanishWords(spanishWords[stored]))

        	storage.setItem("spanishCounter",(stored += 18));

    	})
	})
});




