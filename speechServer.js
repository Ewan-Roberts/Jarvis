"use strict";

//external libraries
const cheerio = require('cheerio')
const logger = require('tracer').console({format : "line: {{line}} |  {{message}} "});
const request = require('request');
const childProc = require('child_process');
const spotify = require('spotify-node-applescript');

//internal libraries
const app = require('./modules/speechServer.js')
// let boardSetUp = require('./modules/boardSetUp.js')
const computer = require('./modules/computer.js')
const clock = require('./modules/clock.js')
const morning = require('./modules/morning.js')
const api = require('./modules/api.js')
const eventHandler = require('./modules/eventHandler');
const timer = require('./modules/timer.js')
const piServer = require('./modules/piServer.js')
const spanish = require('./modules/spanish.js')
const io = require('socket.io').listen(server);


io.on('connection', socket => { 

    // Testing
    // eventHandler.emit("morning", socket)
    // eventHandler.emit("welcomeHome", socket)
    // boardSetUp()

    socket.on("spanish", () => {

        eventHandler.emit("spanish", socket)
        
    });
    

    console.log('sqqwqw')

    timer(socket)

    logger.log("connection set up")

    // api.on("triggerWeather", = data => {

    //     socket.emit('weatherData', data);

    // }) 

    socket.on('error', err => {

        logger.log(err);

    });

    socket.on("screen", action => {

        if (computer.digest(action)) {

            computer.screenWake()

        } else {

            computer.screenSleep()

        }
        
    });

    socket.on("keepTheLight", action => {

        //bedroomLight.action(true)

    });

    socket.on("keepTheLight", action => {

        //bedroomLight.action(true)

    });

    socket.on('bedroom', action => {
        
        bedroomLight.action(computer.digest(action))

    });

    socket.on('lights', action => {

        bedroomLight.action(computer.digest(action))

        bathroomLight.action1(computer.digest(action))

    });

    socket.on('bathroom', action => {

        bathroomLight.action1(computer.digest(action))

    });

    socket.on('news', res => {

        api.fetchNewsdata(data => {

            socket.emit('news', data)

        });

    })

    socket.on('weather', res => {
        
        api.fetchWeaterData(data => {
            
            data.morning = false;

            socket.emit('weather', data)
            
        });

    })

    socket.on('setVolume', volume => {
        
        logger.log(volume)

        if(volume <= 2) {

            childProc.exec('osascript -e "set Volume 2"');

        }

        if(volume > 2 <= 6) {

            childProc.exec('osascript -e "set Volume 6"');

        }

        if(volume > 6) {

            childProc.exec('osascript -e "set Volume 10"');

        }    

    });

    socket.on('browserControls', res => {

        switch(res) {

            case 'Spotify':

                childProc.exec('open /applications/Spotify.app');

            break;

            case 'Jarvis':

                childProc.exec('open -a "Google Chrome" --new --args https://localhost:3001/microphone');

            break;

            case 'Facebook':

                childProc.exec('open -a "Google Chrome" --new --args --ingognito https://www.facebook.com/ewanr');

            break;

            case 'YouTube':

                childProc.exec('open -a "Google Chrome" --new --args --ingognito https://www.youtube.com/feed/subscriptions');

            break;

        }

    })

    socket.on('applicationSearch', res => {

        switch(res.vessel) {

            case 'Facebook':

                childProc.exec('open -a "Google Chrome" --new --args -ingognito https://www.facebook.com/search/top/?q=' + res.search);

            break;

            case 'YouTube':

                childProc.exec('open -a "Google Chrome" --new --args -ingognito https://www.youtube.com/results?search_query=' + res.search);

            break;
        }

    })

    socket.on('playUserPlaylist', res => {

        spotify.setVolume(80);

        spotify.playTrackInContext('spotify:track:4H1QorBfrOrShDyHZAxQoM', 'spotify:user:1130242707:playlist:6Gj9EYigkSxPRFox6rLSC8');

    })

    socket.on('setSpotifyVolume', int => {

        spotify.setVolume(int)

    })

    socket.on('playTrack', res => {

        spotify.playTrack('spotify:track:' + res, () => {
            
            spotify.getTrack((err, track) => {

                socket.emit('trackInfo', track)

            });

        });

    })

    socket.on('musicControls', res => { 

        switch(res) {
            
            case 'next':
                logger.log('next please')
                spotify.next()
                break;
            case 'play':
                logger.log('play please')
                spotify.play()
                break;
            case 'pause':
                logger.log('Pause please')
                spotify.pause()
                break;
            case 'back':
                logger.log('next please')
                spotify.previous()
                break;
            case 'up':
                logger.log('up please')
                childProc.exec('osascript -e "set Volume 6"');
                spotify.volumeUp()
                break;
            case 'down':
                logger.log('volume Down please')
                childProc.exec('osascript -e "set Volume 6"');
                spotify.volumeDown()
                break;
            case 'full':
                logger.log('volume full please')
                childProc.exec('osascript -e "set Volume 10"');
                spotify.setVolume(100);
                break;
            case 'half':
                logger.log('volume half please')
                childProc.exec('osascript -e "set Volume 6"');
                spotify.setVolume(50);
                break;
    
        }

    })

    socket.on('wikiQuery', res => {

        let url = 'https://en.wikipedia.org/wiki/' + res;

        request(url, (error, response, html) => {
            
            logger.log(error)

            if(!error){
                
                let $ = cheerio.load(html);            

                if($('.mbox-small').length > 0) {

                        $('.mbox-small').remove()
                }

                if($('.vertical-navbox').length > 0) {

                    $('.vertical-navbox').remove()
                }
                
                //nothing returned

                if($('#mw-content-text').find('p').first().children().text().indexOf("this message may") > -1) {

                    logger.log('No result for what you search for')

                }

                //SEARCH PAGE: if the element doesnt exists this is a search page

                if($('#mw-content-text').find('p').first().text().indexOf("may refer") > -1) {

                    logger.log('this is a search page')
                
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

    })

});
 



    //  socket.on('travel', res => {
        
    //     logger.log(res)

    //     logger.log('starting weather request')

    //     var options = {

    //         host: 'api.tfl.gov.uk',

    //         path: '/Place/BikePoints_489'
    //         // svc/mostpopular/v2/mostviewed/arts/30.xml?offset=40
    //     };

    //     callback = response => {
            
    //         logger.log(response)

    //         var str = '';

    //         //another chunk of data has been recieved, so append it to `str`
    //         response.on('data', chunk => {

    //             str += chunk;

    //         });

    //         //the whole response has been recieved, so we just print it out here
    //         response.on('end', () => {
                
    //             str = JSON.parse(str)
                
    //             socket.emit('travelData', str);

    //         });

    //     }

    //     http2.request(options, callback).end();

    // })








