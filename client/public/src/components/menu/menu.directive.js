(function(){

    'use strict';

    angular
        .module('indoorPi.menu')
        .directive('menu', Menu);

    function Menu(){
        return {
            restrict: 'E',
            scope: true,
            controller: 'menuController as ctrl',
            bindToController: getBindings(),
            templateUrl: '/src/components/menu/menu.html'
        };
    }


    function getBindings(){
        return {};
    }

})();
