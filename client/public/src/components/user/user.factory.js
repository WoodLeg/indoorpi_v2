(function(){
    'use strict';

    angular
        .module('indoorPi.user')
        .factory('userFactory', UserFactory);

    UserFactory.$inject = ['userService'];

    function UserFactory(userService){

        var userFactory = {};


        userFactory.login = function(user) {
            return userService.login(user);
        };

        return userFactory;


    }

})();
