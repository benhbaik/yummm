'use strict';

angular.module('myApp').
    config(['$locationProvider', '$routeProvider',
        function($locationProvider, $routeProvider) {
            $locationProvider.hashPrefix('!');
            $routeProvider.otherwise({redirectTo: '/'});

            $routeProvider.
                when('/', {
                    templateUrl: 'components/home/home.html'
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
                }).
                when('/shopping-list', {
                    template: '<shopping-list></shopping-list>'
                }).
                when('/logged-out', {
                    templateUrl: 'components/logged-out/loggedOut.html'
                });
        }
    ]).
    run(['$rootScope', '$location', 'Auth',
        function($rootScope, $location, Auth) {
            var noAuthRoutes = ['/', '/signup', '/login', '/logged-out'];
            $rootScope.routeHistory = [];

            $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
                trackRouteHistory();
                if (checkIfAuthReq($location.path()) && !Auth.isLoggedIn()) {
                    $location.path('/login');
                }
            });

            // for 'back to' link in detail component
            function trackRouteHistory() {
                if ($rootScope.routeHistory.length === 5) {
                    $rootScope.routeHistory.shift();
                }
                $rootScope.routeHistory.push($location.path());
            }

            function checkIfAuthReq(route) {
                for (var i = 0; i < noAuthRoutes.length; i++) {
                    if (noAuthRoutes[i] === route) {
                        return false;
                    }
                }
                return true;
            }
        }
    ]);
