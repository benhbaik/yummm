'use strict';

angular.module('shoppingList', ['core.shoppingList']).
    component('shoppingList', {
        templateUrl: 'components/shopping-list/shopping-list.html',
        controllerAs: 'shoppingListCtrl',
        controller: ['ShoppingList', '$window',
            function shoppingListController(ShoppingList, $window) {
                var vm = this;
                vm.items = [];
                vm.empty = false;
                vm.currentInput = '';
                vm.itemToRemove = {};
                vm.activateEdit = activateEdit;
                vm.deactivateEdit = deactivateEdit;
                vm.toggleView = toggleView;
                vm.editItem = editItem;
                vm.fetchItemToRemove = fetchItemToRemove;
                vm.removeItem = removeItem;

                ShoppingList.getItems().
                success(function(data) {
                    vm.items = data;
                    if (vm.items.length === 0) {
                        vm.empty = true;
                    }
                }).
                error(function(data) {
                    return data;
                });

                function activateEdit(id) {
                    vm.currentInput = id;
                }

                function deactivateEdit() {
                    vm.currentInput = '';
                }

                function toggleView(id) {
                    // prevent other li's from showing
                    if (vm.currentInput === id) {
                        return true;
                    }
                    return false;
                }

                function editItem(item) {
                    ShoppingList.editItem({ item: item, id: vm.currentInput }).
                    success(function(data) {
                        vm.items = data;
                        vm.currentInput = '';
                    }).
                    error(function(data) {
                        return data;
                    });
                }

                function fetchItemToRemove(item) {
                    vm.itemToRemove = item;
                }

                function removeItem(item) {
                    ShoppingList.removeItem(item, vm).
                    success(function(data) {
                        vm.items = data;
                        if (vm.items.length === 0) {
                            vm.empty = true;
                            vm.itemToRemove = '';
                        }
                    }).
                    error(function(data) {
                        return data;
                    });
                }
            }
        ]
    });
