module.exports.default = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Content-Type', 'application/json');
    next();
};

module.exports.options = function(request, response, next) {
    if (request.method === 'OPTIONS') {
        // Add headers to response and send
        response.writeHead(200, {
            'access-control-allow-origin': '*',
            'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'access-control-allow-headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
        });
        response.end();
    } else {
        next();
    }
};
