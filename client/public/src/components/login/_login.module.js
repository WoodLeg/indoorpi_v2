(function(){
    'use strict';

    angular
        .module('indoorPi.login', [])
        .config(config);

    config.$inject = ['$stateProvider'];

    function config($stateProvider){

        $stateProvider
            .state('indoorPi.login', {
                url: '/login',
                views: {
                    'content@': {
                        templateUrl: '/src/components/login/login.html',
                        controller: 'loginController as ctrl'
                    }
                }
            });


    }


})();
