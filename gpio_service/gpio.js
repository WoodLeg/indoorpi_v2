var faye = require('faye');
var http = require('http');

var server = http.createServer();
var client = new faye.Client('http://localhost:8000');

var process = require('./utils/process');


client.subscribe('/gpio', function(bus){
    if (bus.status === 'todo'){
        process.command(bus, function(data){
            data.status = 'done';
            client.publish('/gpio', data);
        });
    }
});


server.listen(8879, function(){
    console.log('Gpio microservice listening on port 8879');
});
