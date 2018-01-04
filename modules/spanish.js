

const eventHandler = require('./eventHandler');

const fs = require('fs');

const spanishWords = require("../spanishWords.json");

const incrementWord = int => {

	return int+1;

}

const readIncrement = new Promise(resolve => {

	fs.readFile('./globalStates.json', 'utf8', function (err,data) {
                
        if (err) return console.log(err);

        let obj = JSON.parse(data)
   
		resolve(obj)

    });

})

const writeIncrement = obj => {

	if (typeof obj != 'object') return false

    obj[0].counter += 18;

    obj = JSON.stringify(obj);

 	fs.writeFile('./globalStates.json', obj, err => {
            
 		if (err) throw err;

	});

}

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

const getSpanishWord = new Promise(resolve => {
	
	readIncrement.then(obj => {

		let i = obj[0].counter

		resolve(stripSpanishWords(spanishWords[i]))

		writeIncrement(obj)

	})

})

eventHandler.on("spanish", socket => {

	getSpanishWord.then(str => {

		socket.emit('speechFromBackEndSpanish', str)

	})

})


