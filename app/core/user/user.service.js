'use strict';

angular.module('core.user', []).
    factory('user', ['$http',
        function($http) {
            var restApi = {
                signup: function(data) {
                    $http.post('/api/users', data);
                }
            }

            return restApi;
        }
    ]);

    // TODO finish restClient write tests first use $httpbackend
