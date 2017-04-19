'use strict';

angular.module('detail', ['core.shoppingList']).
    component('detail', {
        template: require('./detail.html'),
        // templateUrl: 'components/detail/detail.html',
        controllerAs: 'detailCtrl',
        controller: ['ShoppingList', '$window', '$rootScope',
            function(ShoppingList, $window, $scope) {
                var vm = this;

                vm.recipe = JSON.parse($window.localStorage.getItem('recipe'));
                vm.arrayToAdd = [];
                vm.message = '';
                vm.ingredientsExpanded = '';
                vm.labelsExpanded = '';
                vm.expandIngredients = expandIngredients;
                vm.expandLabels = expandLabels;
                vm.toggleSelection = toggleSelection;
                vm.addItems = addItems;
                vm.lastRoute = lastRoute;
                vm.lastRouteLink = lastRouteLink;

                function expandIngredients() {
                    if (vm.ingredientsExpanded === '') {
                        vm.ingredientsExpanded = 'expanded-active';
                    } else if (vm.ingredientsExpanded === 'expanded-active') {
                        vm.ingredientsExpanded = '';
                    }
                }

                function expandLabels() {
                    if (vm.labelsExpanded === '') {
                        vm.labelsExpanded = 'expanded-active';
                    } else if (vm.labelsExpanded === 'expanded-active') {
                        vm.labelsExpanded = '';
                    }
                }

                function toggleSelection(item) {
                    var index = vm.arrayToAdd.indexOf(item);
                    if (index === -1) {
                        vm.arrayToAdd.push(item);
                    } else if (index >= 0) {
                        vm.arrayToAdd.splice(index, 1);
                    }
                }

                function addItems(array) {
                    if (array.length > 0) {
                        ShoppingList.saveItems(array).
                        then(function(res) {
                            vm.message = 'Items added to list!.';
                            vm.arrayToAdd = [];
                        });
                    }

                    vm.message = 'Select items to add to your list.';
                }

                function lastRoute() {
                    var length = $scope.routeHistory.length;

                    if (length > 1) {
                        var index = length - 2;
                        return $scope.routeHistory[index];
                    }
                    return false;
                }

                // word for back to link
                function lastRouteLink() {
                    var lastRoute = vm.lastRoute();

                    if (lastRoute) {
                        lastRoute = lastRoute.slice(1, lastRoute.length);
                        lastRoute = lastRoute.charAt(0).toUpperCase() + lastRoute.substr(1);
                        return lastRoute;
                    }
                    
                    return false;
                }
            }
        ]
    });
