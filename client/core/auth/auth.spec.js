'use strict';

describe('core.auth', function() {
    beforeEach(module('core.auth'));

    it('should be defined', function() {
        var authModule = angular.module('core.auth');
        expect(authModule).toBeDefined();
    });

    describe('auth service', function() {
        var $httpBackend;
        var Auth;

        beforeEach(inject(function(_$httpBackend_, _Auth_) {
            jasmine.addCustomEqualityTester(angular.equals);
            $httpBackend = _$httpBackend_;
            Auth = _Auth_;
        }));

        afterEach(function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        it('creates a new user', function() {
            var expected = {
                message: 'User created!',
                token: '421GFD2415w24$#@^1'
            };
            $httpBackend.expectPOST('/api/users').respond(expected);

            var newUser = Auth.signup({
                username: 'Ben',
                password: 'password'
            });

            $httpBackend.flush();
            expect(newUser.$$state.value).toEqual(expected);
        });

        it('logs in a user and sets token on local storage', function() {
            var expected = {
                success: true,
                username: 'username',
                token: '@346dhg234fxv&$bg3#hAJdav23'
            };
            var userInfo = {
                username: 'username',
                password: 'password'
            }
            $httpBackend.expectPOST('/api/login').respond(expected);

            var response = Auth.login(userInfo);

            $httpBackend.flush();
            expect(response.$$state.value).toEqual(expected);
        });

        it('logs a user out', function() {
            spyOn(Auth, 'logout');
            Auth.logout();

            expect(Auth.logout).toHaveBeenCalled();
        });
    });
});
