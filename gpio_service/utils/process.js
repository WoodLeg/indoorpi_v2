module.exports.command = function(bus, cb){

    console.log('[*] Command requested: ', bus.message.data.command);

    switch (bus.message.data.command){
        case 'switch':
            // Trigger gpio action
            console.log(bus.message.data.entity.state);
            cb(bus);
            break;
        default:
            cb(err);
    }


};
