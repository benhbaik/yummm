'use strict';

angular.module('core.token', []).
    factory('Token', ['$window',
        function($window) {
             return ({
                set: set,
                get: get,
                remove: remove,
                isLoggedIn: isLoggedIn,
                getUserData: getUserData
            });

            function set(token) {
                $window.localStorage.setItem('token', token);
            }

            function get() {
                return $window.localStorage.getItem('token');
            }

            function remove() {
                $window.localStorage.removeItem('token');
            }

            function isLoggedIn() {
                var token = get();
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
                    var token = get();
                    var payload = token.split('.')[1];

                    payload = $window.atob(payload);
                    payload = JSON.parse(payload);

                    return {
                        username: payload.username,
                        _id: payload._id
                    };
                }
            }
        }
    ]);
