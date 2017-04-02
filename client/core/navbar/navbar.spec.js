'use strict';

describe('core.navbar', function() {
    var mockToken = {
       set: function(token) {
           window.localStorage.setItem('token', token);
       },
       get: function() {
           return window.localStorage.getItem('token');
       },
       remove: function() {
           window.localStorage.removeItem('token');
       },
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

        beforeEach(inject(function(_$componentController_) {
            $componentController = _$componentController_;
            ctrl = ($componentController('navbar'));
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
