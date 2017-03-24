'use strict';

describe('user', function() {
    beforeEach(module('user'));

    it('should be defined', function() {
        var userModule = angular.module('core.user');
        expect(userModule).toBeDefined();
    });

    describe('user.service', function() {

    });
});
