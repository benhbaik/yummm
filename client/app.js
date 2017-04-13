'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'customDirectives',
  'core',
  'home',
  'signup',
  'login',
  'search',
  'favorites',
  'detail',
  'shoppingList'
]).
config(function($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
});
