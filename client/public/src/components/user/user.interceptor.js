(function(){
    'use strict';

    angular
        .module('indoorPi.user')
        .factory('userInterceptor', UserInterceptor);

    UserInterceptor.$inject = ['$q','$rootScope','$localStorage'];

    function UserInterceptor($q, $rootScope, $localStorage){

        return {
            request: function(config) {
                config.headers = config.headers || {};
                var token = $localStorage.token;
                if (token) {
                    config.headers.Authorization = 'Bearer ' + token;
                }
                return config || $q.when(config);
            },
            response: function(response){
                if(response.headers('Authorization')){
                    $localStorage.token = response.headers('Authorization');
                }
                return response || $q.when(response);
            },
            responseError: function(rejection) {
                if (rejection.status === 401) {
                    $localStorage.$reset();
                    $rootScope.$broadcast('unauthorized');
                }
                return $q.reject(rejection);
            }
        };

    }

})();
