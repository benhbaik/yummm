'use strict';

describe('search', function() {
    it('should be defined', function() {
        var searchModule = angular.module('search');
        expect(searchModule).toBeDefined();
    });

    beforeEach(function() {
        var mockRecipe = {
            // addtofavorites
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
            searchCounter: 0,
            search: function() {
                this.searchCounter++;
                return {
                    success: function(fn) {
                        return this;
                    },
                    error: function(fn) {
                        return this;
                    }
                };
            },
            addToFavoritesCounter: 0,
            addToFavorites: function() {
                this.addToFavoritesCounter++;
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

        module('search');
        module('core.recipe', function($provide) {
            $provide.factory('Recipe', function() {
                return mockRecipe;
            });
        });
    });

    describe('search controller', function() {
        var ctrl;
        var Recipe;
        var window;

        beforeEach(function() {
            inject(function($componentController, _Recipe_, $window) {
                ctrl = $componentController('search');
                Recipe = _Recipe_;
                window = $window;
                jasmine.addCustomEqualityTester(angular.equals);
            });
        });

        it('calls Recipe.getFavorites on load', function() {
            expect(Recipe.getFavoritesCounter).toBe(1);
        });

        describe('vm.search', function() {
            it('calls Recipe.search', function() {
                ctrl.search('query');

                expect(Recipe.searchCounter).toBe(1);
            });
        });

        describe('vm.checkFavorites', function() {
            var result;

            it('returns true if recipe is in favorites', function() {
                ctrl.favorites = [{ label: 'recipe one' }, { label: 'recipe two' }];

                result = ctrl.checkFavorites({ label: 'recipe one' });

                expect(result).toBe(true);
            });

            it('returns false if recipe is not in favorites', function() {
                ctrl.favorites = [{ label: 'recipe one' }, { label: 'recipe two' }];

                result = ctrl.checkFavorites({ label: 'recipe three' });

                expect(result).toBe(false);
            });
        });

        describe('vm.addtoFavorites', function() {
            it('changes vm.message to "Already a favorite!" if already in favorites', function() {
                ctrl.checkFavorites = function() {
                    return true;
                };

                ctrl.addToFavorites('recipe');

                expect(ctrl.message).toBe('Already a favorite!');
            });

            it('pushes recipe to favorites if not in favorites', function() {
                var expected = [{ label: 'recipe one' }, { label: 'recipe two' }];

                ctrl.favorites = [{ label: 'recipe one' }];
                ctrl.checkFavorites = function() {
                    return false;
                };

                ctrl.addToFavorites({ label: 'recipe two' });

                expect(ctrl.favorites).toEqual(expected);
            });

            it('calls Recipe.addToFavorites if not in favorites', function() {
                ctrl.checkFavorites = function() {
                    return false;
                };

                ctrl.addToFavorites({ label: 'recipe one' });

                expect(Recipe.addToFavoritesCounter).toBe(1);
            });
        });

        describe('vm.goToRecipe', function() {
            var result;

            it('save recipe to local storage', function() {
                ctrl.goToRecipe({ label: 'recipe one' });

                result = JSON.parse(window.localStorage.getItem('recipe'));

                expect(result).toEqual({ label: 'recipe one' });
            });
        });
    });
});
