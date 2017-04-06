'use strict';

angular.module('favorites', ['core.recipe']).
    component('favorites', {
        templateUrl: 'components/favorites/favorites.html',
        controllerAs: 'favoritesCtrl',
        controller: ['Recipe', '$window',
            function favoritesController(Recipe, $window) {
                var vm = this;
                vm.favorites = [];
                vm.empty = false;
                vm.recipeToRemove = {};
                vm.fetchRecipeToRemove = fetchRecipeToRemove;
                vm.removeFromFavorites = removeFromFavorites;
                vm.gotoRecipe = goToRecipe;

                Recipe.getFavorites(vm);

                function fetchRecipeToRemove(recipe) {
                    vm.recipeToRemove = recipe;
                }

                function removeFromFavorites(recipe) {
                    Recipe.removeFromFavorites({ recipe: recipe }, vm);
                }

                function goToRecipe(recipe) {
                    $window.localStorage.setItem('recipe', JSON.stringify(recipe));
                }
            }
        ]
    });
