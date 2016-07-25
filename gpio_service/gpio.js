var faye = require('faye');
var http = require('http');

var server = http.createServer();
var client = new faye.Client('http://localhost:8000');


client.subscribe('/gpio/on', function(message){
    console.log('[*] Start gpio: ', message);

    client.publish('/gpio/on/response', {msg: 'Yeah bitch ! '});

});

client.subscribe('/gpio/off', function(message){
    console.log('[*] Stop gpio: ', message);
});



server.listen(8879, function(){
    console.log('Gpio microservice listening on port 8879');
});
