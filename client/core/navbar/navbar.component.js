'use-strict';

angular.module('core.navbar', ['core.token']).
    component('navbar', {
        templateUrl: 'core/navbar/navbar.html',
        controllerAs: 'navbarCtrl',
        controller: ['$location', 'Token',
            function($location, Token) {
                var vm = this;
                vm.isLoggedIn = Token.isLoggedIn();
                vm.currentUser = Token.getUserData();
                vm.logoLink = function() {
                    return vm.isLoggedIn ? 'dashboard' : '';
                }
                vm.logout = function() {
                    Token.remove();
                }
            }
        ]
    });
