'use strict';

describe('core.navbar', function() {
    var mockToken = {
       isLoggedIn: function() {
           return true;
       },
       getUserData: function() {
           return {
               username: 'user',
               password: 'pass'
           };
       }
   };

    beforeEach(module('core.navbar'));
    beforeEach(module('core.token', function($provide) {
        $provide.factory('Token', function() {
            return mockToken;
        });
    }));

    it('should be defined', function() {
        var navbarModule = angular.module('core.navbar');
        expect(navbarModule).toBeDefined();
    });

    describe('navbar', function() {
        var $componentController;
        var ctrl;

        beforeEach(inject(function($componentController) {
            ctrl = $componentController('navbar');
        }));

        it('should be defined', function() {
            expect(ctrl).toBeDefined();
        });

        it ('logoLink should change based on isLoggedIn', function() {
            ctrl.isLoggedIn = false;
            expect(ctrl.logoLink()).toBe('');
            ctrl.isLoggedIn = true;
            expect(ctrl.logoLink()).toBe('dashboard');
        });
    });
});
