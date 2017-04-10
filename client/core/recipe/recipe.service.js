'use strict';

angular.module('core.recipe', ['core.auth']).
    factory('Recipe', ['$http', 'Auth',
        function($http, Auth) {
            var user = Auth.getUserData();

            return {
                search: search,
                addToFavorites: addToFavorites,
                removeFromFavorites: removeFromFavorites,
                getFavorites: getFavorites
            };

            function search(query) {
                var url = {
                    path: 'https://api.edamam.com/search?',
                    query: 'q=' + query,
                    appId: 'app_id=0c0154a7',
                    appKey: 'app_key=1d068946dcf6f0d21684c8fcf727618d'
                };

                return $http.get(url.path + url.query + '&' + url.appId + '&' + url.appKey);
            }

            function addToFavorites(recipe) {
                return $http.post('/secure/favorites/' + user._id, recipe);
            }

            function removeFromFavorites(recipe) {
                return $http.put('/secure/favorites/delete/' + user._id, recipe);
            }

            function getFavorites() {
                return $http.get('/secure/favorites/' + user._id);
            }
        }
    ]);
