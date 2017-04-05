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
                return $http.post('/open/login', userInfo).
                    success(function(data) {
                        vm.success = data.success;
                        if (vm.success) {
                            Token.set(data.token);
                            location.path('search');
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
                var usernameLength = userInfo.username.length;
                var passwordLength = userInfo.password.length;

                if ((usernameLength <= 16 && usernameLength >= 4) &&
                    (passwordLength <= 16 && passwordLength >= 8)) {
                        return $http.post('/open/users', userInfo).
                            success(function(data) {
                                vm.success = data.success;
                                if (vm.success) {
                                    Token.set(data.token);
                                    location.path('search');
                                }
                                vm.errorMessage = data.message;
                            }).
                            error(function(data) {
                                vm.success = false;
                                vm.errorMessage = data;
                            });
                }

                vm.success = false;

                if (usernameLength > 16 || usernameLength < 4) {
                    vm.errorMessage = 'Please enter a valid username.';
                }

                if (passwordLength > 16 || passwordLength < 8) {
                    vm.errorMessage = 'Please enter a valid password.';
                }
            }
        }]).
        factory('AuthInterceptor', function($q, $location, Token) {
            return {
                request: request,
                responseError: responseError
            };

            function request(config) {
                var token = Token.get();
                config.headers['x-access-token'] = token;
                return config;
            }

            function responseError(res) {
                if (res.status === 403) {
                    Token.remove();
                    $location.path('login');
                }
                return $q.reject(res);
            }
        })
