'use strict';

describe('shopping-list', function() {
    it('should be defined', function() {
        var shoppingListModule = angular.module('shoppingList');
        expect(shoppingListModule).toBeDefined();
    });

    beforeEach(module('shoppingList'));
});
