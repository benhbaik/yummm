'use strict';

angular.module('login', ['core.auth']).
    component('login', {
        template: require('./login.html'),
        controllerAs: 'loginCtrl',
        controller: ['$location', '$window', 'Auth',
            function loginController($location, $window, Auth) {
                var vm = this;
                vm.errorMessage = '';
                vm.success = true; // hide error message initially
                vm.login = login;

                function login(credentials) {
                    if (!credentials.username || !credentials.password) {
                        vm.errorMessage = 'Please fill out form.';
                        vm.success = false;
                        vm.credentials.password = '';
                    } else {
                        credentials.username.trim();
                        credentials.password.trim();

                        Auth.login(credentials).
                        then(function(res) {
                            vm.success = res.data.success;
                            if (vm.success) {
                                $window.localStorage.setItem('token', res.data.token);
                                $location.path('search');
                            } else if (!vm.success) {
                                vm.errorMessage = res.data.message;
                                vm.credentials.username = '';
                                vm.credentials.password = '';
                            }
                        });
                    }
                }
            }
        ]
    });
