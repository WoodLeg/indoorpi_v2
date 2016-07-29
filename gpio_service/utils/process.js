var mock = require('../mocks.gpio.js');

module.exports.command = function(bus, cb){

    console.log('[*] Command requested: ', bus.message.data.command);

    switch (bus.message.data.command){
        case 'switch':
            // Trigger gpio action
            cb(bus);
            break;
        case 'list':
            bus.message.data.entities = mock();
            cb(bus);
            break;
        default:
            cb(err);
    }


};
