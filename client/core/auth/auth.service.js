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

            function login(userInfo) {
                return $http.post('/api/login', userInfo).then(function(res) {
                    Token.set(res.data.token);
                    return res.data;
                }, function(err) {
                    return err;
                });
            }

            function logout() {
                Token.remove();
            }

            function signup(userInfo) {
                return $http.post('/api/users', userInfo).then(function(res) {
                    Token.set(res.data.token);
                    return res.data;
                }, function(err) {
                    return err;
                });
            }
        }]);
