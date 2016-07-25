(function(){
    'use strict';

    angular
        .module('indoorPi.home')
        .controller('homeController', HomeController);

    HomeController.$inject = ['userFactory', '$state', 'socket'];

    function HomeController(userFactory, $state, socket){

        // var self = this;

        console.log(socket);


        this.logout = function(){
            userFactory.removeLocal();
            $state.go('indoorPi.login');
        };

        this.gpioOn = function(){
            socket.send({msg: 'Switch gpio'});
        };

        socket.onMessage(function(message){
            console.log(angular.fromJson(message.data));
        });

    }


})();
