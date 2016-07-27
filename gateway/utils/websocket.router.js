var Pubsub = require('./pubsub.js');
var Message = require('./socket.payload.js');

module.exports = function(data, cb){

    data = Message.removeBearer(JSON.parse(data));
    var payload = Message.bus_payload(data);

    switch(payload.message.data.type){
        case 'gpio':
            Pubsub.publish('/gpio', payload);
            cb(null);
            break;
        default:
            cb('No corresponding type');
    }


};
