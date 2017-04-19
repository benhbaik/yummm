'use strict';

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
