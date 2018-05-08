"use strict";

const request = require("request");

let word = {}

global.event.on("spanishAnswer", res=> {

    if(res === word.detail){

        global.event.emit("speechFromBackend", obj.data[random_number].name)
    }
})

global.event.on("spanishQuestion", res=> {

    console.log('spanishQuestion')

    request("https://www.randomlists.com/data/spanish-words.json", (error, response,body) => {

        const obj = JSON.parse(body),
        random_number = Math.floor((Math.random() * 292) + 1);

        word = obj.data[random_number];

        global.event.emit("spanishWord", word)

    });  
})

