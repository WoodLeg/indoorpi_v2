var express = require('express');
var router = express.Router();

var rp = require('request-promise');

router.post('/', function (request, res){

    var options = {
        method: 'POST',
        uri: 'http://localhost:7332/login',
        body: request.body,
        json: true // Automatically stringifies the body to JSON
    };

    rp(options).then(function(response){
        res.status(200).json(response);
    }).catch(function(reason){
        res.status(500).json(reason);
    });

});

module.exports = router;
