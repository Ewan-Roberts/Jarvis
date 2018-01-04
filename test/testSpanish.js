// "use strict";

const moment = require('moment');

const rewire = require("rewire");

const chai = require('chai'),
    assert = chai.assert,
    expect = chai.expect,
    should = chai.should;

let spanish = rewire('../modules/spanish.js');  

fs = require('fs')

let private_incrementWord = spanish.__get__("incrementWord"); // private to the spanish function, pull out for testing

let private_readIncrement = spanish.__get__("readIncrement");

let private_writeIncrement = spanish.__get__("writeIncrement");

describe('Read A unique Spanish word each day', () => {
  
  	describe('#getWord()', () => {
    	
    	it('Should loop though the Spanish words and return a word based on the number you provide it', () => {
      		
    	   	

    	});

    	it('Should itterate a counter for each day the function is called on disk', () => {
            
                

        });

  	});

    describe('#incrementWord()', () => {

        it('Should add 1 to a counter', () => {
            
            let number = 1;

            expect(private_incrementWord(number)).to.equal(number + 1)

        });

        

        it('Should set the counter to 0 when there are no longer any numbers in the array', () => {
            
            

        });

    });

    describe('#readIncrement()', () => {

        it('Should provide the current counter on disk', done => {

            fs.readFile('./globalStates.json', 'utf8', function (err,data) {
            
                private_readIncrement(function(response) {
                    
                    let expected = JSON.parse(data)

                    expect(response).to.be.an('array')

                    expect(response).to.deep.equal(expected)

                    done();

                });

            });

        });

    });

    describe('#writeIncrement()', () => {

        it('Should write a new counter on disk', done => {
                
            private_readIncrement(function(response) {

                let counter = response[0].counter

                private_writeIncrement(response)

                expect(private_writeIncrement(22)).to.be.false

                expect(counter).to.equal(response[0].counter-1)

                fs.readFile('./globalStates.json', 'utf8', function (err,data) {

                    let postChange = JSON.parse(data)

                    expect(postChange[0].counter).to.equal(counter+1)

                    done()

                })

            });

        });

    });

    describe('#saveIncrement()', () => {

        it('Should save the new counter number on the hard drive', () => {
            
            fs.readFile('./globalStates.json', 'utf8', function (err,data) {
                
                if (err) {

                    return console.log(err);

                }

                // console.log(data);

                var obj = JSON.parse(data)

            });

            

        });

    });

});

