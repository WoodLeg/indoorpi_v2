var jwt = require('jwt-simple');
var settings = require('./server.settings.js');

module.exports.login = function(request, response){


    // BDD sync later

    var encoded_user = jwt.encode(request.body, settings.jwt.secret);
    if (encoded_user){
        response.status(200).send({token: encoded_user, user: request.body});
    } else {
        response.status(500).send({err: 'Failed encoded user'});
    }

};
