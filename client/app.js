'use strict';

angular.module('myApp', [
  'ngRoute',
  'customDirectives',
  'core',
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

require('./app.routes.js');

require('./directives/directives.js');

require('./core/core.module.js');

require('./core/navbar/navbar.component.js');

require('./core/user/user.service.js');

require('./core/auth/auth.service.js');

require('./core/recipe/recipe.service.js');

require('./core/shopping-list/shoppingList.service.js');

require('./components/signup/signup.component.js');

require('./components/login/login.component.js');

require('./components/search/search.component.js');

require('./components/favorites/favorites.component.js');

require('./components/detail/detail.component.js');

require('./components/shopping-list/shopping-list.component.js');