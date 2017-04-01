'use strict';

angular.module('myApp').
    config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');

      $routeProvider.when('/', {
          template: '<home></home>'
      });

      $routeProvider.when('/signup', {
          template: '<signup></signup>'
      });

      $routeProvider.when('/login', {
          template: '<login></login>'
      });

      $routeProvider.when('/dashboard', {
          template: '<dashboard></dashboard>'
      });

      $routeProvider.otherwise({redirectTo: '/'});
    }]);
