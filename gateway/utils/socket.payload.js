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
