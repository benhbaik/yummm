'use strict';

angular.module('login', ['core.auth', 'core.token']).
    component('login', {
        templateUrl: 'components/login/login.html',
        controllerAs: 'loginCtrl',
        controller: ['$location', 'Auth', 'Token',
            function loginController($location, Auth, Token) {
                var vm = this;
                vm.errorMessage;
                vm.success = true;
                vm.login = function(credentials) {
                    credentials.username.trim();
                    credentials.password.trim();

                    Auth.login(credentials, vm, $location);
                };
            }
        ]
    });
