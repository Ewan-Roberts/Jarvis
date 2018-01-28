
Jarvis is a home automation platform running on Node.js. It is able to track movement, respond to commands and provide useful functionality to make everything from waking up in the morning to coming home more automated and interesting.


## Getting Started


To get started clone the repository and install the required dependencies:

```
git clone https://github.com/vanguard12/Jarvis.git

npm install
```

### Prerequisites

You will require the latest version of Node.js which you can download here: https://nodejs.org/en/download/

Functionality for Spotify is using applescript and therefore this functonality will only work on macOS

You will require an Arduino and servos set up on any light switches you would like to automate, more details of which can be found in the hardware section below. 

This project is designed to be modular with aditional functionality being shared through sockets. Please refer to https://github.com/vanguard12/Jarvis-RaspberryPiExtention for controls of the lights, more automated lights and the opening and closing of doors.

A good understanding of http://johnny-five.io/ is highly reccomended for additional extentions. They have created a very user friendly and simple API. I suggest looking them up here: https://github.com/rwaldron/johnny-five

You will require an API key for the news, weather and you will require your user id from spotify for functionality to work. 

These keys are to be replaced in the api.js file under key.

api.openweathermap.org

api.nytimes.com

### Hardware

For this module a Macbook through an Arduino Mega is the controlling unit. Additional modules connect through the local network and share socket sessions for sharing functionality. 

The wiring for the project is below like:
![Alt text](public/images/jarvis_hardware.jpg?raw=true "Fritzing version of hardware set up")

For the extention the wiring is below: 
![Alt text](https://raw.githubusercontent.com/vanguard12/Jarvis-RaspberryPiExtention/master/images/piServer.jpg?raw=true "Fritzing version of hardware set up")

More details can be found here: https://github.com/vanguard12/Jarvis-RaspberryPiExtention

### Installing

Once the prerequisites are completed go to root and run 

```
node speechServer.js
```

Then load https://localhost:3001/

This will require going through unsecure local network and allowing the microphone to listen for key words, held in the command.js file

## Running the tests

Some tests have been created for api.js, clock.js and spanish.js functions. You can run these tests at root with mocha

for all BOOL STATEMENT's the below words can be used: 

'true', 'go','on','turn on','begin','start','wake'
return true

'false','off', 'turn off', 'stop', 'halt'
return false

## Example

[![Some functions together](https://img.youtube.com/vi/FZidrpRyMmw/0.jpg)](http://www.youtube.com/watch?v=FZidrpRyMmw)


## Commands

```
'what is the weather'
```
[![Some functions together](https://img.youtube.com/vi/MQJssPOCcvs/0.jpg)](http://www.youtube.com/watch?v=MQJssPOCcvs)

Reads out the weather for the day and displayed the weeks weather on the front end 

```
'bedroom ' BOOL STATEMENT || 'bathroom ' BOOL STATEMENT || 'lights ' BOOL STATEMENT
```
[![Light control](https://img.youtube.com/vi/vsF7BOcIcHc/0.jpg)](http://www.youtube.com/watch?v=vsF7BOcIcHc)

Turns on or off the bedroom lights || Turns on or off the bathroom lights || both

```
'spanish word'
```
[![Spanish Word](https://img.youtube.com/vi/putezPJB2xE/0.jpg)](http://www.youtube.com/watch?v=putezPJB2xE)


Reads out a new word from a list of a few hundred words in english then translates it into spanish and conjugates it in present tense in spanish

```
'what is the time'
```
[![Time fetch](https://img.youtube.com/vi/l_4Bto7Jdp8/0.jpg)](http://www.youtube.com/watch?v=l_4Bto7Jdp8)

Reads out the current time

```
'what is the news'
```
[![News fetch](https://img.youtube.com/vi/PFzltRlG_b4/0.jpg)](http://www.youtube.com/watch?v=PFzltRlG_b4)

Reads out your specified news articles

```
'Pause' || 'play' || 'next' || 'back' || stop
```
[![Player connection](https://img.youtube.com/vi/jOhSzYSmdE/0.jpg)](http://www.youtube.com/watch?v=jOhSzYSmdE)

Issues Spotify with the above commands

```
'open' 'Facebook' || 'You Tube'
```
Open an instance of google and one of the above sites

[![Open Tabs](https://img.youtube.com/vi/LHDqOTiI6ZI/0.jpg)](http://www.youtube.com/watch?v=LHDqOTiI6ZI)

```
'Facebook' || 'You Tube' 'search for' *Spat
```
[![Open Tabs](https://img.youtube.com/vi/bTU4utSTPNY/0.jpg)](http://www.youtube.com/watch?v=bTU4utSTPNY)

Open facebook or youtube and search for the thing you specify

```
'play my playlist' || 'play some music'
```
[![Open Tabs](https://img.youtube.com/vi/-WgycpPOQEc/0.jpg)](http://www.youtube.com/watch?v=-WgycpPOQEc)

Plays your Spotify playlist || Plays a song of your choosing

```
'search for song' *Spat
```
Searches spotify for the song you specify and plays the best match

```
'Wikipedia' *spat
```
[![Open Tabs](https://img.youtube.com/vi/B4qq65lz-rE/0.jpg)](http://www.youtube.com/watch?v=B4qq65lz-rE)

Searches Wikipedia and reads out the definition of the selection

```
'Clear' 
```
Hides the front end divs for news and for weather

```
'Volume' 'up' || 'down' || 'full' || 'half' 
```
Regulates the volume in relation to the above selections

```
'screen ' BOOL STATEMENT
```
[![Open Tabs](https://img.youtube.com/vi/g7o9jGtsu0o/0.jpg)](http://www.youtube.com/watch?v=g7o9jGtsu0o)

Takes a BOOL statement and turns on/off your screen

```
'timer for ' *Spat
```
Takes the number of minutes, creates a timer on the front end and tells the user when the timer is complete

```
'reload' or refresh
```
Reloads current page







