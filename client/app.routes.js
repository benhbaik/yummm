'use strict';

angular.module('myApp').
    config(['$locationProvider', '$routeProvider',
        function($locationProvider, $routeProvider) {

            $routeProvider.
                when('/', {
                    template: '<home></home>'
                }).
                when('/signup', {
                    template: '<signup></signup>'
                }).
                when('/login', {
                    template: '<login></login>'
                }).
                when('/search', {
                    template: '<search></search>'
                });

                $locationProvider.hashPrefix('!');
                $routeProvider.otherwise({redirectTo: '/'});
        }
    ]).
    run(['$rootScope', '$location', 'Token',
        function($rootScope, $location, Token) {
            var AuthNotReqRoutes = ['/', '/signup', '/login'];

            function checkIfAuthReq(route) {
                for (var i = 0; i < AuthNotReqRoutes.length; i++) {
                    if (AuthNotReqRoutes[i] === route) {
                        return false;
                    }
                }
                return true;
            }

            $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
                if (checkIfAuthReq($location.path()) && !Token.isLoggedIn()) {
                    $location.path('/login');
                }
            });
        }
    ]);
