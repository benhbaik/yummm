'use strict';

angular.module('shoppingList', ['core.shoppingList']).
    component('shoppingList', {
        templateUrl: 'components/shopping-list/shopping-list.html',
        controllerAs: 'shoppingListCtrl',
        controller: ['ShoppingList', '$window',
            function shoppingListController(ShoppingList, $window) {
                var vm = this;
                vm.items = [];
                vm.itemsPool = [];
                vm.removeCount = 0;
                vm.empty = false;
                vm.currentInput = '';
                vm.newItem = '';
                vm.activateEdit = activateEdit;
                vm.deactivateEdit = deactivateEdit;
                vm.toggleView = toggleView;
                vm.editItem = editItem;
                vm.addItem = addItem;
                vm.checkIfRemoved = checkIfRemoved;
                vm.removeFromPool = removeFromPool;
                vm.removeItems = removeItems;

                ShoppingList.getItems().
                success(function(data) {
                    vm.items = data;
                    vm.itemsPool = JSON.parse(angular.toJson(data));
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
                    // prevent other li's from showing edit
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

                function addItem(item) {
                    if (item === '') {
                        return;
                    }

                    item = Array(item);

                    ShoppingList.saveItems(item).
                    success(function(data) {
                        vm.items = data;
                        vm.itemsPool = JSON.parse(angular.toJson(data));
                        vm.newItem = '';
                    }).
                    error(function(data) {
                        return data;
                    });
                }

                function checkIfRemoved(item) {
                    var index = findIndex(vm.itemsPool, item);

                    if (index === -1) {
                        return 'deleted';
                    } else {
                        return '';
                    }
                }

                function removeFromPool(item) {
                    var index = findIndex(vm.itemsPool, item);

                    if (index >= 0) {
                        vm.itemsPool.splice(index, 1);
                        vm.removeCount++;
                    } else if (index === -1) {
                        vm.itemsPool.push(item);
                        vm.removeCount--;
                    }
                }

                function removeItems(items) {
                    ShoppingList.removeItem(items).
                    success(function(data) {
                        vm.items = data;
                        vm.removeCount = 0;
                        if (vm.items.length === 0) {
                            vm.empty = true;
                        }
                    }).
                    error(function(data) {
                        return data;
                    });
                }

                // helper

                function findIndex(array, item) {
                    for (var i = 0; i < array.length; i++) {
                        if (array[i].id === item.id) {
                            return i;
                        }
                    }
                    return -1;
                }
            }
        ]
    });
