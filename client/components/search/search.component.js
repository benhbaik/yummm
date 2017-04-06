'use strict';

angular.module('search', ['core.token', 'core.state']).
    component('search', {
        templateUrl: 'components/search/search.html',
        controllerAs: 'searchCtrl',
        controller: ['Recipe', 'Token', 'State',
            function searchController(Recipe, Token, State) {
                var vm = this;
                vm.query;
                vm.results;
                vm.loading = false;
                vm.message;
                vm.user = Token.getUserData();
                vm.favorites;
                vm.search = search;
                vm.checkFavorites = checkFavorites;
                vm.addToFavorites = addToFavorites;
                vm.goToRecipe = goToRecipe;

                Recipe.getFavorites(vm.user._id, vm);

                function search(query) {
                    vm.loading = true;
                    query.trim();
                    Recipe.search(query, vm);
                }

                function checkFavorites(recipe) {
                    for(var i = 0; i < vm.favorites.length; i++) {
                        if (vm.favorites[i].label === recipe.label) {
                            return true;
                        }
                        return false;
                    }
                }

                function addToFavorites(recipe) {
                    if (vm.checkFavorites(recipe)) {
                        vm.message = 'Already a favorite!';
                    } else {
                        vm.favorites.push(recipe);
                        Recipe.addToFavorites(vm.user._id, { recipe: recipe }, vm);
                    }
                }

                function goToRecipe(recipe) {
                    State.currentRecipe = recipe;
                }
            }
        ]
    });
