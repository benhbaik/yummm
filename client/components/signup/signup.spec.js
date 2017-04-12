'use strict';

describe('signup', function() {

    beforeEach(function() {
        var mockAuth = {
            signupCounter: 0,
            signup: function() {
                this.signupCounter++;
                return {
                    success: function() {
                        return this;
                    },
                    error: function() {
                        return this;
                    }
                };
            }
        };

        module('signup');
        module('core.auth', function($provide) {
            $provide.factory('Auth', function() {
                return mockAuth;
            });
        });
    });

    it('should be defined', function() {
        var signupModule = angular.module('signup');
        expect(signupModule).toBeDefined();
    });

    describe('signup controller', function() {
        var ctrl;
        var Auth;

        beforeEach(function() {
            inject(function($componentController, _Auth_) {
                ctrl = $componentController('signup');
                Auth = _Auth_;
            });
        });

        describe('vm.signup', function() {
            it('calls Auth.signup', function() {
                var credentials = {
                    username: 'username',
                    password: 'password'
                };

                ctrl.signup(credentials);

                expect(Auth.signupCounter).toBe(1);
            });
        });
    });
});
