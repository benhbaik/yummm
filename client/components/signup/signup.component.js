'use strict';

angular.module('signup', ['core.auth']).
    component('signup', {
        template: require('./signup.html'),
        // templateUrl: 'components/signup/signup.html',
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
        ]
    });
