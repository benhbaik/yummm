'use strict';

angular.module('favorites', ['core.recipe']).
    component('favorites', {
        template: require('./favorites.html'),
        // templateUrl: 'components/favorites/favorites.html',
        controllerAs: 'favoritesCtrl',
        controller: ['Recipe', '$window', '$location',
            function favoritesController(Recipe, $window, $location) {
                var vm = this;
                vm.favorites = [];
                vm.empty = false;
                vm.recipeToRemove = {};
                vm.fetchRecipeToRemove = fetchRecipeToRemove;
                vm.removeFromFavorites = removeFromFavorites;
                vm.goToRecipe = goToRecipe;

                Recipe.getFavorites().
                then(function(res) {
                    vm.favorites = res.data;
                    if (vm.favorites.length === 0) {
                        vm.empty = true;
                    }
                });

                // carry recipe from li to modal
                function fetchRecipeToRemove(recipe) {
                    vm.recipeToRemove = recipe;
                }

                function removeFromFavorites(recipe) {
                    Recipe.removeFromFavorites({ recipe: recipe }).
                    then(function(res) {
                        vm.favorites = res.data;
                        vm.recipeToRemove = null;
                        if (vm.favorites.length === 0) {
                            vm.empty = true;
                        }
                    });
                }

                function goToRecipe(recipe) {
                    $window.localStorage.setItem('recipe', angular.toJson(recipe));
                    $location.path('/detail');
                }
            }
        ]
    });
