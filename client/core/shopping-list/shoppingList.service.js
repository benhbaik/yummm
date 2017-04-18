'use strict';

angular.module('core.shoppingList', ['core.auth']).
    factory('ShoppingList', ['$http', '$window', 'Auth',
        function($http, $window, Auth) {
            var user = Auth.getUserData();

            return {
                getItems: getItems,
                saveItems: saveItems,
                editItem: editItem,
                removeItem: removeItem
            };

            function getItems() {
                return $http.get('/secure/shopping-list/' + user._id);
            }

            function saveItems(items) {
                // add unique id's to items
                for (var i = 0; i < items.length; i++) {
                    items[i] = {
                        id: uuid(),
                        item: items[i]
                    };
                }

                return $http.post('/secure/shopping-list/' + user._id, { items: items });
            }

            function editItem(item) {
                // strip angular $$hashkey
                item = angular.toJson(item);
                item = JSON.parse(item);

                return $http.put('/secure/shopping-list/' + user._id, { item: item });
            }

            function removeItem(items) {
                return $http.put('/secure/shopping-list/delete/' + user._id, { items: items });
            }

            // created id's for items
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
