'use strict';

angular.module('core.auth', []).
    factory('Auth', [ '$http', '$window',
        function($http, $window) {
            var storage = $window.localStorage;

            return ({
                login: login,
                logout: logout,
                signup: signup,
                isLoggedIn: isLoggedIn,
                getUserData: getUserData
            });

            function login(userInfo, vm, location) {
                $http.post('/open/login', userInfo).
                    success(function(data) {
                        vm.success = data.success;
                        if (vm.success) {
                            storage.setItem('token', data.token);
                            location.path('search');
                        } else if (!vm.success) {
                            vm.errorMessage = data.message;
                        }
                    }).
                    error(function(data) {
                        vm.success = false;
                        vm.errorMessage = data.message;
                    });
            }

            function logout() {
                storage.removeItem('token');
                storage.removeItem('recipe');
            }

            function signup(userInfo, vm, location) {
                var usernameLength = userInfo.username.length;
                var passwordLength = userInfo.password.length;

                if (usernameLength > 16 || usernameLength < 4) {
                    vm.success = false;
                    vm.errorMessage = 'Please enter a valid username.';
                    return;
                } else if (passwordLength > 16 || passwordLength < 8) {
                    vm.success = false;
                    vm.errorMessage = 'Please enter a valid password.';
                    return;
                }

                $http.post('/open/users', userInfo).
                    success(function(data) {
                        vm.success = data.success;
                        if (vm.success) {
                            storage.setItem('token', data.token);
                            location.path('search');
                        } else if (!vm.success) {
                            vm.errorMessage = data.message;
                        }
                    }).
                    error(function(data) {
                        vm.success = false;
                        vm.errorMessage = data;
                    });
            }

            function isLoggedIn() {
                var token = storage.getItem('token');
                var payload;

                if (token) {
                    payload = token.split('.')[1];
                    payload = $window.atob(payload);
                    payload = JSON.parse(payload);

                    return payload.exp > Date.now() / 1000;
                }
                return false;
            }

            function getUserData() {
                if (isLoggedIn()) {
                    var token = storage.getItem('token');
                    var payload = token.split('.')[1];

                    payload = $window.atob(payload);
                    payload = JSON.parse(payload);

                    return {
                        username: payload.username,
                        _id: payload._id
                    };
                }
            }
        }]).
        factory('AuthInterceptor', function($q, $location, $window) {
            var storage = $window.localStorage;

            return {
                request: request,
                responseError: responseError
            };

            function request(config) {
                config.headers['x-access-token'] = storage.getItem('token');
                return config;
            }

            function responseError(res) {
                if (res.status === 403) {
                    storage.removeItem('token');
                    $location.path('login');
                }
                return $q.reject(res);
            }
        });
