(function(){
    'use strict';

    angular
        .module('indoorPi.home')
        .controller('homeController', HomeController);

    HomeController.$inject = ['userFactory', '$state', 'socket', '$log', 'socketFactory'];

    function HomeController(userFactory, $state, socket, $log, socketFactory){

        var self = this;


        this.logout = function(){
            userFactory.removeLocal();
            $state.go('indoorPi.login');
        };

        this.entity = {
            id: 0,
            state: false
        };

        this.switchGpio = function(entity){
            socketFactory.send({type: 'gpio', command: 'switch', entity: entity});
        };

        socket.onMessage(function(message){
            $log.debug(angular.fromJson(message.data));
        });

    }


})();
