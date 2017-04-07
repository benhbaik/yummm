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
                vm.removeItem = removeItem;
                vm.editItem = editItem;

                ShoppingList.getItems(vm);

                function removeItem(item) {
                    ShoppingList.removeItem(item, vm);
                }

                function editItem(item) {
                    ShoppingList.editItem(item);
                }
            }
        ]
    });
