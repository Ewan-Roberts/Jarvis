// "use strict";

const rewire = require("rewire");

let lightAction = rewire('../modules/lightAction.js');  

let five = require("johnny-five");

const board = new five.Board();

const chai = require('chai'),

    assert = chai.assert,

    expect = chai.expect,

    should = chai.should;

let private_checkSum = lightAction.__get__("checkSum");


// let private_bedroomLightRelay = lightAction.__get__("checkSum");

describe('A function to abstrct the flipping of lights', () => {
  
  	describe('#checkSum()', () => {

        xit('Should return a bool when two intergers are the same', () => {
            
            let fakeLight = {};
            
            fakeLight.value = 30;
            
            fakeLight.range = [1,30];

            expect(private_checkSum(fakeLight)).to.be.true


        });

  	});

    xdescribe('#lightAction()', function() {
        
        this.timeout(8000)

            xit("Should shen true is passed, open the relay, turn to the maximum then turn of the relay after 300ms ", done => {
                
                board.on("ready", () => {

                    bedroomLight = rewire('../modules/bedroomLight.js'); 

                    private_relay = bedroomLight.__get__("rightLightRelay");

                    private_servo = bedroomLight.__get__("rightLight");
                    
                    expect(private_relay.isOn).to.be.false
                    console.log(lightAction)
                    
                    lightAction(true,private_servo,private_relay)

                    expect(private_relay.isOn).to.be.true

                    expect(private_servo.max).to.be.a('function')

                    expect(private_servo.position).to.equal(private_servo.range[1])

                    setTimeout(function() {
                        expect(private_relay.isOn).to.be.false
                        done()
                    }, 310);


                })
            })

            it('Should shen false is passed, open the relay, turn to the minimum then turn of the relay after 300ms', done => {
                    
                lightAction(false,private_servo,private_relay)

                expect(private_relay.isOn).to.be.true

                expect(private_servo.min).to.be.a('function')

                expect(private_servo.position).to.equal(private_servo.range[0])

                setTimeout(function() {
                    expect(private_relay.isOn).to.be.false
                    done()
                }, 600);
            })

    });

});