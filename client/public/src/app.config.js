(function() {
    'use strict';

    angular
    .module('indoorPi')
    .config(config)
    .run(run);

    config.$inject = ['$locationProvider'];
    function config($locationProvider) {
        $locationProvider.html5Mode(true).hashPrefix('!');
    }



    run.$inject = [];
    function run() {

        // Set change start handler
        // $rootScope.$on('$stateChangeStart', function(evnt, toState, toStateParams) {
        //
        //     // Check if state wants to redirect
        //     if (toState.redirectTo) {
        //         evnt.preventDefault();
        //         return $state.go(toState.redirectTo, toStateParams);
        //     }
        //
        //     // Capture toState
        //     $rootScope.toState = toState;
        //     $rootScope.toState.data = $rootScope.toState.data || {};
        //     $rootScope.toStateParams = toStateParams;
        //
        //     // Fire authorization
        //     authenticationFactory.authorize();
        //
        //     // Handle protected states
        //     if (toState.protected) {
        //         authenticationFactory.getAuthenticatedUser().then(function() {
        //             // Do nothing if authenticated
        //         }, function() {
        //             // Redirect to signin otherwise
        //             $state.go('indoorPi.signin');
        //         });
        //     }
        //
        // });
        //
    }
})();
