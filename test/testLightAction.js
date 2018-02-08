// "use strict";

const rewire = require("rewire");

let lightAction = rewire('../modules/lightAction.js');

let storage = rewire('../node_modules/node-persist');  

// let five = require("johnny-five");

// const board = new five.Board();

const chai = require('chai'),

    assert = chai.assert,

    expect = chai.expect,

    should = chai.should;

let private_foo = lightAction.__get__("foo");

storage.init()

describe('A function to abstrct to store the light state on disk', () => {

    describe("#foo()", () => {

        let fakeLight = {};
        fakeLight.pin = 11;
        fakeLight.position = 22;
        fakeLight.range = [1,30];

        it("Should save the state of the light", () => {
            
            var stringed = (fakeLight.pin).toString()
            console.log("before the change")
            var bar = storage.getItem(stringed, (err,value)=>{
                console.log(value)
            })

            storage.setItem(stringed,fakeLight.position)
            console.log("after the change")
            var bar = storage.getItem(stringed, (err,value)=>{
                console.log(value)
            })

            console.log(bar)

            console.log(bar.value)

        })



    })

})

// let private_bedroomLightRelay = lightAction.__get__("checkSum");

xdescribe('A function to abstrct the flipping of lights', () => {
  
  	describe('#theLightIs()', () => {

        let fakeLight = {};

        fakeLight.range = [1,30];

        it('Should throw an error if you pass in something that isnt the min or max value', () => {
            
            fakeLight.value = null;

            expect(private_theLightIs(fakeLight)).to.be.an('error')


        });

        it('Should return a true when the light is on and you want it off', () => {

            fakeLight.value = 30;

            expect(private_theLightIs(fakeLight,false)).to.be.true


        });

        it('Should return a false when the light is off and you want it on', () => {
            
            fakeLight.value = 1;

            expect(private_theLightIs(fakeLight,true)).to.be.false


        });

        it('Should return an error if the light is on and you want it on', () => {

            fakeLight.value = 30;

            expect(private_theLightIs(fakeLight,true)).to.be.an('error')


        });

        it('Should return an error if the light is not in the ranges values', () => {




        });


  	});

    xdescribe('#lightAction()', function() {
        
        // this.timeout(8000)

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