'use-strict';

angular.module('core.navbar', ['core.token']).
    component('navbar', {
        templateUrl: 'core/navbar/navbar.html',
        controllerAs: 'navbarCtrl',
        controller: ['Token',
            function(Token) {
                var vm = this;
                vm.isLoggedIn = Token.isLoggedIn();
                vm.currentUser = Token.getUserData();
                vm.logoLink = vm.isLoggedIn ? 'dashboard' : '';
            }
        ]
    });
