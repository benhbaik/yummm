'use strict';

angular.module('search', ['core.recipe']).
    component('search', {
        template: require('./search.html'),
        controllerAs: 'searchCtrl',
        controller: ['Recipe', '$window', '$location', '$anchorScroll',
            function searchController(Recipe, $window, $location, $anchorScroll) {
                var vm = this;
                vm.queryCache = '';
                vm.results = [];
                vm.loading = false;
                vm.loadingMore = false;
                vm.noResults = false;
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
                then(function(res) {
                    vm.favorites = res.data;
                });

                function search(query) {
                    vm.results = [];
                    vm.noResults = false;
                    vm.loading = true;    
                    vm.queryCache = query.trim();

                    Recipe.search(vm.queryCache).
                    then(function(res) {
                        vm.query = '';
                        vm.loading = false;

                        if (res.data.hits.length === 0) {
                            vm.noResults = true;
                        } else {
                            vm.results = res.data.hits;
                        }  
                    });
                }

                function loadMore(query) {
                    vm.loadingMore = true;
                    Recipe.loadMore(query, vm.results.length).
                    then(function(res) {
                        vm.loadingMore = false;
                        vm.results = vm.results.concat(res.data.hits);
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
                        then(function(res) {
                            vm.message = res.data;
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
