
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

You will require an Ardino and servos set up on any light switches you would like to automate, more details of which can be found in the hardware section below. 

This projet is designed to be modular with aditional functionality being shared trhoguh sockets. Please refer to piServer for controls of the lights, more automated lights and the opening and closing of doors.

I good understanding of http://johnny-five.io/ is highly reccomended for additional extentions. They have created a very use friendly and simple API. I suggest lookthing them up here: https://github.com/rwaldron/johnny-five

You will require an API key for the news, weather and you will require your user id from spotify for funtionaly to work. 

These keys are to be replaced in the api.js file under key.

api.openweathermap.org

api.nytimes.com

### Hardware

For this module a Macbook through an Ardino Mega is the controlling unit. Additional modules connect through the local network and share socket sessions for sharing functionality. 

The wiring looks like:
![Alt text](public/images/jarvis_hardware.jpg?raw=true "Fritzing version of hardware set up")

### Installing

Once the prerequisites are completed go to root and run 

```
node speechServer.js
```

Then load https://localhost:3001/

This will require going through unsecure local network and allowing the microphone to listen for key words, held in the command.js file

## Running the tests

Some tests have been created for api.js, clock.js and spanish.js functions. You can run these tests at root with mocha

for all BOOL STATEMENT's below the below words can be used: 

'true', 'go','on','turn on','begin','start','wake'
return true

'false','off', 'turn off', 'stop', 'halt'
return true


## Commands

```
'what is the weather'
```

Reads out the weather for the day and displayed the weeks weather on the front end 

```
'spanish word'
```
Reads out a new word from a list of a few hundred words in english then translates it into spanish and conjugates it in present tense in spanish

```
'what is the time'
```
Reads out the current time

```
'what is the news'
```
Reads out your specified news articles

```
'Pause' || 'play' || 'next' || 'back' || stop
```
Issues Spotify with the above commands

```
'open' 'Facebook' || 'You Tube'
```
Open an instance of google and one of the above sites

```
'Facebook' || 'You Tube' 'search for' *Spat
```
Open facebook or youtube and search for the thing you specify

```
'play my playlist'
```
Plays your Spotify playlist

```
'play some music'
```
Plays a song of your choosing

```
'search for song' *Spat
```
Searches spotify for the song you specify and plays the best match

```
'Wikipedia' *spat
```
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
Takes a BOOL statement and turns on/off your screen

```
'timer for ' *Spat
```
Takes the number of minutes, creates a timer on the front end and tells the user when the timer is complete

```
'reload' or refresh
```
Reloads current page

```
'bedroom ' BOOL STATEMENT
```
Turns on or off the bedroom lights

```
'bathroom ' BOOL STATEMENT
```
Turns on or off the bathroom lights

```
'lights ' BOOL STATEMENT
```
Turns on or off the both bathroom and bedroom lights




