(function(){
    'use strict';

    angular
        .module('indoorPi.login')
        .controller('loginController', LoginController);

    LoginController.$inject = ['$log', 'userFactory', '$state', '$localStorage'];

    function LoginController($log, userFactory, $state, $localStorage){

        var self = this;
        this.user = new Object();

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
