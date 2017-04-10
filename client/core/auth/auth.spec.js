'use strict';

describe('core.auth', function() {
    beforeEach(module('core.auth'));

    it('should be defined', function() {
        var authModule = angular.module('core.auth');
        expect(authModule).toBeDefined();
    });

    describe('Auth', function() {
        var http;
        var $window;
        var Auth;

        beforeEach(inject(function(_$httpBackend_, _$rootScope_, _$window_, _Auth_) {
            jasmine.addCustomEqualityTester(angular.equals);
            http = _$httpBackend_;
            $window = _$window_;
            Auth = _Auth_;
        }));

        // afterEach(function() {
        //     http.verifyNoOutstandingExpectation();
        //     http.verifyNoOutstandingRequest();
        // });

        describe('login method', function() {
            var user;
            var result;
            var expected;

            beforeEach(function(done) {
                user = {
                    username: 'username',
                    password: 'password'
                };
                result = {};
                expected = {
                    success: true,
                    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6In' +
                        'VzZXJuYW1lIiwiX2lkIjoiNThkYWQ4ZDBhNmE5NDJlMjMxOWNlZGFiI' +
                        'iwiaWF0IjoxNDkxMjQ1NzQ0LCJleHAiOjE0OTEyODg5NDR9.63PAT9L' +
                        'bJFoSYFrj_aB2BW3W8vVzkcQsINw2ogFu3go'
                };

                http.expectPOST('/open/login').respond(expected);

                Auth.login(user).
                    success(function(data) {
                        result = data;
                        done();
                    }).
                    error(function(data) {
                        result = data;
                        done();
                    });

                http.flush();
            });

            it('returns a token on login', function() {
                expect(result).toEqual(expected);
            });
        
        });

        describe('logout method', function() {
            var result;
            var expected;

            beforeEach(function() {
                expected = null;
            });

            it('removes token on logout', function() {
                Auth.logout();
                result = $window.localStorage.getItem('token');
                expect(result).toEqual(expected);
            });
        });

        describe('signup method', function() {
            var user;
            var result;
            var expected;

            beforeEach(function(done) {
                user = {
                    username: 'username',
                    password: 'password'
                };
                result = {};
                expected = {
                    success: true,
                    message: 'User created!',
                    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6In' +
                           'VzZXJuYW1lIiwiX2lkIjoiNThkYWQ4ZDBhNmE5NDJlMjMxOWNlZGFiI' +
                           'iwiaWF0IjoxNDkxMjQ1NzQ0LCJleHAiOjE0OTEyODg5NDR9.63PAT9L' +
                           'bJFoSYFrj_aB2BW3W8vVzkcQsINw2ogFu3go'
                };

                http.expectPOST('/open/users').respond(expected);

                Auth.signup(user).
                    success(function(data) {
                        result = data;
                        done();
                    }).
                    error(function(data) {
                        result = data;
                        done();
                    });

                http.flush();
            });

            it('returns a token on signup', function() {
                expect(result).toEqual(expected);
            });
        });

        describe('isLoggedIn method', function() {
            var token;
            var status;

            beforeEach(function() {
                token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6In' +
                        'VzZXJuYW1lIiwiX2lkIjoiNThkYWQ4ZDBhNmE5NDJlMjMxOWNlZGFiI' +
                        'iwiaWF0IjoxNDkxMjQ1NzQ0LCJleHAiOjE0OTEyODg5NDR9.63PAT9L' +
                        'bJFoSYFrj_aB2BW3W8vVzkcQsINw2ogFu3go';

                $window.localStorage.setItem('token', token);
            });

            it('decodes token and returns boolean', function() {
                status = Auth.isLoggedIn();
                expect(status).toBe(false);
            });
        });

        describe('getUserData method', function() {
            var token;
            var data;
            var expected;

            beforeEach(function() {
                token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6In' +
                        'VzZXJuYW1lIiwiX2lkIjoiNThkYWQ4ZDBhNmE5NDJlMjMxOWNlZGFiI' +
                        'iwiaWF0IjoxNDkxMjQ1NzQ0LCJleHAiOjE0OTEyODg5NDR9.63PAT9L' +
                        'bJFoSYFrj_aB2BW3W8vVzkcQsINw2ogFu3go';

                expected = { username: 'username', _id: '58dad8d0a6a942e2319cedab' };

                $window.localStorage.setItem('token', token);
            });

            it('decodes token and returns user data', function() {
                data = Auth.getUserData();
                expect(data).toEqual(expected);
            });
        });
    });
});
