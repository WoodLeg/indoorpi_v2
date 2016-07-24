var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');


var settings = require('./server.settings.js');
var controller = require('./controller');

app.use(morgan('dev'));
app.use(bodyParser.json());


app.post('/login', controller.login);


app.listen(settings.server.port, function(){
    console.log('Auth microservice listening on port', settings.server.port);
});
