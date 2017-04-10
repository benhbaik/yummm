'use strict';

describe('core.shoppingList', function() {
    beforeEach(function() {
        var mockAuth = {
            getUserData: function() {
                return { username: 'username', _id: '58e7edf4d316ad139fb5b692' };
            }
        };

        module('core.shoppingList');
        module('core.auth', function($provide) {
            $provide.factory('Auth', function() {
                return mockAuth;
            });
        });
    });

    it('should be defined', function() {
        var shoppingListModule = angular.module('core.shoppingList');
        expect(shoppingListModule).toBeDefined();
    });

    describe('ShoppingList' , function() {
        var http;
        var ShoppingList;

        beforeEach(inject(function(_$httpBackend_, _ShoppingList_) {
            http = _$httpBackend_;
            ShoppingList = _ShoppingList_;
            jasmine.addCustomEqualityTester(angular.equals);
        }));

        describe('get items method', function() {
            var result;
            var expected;

            beforeEach(function(done) {
                result = [];
                expected = [
                    { item: 'chicken', id: '123' },
                    { item: 'salt', id: '124' },
                    { item: 'pepper', id: '125' }
                ];
                
                http.expectGET('/secure/shopping-list/58e7edf4d316ad139fb5b692').respond(expected);

                ShoppingList.getItems().
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

            it('gets shopping list items', function() {
                expect(result).toEqual(expected);
            });
        });

        describe('save items method', function() {
            var result;
            var arrayToAdd;
            var expected;

            beforeEach(function(done) {
                result = [];
                arrayToAdd = [
                    { item: 'milk', id: '123' },
                    { item: 'eggs', id: '124' }
                ];
                expected = [
                    { item: 'flour', id: '123' },
                    { item: 'milk', id: '124' },
                    { item: 'eggs', id: '125' }
                ];

                http.expectPOST('/secure/shopping-list/58e7edf4d316ad139fb5b692').respond(expected);

                ShoppingList.saveItems(arrayToAdd).
                    success(function(data) {
                        result = data;
                        done();
                    }).error(function(data) {
                        result = data;
                        done();
                    });

                http.flush();
            });

            it('returns new array of items', function() {
                expect(result).toEqual(expected);
            });
        });

        describe('edit item method', function() {
            var result;
            var expected;

            beforeEach(function(done) {
                result = [];
                expected = [
                    { item: 'flour', id: '123' },
                    { item: 'milk', id: '124' },
                    { item: 'eggs', id: '125' }
                ];

                http.expectPUT('/secure/shopping-list/58e7edf4d316ad139fb5b692').respond(expected);

                ShoppingList.editItem({ item: { item: 'milk', id: '124' } }).
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

            it('edits and item', function() {
                expect(result).toEqual(expected);
            });
        });

        describe('remove item method', function() {
            var result;
            var expected;

            beforeEach(function(done) {
                result = [];
                expected = [
                    { item: 'flour', id: '123' },
                    { item: 'milk', id: '124' }
                ];

                http.whenPUT('/secure/shopping-list/delete/58e7edf4d316ad139fb5b692').respond(expected);

                ShoppingList.removeItem({ item: 'eggs', id: '125' }).
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

            it('removes and item from list', function() {
                expect(result).toEqual(expected);
            });
        });
    });
});
