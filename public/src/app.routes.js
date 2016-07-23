(function(){
    'use strict';

    angular
        .module('indoorPi')
        .config(config);

    config.$inject  = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/home');

        $stateProvider
            .state('indoorPi', {
                url: '',
                abstract: true
            });
    }

})();
