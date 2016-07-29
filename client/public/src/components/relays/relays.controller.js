(function(){
    'use strict';


    angular
        .module('indoorPi.relays')
        .controller('relaysController', RelaysController);

    RelaysController.$inject = ['socketFactory', 'socket', '$timeout'];

    function RelaysController(socketFactory, socket, $timeout){

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
                        self.relays = data.entities;
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
                    self.relays[key] = object;
                }
            });
        }


    }



})();
