var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var settings = require('./server.settings.js');

app.use(morgan('dev'));
app.use(bodyParser.json());


app.post('/login', function(request, response){
    response.sendStatus(200);
});


app.listen(settings.server.port, function(){
    console.log('Auth microservice listening on port', settings.server.port);
})
