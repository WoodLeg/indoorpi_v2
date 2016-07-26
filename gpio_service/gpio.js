var faye = require('faye');
var http = require('http');

var server = http.createServer();
var client = new faye.Client('http://localhost:8000');

var process = require('./utils/process');


client.subscribe('/gpio', function(message){
    console.log('[*] gpio: ', message);

    process.command(message, function(){
        client.publish('/gpio/response', {msg: 'Yeah bitch ! '});
    });

});


server.listen(8879, function(){
    console.log('Gpio microservice listening on port 8879');
});
