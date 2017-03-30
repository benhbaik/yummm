'use strict';

angular.module('core.user', ['core.token']).
    factory('User', ['$http', 'Token',
        function($http, Token) {
            var userService = {
                getAll: function() {
                    return $http.get('/api/users').then(function(res) {
                        return res.data;
                    }, function(err) {
                        return err;
                    });
                },
                create: function(data) {
                    return $http.post('/api/users', data).then(function(res) {
                        return res.data;
                    }, function(err) {
                        return err;
                    });
                },
                get: function(id) {
                    return $http.get('/api/users/' + id).then(function(res) {
                        return res.data;
                    }, function(err) {
                        return err;
                    });
                },
                update: function(update, id) {
                    return $http.put('/api/users/' + id, update).then(function(res) {
                        return res.data;
                    }, function(err) {
                        return err;
                    });
                },
                remove: function(id) {
                    return $http.delete('/api/users/' + id).then(function(res) {
                        return res.data;
                    }, function(err) {
                        return err;
                    });
                },
                login: function(userInfo) {
                    return $http.post('/api/login', userInfo).then(function(res) {
                        Token.set(res.data.token);
                        return res.data;
                    }, function(err) {
                        return err;
                    });
                },
                logout: function() {
                    Token.remove();
                }

            }
            return userService;
        }
    ]);
