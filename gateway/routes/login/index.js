var express = require('express');
var router = express.Router();

var payload = require(__base + 'utils/request.payload.js');


var pubsub = require(__base + 'utils/pubsub.js');


router.use('*', function(request, response, next){
    pubsub.getResponse(response);
    next();
});

router.post('/', function (request, response){

    pubsub.publish('/auth/login', request.body);

});

module.exports = router;
