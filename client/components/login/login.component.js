'use strict';

angular.module('login', ['core.auth']).
    component('login', {
        templateUrl: 'components/login/login.html',
        controllerAs: 'loginCtrl',
        controller: ['$location', 'Auth',
            function loginController($location, Auth) {
                var vm = this;
                vm.login = function(credentials) {
                    credentials.username.trim();
                    credentials.password.trim();
                    Auth.login(credentials).then(function() {
                        $location.path('/dashboard')
                    });
                };
            }
        ]
    });
