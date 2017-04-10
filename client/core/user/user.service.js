'use strict';

angular.module('core.user', []).
    factory('User', ['$http',
        function($http) {
            // for future features
            return ({
                getAll: getAll,
                get: get,
                update: update,
                remove: remove
            });

            function getAll() {
                return $http.get('/secure/users');
            }

            function get(id) {
                return $http.get('/secure/users/' + id);
            }

            function update(update, id) {
                return $http.put('/secure/users/' + id, update);
            }

            function remove(id) {
                return $http.delete('/secure/users/' + id);
            }
        }
    ]);
