"use strict";

const client  = require('socket.io-client')('http://192.168.1.101:3013')
const event = require('./event.js');

// Set up the connection with the raspberry pi 
setInterval(()=>{
	// console.log('throwing')
	// client.emit('fromJarvis', "hi")
	// client.on('test2', word => {
	// 	console.log(word)
	// })

	// client.on('testpoo', word => {
	// 	console.log(word)
	// })
}, 2000)

event.on("corridorLight", bool => {

	client.emit('corridorLight', bool)	

})



setTimeout(()=>{
	console.log(client)
	console.log('hit for true light');
	client.emit('corridorLight', true)
},6000)

setTimeout(()=>{
	console.log(client.connected)
	console.log('hit for true light');
	client.emit('corridorLight', false)
},12000)

// client.on('fromPi', word => {
// 		console.log(word)
// 	})

// client.emit('fromJarvis', "hi")

client.on("circleButton", () => {

    event.emit("bedroomLight",true)

}) 

client.on("squareButton", () => { 

    event.emit("bedroomLight",false)

})
