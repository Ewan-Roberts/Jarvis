// // "use strict";

// const rewire = require("rewire");

// const chai = require('chai'),

//     assert = chai.assert,

//     expect = chai.expect,

//     should = chai.should;

// const five = require("johnny-five");

// const board = new five.Board();

// describe('this is the bathroom lights functions', () => {
  
//   	describe('#bathroomLightOn()', () => {

//         it("Should have an ardino connected", ()=> {

//             expect(board.isConnected).to.be.true

//         })

//         it('Should turn the light to the on and off position', done => {

//             board.on("ready", () => {

//                 let bathroomLight = rewire('../modules/bathroomLight.js');  

//                 let eventHandler = bathroomLight.__get__("eventHandler");

//                 let private_bathroomLight = bathroomLight.__get__("bathroomLight");

//                 let private_bathroomRelay = bathroomLight.__get__("bathroomRelay");

//                 //Relay exists and is not allowing voltage
//                 expect(private_bathroomRelay.isOn).to.be.false
                
//                 //Servo exists
//                 expect(board.pins[private_bathroomLight.pin].mode).to.equal(4)
                
//                 //Emit the turn on event
//                 eventHandler.emit('bathroomLightOn')

//                 //While in motion the relay flips to allowing voltage
//                 expect(private_bathroomRelay.isOn).to.be.true

//                 //Wait for the servo to move and match to see if its high range has been reached
//                 setTimeout(() => {
                    
//                     expect(private_bathroomLight.position).to.equal(private_bathroomLight.range[1])
//                     eventHandler.emit('bathroomLightOff')

//                 },1000)

//                 //Wait for the servo to move and match to see if its low range has been reached
//                 setTimeout(() => {
                    
//                     expect(private_bathroomLight.position).to.equal(private_bathroomLight.range[0])
                    
//                     done()

//                 },2000)

//             })

//         }).timeout(6000);

//   	});

// });