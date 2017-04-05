'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'core',
  'home',
  'signup',
  'login',
  'search'
]).
config(function($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
});
