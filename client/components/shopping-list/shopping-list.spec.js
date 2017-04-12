'use strict';

describe('shopping-list', function() {
    it('should be defined', function() {
        var shoppingListModule = angular.module('shoppingList');
        expect(shoppingListModule).toBeDefined();
    });

    beforeEach(function() {
        var mockShoppingList = {
            getItemsCounter: 0,
            getItems: function() {
                this.getItemsCounter++;
                return {
                    success: function() {
                        return this;
                    },
                    error: function() {
                        return this;
                    }
                };
            },
            removeItemCounter: 0,
            removeItem: function() {
                this.removeItemCounter++;
                return {
                    success: function() {
                        return this;
                    },
                    error: function() {
                        return this;
                    }
                };
            },
            editItemCounter: 0,
            editItem: function() {
                this.editItemCounter++;
                return {
                    success: function() {
                        return this;
                    },
                    error: function() {
                        return this;
                    }
                };
            }
        };

        module('shoppingList');
        module('core.shoppingList', function($provide) {
            $provide.factory('ShoppingList', function() {
                return mockShoppingList;
            });
        });
    });

    describe('shoppingList controller', function() {
        var ctrl;
        var ShoppingList;

        beforeEach(function() {
            inject(function($componentController, _ShoppingList_) {
                ctrl = $componentController('shoppingList');
                ShoppingList = _ShoppingList_;
                jasmine.addCustomEqualityTester(angular.equals);
            });
        });

        it('calls ShoppingList.getItems on load', function() {
            expect(ShoppingList.getItemsCounter).toBe(1);
        });

        describe('vm.activateEdit', function() {
            it('takes id as argument and assigns it to vm.currentInput', function() {
                ctrl.activateEdit('12345');

                expect(ctrl.currentInput).toBe('12345');
            });
        });

        describe('vm.deactivateEdit', function() {
            it('clears vm.currentInput', function() {
                ctrl.deactivateEdit();

                expect(ctrl.currentInput).toBe('');
            });
        });

        describe('vm.toggleView', function() {
            var result;

            it('returns true if id argument equals vm.current input', function() {
                ctrl.currentInput = '12345';

                result = ctrl.toggleView('12345');

                expect(result).toBe(true);
            });

            it('returns false if id argument does not equal vm.current input', function() {
                ctrl.currentInput = '54321';

                result = ctrl.toggleView('12345');

                expect(result).toBe(false);
            });
        });

        describe('vm.editItem', function() {
            it('calls ShoppingList.editItem', function() {
                ctrl.editItem({ item: { item: 'new item' }, id: '12345' });

                expect(ShoppingList.editItemCounter).toBe(1);
            });
        });

        describe('vm.fetchItemToRemove', function() {
            it('takes item as argument and assigns it to vm.itemToRemove', function() {
                ctrl.fetchItemToRemove({ item: 'item' });

                expect(ctrl.itemToRemove).toEqual({ item: 'item' });
            });
        });

        describe('vm.removeItem', function() {
            it('calls ShoppingList.removeItem', function() {
                ctrl.removeItem({ item: 'item' });

                expect(ShoppingList.removeItemCounter).toBe(1);
            });
        });
    });
});
