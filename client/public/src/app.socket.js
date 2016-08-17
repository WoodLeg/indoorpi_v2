(function(){
    'use strict';

    angular
        .module('indoorPi')
        .factory('socket', Socket)
        .factory('socketFactory', SocketFactory)
        .service('socketService', SocketService);

    SocketFactory.$inject = ['userFactory', 'socketService'];
    SocketService.$inject = ['socket'];
    Socket.$inject = ['$websocket'];


    function Socket($websocket){

        var dataStream = $websocket('ws://localhost:7331', 'echo-protocol');

        return dataStream;
    }


    function SocketFactory(userFactory, socketService){

        var socketFactory = {};

        socketFactory.send = function(req) {
            var payload = {
                token: userFactory.getToken(),
                data: req
            };

            console.log(payload);
            socketService.send(payload);
        };

        socketFactory.processMessage = function(object,cb){
            cb(object.data.command, object.data);
        };


        return socketFactory;
    }

    function SocketService(socket){

        this.send = function(req){
            socket.send(req);
        };

    }

})();
