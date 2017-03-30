'use strict';

angular.module('core.token', []).
    factory('Token', function() {
        var tokenService = {
            set: function(token) {
                window.localStorage.setItem('token', token);
            },
            get: function() {
                return window.localStorage.getItem('token');
            },
            remove: function() {
                window.localStorage.removeItem('token');
            }
        }
        return tokenService;
    });
