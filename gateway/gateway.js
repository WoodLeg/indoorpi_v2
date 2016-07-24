global.__base = __dirname + '/';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var settings = require('./server.config.js');

var mainRouter = require('./routes');
var headers = require('./middlewares/headers');


app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(headers.options);
app.use(headers.default);


app.use(mainRouter);



app.listen(settings.server.port, function(){
    console.log('Gateway listening on port ', settings.server.port);
});
