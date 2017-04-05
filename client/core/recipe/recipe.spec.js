describe('core.recipe', function() {

    it('should be defined', function() {
        var recipeModule = angular.module('core.recipe');
        expect(recipeModule).toBeDefined();
    });

    beforeEach(module('core.recipe'));

    describe('recipe.service', function() {
        var vm;
        var Recipe;
        var $httpbackEnd;
        var url;
        var expected;

        beforeEach(inject(function(_$httpBackend_, _Recipe_, _$rootScope_) {
            jasmine.addCustomEqualityTester(angular.equals);
            vm = _$rootScope_;
            $httpBackend = _$httpBackend_;
            Recipe = _Recipe_;
            url = {
                path: 'https://api.edamam.com/search?',
                query: 'q=chicken',
                appId: 'app_id=0c0154a7',
                appKey: 'app_key=1d068946dcf6f0d21684c8fcf727618d'
            };
            expected = {
                "q": "chicken",
                "from": 0,
                "to": 10,
                "params": {
                    "sane": [],
                    "q": [
                        "chicken"
                    ],
                    "app_id": [
                        "0c0154a7"
                    ],
                    "app_key": [
                        "1d068946dcf6f0d21684c8fcf727618d"
                    ]
                },
                "more": true,
                "count": 1,
                "hits": [
                    {
                        "recipe": {
                            "uri": "http://www.edamam.com/ontologies/edamam.owl#recipe_f1c853a77986214680bbdd424883499a",
                            "label": "Herbes de Provence Rotisserie Chickens",
                            "image": "https://www.edamam.com/web-img/18d/18dcf05995cb40e8ce4c077972341d7a.jpg",
                            "source": "Bon Appetit",
                            "url": "http://www.bonappetit.com/recipe/herbes-de-provence-rotisserie-chickens",
                            "shareAs": "http://www.edamam.com/recipe/herbes-de-provence-rotisserie-chickens-f1c853a77986214680bbdd424883499a/chicken",
                            "yield": 6,
                            "dietLabels": [
                                "Low-Carb"
                            ],
                            "healthLabels": [
                                "Gluten-Free",
                                "Egg-Free",
                                "Peanut-Free",
                                "Tree-Nut-Free",
                                "Soy-Free",
                                "Fish-Free",
                                "Shellfish-Free"
                            ],
                            "cautions": [],
                            "ingredientLines": [
                                "2 tablespoons (1/4 stick) butter, room temperature",
                                "2 tablespoons dried herbes de provence*",
                                "1 tablespoon coarse kosher salt",
                                "2 (3 1/2-pound) chickens"
                            ],
                            "ingredients": [
                                {
                                    "text": "2 tablespoons (1/4 stick) butter, room temperature",
                                    "weight": 28.399999618530273
                                },
                                {
                                    "text": "2 tablespoons dried herbes de provence*",
                                    "weight": 5.400000095367432
                                },
                                {
                                    "text": "1 tablespoon coarse kosher salt",
                                    "weight": 14.772500991821289
                                },
                                {
                                    "text": "2 (3 1/2-pound) chickens",
                                    "weight": 3175.146484375
                                }
                            ]
                        }
                    }
                ]
            };
        }));

        it('gets a list of recipes that matches the query', function() {
            $httpBackend.whenGET(url.path + url.query + '&' + url.appId + '&' + url.appKey).
            respond(expected);

            var results = Recipe.search('chicken', vm);
            $httpBackend.flush();

            expect(results.$$state.value.data).toEqual(expected);
        });
    });
});
