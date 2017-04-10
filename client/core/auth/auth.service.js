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

            function login(userInfo) {
                return $http.post('/open/login', userInfo);
            }

            function logout() {
                $window.localStorage.removeItem('token');
                $window.localStorage.removeItem('recipe');
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

                return $http.post('/open/users', userInfo);
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
                var token = $window.localStorage.getItem('token');
                var payload = token.split('.')[1];

                if (token) {

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
                config.headers['x-access-token'] = $window.localStorage.getItem('token');
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
