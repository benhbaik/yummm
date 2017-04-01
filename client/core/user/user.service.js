'use strict';

angular.module('core.user', []).
    factory('User', ['$http',
        function($http) {
            var loggedIn = false;

            return ({
                getAll: getAll,
                get: get,
                update: update,
                remove: remove
            });

            function getAll() {
                return $http.get('/api/users').then(function(res) {
                    return res.data;
                }, function(err) {
                    return err;
                });
            }

            function get(id) {
                return $http.get('/api/users/' + id).then(function(res) {
                    return res.data;
                }, function(err) {
                    return err;
                });
            }

            function update(update, id) {
                return $http.put('/api/users/' + id, update).then(function(res) {
                    return res.data;
                }, function(err) {
                    return err;
                });
            }

            function remove(id) {
                return $http.delete('/api/users/' + id).then(function(res) {
                    return res.data;
                }, function(err) {
                    return err;
                });
            }
        }
    ]);
