'use strict';

describe('core.recipe', function() {
    var http;
    var Recipe;

    beforeEach(function() {
        var mockAuth = {
            getUserData: function() {
                return {
                    username: 'user',
                    _id: '58dad8d0a6a942e2319cedab'
                };
            }
        };

        module('core.recipe');
        module('core.auth', function($provide) {
            $provide.factory('Auth', function() {
                return mockAuth;
            });
        });
    });

    it('should be defined', function() {
        var recipeModule = angular.module('core.recipe');
        expect(recipeModule).toBeDefined();
    });
    
    beforeEach(inject(function(_$httpBackend_, _Recipe_) {
        jasmine.addCustomEqualityTester(angular.equals);
        http = _$httpBackend_;
        Recipe = _Recipe_;
    }));

    afterEach(function() {
        http.verifyNoOutstandingExpectation();
        http.verifyNoOutstandingRequest();
    });

    describe('Recipe', function() {
        describe('search method', function() {
            var query;
            var url;
            var expected;

            beforeEach(function() {
                query = 'chicken';
                url = {
                    path: 'https://api.edamam.com/search?',
                    query: 'q=' + query,
                    appId: 'app_id=0c0154a7',
                    appKey: 'app_key=1d068946dcf6f0d21684c8fcf727618d'
                };
                expected = {
                    q: 'chicken',
                    hits: [
                        {
                            recipe: {
                                label: 'Herbes de Provence Rotisserie Chickens'
                            }
                        },
                        {
                            recipe: {
                                label: 'Sunday Supper: Jerk Half-Chickens'
                            }
                        }
                    ]
                };
                http.expectGET(url.path + url.query + '&' + url.appId + '&' + url.appKey).respond(expected);
            });

            it('gets search results based on query', function() {
                Recipe.search(query).
                success(function(data) {
                    expect(data).toEqual(expected);
                }).
                error(function(data) {
                    expect(data).toEqual(expected);
                });

                http.flush();
            });
        });

        describe('addToFavorites method', function() {
            var recipe;
            var expected;

            beforeEach(function() {
                recipe = {
                    recipe: {
                        label: 'Sunday Supper: Jerk Half-Chickens'
                    }
                };
                expected = [
                    {
                        recipe: {
                            label: 'Herbes de Provence Rotisserie Chickens'
                        }
                    },
                    {
                        recipe: {
                            label: 'Sunday Supper: Jerk Half-Chickens'
                        }
                    }
                ];
                http.expectPOST('/secure/favorites/58dad8d0a6a942e2319cedab').respond(expected);
            });

            it('returns array with recipe added', function() {
                Recipe.addToFavorites(recipe).
                success(function(data) {
                    expect(data).toEqual(expected);
                }).
                error(function(data) {
                    expect(data).toEqual(expected);
                });
                
                http.flush();
            });
        });

        describe('removeFromFavorites method', function() {
            var recipe;
            var expected;

            beforeEach(function() {
                recipe = {
                    recipe: {
                        label: 'Sunday Supper: Jerk Half-Chickens'
                    }
                };

                expected = [
                    {
                        recipe: {
                            label: 'Herbes de Provence Rotisserie Chickens'
                        }
                    },
                    {
                        recipe: {
                            label: 'Sunday Supper: Jerk Half-Chickens'
                        }
                    }
                ];

                http.expectPUT('/secure/favorites/delete/58dad8d0a6a942e2319cedab').respond(expected);
            });

            it('returns array with recipe removed', function() {
                Recipe.removeFromFavorites(recipe).
                success(function(data) {
                    expect(data).toEqual(expected);
                }).
                error(function(data) {
                    expect(data).toEqual(expected);
                });

                http.flush();
            });
        });

        describe('getFavorites method', function() {
            var expected;

            beforeEach(function() {
                expected = [
                    {
                        label: 'Herbes de Provence Rotisserie Chickens'
                    },
                    {
                        label: 'Basmati Rice and Pea Pilaf (Peas Pulao)'
                    }
                ];
                http.expectGET('/secure/favorites/58dad8d0a6a942e2319cedab').respond(expected);
            });

            it('gets array of favorites', function() {
                Recipe.getFavorites().
                success(function(data) {
                    expect(data).toEqual(expected);
                }).
                error(function(data) {
                    expect(data).toEqual(expected);
                });
                
                http.flush();
            });
        });
    });
});
