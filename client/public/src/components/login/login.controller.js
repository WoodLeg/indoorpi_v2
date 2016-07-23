(function(){
    'use strict';

    angular
        .module('indoorPi.login')
        .controller('loginController', LoginController);

    LoginController.$inject = ['$log', 'userFactory'];

    function LoginController($log, userFactory){

        var self = this;
        this.user = new Object();

        this.submit= function(){
            $log.debug(self.user);
            userFactory.login(self.user).then(function(response){
                $log.debug(response);
            }, function(reason){
                $log.debug(reason);
            });
        };



    }

})();
