'use strict';

angular.module('core.recipe', []).
    factory('Recipe', ['$http',
        function($http, Token) {
            return {
                search: search,
                addToFavorites: addToFavorites,
                removeFromFavorites: removeFromFavorites,
                getFavorites: getFavorites
            };

            function search(query, vm) {
                var url = {
                    path: 'https://api.edamam.com/search?',
                    query: 'q=' + query,
                    appId: 'app_id=0c0154a7',
                    appKey: 'app_key=1d068946dcf6f0d21684c8fcf727618d'
                };

                $http.get(url.path + url.query + '&' + url.appId + '&' + url.appKey).
                    success(function(data) {
                        vm.results = data.hits;
                        vm.query = '';
                        vm.loading = false;

                    }).
                    error(function(data) {
                        return data;
                    });
            }

            function addToFavorites(id, recipe, vm) {
                $http.put('/secure/favorites/' + id, recipe).
                    success(function(data) {
                        vm.message = data;
                    }).
                    error(function(data) {
                        return data;
                    });
            }

            function removeFromFavorites(id, recipe) {
                $http.put('/secure/favorites/delete/' + id, recipe).
                    success(function(data) {
                        return data;
                    }).
                    error(function(data) {
                        return data;
                    });
            }

            function getFavorites(id, vm) {
                $http.get('/secure/favorites/' + id).
                    success(function(data) {
                        vm.favorites = data;
                        if (vm.favorites.length === 0) {
                            vm.message = 'Favorites is empty.';
                            vm.empty = true;
                        }
                    }).
                    error(function(data) {
                        return data;
                    });
            }
        }
    ]);
