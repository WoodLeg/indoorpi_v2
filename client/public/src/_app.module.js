(function() {
    'use strict';

    angular
        .module('indoorPi', [
            // Libs
            'ui.router',
            'ui.bootstrap',
            'ngAnimate',
            'ngCookies',
            'ngStorage',
            'ngMessages',
            'angular-jwt',

            // Components
            'indoorPi.home',
            'indoorPi.user',
            'indoorPi.login'
        ]);
})();
