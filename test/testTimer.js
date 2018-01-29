"use strict";

const rewire = require("rewire");

const timer = rewire('../modules/timer.js');  

const moment = require('moment');

const chai = require('chai'),
    assert = chai.assert,
    expect = chai.expect,
    should = chai.should;

const sinon = require("sinon");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);

// let private_checkTimeSinceLastMovement = timer.__get__("checkTimeSinceLastMovement");

// let private_timeMatch = timer.__get__("timeMatch");

// let private_timeBasedPrompt = timer.__get__("timeBasedPrompt");

// let private_timeSinceLastMovement = timer.__get__("timeSinceMovement");

let timeSinceMovement = Date.now();

xdescribe('Running timer through the prgram promting on trigger times', () => {

    describe('#timeBasedPrompt()', () => {
        
        const fakeSocket = { emit: sinon.spy() }

        beforeEach(() => {
        
            this.clock = sinon.useFakeTimers();

        });

        it('if the time matches, send a string to the front end', () => {
            
            private_timeBasedPrompt(fakeSocket,"test",moment().format("HH:mm"))

            expect(fakeSocket.emit).to.have.been.calledOnce;

        });

        it('emit second message after 1000ms and for it to emit without issue', () => {
            
            private_timeBasedPrompt(fakeSocket,"test2",moment().format("HH:mm"))

            this.clock.tick(1000);

            expect(fakeSocket.emit).to.have.been.calledTwice;

        });

    });

  	describe('#checkTimeSinceLastMovement()', () => {
    	
    	it('Should return false if 600000 milliseconds have not passed since timeSinceLastMovement', () => {

    		expect(private_checkTimeSinceLastMovement(Date.now())).to.be.false 

    	});

        it('Should return true if 600000 milliseconds has passed on simce the timeSinceLastMovement', () => {
            var clock;
            //Reset the time forward, past the 600000 threshold
            clock = sinon.useFakeTimers(new Date("2019-12-15").getTime());

            expect(private_checkTimeSinceLastMovement(clock.now)).to.be.true

            clock.restore() 

        });

  	});

    describe('#timeMatch()', () => {
        
        it('Should return true when the time passed in is the same as the current time', () => {
            
            assert.equal(private_timeMatch(moment().format("HH:mm")), true);

        });

        it('Should throw an error if a time isnt input', () => {

            expect(() => {
                
                private_timeMatch("string")

                private_timeMatch(true)

                private_timeMatch(false)

                private_timeMatch([0,1,2])

                private_timeMatch({user: 3})

            }).throw(/Time format not valid/);

        });

    });

    // describe('#resetMovementTimer()', () => {
        
    //     it('Should reset the timeSinceMovement variable', () => {
            
    //         expect(Date.now()).to.not.equal(private_timeSinceLastMovement)

    //         console.log(private_timeSinceLastMovement + " Time since")

    //         console.log(Date.now() + " Time reset")

    //         timer.resetMovementTimer()

    //         expect(Date.now()).to.equal(private_timeSinceLastMovement)

    //     });

    // });


});