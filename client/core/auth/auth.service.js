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

            function signup(userInfo, vm, location) {
                // TODO problem with this play with inputs it will bring up some bugs
                var usernameLength = userInfo.username.length;
                var passwordLength = userInfo.password.length;

                if ((usernameLength <= 16 && usernameLength >= 4) &&
                    (passwordLength <= 16 && passwordLength >= 8)) {
                        return $http.post('/api/users', userInfo).
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

                vm.success = false;

                if (usernameLength > 16) {
                    vm.errorMessage = 'The username you entered is too long.';
                }

                if (usernameLength < 4) {
                    vm.errorMessage = 'The username you entered is too short.';
                }

                if (passwordLength > 16) {
                    vm.errorMessage = 'The password you entered is too long.';
                }

                if (passwordLength < 8) {
                    vm.errorMessage = 'The password you entered is too short.';
                }
            }
        }]);
