'use strict';

describe('signup', function() {

    beforeEach(function() {
        module('signup');
        module('core.auth', function($provide) {
            $provide.factory('Auth', function() {
                return {
                    signup: function(userInfo, vm, location) {
                        var usernameLength = userInfo.username.length;
                        var passwordLength = userInfo.password.length;

                        vm.success = false;

                        if (usernameLength > 16) {
                            vm.errorMessage = 'The username you entered is too long.';
                        }

                        if (usernameLength < 4) {
                            vm.errorMessage = 'The username you entered is too short.';
                        }

                        if (passwordLength > 16) {
                            vm.errorMessage = 'The password you entered is too long.';
                        }

                        if (passwordLength < 8) {
                            vm.errorMessage = 'The password you entered is too short.';
                        }
                    }
                };
            });
        });
    });

    it('should be defined', function() {
        var signupModule = angular.module('signup');
        expect(signupModule).toBeDefined();
    });

    describe('signup controller', function() {
        var location;
        var ctrl;

        beforeEach(inject(function($componentController, $location) {
            location = $location;
            ctrl = $componentController('signup');
        }));

        it('creates error message when username is too long', function() {
            var userInfo = {
                username: 'thisusernameiswaytoolong',
                password: 'password'
            };

            ctrl.signup(userInfo, ctrl, location);

            expect(ctrl.errorMessage).toBe('The username you entered is too long.');
        });

        it('creates error message when username is too short', function() {
            var userInfo = {
                username: 'ace',
                password: 'password'
            };

            ctrl.signup(userInfo, ctrl, location);

            expect(ctrl.errorMessage).toBe('The username you entered is too short.');
        });

        it('creates error message when password is too long', function() {
            var userInfo = {
                username: 'username',
                password: 'thispasswordiswaytoolong'
            };

            ctrl.signup(userInfo, ctrl, location);

            expect(ctrl.errorMessage).toBe('The password you entered is too long.');
        });

        it('creates error message when password is too short', function() {
            var userInfo = {
                username: 'username',
                password: 'ace'
            };

            ctrl.signup(userInfo, ctrl, location);

            expect(ctrl.errorMessage).toBe('The password you entered is too short.');
        });
    });
});
