'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
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

// TODO add edit shopping list feature, logout should display "thanks for visiting"
