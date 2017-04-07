'use strict';

angular.module('detail', ['core.shoppingList']).
    component('detail', {
        templateUrl: 'components/detail/detail.html',
        controllerAs: 'detailCtrl',
        controller: ['ShoppingList', '$window', '$rootScope',
            function(ShoppingList, $window, $rootScope) {
                var vm = this;
                var routeIndex = $rootScope.routeHistory.length - 2;
                vm.recipe = JSON.parse($window.localStorage.getItem('recipe'));
                vm.arrayToAdd = [];
                vm.toggleSelection = toggleSelection;
                vm.addItems = addItems;
                vm.lastRoute = $rootScope.routeHistory[routeIndex];
                vm.lastRouteLink = lastRouteLink;

                function toggleSelection(item) {
                    var index = vm.arrayToAdd.indexOf(item);
                    if (index === -1) {
                        vm.arrayToAdd.push(item);
                    } else if (index >= 0) {
                        vm.arrayToAdd.splice(index, 1);
                    }
                }

                function addItems(array) {
                    var checkboxes = angular.element('.ingredient-checkbox');
                    checkboxes.each(function(index) {
                        checkboxes[index].checked = false;
                    });
                    ShoppingList.saveItems(array, vm);
                }

                function lastRouteLink() {
                    if (vm.lastRoute) {
                        var link = vm.lastRoute;
                        link = link.slice(1, link.length);
                        return link;
                    }
                    return false;
                };
            }
        ]
    });
