'use strict';

angular.module('shoppingList', ['core.shoppingList']).
    component('shoppingList', {
        templateUrl: 'components/shopping-list/shopping-list.html',
        controllerAs: 'shoppingListCtrl',
        controller: ['ShoppingList', '$window',
            function shoppingListController(ShoppingList, $window) {
                var vm = this;
                vm.items;
                vm.empty = false;
                vm.currentInput = '';
                vm.activateEdit = activateEdit;
                vm.toggleView = toggleView;
                vm.editItem = editItem;

                vm.testFunc = function() {
                    console.log('touched');
                }

                ShoppingList.getItems(vm);

                function removeItem(item) {
                    ShoppingList.removeItem(item, vm);
                }

                function activateEdit(id) {
                    vm.currentInput = id;
                }

                function toggleView(id) {
                    if (vm.currentInput === id) {
                        return true;
                    }
                    return false;
                }

                function editItem(item) {
                    ShoppingList.editItem({ item: item, id: vm.currentInput }, vm);
                }
            }
        ]
    });
