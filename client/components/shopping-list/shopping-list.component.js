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
                vm.deactivateEdit = deactivateEdit;
                vm.toggleView = toggleView;
                vm.editItem = editItem;
                vm.removeItem = removeItem;

                ShoppingList.getItems(vm);

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
                    ShoppingList.editItem({ item: item, id: vm.currentInput }, vm);
                }

                function removeItem(item) {
                    ShoppingList.removeItem(item, vm);
                }
            }
        ]
    });
