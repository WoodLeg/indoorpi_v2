var pubsub = require('./pubsub.js');

module.exports = function(message, cb){

    message = JSON.parse(message);


    switch(message.data.type){
        case 'gpio':
            pubsub.publish('/gpio', message);
            cb(null);
            break;
        default:
            cb('No corresponding type');
    }




};
