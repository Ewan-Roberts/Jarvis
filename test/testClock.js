"use strict";

const moment = require('moment');

const expect = require('expect');

const chai = require('chai');

const should = chai.should();

const assert = require('assert');

const clock = require('../modules/clock.js');

describe('Time of Day', () => {
  
  	describe('#isItDaytime()', () => {
    	
    	it('Should return true when the time is between 07:40 and 22:00', () => {
      		
    		//Spoof time to be 19:19

      		Date.now = () => 1487099998000;

      		// console.log(moment(Date.now()).format("DD-MM-YYYY HH:mm:ss"))

    		assert.equal(clock.isItDaytime(), true);

    	});

    	it('Should return false when the time is outside 07:40 and 22:00', () => {

    		//Spoof time to be 02:53
			
			Date.now = () => 1487299998000;
			
			// console.log(moment(Date.now()).format("DD-MM-YYYY HH:mm:ss"))

			assert.equal(clock.isItDaytime(), false);


    	});

  	});

  	describe('#timeMatch()', () => {
    	
    	it('Should return true when the time passed in is the same as the current time', () => {
      		
      		assert.equal(clock.timeMatch(moment().format("HH:mm")), true);

    	});

    	it('Should throw an error if a time isnt input', () => {

      		expect(() => {
      			
      			clock.timeMatch("string")

      			clock.timeMatch(true)

      			clock.timeMatch(false)

      			clock.timeMatch([0,1,2])

      			clock.timeMatch({user: 3})

      		}).toThrow(/Time format not valid/);

    	});

  	});

});

