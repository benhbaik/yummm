'use strict';

angular.module('search', ['core.recipe']).
    component('search', {
        templateUrl: 'components/search/search.html',
        controllerAs: 'searchCtrl',
        controller: ['Recipe', '$window', '$location',
            function searchController(Recipe, $window, $location) {
                var vm = this;
                vm.query = '';
                vm.results = [];
                vm.loading = false;
                vm.message = '';
                vm.favorites = [];
                vm.search = search;
                vm.checkFavorites = checkFavorites;
                vm.addToFavorites = addToFavorites;
                vm.goToRecipe = goToRecipe;

                Recipe.getFavorites().
                success(function(data) {
                    vm.favorites = data;
                }).
                error(function(data){
                    return data;
                });

                function search(query) {
                    vm.loading = true;

                    query.trim();

                    Recipe.search(query).
                    success(function(data) {
                        vm.results = data.hits;
                        vm.query = '';
                        vm.loading = false;
                    }).
                    error(function(data) {
                        return data;
                    });
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

                        Recipe.addToFavorites({ recipe: recipe }).
                        success(function(data) {
                            vm.message = data;
                        }).
                        error(function(data) {
                            return data;
                        });
                    }
                }

                function goToRecipe(recipe) {
                    $window.localStorage.setItem('recipe', angular.toJson(recipe));
                    $location.path('/detail');
                }
            }
        ]
    });
