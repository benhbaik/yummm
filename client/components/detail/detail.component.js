'use strict';

angular.module('detail', ['core.shoppingList']).
    component('detail', {
        templateUrl: 'components/detail/detail.html',
        controllerAs: 'detailCtrl',
        controller: ['ShoppingList', '$window', '$rootScope',
            function(ShoppingList, $window, $scope) {
                var vm = this;

                vm.recipe = JSON.parse($window.localStorage.getItem('recipe'));
                vm.arrayToAdd = [];
                vm.toggleSelection = toggleSelection;
                vm.addItems = addItems;
                vm.lastRoute = lastRoute;
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
                    ShoppingList.saveItems(array).
                    success(function(data) {
                        vm.arrayToAdd = [];
                    }).
                    error(function(data) {
                        return data;
                    });
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
                        return lastRoute;
                    }
                    
                    return false;
                }
            }
        ]
    });
