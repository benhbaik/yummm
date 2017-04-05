angular.module('search', ['core.recipe']).
    component('search', {
        templateUrl: 'components/search/search.html',
        controllerAs: 'searchCtrl',
        controller: ['Recipe',
            function(Recipe, User) {
                var vm = this;
                vm.query;
                vm.results;
                vm.loading = false;

                vm.search = function(query) {
                    vm.loading = true;
                    query.trim();
                    Recipe.search(query, vm);
                }

                vm.get = function() {
                    User.getAll();
                }

                vm.favorite = function(recipe) {
                    Recipe.favorite(recipe, vm);
                }
            }
        ]
    });
