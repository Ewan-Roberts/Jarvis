"use strict";

const moment = require('moment');

const expect = require('expect');

const chai = require('chai');

const should = chai.should();

const assert = require('assert');

const computer = require('../modules/computer.js');

describe('Time of Day', () => {
  
  	describe('#isItDaytime()', () => {
    	
    	xit('Should return true when the time is between 07:40 and 22:00', () => {
      		
    		//Spoof time to be 19:19, moment uses date.now under the hood
      		Date.now = () => 1487099998000;

    		assert.equal(computer.isItDaytime(), true);

    	});

    	xit('Should return false when the time is outside 07:40 and 22:00', () => {

    		//Spoof time to be 02:53, moment uses date.now under the hood
			Date.now = () => 1487299998000;

			assert.equal(computer.isItDaytime(), false);

    	});

  	});



});