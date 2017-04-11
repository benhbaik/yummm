'use strict';

describe('login', function() {

    beforeEach(function() {
        module('login');
        module('core.auth', function($provide) {
            $provide.factory('Auth', function() {
                return {
                    counter: 0,
                    login: function(credentials) {
                        this.counter++;
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
            });
        });
    });

    it('should be defined', function() {
        var loginModule = angular.module('login');

        expect(loginModule).toBeDefined();
    });

    describe('login controller', function() {
        var ctrl;
        var Auth;

        beforeEach(function() {
            inject(function($componentController, _Auth_) {
                ctrl = $componentController('login');
                Auth = _Auth_;
            });
        });

        describe('vm.login', function() {
            var credentials = {};

            beforeEach(function() {
                credentials.username = 'username';
                credentials.password = 'password';
            });

            it('calls Auth.login', function() {
                ctrl.login(credentials);

                expect(Auth.counter).toBe(1);
            });
        });
    });
});
