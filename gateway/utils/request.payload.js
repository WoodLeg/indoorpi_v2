var rp = require('request-promise');

module.exports.post = function(endpoint, data){

    var options = {
        method: 'POST',
        uri: 'http://localhost:7332' + endpoint,
        body: data,
        json: true // Automatically stringifies the body to JSON
    };

    return rp(options);


};
