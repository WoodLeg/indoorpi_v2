(function(){
    'use strict';

    angular
        .module('indoorPi.user')
        .factory('userFactory', UserFactory);

    UserFactory.$inject = ['userService', '$localStorage'];

    function UserFactory(userService, $localStorage){

        var userFactory = {};


        userFactory.login = function(user) {
            return userService.login(user);
        };

        userFactory.setLocal = function(user){
            $localStorage.user = JSON.stringify(user);
        };

        return userFactory;


    }

})();
