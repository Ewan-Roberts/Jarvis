
Jarvis is a voice and motion activated home automation platform. It provides developers with everything from: automating lights and doors, to welcoming users home with the news and their favourite song on Spotify.

Jarvis is built in a modular fashion, allowing additional functionality to constantly be added, as long as data can be transmitted through shared sockets. 

An example of an extension can be found here: [Jarvis Extension](https://github.com/vanguard12/Jarvis-RaspberryPiExtention)

## Getting Started


To get started, clone the repository and install the required dependencies:

```
git clone https://github.com/vanguard12/Jarvis.git

npm install
```

## Prerequisites

- **Node.js:** You will require the latest version of Node.js, that can download here: https://nodejs.org/en/download/

- **API Keys:** You will require an API key for the news, weather functions and you will require your user id from Spotify for Spotify to work. These API keys are to be replaced in the userInformation.js file under modules. Keys can be created below
  - api.openweathermap.org
  - api.nytimes.com
  - Spotify ID can be found when you share your profile link, and it should be after http://open.spotify.com/user/

- **MacOS:** Currently functionality for Spotify is using applescript and therefore requires macOS

- **Arduino:** You will require an Arduino, Firmata and servos set up on any light switches you would like to automate. More details of which can be found in the hardware and Arduino sections below. 

- **Modules:** For a full feature list please refer to https://github.com/vanguard12/Jarvis-RaspberryPiExtention for controls of additional lights, the open and closing of doors and buttons to control functionality.

- **Johnny-Five:** A good understanding of http://johnny-five.io/ is highly recommended for additional extensions. They have created a very user friendly and simple API. API documentation here: https://github.com/rwaldron/johnny-five


## Arduino Set Up 

Johnny-Five is one of the corner stones of the functionality and uses a protocol called Firmata to communicate over USB to the microcontroller.

### Setting Up Firmata

- Before you can start you will need to load Firmata onto your Arduino-compatible microcontroller:

### Download Arduino IDE

- Connect your Arduino-compatible microcontroller via USB
- Launch Arduino IDE and open the Firmata sketch via the menu: File > Examples > Firmata > StandardFirmata
- Select your Arduino board type (e.g. Arduino Uno) via Tools > Board
- Select the port for your board via Tools > Serial Port > (the comm port of your Arduino)
- Upload the program by selecting File > Upload
- If you are having trouble uploading, a full trouble shooting guide can be found here: http://ardx.org/TRBL

###### excerpt from the very helpful http://node-ardx.org/

## Hardware

The layout of the hardware wiring for Jarvis and the additional extension can be found below:

![Alt text](public/images/jarvis_hardware.jpg?raw=true "Fritzing version of hardware set up")

For the extension the wiring is below, with more information on the extension here: https://github.com/vanguard12/Jarvis-RaspberryPiExtention
![Alt text](https://raw.githubusercontent.com/vanguard12/Jarvis-RaspberryPiExtention/master/images/piServer.jpg?raw=true "Fritzing version of hardware set up")



## Running

Once the prerequisites are completed, go to root and run:

```
node speechServer.js
```

Then load https://localhost:3003/

This will require going through unsecure local network and allowing the microphone to listen for key words, held in the command.js file. The list of commands can be found below:


## Running The Tests

Tests have not been created for each function, however most complicated functionality is covered. You can run these tests at root with "npm test"


## BOOL/Spat Management

In Jarvis *spats* are used. Effectively they represent an input and pass the string to the back end to be interpreted. If these spats are to indicate an on or off state, they are digested as demonstrated below:

BOOL statements are linked to the below words: 


| True        | False       |    
| ------------|:-----------:|
| 'true'      | 'false'     |
| 'go'        | 'off'       |
| 'on'        | turn off'   |
| 'turn on'   | 'stop'      |
| 'begin'     | centered    |
| 'start'     | 'halt'      |
| 'wake'      | 'pause'     |


For example: "bedroom {on}", "bedroom {turn on}", "bedroom {start}" would all turn the light on.


## Example Of Combined Functionality

[![Some functions together](https://img.youtube.com/vi/FZidrpRyMmw/0.jpg)](http://www.youtube.com/watch?v=FZidrpRyMmw)



## Command List

```
'what is the weather'
```
[![Some functions together](https://img.youtube.com/vi/MQJssPOCcvs/0.jpg)](http://www.youtube.com/watch?v=MQJssPOCcvs)

Reads out the weather for the day and displays the weeks weather on the front end 

```
'bedroom ' BOOL STATEMENT || 'bathroom ' BOOL STATEMENT || 'lights ' BOOL STATEMENT
```
[![Light control](https://img.youtube.com/vi/vsF7BOcIcHc/0.jpg)](http://www.youtube.com/watch?v=vsF7BOcIcHc)

Turns on or off the bedroom lights || Turns on or off the bathroom lights || both

```
'spanish word'
```
[![Spanish Word](https://img.youtube.com/vi/putezPJB2xE/0.jpg)](http://www.youtube.com/watch?v=putezPJB2xE)


Reads out a new word from a list of a few hundred words in english, then translates it into spanish and conjugates it in present tense

```
'what is the time'
```
[![Time fetch](https://img.youtube.com/vi/l_4Bto7Jdp8/0.jpg)](http://www.youtube.com/watch?v=l_4Bto7Jdp8)

Reads out the current time

```
'what is the news'
```
[![News fetch](https://img.youtube.com/vi/PFzltRlG_b4/0.jpg)](http://www.youtube.com/watch?v=PFzltRlG_b4)

Reads out your specified news articles from the New York Times

```
'Pause' || 'play' || 'next' || 'back' || stop
```
[![Player connection](https://img.youtube.com/vi/-jOhSzYSmdE/0.jpg)](https://www.youtube.com/watch?v=-jOhSzYSmdE)

Issues Spotify with the above commands

```
'open' 'Facebook' || 'You Tube'
```
Opens an instance of Google/Facebook/YouTube

[![Open Tabs](https://img.youtube.com/vi/LHDqOTiI6ZI/0.jpg)](http://www.youtube.com/watch?v=LHDqOTiI6ZI)

```
'Facebook' || 'You Tube' 'search for' *Spat
```
[![Open Tabs](https://img.youtube.com/vi/bTU4utSTPNY/0.jpg)](http://www.youtube.com/watch?v=bTU4utSTPNY)

Open Facebook or YouTube and search for the *spat* specified

```
'play my playlist' || 'play some music'
```
[![Open Tabs](https://img.youtube.com/vi/-WgycpPOQEc/0.jpg)](http://www.youtube.com/watch?v=-WgycpPOQEc)

Plays users Spotify playlist || Plays a song of your choosing

```
'search for song' *Spat
```
Searches Spotify for the *spat* you specify and plays the best match

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
'timer for ' *Spat / stop / reset
```
Takes the number of minutes, creates a timer on the front end and tells the user when the timer is complete / pauses / resets

```
'reload' or 'refresh'
```
Reloads current page



This is just an update so my repo goes higher and recruiters dont see so much of me mucking around being bored



