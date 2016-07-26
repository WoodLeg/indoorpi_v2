module.exports.command = function(message, cb){

    console.log('[*] Command requested: ', message);

    switch (message.command){
        case 'switch':
            // Trigger gpio action
            cb();
            break;
        default:
            cb(err);
    }


};
