(function(){
    'use strict';

    angular
        .module('indoorPi.relays', [])
        .config(config);

    config.$inject = ['$stateProvider'];

    function config($stateProvider){

        $stateProvider
            .state('indoorPi.relays', {
                url: '/relays',
                views: {
                    'content@': {
                        templateUrl: '/src/components/relays/relays.html',
                        controller: 'relaysController as ctrl'
                    }
                },
                data: {
                    page: 'relays'
                }
            });

    }


})();
