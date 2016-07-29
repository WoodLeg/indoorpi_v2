(function(){
    'use strict';

    angular
        .module('indoorPi.home')
        .controller('homeController', HomeController);

    HomeController.$inject = ['userFactory', '$state', 'socket', '$log', 'socketFactory', '$timeout'];

    function HomeController(userFactory, $state, socket, $log, socketFactory, $timeout){

        var self = this;



        $timeout(function(){
            socketFactory.send({type: 'gpio', command: 'list'});
        });


        this.switchGpio = function(entity){
            socketFactory.send({type: 'gpio', command: 'switch', entity: entity});
        };

        socket.onMessage(function(message){
            message = angular.fromJson(message.data);
            console.log(message);
            self.switches = message.data;
        });

    }


})();
