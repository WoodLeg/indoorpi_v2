var _socket;

module.exports.bus_payload = function(data){
    return {
        status: 'todo',
        message: data
    };
};

module.exports.unwrap = function(data){
    return data.message;
};


module.exports.removeBearer = function(data){
    var token = data.token;
    var array = token.split(' ');
    var newToken = array[1];
    data.token = newToken;
    return data;
};

module.exports.setSocket = function(socket) {
    _socket = socket;
};

module.exports.getSocket = function(){
    return _socket;
};
