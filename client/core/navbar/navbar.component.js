'use-strict';

angular.module('core.navbar', ['core.auth']).
    component('navbar', {
        templateUrl: 'core/navbar/navbar.html',
        controllerAs: 'navbarCtrl',
        controller: ['$location', 'Auth',
            function($location, Auth) {
                var vm = this;
                vm.isLoggedIn = Auth.isLoggedIn();
                vm.currentUser = Auth.getUserData();
                vm.logoLink = function() {
                    return vm.isLoggedIn ? 'search' : '';
                }
                vm.logout = function() {
                    Auth.logout();
                }
            }
        ]
    });
