(function(){
    'use strict';

    angular
        .module('indoorPi.menu')
        .controller('menuController', MenuController);

    MenuController.$inject = [];

    function MenuController(){

        this.logout = function(){
            userFactory.removeLocal();
            $state.go('indoorPi.login');
        };

    }


})();
