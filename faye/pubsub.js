var http = require('http');
var faye = require('faye');

var server = http.createServer();
var bayeux = new faye.NodeAdapter({mount: '/'});

bayeux.attach(server);

bayeux.on('handshake', function(clientId){
    console.log('[*] Pubsub server new connection: ', clientId);
});

bayeux.on('subscribe',function(clientId, channel){
    console.log('[*] New subscrition by ' + clientId + ' on ' + channel);
});


server.listen(8000, function(){
    console.log('Pubsub server listing on port 8000');
});
