var http = require('http');
var faye = require('faye');
var jwt = require('jwt-simple');

var server = http.createServer();
var client = new faye.Client('http://localhost:8000');

var settings = require('./server.settings.js');

client.subscribe('/auth/login', function(user){
    console.log('[*] Received: ', user);

    var encoded_user = jwt.encode(user, settings.jwt.secret);
    var response = {token : encoded_user, user: user};

    client.publish('/auth/response', response);
});


server.listen(settings.server.port, function(){
    console.log('Auth microservice listening on port', settings.server.port);
});
