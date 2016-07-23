var express = require('express');
var router = express.Router();

router.post('/login', function (request, response){
    response.send(200);
});

module.exports = router;
