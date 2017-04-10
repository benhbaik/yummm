'use strict';

describe('detail', function() {
    it('should be defined', function() {
        var detailModule = angular.module('detail');
        expect(detailModule).toBeDefined();
    });

    // beforeEach(module('detail'));
    beforeEach(function() {
        var mockShoppingList = {
            saveItems: function() {
                ctrl.arrayToAdd = [];
            }
        };

        module('detail')
        module('core.shoppingList', function($provide) {
            $provide.factory('ShoppingList', function() {
                return mockShoppingList;
            });
        });
    });

    describe('detail ctrl', function() {
        var scope;
        var ctrl;

        beforeEach(inject(function($componentController, $rootScope) {
            scope = $rootScope.$new();
            ctrl = $componentController('detail', scope);
        }));

        it('should be defined', function() {
            expect(ctrl).toBeDefined();
        });

        describe('vm.toggleSelection', function() {

            it('pushes items to vm.arrayToAdd if not already pushed', function() {
                var expected = [
                    'item one',
                    'item two'
                ];
                var item = 'item two';

                ctrl.arrayToAdd = [
                    'item one'
                ];

                ctrl.toggleSelection(item);

                expect(ctrl.arrayToAdd).toEqual(expected);
            });

            it('removes item if already pushed', function() {
                var expected = [
                    'item one'
                ];
                var item = 'item two';

                ctrl.arrayToAdd = [
                    'item one',
                    'item two'
                ];

                ctrl.toggleSelection(item);

                expect(ctrl.arrayToAdd).toEqual(expected);
            });
        });

        describe('vm.addItems', function() {
            it('clears arrayToAdd', function() {
                ctrl.arrayToAdd = [
                    'item one',
                    'item two',
                    'item three'
                ];
                ctrl.addItems();
                expect(ctrl.arrayToAdd).toEqual([]);
            });
        });
    });
});
