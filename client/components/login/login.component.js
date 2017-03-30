'use strict';

angular.module('login', ['core.user']).
    component('login', {
        templateUrl: 'components/login/login.html',
        controller: ['User',
            function loginController(User) {
                this.login = function(username, password) {
                    var user = {
                        username: username,
                        password: password
                    }
                    User.login(user);
                };
            }
        ]
    });
