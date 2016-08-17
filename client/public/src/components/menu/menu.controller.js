(function(){
    'use strict';

    angular
        .module('indoorPi.menu')
        .controller('menuController', MenuController);

    MenuController.$inject = ['$state','userFactory', 'socketFactory'];

    function MenuController($state, userFactory, socketFactory){

        this.logout = function(){
            socketFactory.send({type: 'user', command: 'logout'});
            userFactory.removeLocal();
            $state.go('indoorPi.login');
        };

        this.goToPage = function(page) {
            $state.go('indoorPi.' + page);
        };

    }


})();
