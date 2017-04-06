'use strict';

angular.module('favorites', ['core.recipe', 'core.token']).
    component('favorites', {
        templateUrl: 'components/favorites/favorites.html',
        controllerAs: 'favoritesCtrl',
        controller: ['Recipe', 'Token',
            function favoritesController(Recipe, Token) {
                var vm = this;
                vm.favorites = [];
                vm.message = '';
                vm.recipeToRemove = {};
                vm.user = Token.getUserData();
                vm.fetchRecipeToRemove = fetchRecipeToRemove;
                vm.removeFromFavorites = removeFromFavorites;

                Recipe.getFavorites(vm.user._id, vm);

                function fetchRecipeToRemove(recipe) {
                    vm.recipeToRemove = recipe;
                }

                function removeFromFavorites(recipe) {
                    var index = vm.favorites.indexOf(recipe);
                    vm.favorites.splice(index, 1);
                    Recipe.removeFromFavorites(vm.user._id, { recipe: recipe });
                    vm.recipeToRemove = null;
                }
            }
        ]
    });
