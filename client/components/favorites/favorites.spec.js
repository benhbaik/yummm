'use strict';

describe('favorites', function() {
    it('should be defined', function() {
        var favoritesModule = angular.module('favorites');
        expect(favoritesModule).toBeDefined();
    });

    beforeEach(function() {
        var mockRecipe = {
            getFavoritesCounter: 0,
            getFavorites: function() {
                this.getFavoritesCounter++;
                return {
                    success: function(fn) {
                        return this;
                    },
                    error: function(fn) {
                        return this;
                    }
                };
            },
            removeFromFavoritesCounter: 0,
            removeFromFavorites: function(recipe) {
                this.removeFromFavoritesCounter++;
                return {
                    success: function(fn) {
                        return this;
                    },
                    error: function(fn) {
                        return this;
                    }
                };
            }
        };

        module('favorites');
        module('core.recipe', function($provide) {
            $provide.factory('Recipe', function() {
                return mockRecipe;
            });
        });
    });

    describe('favorites controller', function() {
        var scope;
        var ctrl;
        var Recipe;
        var window;
        var $location;

        beforeEach(function() {
            inject(function($componentController, _Recipe_, $rootScope, $window, _$location_) {
                scope = $rootScope.$new();
                // debugger;
                ctrl = $componentController('favorites');
                Recipe = _Recipe_;
                window = $window;
                $location = _$location_;
            });
        });

        it('calls Recipe.getFavorites on load', function() {
            expect(Recipe.getFavoritesCounter).toBe(1);
        });

        describe('vm.fetchRecipeToRemove', function() {
            var result;

            it('stores recipe in controller', function() {
                ctrl.fetchRecipeToRemove('recipe');

                result = ctrl.recipeToRemove;

                expect(result).toBe('recipe');
            });
        });

        describe('vm.removeFromFavorites', function() {
            var result;

            it('calls Recipe.removeFromFavorites', function() {
                ctrl.removeFromFavorites('recipe');

                result = Recipe.removeFromFavoritesCounter;

                expect(result).toBe(1);
            });
        });

        describe('vm.goToRecipe', function() {
            var result;

            it('saves recipe to local storage', function() {
                ctrl.goToRecipe('a recipe');

                result = JSON.parse(window.localStorage.getItem('recipe'));

                expect(result).toBe('a recipe');
            });

            it('redirects to /detail', function() {
                spyOn($location, 'path');

                ctrl.goToRecipe('a recipe');

                expect($location.path).toHaveBeenCalledWith('/detail');
            });
        });
    });
});
