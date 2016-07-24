(function(){
    'use strict';

    angular
        .module('indoorPi.login')
        .controller('loginController', LoginController);

    LoginController.$inject = ['$log', 'userFactory', '$state'];

    function LoginController($log, userFactory, $state){

        var self = this;
        this.user = {};

        this.submit= function(){
            userFactory.login(self.user).then(function(response){
                userFactory.setLocal(response.data);
                $state.go('indoorPi.home');
            }, function(reason){
                $log.debug(reason);
            });
        };



    }

})();
