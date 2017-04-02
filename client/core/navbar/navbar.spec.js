'use strict';

describe('core.navbar', function() {

    beforeEach(module('core.navbar'));

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

        // TODO mock Token service
        it ('logoLink should change based on isLoggedIn', function() {
            console.log(ctrl);
            // ctrl.isLoggedIn = true;
            // expect(ctrl.logoLink).toBe('dashboard');
            // ctrl.isLoggedIn = false;
            // expect(ctrl.logoLink).toBe('');
        });
    });
});
