
"use strict";
		// Loads the JSON file on disk
const 	spanish_words 	= require("./spanishWords.json"),
		storage 		= require("node-persist");

// Stip out the object and construct a string that can be sent to the front end as the word of the day
const stripSpanishWords = obj => {

	let schema = {
		english : "",
		spanish : ""
	}
	
	let infinative_spanish = " la palabra en Infinativo es: " + obj.infinitive + ", otro vez,.  " + obj.infinitive,
		tense = "., Ahora, estamos aprendiendo la forma,. " + obj.tense,
		forms = "., las formas son : yo " + obj.form_1s + ", tu " + obj.form_2s + ", el " + obj.form_3s + ", Nosotros " + obj.form_1p + ", Ellos " + obj.form_3p + ", Te dije que si te veía con isaballa te mataría... te veo ok?";

	schema.english = "The Spanish word of the day is " + obj.infinitive_english

	schema.spanish = infinative_spanish + tense + forms

	return schema;

};

// Bind the event globally and send it to the front end
global.event.on("spanish", () => {
	
	storage.getItem("spanishCounter", (err,stored) => {

    	global.event.emit("speechFromBackEndSpanish", stripSpanishWords(spanish_words[stored]))

    	storage.setItem("spanishCounter",(stored += 18));

	})

});




