var express = require('express');
var faye = require('faye');
var router = express.Router();

var payload = require(__base + 'utils/request.payload.js');


var client = new faye.Client('http://localhost:8000');


module.exports = client;

router.post('/', function (request, response){

    // payload.post('/login', request.body).then(function(bitch){
    //     response.header('Authorization', 'Bearer ' + bitch.token);
    //     response.status(200).send(bitch);
    // }).catch(function(reason){
    //     response.status(500).send(reason);
    // });

    client.subscribe('/auth/response', function(message){
        response.header('Authorization', 'Bearer ' + message.token);
        response.status(200).send(message);
    });

    client.publish('/auth/login', request.body);


});

module.exports = router;
