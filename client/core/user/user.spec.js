'use strict';

describe('user', function() {
    var User;
    var $httpBackend;

    it('should be defined', function() {
        var userModule = angular.module('core.user');
        expect(userModule).toBeDefined();
    });

    beforeEach(module('core.user'));

    describe('user.service', function() {

        beforeEach(inject(function(_$httpBackend_, _User_) {
            jasmine.addCustomEqualityTester(angular.equals);
            $httpBackend = _$httpBackend_;
            User = _User_;
        }));

        afterEach(function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        it('fetches list of users', function() {
            var userList = [
                {
                    username: 'Ben'
                },
                {
                    username: 'Baik'
                }
            ];
            $httpBackend.expectGET('/secure/users').respond(userList);

            var users = User.getAll();

            $httpBackend.flush();
            expect(users.$$state.value).toEqual(userList);
        });

        it('fetches one user', function() {
            var expectedUserData = {
                username: 'Ben',
                id: '12345'
            };
            $httpBackend.expectGET('/secure/users/12345').respond(expectedUserData);

            var user = User.get('12345');

            $httpBackend.flush();
            expect(user.$$state.value).toEqual(expectedUserData);
        });

        it('updates one user', function() {
            var expectedUserData = {
                username: 'username',
                id: '12345'
            };
            $httpBackend.expectPUT('/secure/users/12345').respond(expectedUserData);

            var updatedUser = User.update({username: 'username'}, '12345');

            $httpBackend.flush();
            expect(updatedUser.$$state.value).toEqual(expectedUserData);
        });

        it('removes one user', function() {
            var expectedResponse = {
                username: 'username',
                id: '12345'
            };
            $httpBackend.expectDELETE('/secure/users/12345').respond(expectedResponse);

            var deletedUser = User.remove('12345');

            $httpBackend.flush();
            expect(deletedUser.$$state.value).toEqual(expectedResponse);
        });
    });
});
