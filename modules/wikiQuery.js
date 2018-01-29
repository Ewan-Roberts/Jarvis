"use strict";

const cheerio = require('cheerio'),
    request = require('request'),
    event = require('./event');

event.on("wikiQuery",res => {

    request('https://en.wikipedia.org/wiki/' + res, (error, response, html) => {

        if(!error){
            
            let $ = cheerio.load(html);            

            if($('.mbox-small').length > 0) {$('.mbox-small').remove()}

            if($('.vertical-navbox').length > 0) {$('.vertical-navbox').remove()}

            if($('#mw-content-text').find('p').first().children().text().indexOf("this message may") > -1) {console.log('No result for what you search for')
                
                event.emit('wikiResult', 'No results')

            }

            if($('#mw-content-text').find('p').first().text().indexOf("may refer") > -1) {
            
                if($('#toc').length > 0) {$('#toc').remove()}

                if($('.mbox-small').length > 0) {$('.mbox-small').remove()}   

                let firstInList = $('#mw-content-text').find("li").find("a").first().attr('href')

                request('https://en.wikipedia.org' + firstInList, (error, response, html) => {
                    
                    let $ = cheerio.load(html);
                    
                    if(!error){

                        let context = $("p", "#mw-content-text").first().text();

                        let info = context.replace(/[`~!@#$%^&*()_|+\-=?;:'"<>\{\}\[\]\\\/]/gi, ' ')

                        event.emit('wikiResult', info)

                    }

                })

            } else {

                let context = $("p", "#mw-content-text").first().text();

                let info = context.replace(/[`~!@#$%^&*()_|+\-=?;:'"<>\{\}\[\]\\\/]/gi, ' ')

                event.emit('wikiResult', info)

            }

        } else {

            event.emit('wikiResult', 'Error pulling the data from Wikipedia');

        }

    })
    
})