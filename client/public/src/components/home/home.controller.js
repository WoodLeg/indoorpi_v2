(function(){
    'use strict';

    angular
        .module('indoorPi.home')
        .controller('homeController', HomeController);

    HomeController.$inject = ['userFactory', '$state', 'socket', '$log', 'socketFactory'];

    function HomeController(userFactory, $state, socket, $log, socketFactory){

        var self = this;


        this.switches = [
            {
                id: 0,
                state: false,
                pin: 3
            },
            {
                id: 1,
                state: true,
                pin: 4
            },
            {
                id: 2,
                state: false,
                pin: 5
            },
            {
                id: 3,
                state: true,
                pin: 6
            }
        ];

        this.entity = {
        };


        this.switchGpio = function(entity){
            socketFactory.send({type: 'gpio', command: 'switch', entity: entity});
        };

        socket.onMessage(function(message){
            message = angular.fromJson(message.data);
            console.log(message);
            self.entity = message.data.entity;
        });

    }


})();
