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
            'ngWebSocket',
            'uiSwitch',

            // Components
            'indoorPi.home',
            'indoorPi.user',
            'indoorPi.login',
            'indoorPi.menu'
        ]);
})();
