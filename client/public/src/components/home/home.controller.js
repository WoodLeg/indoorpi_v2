(function(){
    'use strict';

    angular
        .module('indoorPi.home')
        .controller('homeController', HomeController);

    HomeController.$inject = ['userFactory', '$state', 'socket', '$log', 'socketFactory', '$scope'];

    function HomeController(userFactory, $state, socket, $log, socketFactory, $scope){

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
            message = angular.fromJson(message.data);
            console.log(message);
            self.entity = message.data.entity;
        });

    }


})();
