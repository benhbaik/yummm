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
                }).
                when('/favorites', {
                    template: '<favorites></favorites>'
                }).
                when('/detail', {
                    template: '<detail></detail>'
                });

                $locationProvider.hashPrefix('!');
                $routeProvider.otherwise({redirectTo: '/'});
        }
    ]).
    run(['$rootScope', '$location', 'Token',
        function($rootScope, $location, Token) {
            var AuthNotReqRoutes = ['/', '/signup', '/login'];

            $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
                if (checkIfAuthReq($location.path()) && !Token.isLoggedIn()) {
                    $location.path('/login');
                }
            });

            function checkIfAuthReq(route) {
                for (var i = 0; i < AuthNotReqRoutes.length; i++) {
                    if (AuthNotReqRoutes[i] === route) {
                        return false;
                    }
                }
                return true;
            }
        }
    ]);
