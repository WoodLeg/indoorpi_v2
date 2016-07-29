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
            socketFactory.processMessage(message, function(command, data){
                switch (command){
                    case 'list':
                        self.switches = data.entities;
                        break;
                    case 'switch':
                        updateUniqueGpio(data.entity);
                        break;
                    default:
                        console.log('Error ProcessMessage');
                }
            });
        });

        /****** UTILS FUNCS *******/

        function updateUniqueGpio(object){
            angular.forEach(self.switches, function(entity, key){
                if (entity.id === object.id){
                    self.switches[key] = object;
                }
            });
        }

    }


})();
