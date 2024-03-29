var faye = require('faye');
var Message = require('./socket.payload.js');

var pubsub = {};
var client = new faye.Client('http://localhost:8000');
var sockets;
var response;

pubsub.getSockets = function(connection){
    sockets = connection;
};

pubsub.getResponse = function(_response){
    response = _response;
};

pubsub.publish = function(queue, message){
    client.publish(queue, message);
};

/**** PUBSUB SUBSCRIPTION *****/

client.subscribe('/gpio', function(bus){
    if (bus.status === 'done'){
        bus = Message.unwrap(bus);
        sockets.broadcast(JSON.stringify(bus));
    }
});

client.subscribe('/auth/response', function(message){
    response.header('Authorization', 'Bearer ' + message.token);
    response.status(200).send(message);
});


module.exports = pubsub;
