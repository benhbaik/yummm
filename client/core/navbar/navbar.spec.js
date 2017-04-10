'use strict';

describe('core.navbar', function() {
    beforeEach(function() {
        var mockAuth = {
            isLoggedIn: function() {
                return true;
            },
            getUserData: function() {
                return {
                    username: 'user',
                    _id: '58dad8d0a6a942e2319cedab'
                };
            },
            logout: function() {}
        };

        module('core.navbar');
        module('core.auth', function($provide) {
            $provide.factory('Auth', function() {
                return mockAuth;
            });
        });
    });

    it('should be defined', function() {
        var navbarModule = angular.module('core.navbar');
        expect(navbarModule).toBeDefined();
    });

    describe('navbar', function() {
        var $componentController;
        var ctrl;

        beforeEach(inject(function($componentController) {
            jasmine.addCustomEqualityTester(angular.equals);
            ctrl = $componentController('navbar');
        }));

        it('should be defined', function() {
            expect(ctrl).toBeDefined();
        });

        describe('vm.isLoggedIn', function() {
            it('equals boolean of login status', function() {
                expect(ctrl.isLoggedIn).toBe(true);
            });
        });

        describe('vm.current user', function() {
            var user = {
                    username: 'user',
                    _id: '58dad8d0a6a942e2319cedab'
                };
            it('equals logged in user data', function() {
                expect(ctrl.currentUser).toEqual(user);
            });
        });

        describe('logoLink method', function() {
            it('returns "search" if logged in', function() {
                expect(ctrl.logoLink()).toBe('search');
            });
        });

        describe('logoLink method', function() {
            it('returns empty string if logged out', function() {
                ctrl.isLoggedIn = false;
                expect(ctrl.logoLink()).toBe('');
            });
        });

        describe('logout method', function() {
            beforeEach(function() {
                spyOn(ctrl, 'logout');
                ctrl.logout();
            });

            it('calls logout()', function() {
                expect(ctrl.logout).toHaveBeenCalled();
            });
        });
    });
});
