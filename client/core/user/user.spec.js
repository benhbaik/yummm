'use strict';

describe('user', function() {
    var User;
    var http;

    it('should be defined', function() {
        var userModule = angular.module('core.user');
        expect(userModule).toBeDefined();
    });

    beforeEach(module('core.user'));

    describe('user.service', function() {

        beforeEach(inject(function(_$httpBackend_, _User_) {
            jasmine.addCustomEqualityTester(angular.equals);
            http = _$httpBackend_;
            User = _User_;
        }));

        afterEach(function() {
            http.verifyNoOutstandingExpectation();
            http.verifyNoOutstandingRequest();
        });

        describe('getAll method', function() {
            var expected;

            beforeEach(function() {
                expected = [
                    {
                        username: 'Ben'
                    },
                    {
                        username: 'Baik'
                    }
                ];

                http.expectGET('/secure/users').respond(expected);
            });

            it('returns an array of users', function() {
                User.getAll().
                success(function(data) {
                    expect(data).toEqual(expected);
                })
                .error(function(data) {
                    expect(data).toEqual(expected);
                });

                http.flush();
            });
        });

        describe('get method', function() {
            var expected;

            beforeEach(function() {
                expected = {
                    username: 'Ben',
                    id: '12345'
                };

                http.expectGET('/secure/users/12345').respond(expected);
            });

            it('returns data of specified user', function() {
                User.get('12345').
                success(function(data) {
                    expect(data).toEqual(expected);
                }).
                error(function(data) {
                    expect(data).toEqual(expected);
                });

                http.flush();
            });
        });

        describe('update method', function() {
            var expected;

            beforeEach(function() {
                expected = {
                    username: 'username',
                    id: '12345'
                };

                http.expectPUT('/secure/users/12345').respond(expected);
            });

            it('returns updated user data', function() {
                User.update({username: 'username'}, '12345').
                success(function(data) {
                    expect(data).toEqual(expected);
                }).
                error(function(data) {
                    expect(data).toEqual(expected);
                });

                http.flush();
            });
        });

        describe('remove', function() {
            var expected;

            beforeEach(function() {
                expected = {
                    username: 'username',
                    id: '12345'
                };

                http.expectDELETE('/secure/users/12345').respond(expected);
            });

            it('returns deleted users data', function() {
                User.remove('12345').
                success(function(data) {
                    expect(data).toEqual(expected);
                }).
                error(function(data) {
                    expect(data).toEqual(expected);
                });

                http.flush();
            });
        });
    });
});
