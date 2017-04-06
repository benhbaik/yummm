'use strict';

angular.module('core.shoppingList', ['core.token']).
    factory('ShoppingList', ['$http', '$window', 'Token',
        function($http, $window, Token) {
            var user = Token.getUserData();

            return {
                getItems: getItems,
                saveItems: saveItems,
                editItem: editItem,
                removeItem: removeItem
            }

            function getItems(vm) {
                $http.get('/secure/shopping-list/' + user._id).
                    success(function(data) {
                        vm.items = data;
                        if (vm.items.length === 0) {
                            vm.empty = true;
                        }
                    }).
                    error(function(data) {
                        return data;
                    });
            }

            function saveItems(items, vm) {
                // add unique id's to items for edit feature
                for (var i = 0; i < items.length; i++) {
                    items[i] = {
                        id: uuid(),
                        item: items[i]
                    }
                }
                $http.post('/secure/shopping-list/' + user._id, { items: items }).
                    success(function(data) {
                        vm.arrayToAdd = [];
                    }).
                    error(function(data) {
                        return data;
                    });
            }

            function editItem(item) {
                $http.put('/secure/shopping-list/' + user._id, { item: item }).
                    success(function(data) {
                        console.log(data);
                    }).
                    error(function(data) {
                        console.log(data);
                    });
            }

            function removeItem(item, vm) {
                $http.put('/secure/shopping-list/delete/' + user._id, { item: item }).
                    success(function(data) {
                        vm.items = data;
                        if (vm.items.length === 0) {
                            vm.empty = true;
                        }
                    }).
                    error(function(data) {
                        return data;
                    });
            }

            function uuid() {
                // jshint bitwise:false
                var i, random;
                var uuid = '';

                for (i = 0; i < 32; i++) {
                    random = Math.random() * 16 | 0;
                    if (i === 8 || i === 12 || i === 16 || i === 20) {
                        uuid += '-';
                    }
                    uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random)).toString(16);
                }

                return uuid;
            }
        }
    ]);
