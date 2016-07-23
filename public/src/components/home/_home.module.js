(function(){
    'use strict';



    angular
        .module('indoorPi.home', [])
        .config(config);

    config.$inject = ['$stateProvider'];

    function config($stateProvider){

        $stateProvider
            .state('indoorPi.home', {
                url: '/home',
                views: {
                    'content@': {
                        templateUrl: '/src/components/home/home.html',
                        controller: 'homeController as ctrl'
                    }
                }

            });

    }

})();
