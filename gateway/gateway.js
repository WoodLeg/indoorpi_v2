global.__base = __dirname + '/';

var express = require('express');
var app = express();
var server = require('http').createServer();
var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({server: server});

var bodyParser = require('body-parser');
var morgan = require('morgan');
var settings = require('./server.config.js');


var pubsub = require('./utils/pubsub.js');
var wsRouter = require('./utils/websocket.router.js');
var mainRouter = require('./routes');
var headers = require('./middlewares/headers');

var url = require('url');


/***** REST API ******/
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(headers.options);
app.use(headers.default);

app.use(mainRouter);

/***** Socket ********/

wss.broadcast = function (data) {
  wss.clients.forEach(function each(client) {
    client.send(data);
  });
};

wss.on('connection', function(ws){
    var location = url.parse(ws.upgradeReq.url, true);
    console.log('New connection');
    pubsub.getSocket(wss);

    ws.on('message', function(message){
        console.log('[*] Socket message received: ', message);
        wsRouter(message, function(err){
            if (err) ws.send(err);
        });
    });

    ws.on('close', function(){
        console.log('Connection stopped');
    });
});


server.on('request', app);
server.listen(settings.server.port, function(){
    console.log('Gateway listening on port ', settings.server.port);
});
