var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var settings = require('./server.config.js');

var mainRouter = require('./routes');

app.use(morgan('dev'));
app.use(bodyParser.json());



app.use(mainRouter);



app.listen(settings.server.port, function(){
    console.log('Listening on port ', settings.server.port);
});
