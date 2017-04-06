'use strict';

angular.module('signup', ['core.auth']).
    component('signup', {
        templateUrl: 'components/signup/signup.html',
        controllerAs: 'signupCtrl',
        controller: ['$location', 'Auth',
            function signupController($location, Auth) {
                var vm = this;
                vm.errorMessage;
                vm.success = true;
                vm.signup = function(credentials) {
                    credentials.username.trim();
                    credentials.password.trim();

                    Auth.signup(credentials, vm, $location);
                }
            }
        ]
    });
