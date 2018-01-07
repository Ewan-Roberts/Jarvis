
Jarvis is a home automation platform running on Node.js. It is able to track movement, respond to commands and provide useful functionality to make everything from waking up in the mornig to coming home more automated and interesting.


## Getting Started


To get started clone the repository and install the required dependencies:

```
git clone https://github.com/vanguard12/Jarvis.git

npm install

```

### Prerequisites

You will require the latest version of Node.js

Functionality for spotify is using applescript and therefore this functonality will only work on macOS

You will require an ardino and servos set up on any light switches you would like to automate. I good understanding of http://johnny-five.io/ is required for physical set up of required servos, motion control etc

You will require an API key from both the new york times and open weather. These keys are to be replaced in the api.js folder

api.openweathermap.org

api.nytimes.com

### Hardware

For this module a Macbook through an Ardino Mega is the controlling unit. Additional modules connect through the local network and share socket sessions for sharing functionality. 

The wiring looks like:

![fritzing version of hardware set up](http://url/to/img.pnghttps://github.com/vanguard12/Jarvis/blob/master/public/images/jarvis_hardware.jpg)

### Installing

Once the prerequisites are completed go to root and run 

```
node speechServer.js
```

Then load https://localhost:3001/

This will require going through unsecure local network and allowing the microphone to listen for key words, held in the command.js file

## Running the tests

Some tests have been created for api.js, clock.js and spanish.js functions. You can run these tests at root with mocha


