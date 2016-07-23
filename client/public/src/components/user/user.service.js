(function(){
    'use strict';

    angular
        .module('indoorPi.user')
        .service('userService', UserService);

    UserService.$inject = ['$http', 'API'];

    function UserService($http, API){

        this.login = function(user){
            $http.post(API.URL + API.ENDPOINT.LOGIN, user);
        };

    }

})();
