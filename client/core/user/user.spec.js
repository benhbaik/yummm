'use strict';

describe('user', function() {
    var User;
    var $httpBackend;

    beforeEach(module('core.user'));

    it('should be defined', function() {
        var userModule = angular.module('core.user');
        expect(userModule).toBeDefined();
    });

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
            $httpBackend.expectGET('/api/users').respond(userList);

            var users = User.getAll();
            $httpBackend.flush();
            expect(users.$$state.value).toEqual(userList);
        });

        it('creates a new user', function() {
            $httpBackend.expectPOST('/api/users').respond('User created!');

            var newUser = User.create({
                username: 'Ben',
                password: 'password'
            });
            $httpBackend.flush();
            expect(newUser.$$state.value).toEqual('User created!');
        });

        it('fetches one user', function() {
            var expectedUserData = {
                username: 'Ben',
                id: '12345'
            };
            $httpBackend.expectGET('/api/users/12345').respond(expectedUserData);

            var user = User.get('12345');
            $httpBackend.flush();
            expect(user.$$state.value).toEqual(expectedUserData);
        });

        it('updates one user', function() {
            var expectedUserData = {
                username: 'username',
                id: '12345'
            };
            $httpBackend.expectPUT('/api/users/12345').respond(expectedUserData);

            var updatedUser = User.update({username: 'username'}, '12345');
            $httpBackend.flush();
            expect(updatedUser.$$state.value).toEqual(expectedUserData);
        });

        it('removes one user', function() {
            var expectedResponse = {
                username: 'username',
                id: '12345'
            };
            $httpBackend.expectDELETE('/api/users/12345').respond(expectedResponse);

            var deletedUser = User.remove('12345');
            $httpBackend.flush();
            expect(deletedUser.$$state.value).toEqual(expectedResponse);
        });

        it('logs in a user', function() {
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

            var response = User.login(userInfo);
            $httpBackend.flush();
            expect(response.$$state.value).toEqual(expected);
        });

        it('sets token in local storage on login', function() {
            var response = {
                success: true,
                username: 'username',
                token: '@346dhg234fxv&$bg3#hAJdav23'
            };
            $httpBackend.expectPOST('/api/login').respond(response);

            $httpBackend.flush();
            var token = window.localStorgage.getItem('token');
            expect(token).toEqual(response.token);
        });
        // TODO add more describe blocks tidy up tests
        // finish test for logout

        // it('removes token on logout', function() {
        //     var $injector = angular.injector('core');
        //     var userService = $injector.get('core.user');
        //
        //
        // });
    });
});
