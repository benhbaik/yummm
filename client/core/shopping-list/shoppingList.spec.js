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

        afterEach(function() {
            http.verifyNoOutstandingExpectation();
            http.verifyNoOutstandingRequest();
        });

        describe('get items method', function() {
            var expected;

            beforeEach(function() {
                expected = [
                    { item: 'chicken', id: '123' },
                    { item: 'salt', id: '124' },
                    { item: 'pepper', id: '125' }
                ];
                
                http.expectGET('/secure/shopping-list/58e7edf4d316ad139fb5b692').respond(expected);
            });

            it('gets shopping list items', function() {
                ShoppingList.getItems().
                success(function(data) {
                    expect(data).toEqual(expected);
                }).
                error(function(data) {
                    expect(data).toEqual(expected);
                });

                http.flush();
            });
        });

        describe('save items method', function() {
            var arrayToAdd;
            var expected;

            beforeEach(function() {
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
            });

            it('returns array with new item', function() {
                ShoppingList.saveItems(arrayToAdd).
                success(function(data) {
                    expect(data).toEqual(expected);
                }).error(function(data) {
                    expect(data).toEqual(expected);
                });

                http.flush();   
            });
        });

        describe('edit item method', function() {
            var expected;

            beforeEach(function() {
                expected = [
                    { item: 'flour', id: '123' },
                    { item: 'milk', id: '124' },
                    { item: 'eggs', id: '125' }
                ];

                http.expectPUT('/secure/shopping-list/58e7edf4d316ad139fb5b692').respond(expected);
            });

            it('returns array with updated item', function() {
                ShoppingList.editItem({ item: { item: 'milk', id: '124' } }).
                success(function(data) {
                    expect(data).toEqual(expected);
                }).
                error(function(data) {
                    expect(data).toEqual(expected);
                });
                
                http.flush();
            });
        });

        describe('remove item method', function() {
            var result;
            var expected;

            beforeEach(function() {
                result = [];
                expected = [
                    { item: 'flour', id: '123' },
                    { item: 'milk', id: '124' }
                ];

                http.whenPUT('/secure/shopping-list/delete/58e7edf4d316ad139fb5b692').respond(expected);
            });

            it('removes and item from list', function() {
                ShoppingList.removeItem({ item: 'eggs', id: '125' }).
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
