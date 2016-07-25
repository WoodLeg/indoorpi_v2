(function(){
    'use strict';

    angular
        .module('indoorPi')
        .factory('socket', Socket);

    Socket.$inject = ['$websocket'];

    function Socket($websocket){

        var dataStream = $websocket('ws://localhost:7331', 'echo-protocol');

        return dataStream;
    }


})();
