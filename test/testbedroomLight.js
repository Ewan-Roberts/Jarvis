// "use strict";

const rewire = require("rewire");

const chai = require('chai'),
    assert = chai.assert,
    expect = chai.expect,
    should = chai.should;

const five = require("johnny-five");

const board = new five.Board();

xdescribe('this is the bedroom/bathroom lights functions', () => {
    
    describe('#bathroomLightOn()', function()  {
        this.timeout(8000)
        it('Should turn the light to the on and off position', done => {
            
            board.on("ready", () => {

                let bathroomLight = rewire('../modules/bathroomLight.js');  

                let event = bathroomLight.__get__("event");

                let private_bathroomLight = bathroomLight.__get__("bathroomLight");

                let private_bathroomRelay = bathroomLight.__get__("bathroomRelay");

                //Relay exists and is not allowing voltage
                expect(private_bathroomRelay.isOn).to.be.false

                //Servo exists
                expect(board.pins[private_bathroomLight.pin].mode).to.equal(4)
                
                //Emit the turn on event
                eventHandler.emit('bathroomLight')

                //While in motion the relay flips to allowing voltage
                expect(private_bathroomRelay.isOn).to.be.true

                //Wait for the servo to move and match to see if its high range has been reached
                setTimeout(() => {
                    
                    expect(private_bathroomLight.position).to.equal(private_bathroomLight.range[0])
                    eventHandler.emit('bathroomLightOff')

                },1000)

                //Wait for the servo to move and match to see if its low range has been reached
                setTimeout(() => {
                    
                    expect(private_bathroomLight.position).to.equal(private_bathroomLight.range[1])
                    
                    done()

                },2000)

            })

        })

    });

  	xdescribe('#bedroomLightOn()', function() {
        
        this.timeout(12000)

        // it("Should have an ardino connected", ()=> {

        //     expect(board.isConnected).to.be.true

        // })

        xit('Should turn the light to the on and off position', done => {
            board.on("ready", () => {
                console.log('hi')
                let bedroomLight = rewire('../modules/bedroomLight.js');  

                let event = bedroomLight.__get__("event");

                let private_leftLight = bedroomLight.__get__("leftLight");
                let private_rightLight = bedroomLight.__get__("rightLight");

                let private_leftLightRelay = bedroomLight.__get__("leftLightRelay");
                let private_rightLightRelay = bedroomLight.__get__("rightLightRelay");

                //Relay exists and is not allowing voltage
                expect(private_leftLightRelay.isOn).to.be.false
                expect(private_rightLightRelay.isOn).to.be.false 

                //Servo exists
                expect(board.pins[private_leftLight.pin].mode).to.equal(4)
                expect(board.pins[private_rightLight.pin].mode).to.equal(4)
                
                //Emit the turn on event
                event.emit('bedroomLight',true)

                //While in motion the relay flips to allowing voltage
                expect(private_leftLightRelay.isOn).to.be.true
                expect(private_rightLightRelay.isOn).to.be.true

                //Wait for the servo to move and match to see if its high range has been reached
                setTimeout(() => {
                    
                    expect(private_leftLight.position).to.equal(private_leftLight.range[1])
                    expect(private_rightLight.position).to.equal(private_rightLight.range[0])
                    
                    eventHandler.emit('bedroomLight',false)

                },8000)

                //Wait for the servo to move and match to see if its low range has been reached
                setTimeout(() => {
                    
                    expect(private_leftLight.position).to.equal(private_leftLight.range[0])
                    expect(private_rightLight.position).to.equal(private_rightLight.range[1])

                    // eventHandler.emit('bedroomLightToggle')

                },10000)   
            })
            // //There is two lights for the right switch, option to flip this switch
            // setTimeout(() => {
                
            //     expect(private_leftLight.position).to.equal(private_leftLight.range[0])
            //     expect(private_rightLight.position).to.equal(private_rightLight.range[0])

            //     done()

            // },4000)  

        })

  	});

});