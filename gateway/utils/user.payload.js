var socketUtil = require('./socket.payload.js');

module.exports.processMessage = function(req){

    switch(req.message.data.command){
        case 'logout':
            var socket  = socketUtil.getSocket();
            console.log('Gracefully close connection.');
            socket.close();
            break;
        default:
    }
};
