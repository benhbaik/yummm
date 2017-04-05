'use strict';

angular.module('core.user', []).
    factory('User', ['$http',
        function($http) {
            return ({
                getAll: getAll,
                get: get,
                update: update,
                remove: remove
            });

            function getAll() {
                return $http.get('/secure/users').then(function(res) {
                    console.log(res.data);
                    return res.data;
                }, function(err) {
                    return err;
                });
            }

            function get(id) {
                return $http.get('/secure/users/' + id).then(function(res) {
                    return res.data;
                }, function(err) {
                    return err;
                });
            }

            function update(update, id) {
                return $http.put('/secure/users/' + id, update).then(function(res) {
                    return res.data;
                }, function(err) {
                    return err;
                });
            }

            function remove(id) {
                return $http.delete('/secure/users/' + id).then(function(res) {
                    return res.data;
                }, function(err) {
                    return err;
                });
            }
        }
    ]);
