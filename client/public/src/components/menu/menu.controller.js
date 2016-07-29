(function(){
    'use strict';

    angular
        .module('indoorPi.menu')
        .controller('menuController', MenuController);

    MenuController.$inject = ['$state','userFactory'];

    function MenuController($state, userFactory){

        this.logout = function(){
            userFactory.removeLocal();
            $state.go('indoorPi.login');
        };

        this.goToPage = function(page) {
            $state.go('indoorPi.' + page);
        };

    }


})();
