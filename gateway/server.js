var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var settings = require('./server.config.js');
var cors = require('cors');

var mainRouter = require('./routes');


app.options('*', cors());
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());



app.use(mainRouter);



app.listen(settings.server.port, function(){
    console.log('Gateway listening on port ', settings.server.port);
});
