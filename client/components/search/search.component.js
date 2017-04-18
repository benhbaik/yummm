'use strict';

angular.module('search', ['core.recipe']).
    component('search', {
        templateUrl: 'components/search/search.html',
        controllerAs: 'searchCtrl',
        controller: ['Recipe', '$window', '$location', '$anchorScroll',
            function searchController(Recipe, $window, $location, $anchorScroll) {
                var vm = this;
                vm.queryCache = '';
                vm.results = [];
                vm.loading = false;
                vm.loadingMore = false;
                vm.message = '';
                vm.favorites = [];
                vm.search = search;
                vm.loadMore = loadMore;
                vm.populated = populated;
                vm.goToTop = goToTop;
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
                    vm.results = [];
                    vm.loading = true;    
                    vm.queryCache = query.trim();

                    Recipe.search(vm.queryCache).
                    success(function(data) {
                        vm.results = data.hits;
                        vm.query = '';
                        vm.loading = false;
                    }).
                    error(function(data) {
                        return data;
                    });
                }

                function loadMore(query) {
                    vm.loadingMore = true;
                    Recipe.loadMore(query, vm.results.length).
                    success(function(data) {
                        vm.loadingMore = false;
                        vm.results = vm.results.concat(data.hits);
                    }).
                    error(function(data) {
                        return data;
                    });
                }

                function populated() {
                    if (vm.results.length === 0) {
                        return false;
                    }
                    return true;
                }

                function goToTop() {
                    $anchorScroll('top');
                }

                function checkFavorites(recipe) {
                    for(var i = 0; i < vm.favorites.length; i++) {
                        if (vm.favorites[i].label === recipe.label) {
                            return true;
                        }
                    }
                    return false;
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
