'use strict';

angular.module('signup', ['core.auth']).
    component('signup', {
        templateUrl: 'components/signup/signup.html',
        controllerAs: 'signupCtrl',
        controller: ['$location', 'Auth',
            function($location, Auth) {
                var vm = this;
                vm.signup = function(credentials) {
                    credentials.username.trim();
                    credentials.password.trim();
                    Auth.signup(credentials).then(function() {
                        $location.path('/dashboard')
                    });
                }
            }
        ]
    });
