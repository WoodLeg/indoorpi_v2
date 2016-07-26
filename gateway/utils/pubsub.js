var faye = require('faye');

var pubsub = {};
var client = new faye.Client('http://localhost:8000');
var socket;
var response;

pubsub.getSocket = function(connection){
    socket = connection;
};

pubsub.getResponse = function(_response){
    response = _response;
};

pubsub.publish = function(queue, message){
    client.publish(queue, message);
};

/**** PUBSUB SUBSCRIPTION *****/

client.subscribe('/gpio/response', function(message){
    console.log('[*] Receive pubsub message gpio: ', message);
    socket.broadcast(JSON.stringify(message));
});

client.subscribe('/auth/response', function(message){
    response.header('Authorization', 'Bearer ' + message.token);
    response.status(200).send(message);
});


module.exports = pubsub;
