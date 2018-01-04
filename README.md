

## Getting Started

Download/Pull the files above and download the required node packages

```
sudo npm install
```

### Prerequisites

You will require the latest version of Node.js

Functionality for spotify is using applescript and therefore this functonality will only work on macOS

You will require an ardino and servos set up on any light switches you would like to automate. I good understanding of http://johnny-five.io/ is required for physical set up of required servos, motion control etc

You will require an API key from both the new york times and open weather. These keys are to be replaced in the api.js folder

api.openweathermap.org

api.nytimes.com


### Installing

A step by step series of examples that tell you have to get a development env running

Say what the step will be

```
Give the example
```

And repeat

```
until finished
```

End with an example of getting some data out of the system or using it for a little demo

## Running the tests

Explain how to run the automated tests for this system

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Maven](https://maven.apache.org/) - Dependency Management
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Billie Thompson** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone who's code was used
* Inspiration
* etc






//Event handers for kicking off functions
const eventHandler = require('./modules/eventHandler');

//Turns the bathroom and bedroom lights to on/off

eventHandler.emit("lightsOff")
eventHandler.emit("lightsOn")

//Sends a spanish word to the front end and is read out, spanish words are held in a JSON file at root
eventHandler.emit("spanish")


//In order of events
//Sets computer volume
//Plays a defined spotify track
//Turns on the light
//Reads the weather data for the day
//Reads out loud the weather data for the day
//Reads out loud the politics news from the new york times 
//Reads out a spanish word for the day

eventHandler.emit("morning")



computer.digest(action)
