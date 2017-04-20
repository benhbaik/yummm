'use strict';

angular.module('signup', ['core.auth']).
    component('signup', {
        template: require('./signup.html'),
        controllerAs: 'signupCtrl',
        controller: ['$location', '$window', 'Auth',
            function signupController($location, $window, Auth) {
                var vm = this;
                vm.errorMessage = '';
                vm.success = true; // hide error message initially
                vm.signup = signup;

                function signup(credentials, confirmPassword) {
                    if (!credentials.username || !credentials.password || !confirmPassword) {
                            vm.success = false;
                            vm.errorMessage = 'Please fill out form.';
                            vm.credentials.password = '';
                            vm.confirmPassword = '';
                        } else {
                            credentials.username.trim();
                            credentials.password.trim();
                            confirmPassword.trim();

                            if (credentials.password === confirmPassword) {
                                Auth.signup(credentials).
                                then(function(res) {
                                    vm.success = res.data.success;
                                    if (vm.success) {
                                        $window.localStorage.setItem('token', res.data.token);
                                        $location.path('search');
                                    } else {
                                        vm.errorMessage = res.data.message;
                                        vm.credentials.username = '';
                                        vm.credentials.password = '';
                                    }
                                });
                            } else {
                                vm.success = false;
                                vm.errorMessage = 'Passwords do not match.';
                                vm.credentials.password = '';
                                vm.confirmPassword = '';
                            }
                        }
                }
            }
        ]
    });
