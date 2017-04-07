'use strict';

angular.module('core.auth', []).
    factory('Auth', [ '$http', '$window',
        function($http, $window) {
            return ({
                login: login,
                logout: logout,
                signup: signup,
                isLoggedIn: isLoggedIn,
                getUserData: getUserData
            });

            function login(userInfo, vm, location) {
                return $http.post('/open/login', userInfo).
                    success(function(data) {
                        vm.success = data.success;
                        if (vm.success) {
                            $window.localStorage.setItem('token', data.token);
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
                $window.localStorage.removeItem('token');
                $window.localStorage.removeItem('recipe');
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
                                    $window.localStorage.setItem('token', data.token);
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

            function isLoggedIn() {
                var token = $window.localStorage.getItem('token');
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
                    var token = $window.localStorage.getItem('token');
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
            return {
                request: request,
                responseError: responseError
            };

            function request(config) {
                var token = $window.localStorage.getItem('token');
                config.headers['x-access-token'] = token;
                return config;
            }

            function responseError(res) {
                if (res.status === 403) {
                    $window.localStorage.removeItem('token');
                    $location.path('login');
                }
                return $q.reject(res);
            }
        });
