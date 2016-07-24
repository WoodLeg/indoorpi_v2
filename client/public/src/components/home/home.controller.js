(function(){
    'use strict';

    angular
        .module('indoorPi.home')
        .controller('homeController', HomeController);

    HomeController.$inject = ['userFactory', '$state'];

    function HomeController(userFactory, $state){

        var self = this;

        this.logout = function(){
            userFactory.removeLocal();
            $state.go('indoorPi.login');
        }

    }


})();
