'use-strict';

angular.module('core.navbar', ['core.auth', 'core.token']).
    component('navbar', {
        templateUrl: 'core/navbar/navbar.html',
        controllerAs: 'navbarCtrl',
        controller: ['Auth', 'Token',
            function(Auth, Token) {
                var status = Token.isLoggedIn();
                console.log(status);
                var userData = Token.getUserData();
                console.log(userData);
            }
        ]
    });
