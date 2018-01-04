

const favicon = require('serve-favicon');

const app = require('express')();

// Module dependencies
const express = require('express');
const http = require('https');
const path = require('path');
const fs = require("fs");

app.use(express.bodyParser());
// app.use(express.basicAuth('admin', 'green'))
app.set('port', process.env.PORT || 3001);
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

app.get('/doorclose', function(req, res) {

    console.log('close door')

});  

app.get('/dooropen', function(req, res) {

    console.log('close door')

}); 

const options = {

  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('key-cert.pem')

};

// setup server
//TODO : Nasty global here
server = http.createServer(options, app).listen(app.get('port'), () => {
 
  console.log('Express server listening on port ' + app.get('port'));

});

server.listen(3012);
