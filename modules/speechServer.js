

const favicon = require('serve-favicon');
const app = require('express')();

// Module dependencies
const express = require('express');
const http = require('https');
const path = require('path');
const fs = require("fs");
const eventHandler = require('./eventHandler');

app.use(express.bodyParser());
app.set('port', process.env.PORT || 3002);
app.engine('html', require('ejs').renderFile);
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static('public'))

// Development only
// app.use(favicon(__dirname + '/public/images/favicon.ico'));

app.get('/', function (req, res) {

  res.sendfile('index.html', {'root': '../speech/public'});
 
});

//sets up local certifications so Chrome doesnt throw an error
const options = {

	key: fs.readFileSync('./localhost.key'),
    cert: fs.readFileSync('./localhost.cert'),
    requestCert: false,
    rejectUnauthorized: false

};

//Create a global server to be accessed across the application
server = http.createServer(options, app).listen(app.get('port'), () => {
 
  console.log('Server listening on port ' + app.get('port'));

});

server.listen(3012);