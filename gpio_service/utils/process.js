module.exports.command = function(message, cb){

    console.log('[*] Command requested: ', message.command);

    switch (message.data.command){
        case 'switch':
            // Trigger gpio action
            cb();
            break;
        default:
            cb(err);
    }


};
