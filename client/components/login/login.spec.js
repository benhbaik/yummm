'use strict';

describe('login', function() {

    beforeEach(module('login'));

    it('should be defined', function() {
        var loginModule = angular.module('login');

        expect(loginModule).toBeDefined();
    });
});
