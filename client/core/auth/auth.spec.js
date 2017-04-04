'use strict';

describe('core.auth', function() {
    beforeEach(module('core.auth'));

    it('should be defined', function() {
        var authModule = angular.module('core.auth');
        expect(authModule).toBeDefined();
    });

    describe('auth service', function() {
        var $httpBackend;
        var $location;
        var Auth;
        var expected;
        var vm;

        beforeEach(inject(function(_$httpBackend_, _$rootScope_, _$location_, _Auth_) {
            jasmine.addCustomEqualityTester(angular.equals);
            $httpBackend = _$httpBackend_;
            $location = _$location_;
            Auth = _Auth_;
            vm = _$rootScope_.$new();
            expected = {
                success: true,
                token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6In' +
                       'VzZXJuYW1lIiwiX2lkIjoiNThkYWQ4ZDBhNmE5NDJlMjMxOWNlZGFiI' +
                       'iwiaWF0IjoxNDkxMjQ1NzQ0LCJleHAiOjE0OTEyODg5NDR9.63PAT9L' +
                       'bJFoSYFrj_aB2BW3W8vVzkcQsINw2ogFu3go'
            };
        }));

        afterEach(function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        it('creates a new user', function() {
            var newUser;

            $httpBackend.expectPOST('/api/users').respond(expected);
            newUser = Auth.signup({
                username: 'Ben',
                password: 'password'
            });
            $httpBackend.flush();

            expect(newUser.$$state.value.data).toEqual(expected);
        });

        it('logs in a user and sets token on local storage', function() {
            var userInfo = {
                username: 'username',
                password: 'password'
            }
            var promise;

            $httpBackend.expectPOST('/api/login').respond(expected);

            promise = Auth.login(userInfo, vm, $location);
            $httpBackend.flush();

            expect(promise.$$state.value.data).toEqual(expected);
        });

        it('logs a user out', function() {
            spyOn(Auth, 'logout');
            Auth.logout();

            expect(Auth.logout).toHaveBeenCalled();
        });
    });
});
