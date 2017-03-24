'use strict';

describe('signup', function() {

    beforeEach(module('signup'));

    it('should be defined', function() {
        var signupModule = angular.module('signup');
        expect(signupModule).toBeDefined();
    });

    // describe('signup controller', function() {
    //     var ctrl;
    //
    //     beforeEach(inject(function($componentController) {
    //         ctrl = $componentController('signup');
    //     }));
    //
    //     it('gets the username and password', function() {
    //         ctrl.username = 'Ben';
    //         ctrl.password = 'password';
    //
    //         expect(ctrl.username).toBe('Ben');
    //         expect(ctrl.password).toBe('password');
    //     });
    // });
});
