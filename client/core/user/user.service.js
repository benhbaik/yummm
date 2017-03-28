'use strict';

angular.module('core.user', []).
    factory('User', ['$http',
        function($http) {
            var restApi = {
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
                        return res.data;
                    }, function(err) {
                        return err;
                    });
                }
            }

            return restApi;
        }
    ]);

    // TODO finish restClient write tests first use $httpbackend
