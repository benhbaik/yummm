'use strict';

angular.module('favorites', ['core.recipe']).
    component('favorites', {
        templateUrl: 'components/favorites/favorites.html',
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
                success(function(data) {
                    vm.favorites = data;
                    if (vm.favorites.length === 0) {
                        vm.empty = true;
                    }
                }).
                error(function(data) {
                    return data;
                });

                function fetchRecipeToRemove(recipe) {
                    // carry recipe from li to modal
                    vm.recipeToRemove = recipe;
                }

                function removeFromFavorites(recipe) {
                    Recipe.removeFromFavorites({ recipe: recipe }).
                    success(function(data) {
                        vm.favorites = data;
                        vm.recipeToRemove = null;
                        if (vm.favorites.length === 0) {
                            vm.empty = true;
                        }
                    }).
                    error(function(data) {
                        return data;
                    });
                }

                function goToRecipe(recipe) {
                    $window.localStorage.setItem('recipe', angular.toJson(recipe));
                    $location.path('/detail');
                }
            }
        ]
    });
