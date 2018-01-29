
'use strict';

const event = require('./event');

const fs = require('fs');

// Loads the JSON file on disk
const spanishWords = require("../spanishWords.json");

//Reads the current word the user is up to in the array
const readIncrement = new Promise((resolve,reject) => {

	fs.readFile('./globalStates.json', 'utf8', (err,data) => {
                
        if (err) return console.log(err);

        let obj = JSON.parse(data)

		resolve(obj)

    });

})

//Increments the spanish word and resets if the end of the array is hit
const writeIncrement = obj => {

	if (typeof obj != 'object') return false

    obj[0].counter += 18;

    obj = JSON.stringify(obj);

 	fs.writeFile('./globalStates.json', obj, err => {if (err) throw err});

}

// Stip out the object and construct a string that can be sent to the front end as the word of the day
const stripSpanishWords = obj => {

	let schema = {
		english : "",
		spanish : ""
	}
	
	let infinativeSpanish = " la palabra en Infinativo es: " + obj.infinitive + ", otro vez,.  " + obj.infinitive ;
	
	let tense = "., Ahora, estamos aprendiendo el tense,. " + obj.tense;
	
	let forms = "., las formas son : yo " + obj.form_1s + ", tu " + obj.form_2s + ", ello " + obj.form_3s + ", Nosotros " + obj.form_1p + ", Ellos " + obj.form_3p + ", tengas un buen dia mi amor, si te veo con isabella voy a matarte ok?";

	schema.english = "The Spanish word of the day is " + obj.infinitive_english

	schema.spanish = infinativeSpanish + tense + forms

	return schema;

};

// Strips out the word and resolve to it so it can be passed 
const getSpanishWord = new Promise((resolve,reject) => {

	readIncrement.then(obj => {

		let i = obj[0].counter

		if(i >= 11466) {
			i = 0;
		}

		resolve(stripSpanishWords(spanishWords[i]))

		writeIncrement(obj)

	})

});

// Bind the event globally and send it to the front end
event.on("spanish", () => {

	getSpanishWord.then(str => {
		
		event.emit("speechFromBackEndSpanish", str)

	})

});
