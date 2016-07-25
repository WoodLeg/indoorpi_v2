global.__base = __dirname + '/';

var express = require('express');
var app = express();
var server = require('http').createServer(app);
var WebSocketServer = require('websocket').server;

var bodyParser = require('body-parser');
var morgan = require('morgan');
var settings = require('./server.config.js');


var client = require('./utils/pubsub.js');
var mainRouter = require('./routes');
var headers = require('./middlewares/headers');


/***** REST API ******/
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(headers.options);
app.use(headers.default);

app.use(mainRouter);

/****** PUBSUB *******/



/***** SOcket ********/
wsServer = new WebSocketServer({
    httpServer: server
});

wsServer.on('request', function(request){
    var connection = request.accept('echo-protocol', request.origin);
    console.log('Connection Accepted');

    connection.on('close', function(){
        console.log('echo-protocol Connection Closed');
    });

    connection.on('message', function(message){
        console.log('[*] Received socket message: ', message);

        client.subscribe('/gpio/on', function(message){
            console.log('[*] Receive pubsub message gpio: ', message);
            connection.send(JSON.stringify(message));
        });

        client.publish('/gpio/on', message);

    });

});

server.listen(settings.server.port, function(){
    console.log('Gateway listening on port ', settings.server.port);
});
