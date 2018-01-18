// "use strict";

const moment = require('moment');

const rewire = require("rewire");

let fs = require('fs')

const chai = require('chai'),

    assert = chai.assert,

    expect = chai.expect,

    should = chai.should;

let spanish = rewire('../modules/spanish.js');  

const eventHandler = require('../modules/eventHandler.js');

let private_readIncrement = spanish.__get__("readIncrement");

let private_writeIncrement = spanish.__get__("writeIncrement");

describe('Read A unique Spanish word each day', () => {
  
  	describe('#stripSpanishWord()', () => {

        xit('Should take a spanish word object and strip it and make a readable string', () => {
            
            

        });

    	xit('Should loop though the Spanish words and return a word based on the number you provide it', () => {
      		
    	   	

    	});

    	xit('Should itterate a counter for each day the function is called on disk', () => {
            
                

        });

  	});

    describe('#readIncrement()', () => {

        xit('Should provide the current counter on disk', done => {

            fs.readFile('./globalStates.json', 'utf8', (err,data) => {

                private_readIncrement.then(res => {

                    let expected = JSON.parse(data)

                    expect(res).to.be.an('array')

                    expect(res).to.deep.equal(expected)

                    done();

                });

            });

        });

    });

    describe('#writeIncrement()', () => {

        xit('Should write a new counter on disk', () => {

            private_readIncrement.then(res=> {

                let counter = res[0].counter

                expect(private_writeIncrement(22)).to.be.false

                expect(counter).to.equal(res[0].counter-1)

                fs.readFile('./globalStates.json', 'utf8', (err,data) => {

                    let postChange = JSON.parse(data)

                    expect(postChange[0].counter).to.equal(counter+1)

                })

            });

        });

        xit('Should reset if the spanish arrays end is reached', () => {

            //Replace back to previous
            let mockInput = [{"hallwayLight":"on","key":"new value","bathroomLight":"off","bedroomLight":"on","areYouHome":"yes","securityFlag":"true","keepLights":"transition","door":"open","counter":11467}]

            private_writeIncrement(mockInput)

            return private_readIncrement.then(obj => {
                
                let i = obj[0].counter

                expect(i).to.equal(18)

            });


        });

    });

    describe('#saveIncrement()', () => {

        xit('Should save the new counter number on the hard drive', () => {
            
            fs.readFile('./globalStates.json', 'utf8', (err,data) => {
                
                if (err) {

                    return console.log(err);

                }

                let obj = JSON.parse(data)

            });

        });

    });

    describe('#eventHandler on "spanish"', () => {

        xit('should emit an the spanish event', done =>{
            
            let eventFired = false

            setTimeout(() => {

                assert(eventFired, 'Event did not fire in 1000 ms.');

                done();

            }, 100); //timeout with an error in one second

            eventHandler.on('spanish', () => {

                eventFired = true

            });

            eventHandler.emit('spanish');

            // do something that should trigger the event

        });

        xit('Should save the new counter number on the hard drive', () => {
            
            fs.readFile('./globalStates.json', 'utf8', (err,data) => {
                
                if (err) {

                    return console.log(err);

                }

                let obj = JSON.parse(data)

            });   

        });

    });

});