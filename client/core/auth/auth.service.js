'use strict';

angular.module('core.auth', ['core.token']).
    factory('Auth', [ '$http', 'Token',
        function($http, Token) {
            var isLoggedIn = false;
            return ({
                login: login,
                logout: logout,
                signup: signup
            });

            function login(userInfo, vm, location) {
                return $http.post('/api/login', userInfo).
                    success(function(data) {
                        vm.success = data.success;
                        if (vm.success) {
                            Token.set(data.token);
                            location.path('dashboard');
                        }
                        vm.errorMessage = data.message;
                    }).
                    error(function(data) {
                        vm.success = false;
                        vm.errorMessage = data;
                    });
            }

            function logout() {
                Token.remove();
            }

            function signup(userInfo) {
                return $http.post('/api/users', userInfo).
                    success(function(data) {
                        if (data.success) {
                            Token.set(data.token);
                        }
                        return data;
                    }).
                    error(function(data) {
                        return data;
                    });
            }
        }]);
