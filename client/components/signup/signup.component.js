'use strict';

angular.module('signup', ['core.auth']).
    component('signup', {
        templateUrl: 'components/signup/signup.html',
        controllerAs: 'signupCtrl',
        controller: ['$location', '$window', 'Auth',
            function signupController($location, $window, Auth) {
                var vm = this;
                vm.errorMessage = '';
                vm.success = true;
                vm.signup = signup;

                function signup(credentials) {
                    credentials.username.trim();
                    credentials.password.trim();
                    Auth.signup(credentials).
                    success(function(data) {
                        vm.success = data.success;
                        if (vm.success) {
                            $window.localStorage.setItem('token', data.token);
                            $location.path('search');
                        } else if (!vm.success) {
                            vm.errorMessage = data.message;
                        }
                    }).
                    error(function(data) {
                        vm.success = false;
                        vm.errorMessage = data;
                    });
                }
            }
        ]
    });
