'use strict';

describe('detail', function() {
    it('should be defined', function() {
        var detailModule = angular.module('detail');
        expect(detailModule).toBeDefined();
    });

    beforeEach(function() {
        var mockShoppingList = {
            // use to track calls
            // jasmine spyOn takes away success and error
            counter: 0,
            saveItems: function(array) {
                this.counter++;

                return {
                    success: function(fn) {
                        fn();
                        return this;
                    },
                    error: function(fn) {
                        fn();
                        return this;
                    }
                }
            }
        };

        module('detail');
        module('core.shoppingList', function($provide) {
            $provide.factory('ShoppingList', function() {
                return mockShoppingList;
            });
        });
    });

    describe('detail ctrl', function() {
        var scope;
        var ctrl;
        var $q;
        var ShoppingList;

        beforeEach(inject(function($componentController, $rootScope, _ShoppingList_, _$q_) {
            scope = $rootScope.$new();
            ctrl = $componentController('detail', { $scope: scope });
            $q = _$q_;
            ShoppingList = _ShoppingList_;
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
            it('calls ShoppingList.saveItems()', function() {
                var ingredients = ['ingredient one', 'ingredient two'];
                
                ctrl.addItems(ingredients);

                expect(ShoppingList.counter).toBe(1);
            });
        });

        describe('vm.lastRoute', function() {
            var result;

            it('returns false if there is no last route', function() {
                inject(function($rootScope) {
                    $rootScope.routeHistory = ['/'];
                });

                result = ctrl.lastRoute();

                expect(result).toBe(false);
            });

            it('returns route if there is a last route', function() {
                inject(function($rootScope) {
                    $rootScope.routeHistory = ['/', '/login', '/favorites', '/detail'];
                });

                result = ctrl.lastRoute();

                expect(result).toBe('/favorites');
            });
        });

        describe('vm.lastRouteLink', function() {
            var result;

            it('returns false if no lsat route', function() {
                ctrl.lastRoute = function() {
                    return false;
                };

                result = ctrl.lastRouteLink();

                expect(result).toBe(false);
            });

            it('returns last route without "/"', function() {
                ctrl.lastRoute = function() {
                    return '/favorites';
                };

                result = ctrl.lastRouteLink();

                expect(result).toBe('favorites');
            });
        });
    });
});
