"use strict";

const cheerio = require('cheerio');
const request = require('request');

module.exports = (res,socket) => {

    let url = 'https://en.wikipedia.org/wiki/' + res;

        request(url, (error, response, html) => {

        if(!error){
            
            let $ = cheerio.load(html);            

            if($('.mbox-small').length > 0) {

                $('.mbox-small').remove()

            }

            if($('.vertical-navbox').length > 0) {

                $('.vertical-navbox').remove()

            }

            if($('#mw-content-text').find('p').first().children().text().indexOf("this message may") > -1) {

                logger.log('No result for what you search for')

            }

            if($('#mw-content-text').find('p').first().text().indexOf("may refer") > -1) {
            
                if($('#toc').length > 0) {

                    $('#toc').remove()
                }

                if($('.mbox-small').length > 0) {

                    $('.mbox-small').remove()
                }   

                let firstInList = $('#mw-content-text').find("li").find("a").first().attr('href')

                let url2 = 'https://en.wikipedia.org' + firstInList;

                request(url2, (error, response, html) => {
                    
                    let $ = cheerio.load(html);
                    
                    if(!error){

                        let context = $("p", "#mw-content-text").first().text();

                        socket.emit('wikiResult', context)

                    }

                })

            }

            else {

                let context = $("p", "#mw-content-text").first().text();

                socket.emit('wikiResult', context)

            }

        }

    })
    
}