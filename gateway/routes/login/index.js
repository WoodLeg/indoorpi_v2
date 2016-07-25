var express = require('express');
var router = express.Router();

var payload = require(__base + 'utils/request.payload.js');


var client = require(__base + 'utils/pubsub.js');


module.exports = client;

router.post('/', function (request, response){


    client.subscribe('/auth/response', function(message){
        response.header('Authorization', 'Bearer ' + message.token);
        response.status(200).send(message);
    });

    client.publish('/auth/login', request.body);


});

module.exports = router;
