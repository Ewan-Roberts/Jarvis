"use strict";

const moment = require('moment');

const chai = require('chai'),

    assert = chai.assert,

    expect = chai.expect,

    should = chai.should;

// const api = require('../modules/api.js');

describe('API calls', function() {
  
    describe('#fetchNewsData()', function() {
      
        xit('Return an object with 20 stories from the new york times POLITICS section', function (done) {

            api.fetchNewsdata(res => {

                res.should.be.an('object')

                expect(res.status).to.equal('OK')

                expect(res.results.length).to.equal(20)

                done();

            })
            
        });

    })

    describe('#fetchWeaterData()', function() {
      
        xit('Return an object with the weather data of London', function (done) {

            api.fetchWeaterData(function(res) {

                assert(res.should.be.an('object'))

                expect(res.city.name).to.equal('London')

                done();;

            }, 

            function (err) {

                if (err) throw err;

                done();

            });
                    
        })
            
    });

});