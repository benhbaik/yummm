'use strict';

angular.module('login', ['core.auth']).
    component('login', {
        templateUrl: 'components/login/login.html',
        controllerAs: 'loginCtrl',
        controller: ['$location', '$window', 'Auth',
            function loginController($location, $window, Auth) {
                var vm = this;
                vm.errorMessage = '';
                vm.success = true;
                vm.login = login;

                function login(credentials) {
                    credentials.username.trim();
                    credentials.password.trim();

                    Auth.login(credentials).
                    success(function(data) {
                        vm.success = data.success;
                        if (vm.success) {
                            $window.localStorage.setItem('token', data.token);
                            $location.path('search');
                        } else if (!vm.success) {
                            vm.errorMessage = data.message;
                            vm.credentials.username = '';
                            vm.credentials.password = '';
                        }
                    }).
                    error(function(data) {
                        vm.success = false;
                        vm.errorMessage = data.message;
                    });
                };
            }
        ]
    });
