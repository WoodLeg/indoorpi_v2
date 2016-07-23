(function() {
    'use strict';

    angular
    .module('indoorPi')
    .constant('API', {
        URL: 'http://localhost:7331',
        ENDPOINT: {
            LOGIN: '/login'
        }
    });

}());
