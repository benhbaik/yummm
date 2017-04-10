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
                    var checkboxes = angular.element('.ingredient-checkbox');

                    ShoppingList.saveItems(array).
                    success(function(data) {
                        vm.arrayToAdd = [];

                        checkboxes.each(function(index) {
                            checkboxes[index].checked = false;
                        });
                    }).
                    error(function(data) {
                        console.error(data);
                    });
                }

                function lastRoute() {
                    if ($scope.routeHistory === 0) {
                        return 0;
                    } else {
                        var index = $scope.routeHistory.length - 2;
                        return $scope.routeHistory[index];
                    }
                }

                // word for back to link
                function lastRouteLink() {
                    if (vm.lastRoute()) {
                        var link = vm.lastRoute();
                        link = link.slice(1, link.length);
                        return link;
                    }
                    
                    return false;
                }
            }
        ]
    });
