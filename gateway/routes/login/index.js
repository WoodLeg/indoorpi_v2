var express = require('express');
var router = express.Router();

var payload = require(__base + 'utils/request.payload.js');

router.post('/', function (request, response){

    payload.post('/login', request.body).then(function(bitch){
        response.header('Authorization', 'Bearer ' + bitch.token);
        response.status(200).send(bitch);
    }).catch(function(reason){
        response.status(500).send(reason);
    });

});

module.exports = router;
