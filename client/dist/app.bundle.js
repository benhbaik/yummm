webpackJsonp([0],[
/* 0 */,
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


angular.module('myApp').
    config(['$locationProvider', '$routeProvider',
        function($locationProvider, $routeProvider) {
            $locationProvider.hashPrefix('!');
            $routeProvider.otherwise({redirectTo: '/'});

            $routeProvider.
                when('/', {
                    templateUrl: 'components/home/home.html'
                }).
                when('/signup', {
                    template: '<signup></signup>'
                }).
                when('/login', {
                    template: '<login></login>'
                }).
                when('/search', {
                    template: '<search></search>'
                }).
                when('/favorites', {
                    template: '<favorites></favorites>'
                }).
                when('/detail', {
                    template: '<detail></detail>'
                }).
                when('/shopping-list', {
                    template: '<shopping-list></shopping-list>'
                }).
                when('/logged-out', {
                    templateUrl: 'components/logged-out/loggedOut.html'
                });
        }
    ]).
    run(['$rootScope', '$location', 'Auth',
        function($rootScope, $location, Auth) {
            var noAuthRoutes = ['/', '/signup', '/login', '/logged-out'];
            $rootScope.routeHistory = [];

            $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
                trackRouteHistory();
                if (checkIfAuthReq($location.path()) && !Auth.isLoggedIn()) {
                    $location.path('/login');
                }
            });

            // for 'back to' link in detail component
            function trackRouteHistory() {
                if ($rootScope.routeHistory.length === 5) {
                    $rootScope.routeHistory.shift();
                }
                $rootScope.routeHistory.push($location.path());
            }

            function checkIfAuthReq(route) {
                for (var i = 0; i < noAuthRoutes.length; i++) {
                    if (noAuthRoutes[i] === route) {
                        return false;
                    }
                }
                return true;
            }
        }
    ]);


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


angular.module('detail', ['core.shoppingList']).
    component('detail', {
        template: __webpack_require__(33),
        // templateUrl: 'components/detail/detail.html',
        controllerAs: 'detailCtrl',
        controller: ['ShoppingList', '$window', '$rootScope',
            function(ShoppingList, $window, $scope) {
                var vm = this;

                vm.recipe = JSON.parse($window.localStorage.getItem('recipe'));
                vm.arrayToAdd = [];
                vm.message = '';
                vm.ingredientsExpanded = '';
                vm.labelsExpanded = '';
                vm.expandIngredients = expandIngredients;
                vm.expandLabels = expandLabels;
                vm.toggleSelection = toggleSelection;
                vm.addItems = addItems;
                vm.lastRoute = lastRoute;
                vm.lastRouteLink = lastRouteLink;

                function expandIngredients() {
                    if (vm.ingredientsExpanded === '') {
                        vm.ingredientsExpanded = 'expanded-active';
                    } else if (vm.ingredientsExpanded === 'expanded-active') {
                        vm.ingredientsExpanded = '';
                    }
                }

                function expandLabels() {
                    if (vm.labelsExpanded === '') {
                        vm.labelsExpanded = 'expanded-active';
                    } else if (vm.labelsExpanded === 'expanded-active') {
                        vm.labelsExpanded = '';
                    }
                }

                function toggleSelection(item) {
                    var index = vm.arrayToAdd.indexOf(item);
                    if (index === -1) {
                        vm.arrayToAdd.push(item);
                    } else if (index >= 0) {
                        vm.arrayToAdd.splice(index, 1);
                    }
                }

                function addItems(array) {
                    if (array.length > 0) {
                        ShoppingList.saveItems(array).
                        then(function(res) {
                            vm.message = 'Items added to list!.';
                            vm.arrayToAdd = [];
                        });
                    }

                    vm.message = 'Select items to add to your list.';
                }

                function lastRoute() {
                    var length = $scope.routeHistory.length;

                    if (length > 1) {
                        var index = length - 2;
                        return $scope.routeHistory[index];
                    }
                    return false;
                }

                // word for back to link
                function lastRouteLink() {
                    var lastRoute = vm.lastRoute();

                    if (lastRoute) {
                        lastRoute = lastRoute.slice(1, lastRoute.length);
                        lastRoute = lastRoute.charAt(0).toUpperCase() + lastRoute.substr(1);
                        return lastRoute;
                    }
                    
                    return false;
                }
            }
        ]
    });


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


angular.module('favorites', ['core.recipe']).
    component('favorites', {
        template: __webpack_require__(34),
        // templateUrl: 'components/favorites/favorites.html',
        controllerAs: 'favoritesCtrl',
        controller: ['Recipe', '$window', '$location',
            function favoritesController(Recipe, $window, $location) {
                var vm = this;
                vm.favorites = [];
                vm.empty = false;
                vm.recipeToRemove = {};
                vm.fetchRecipeToRemove = fetchRecipeToRemove;
                vm.removeFromFavorites = removeFromFavorites;
                vm.goToRecipe = goToRecipe;

                Recipe.getFavorites().
                then(function(res) {
                    vm.favorites = res.data;
                    if (vm.favorites.length === 0) {
                        vm.empty = true;
                    }
                });

                // carry recipe from li to modal
                function fetchRecipeToRemove(recipe) {
                    vm.recipeToRemove = recipe;
                }

                function removeFromFavorites(recipe) {
                    Recipe.removeFromFavorites({ recipe: recipe }).
                    then(function(res) {
                        vm.favorites = res.data;
                        vm.recipeToRemove = null;
                        if (vm.favorites.length === 0) {
                            vm.empty = true;
                        }
                    });
                }

                function goToRecipe(recipe) {
                    debugger;
                    $window.localStorage.setItem('recipe', angular.toJson(recipe));
                    $location.path('/detail');
                }
            }
        ]
    });


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


angular.module('login', ['core.auth']).
    component('login', {
        template: __webpack_require__(35),
        // templateUrl: 'components/login/login.html',
        controllerAs: 'loginCtrl',
        controller: ['$location', '$window', 'Auth',
            function loginController($location, $window, Auth) {
                var vm = this;
                vm.errorMessage = '';
                vm.success = true;
                vm.login = login;

                function login(credentials) {
                    credentials.username.trim();
                    credentials.password.trim();

                    Auth.login(credentials).
                    then(function(res) {
                        vm.success = res.data.success;
                        if (vm.success) {
                            $window.localStorage.setItem('token', res.data.token);
                            $location.path('search');
                        } else if (!vm.success) {
                            vm.errorMessage = res.data.message;
                            vm.credentials.username = '';
                            vm.credentials.password = '';
                        }
                    });
                }
            }
        ]
    });


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


angular.module('search', ['core.recipe']).
    component('search', {
        template: __webpack_require__(36),
        // templateUrl: 'components/search/search.html',
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


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


angular.module('shoppingList', ['core.shoppingList']).
    component('shoppingList', {
        template: __webpack_require__(37),
        // templateUrl: 'components/shopping-list/shopping-list.html',
        controllerAs: 'shoppingListCtrl',
        controller: ['ShoppingList', '$window',
            function shoppingListController(ShoppingList, $window) {
                var vm = this;
                vm.items = [];
                vm.itemsPool = [];
                vm.removeCount = 0;
                vm.empty = false;
                vm.currentInput = '';
                vm.newItem = '';
                vm.activateEdit = activateEdit;
                vm.deactivateEdit = deactivateEdit;
                vm.toggleView = toggleView;
                vm.editItem = editItem;
                vm.addItem = addItem;
                vm.checkIfRemoved = checkIfRemoved;
                vm.removeFromPool = removeFromPool;
                vm.removeItems = removeItems;

                ShoppingList.getItems().
                then(function(res) {
                    vm.items = res.data;
                    vm.itemsPool = JSON.parse(angular.toJson(res.data));
                    if (vm.items.length === 0) {
                        vm.empty = true;
                    }
                });

                function activateEdit(id) {
                    vm.currentInput = id;
                }

                function deactivateEdit() {
                    vm.currentInput = '';
                }

                function toggleView(id) {
                    // prevent other li's from showing edit
                    if (vm.currentInput === id) {
                        return true;
                    }
                    return false;
                }

                function editItem(item) {
                    ShoppingList.editItem({ item: item, id: vm.currentInput }).
                    then(function(res) {
                        vm.items = res.data;
                        vm.currentInput = '';
                    });
                }

                function addItem(item) {
                    if (item === '') {
                        return;
                    }

                    item = Array(item);

                    ShoppingList.saveItems(item).
                    then(function(res) {
                        vm.empty = false;
                        vm.items = res.data;
                        vm.itemsPool = JSON.parse(angular.toJson(res.data));
                        vm.newItem = '';
                    });
                }

                function checkIfRemoved(item) {
                    var index = findIndex(vm.itemsPool, item);

                    if (index === -1) {
                        return 'deleted';
                    } else {
                        return '';
                    }
                }

                function removeFromPool(item) {
                    var index = findIndex(vm.itemsPool, item);

                    if (index >= 0) {
                        vm.itemsPool.splice(index, 1);
                        vm.removeCount++;
                    } else if (index === -1) {
                        vm.itemsPool.push(item);
                        vm.removeCount--;
                    }
                }

                function removeItems(items) {
                    ShoppingList.removeItem(items).
                    then(function(res) {
                        vm.items = res.data;
                        vm.removeCount = 0;
                        if (vm.items.length === 0) {
                            vm.empty = true;
                        }
                    });
                }

                // helper

                function findIndex(array, item) {
                    for (var i = 0; i < array.length; i++) {
                        if (array[i].id === item.id) {
                            return i;
                        }
                    }
                    return -1;
                }
            }
        ]
    });


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


angular.module('signup', ['core.auth']).
    component('signup', {
        template: __webpack_require__(38),
        // templateUrl: 'components/signup/signup.html',
        controllerAs: 'signupCtrl',
        controller: ['$location', '$window', 'Auth',
            function signupController($location, $window, Auth) {
                var vm = this;
                vm.errorMessage = '';
                vm.success = true;
                vm.signup = signup;

                function signup(credentials) {
                    credentials.username.trim();
                    credentials.password.trim();
                    Auth.signup(credentials).
                    then(function(res) {
                        vm.success = res.data.success;
                        if (vm.success) {
                            $window.localStorage.setItem('token', res.data.token);
                            $location.path('search');
                        } else if (!vm.success) {
                            vm.errorMessage = res.data.message;
                            vm.credentials.username = '';
                            vm.credentials.password = '';
                        }
                    });
                }
            }
        ]
    });


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


angular.module('core.auth', []).
    factory('Auth', [ '$http', '$window',
        function($http, $window) {
            return ({
                login: login,
                logout: logout,
                signup: signup,
                isLoggedIn: isLoggedIn,
                getUserData: getUserData
            });

            function login(userInfo) {
                return $http.post('/open/login', userInfo);
            }

            function logout() {
                $window.localStorage.removeItem('token');
                $window.localStorage.removeItem('recipe');
            }

            function signup(userInfo) {
                // var usernameLength = userInfo.username.length;
                // var passwordLength = userInfo.password.length;

                // if (usernameLength > 16 || usernameLength < 4) {
                //     vm.success = false;
                //     vm.errorMessage = 'Please enter a valid username.';
                //     return;
                // } else if (passwordLength > 16 || passwordLength < 8) {
                //     vm.success = false;
                //     vm.errorMessage = 'Please enter a valid password.';
                //     return;
                // }

                return $http.post('/open/users', userInfo);
            }

            function isLoggedIn() {
                var token = $window.localStorage.getItem('token');
                var payload;

                if (token) {
                    payload = token.split('.')[1];
                    payload = $window.atob(payload);
                    payload = JSON.parse(payload);

                    return payload.exp > Date.now() / 1000;
                }
                return false;
            }

            function getUserData() {
                var token = $window.localStorage.getItem('token');
                var payload;

                if (token) {
                    payload = token.split('.')[1];
                    payload = $window.atob(payload);
                    payload = JSON.parse(payload);

                    return {
                        username: payload.username,
                        _id: payload._id
                    };
                }
            }
        }]).
        factory('AuthInterceptor', function($q, $location, $window) {
            return {
                request: request,
                responseError: responseError
            };

            function request(config) {
                config.headers['x-access-token'] = $window.localStorage.getItem('token');
                return config;
            }

            function responseError(res) {
                if (res.status === 403) {
                    $window.localStorage.removeItem('token');
                    $location.path('login');
                }
                return $q.reject(res);
            }
        });


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


angular.module('core', [
    'core.navbar',
    'core.user',
    'core.auth',
    'core.recipe',
    'core.shoppingList'
]);


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


angular.module('core.navbar', ['core.auth']).
    component('navbar', {
        templateUrl: 'core/navbar/navbar.html',
        controllerAs: 'navbarCtrl',
        controller: ['$location', 'Auth',
            function($location, Auth) {
                var vm = this;
                vm.isLoggedIn = Auth.isLoggedIn();
                vm.currentUser = Auth.getUserData();
                vm.logoLink = logoLink;
                vm.logout = logout;

                function logoLink() {
                    return vm.isLoggedIn ? 'search' : '';
                }

                function logout() {
                    Auth.logout();
                }
            }
        ]
    });


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


angular.module('core.recipe', ['core.auth']).
    factory('Recipe', ['$http', 'Auth',
        function($http, Auth) {
            var user = Auth.getUserData();
            var url = {
                path: 'https://api.edamam.com/search?',
                query: 'q=',
                from: 'from=',
                appId: 'app_id=0c0154a7',
                appKey: 'app_key=1d068946dcf6f0d21684c8fcf727618d'
            };

            return {
                search: search,
                loadMore: loadMore,
                addToFavorites: addToFavorites,
                removeFromFavorites: removeFromFavorites,
                getFavorites: getFavorites
            };

            function search(query) {
                return $http.get(url.path + url.query + query + '&' + url.appId + '&' + url.appKey);
            }

            function loadMore(query, length) {
                return $http.get(url.path + url.query + query + '&' + url.from + length + '&' + url.appId + '&' + url.appKey);
            }

            function addToFavorites(recipe) {
                return $http.post('/secure/favorites/' + user._id, recipe);
            }

            function removeFromFavorites(recipe) {
                return $http.put('/secure/favorites/delete/' + user._id, recipe);
            }

            function getFavorites() {
                return $http.get('/secure/favorites/' + user._id);
            }
        }
    ]);


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


angular.module('core.shoppingList', ['core.auth']).
    factory('ShoppingList', ['$http', '$window', 'Auth',
        function($http, $window, Auth) {
            var user = Auth.getUserData();

            return {
                getItems: getItems,
                saveItems: saveItems,
                editItem: editItem,
                removeItem: removeItem
            };

            function getItems() {
                return $http.get('/secure/shopping-list/' + user._id);
            }

            function saveItems(items) {
                // add unique id's to items
                for (var i = 0; i < items.length; i++) {
                    items[i] = {
                        id: uuid(),
                        item: items[i]
                    };
                }

                return $http.post('/secure/shopping-list/' + user._id, { items: items });
            }

            function editItem(item) {
                // strip angular $$hashkey
                item = angular.toJson(item);
                item = JSON.parse(item);

                return $http.put('/secure/shopping-list/' + user._id, { item: item });
            }

            function removeItem(items) {
                return $http.put('/secure/shopping-list/delete/' + user._id, { items: items });
            }

            // created id's for items
            function uuid() {
                // jshint bitwise:false
                var i, random;
                var uuid = '';

                for (i = 0; i < 32; i++) {
                    random = Math.random() * 16 | 0;
                    if (i === 8 || i === 12 || i === 16 || i === 20) {
                        uuid += '-';
                    }
                    uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random)).toString(16);
                }

                return uuid;
            }
        }
    ]);


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


angular.module('core.user', []).
    factory('User', ['$http',
        function($http) {
            // for future features
            return ({
                getAll: getAll,
                get: get,
                update: update,
                remove: remove
            });

            function getAll() {
                return $http.get('/secure/users');
            }

            function get(id) {
                return $http.get('/secure/users/' + id);
            }

            function update(update, id) {
                return $http.put('/secure/users/' + id, update);
            }

            function remove(id) {
                return $http.delete('/secure/users/' + id);
            }
        }
    ]);


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


angular.module('customDirectives', []).
directive('dbltap', dbltap).
directive('change', change).
directive('focus', focus).
directive('added', added);

function dbltap($timeout) {
    var dbltapInterval = 300; // milliseconds
    var tapTime;
    var standby = false;

    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.bind('touchend', function(e) {
                if (!standby) {
                    tapTime = new Date().getTime();
                    standby = true;

                    $timeout(function() {
                        standby = false;
                    }, dbltapInterval);
                }
                else if (standby) {
                var secondTapTime = new Date().getTime();
                    standby = false;
                        if ((secondTapTime - tapTime) < dbltapInterval) {
                        scope.$apply(attrs.dbltap);
                    }
                }
            });
        }
    };
}

function change() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.bind('change', function(e) {
                scope.$apply(attrs.change);
            });
        }
    };
}

function focus($timeout) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            scope.$watch(attrs.focus, function(value) {
                if (value) {
                    $timeout(function() {
                        element[0].focus();
                    }, 0, false);
                } else if (!value) {
                    $timeout(function() {
                        element[0].blur();
                    }, 0, false);
                }
            });
        }
    };
}

function added() {
    var checkboxes;

    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.bind('click', function(e) {
                checkboxes = angular.element('.ingredient-checkbox');

                checkboxes.each(function(index) {
                    checkboxes[index].checked = false;
                });
            });
        }
    };
}

/***/ }),
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


angular.module('myApp', [
  'ngRoute',
  'customDirectives',
  'core',
  'signup',
  'login',
  'search',
  'favorites',
  'detail',
  'shoppingList'
]).
config(function($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
});

__webpack_require__(1);

__webpack_require__(14);

__webpack_require__(9);

__webpack_require__(10);

__webpack_require__(13);

__webpack_require__(8);

__webpack_require__(11);

__webpack_require__(12);

__webpack_require__(7);

__webpack_require__(4);

__webpack_require__(5);

__webpack_require__(3);

__webpack_require__(2);

__webpack_require__(6);

/***/ }),
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */
/***/ (function(module, exports) {

module.exports = "<navbar></navbar>\n\n<div class=\"wrapper\">\n    <div class=\"back-btn\">\n        <a ng-href=\"#!{{ detailCtrl.lastRoute() }}\">\n            <button class=\"btn btn-default\" ng-show=\"detailCtrl.lastRouteLink()\">\n                <span class=\"glyphicon glyphicon-menu-left\"></span>\n                {{ detailCtrl.lastRouteLink() }}\n            </button>\n        </a>\n    </div>\n\n    <div class=\"header\">\n        <h3>{{ detailCtrl.recipe.label }}</h3>\n    </div>\n    <img ng-src=\"{{ detailCtrl.recipe.image }}\" class=\"recipe-image\">\n    <div class=\"recipe-right\">\n        <p>{{ detailCtrl.recipe.calories | number:0 }} calories</p>\n        <p>{{ detailCtrl.recipe.yield }} servings</p>\n        <p><a ng-href=\"{{ detailCtrl.recipe.url }}\">Cooking Instructions</a></p>\n    </div>\n    <div class=\"recipe-right-below\">\n    \n        <div class=\"c2a\">\n            <button class=\"btn btn-default c2a-btn\" ng-click=\"detailCtrl.expandIngredients()\" type=\"button\" data-toggle=\"collapse\" data-target=\"#ingredients\" aria-expanded=\"false\" aria-controls=\"ingredients\">\n                <span class=\"glyphicon glyphicon-menu-right expanded\" ng-class=\"detailCtrl.ingredientsExpanded\"></span>\n                Ingredients\n            </button>\n        </div>\n\n        <div class=\"collapse\" id=\"ingredients\">\n            <div class=\"well\">\n                <ul class=\"list-group\">\n                    <li ng-repeat=\"item in detailCtrl.recipe.ingredientLines\" class=\"list-group-item\">\n                        <p>\n                            <label><input ng-click=\"detailCtrl.toggleSelection(item)\" class=\"ingredient-checkbox\" type=\"checkbox\">\n                                <span> </span>{{ item }}\n                            </label>                                                            \n                        </p>\n                    </li>\n                </ul>\n                <button ng-click=\"detailCtrl.addItems(detailCtrl.arrayToAdd)\" added class=\"btn btn-default\" data-toggle=\"modal\" data-target=\"#add-alert\" type=\"button\">\n                    Add\n                    <span class=\"glyphicon glyphicon-plus\"></span>\n                </button>\n            </div>\n        </div>\n\n        <div class=\"c2a margin-above\">\n            <button class=\"btn btn-default c2a-btn\" ng-click=\"detailCtrl.expandLabels()\" type=\"button\" data-toggle=\"collapse\" data-target=\"#health-labels\" aria-expanded=\"false\" aria-controls=\"health-labels\">\n                <span class=\"glyphicon glyphicon-menu-right expanded\" ng-class=\"detailCtrl.labelsExpanded\"></span>\n                Health Labels\n            </button>\n        </div>\n\n        <div class=\"collapse\" id=\"health-labels\">\n            <div class=\"well\">\n                <ul class=\"list-group\">\n                    <li ng-repeat=\"healthLabel in detailCtrl.recipe.healthLabels\" class=\"list-group-item\">\n                        <p>{{ healthLabel }}</p>\n                    </li>\n                </ul>\n            </div>\n        </div>\n\n    </div>\n\n\n    <div id=\"add-alert\" class=\"modal fade\" role=\"dialog\">\n        <div class=\"modal-dialog\">\n            <div class=\"modal-content\">\n                <div class=\"modal-body\">\n                    <div class=\"modal-wrapper\">\n                        <p>{{ detailCtrl.message }}</p>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n\n</div>";

/***/ }),
/* 34 */
/***/ (function(module, exports) {

module.exports = "<navbar></navbar>\n\n<div class=\"wrapper\">\n    <ul ng-hide=\"favoritesCtrl.empty\" class=\"list-group recipe-list-group\">\n        <li ng-repeat=\"favorite in favoritesCtrl.favorites\" class=\"list-group-item list-items\">\n            <div class=\"header\">\n                <a href=\"#!/detail\">\n                    <div class=\"header\">\n                        <h3 ng-click=\"favoritesCtrl.goToRecipe(favorite)\">{{ favorite.label }}</h3>\n                    </div>\n                </a>\n            </div>\n            <a href=\"#!/detail\"><img ng-src=\"{{ favorite.image }}\" class=\"recipe-image\"></a>\n            <div class=\"recipe-right\">\n                <p class=\"result-desc\">{{ favorite.calories | number:0 }} calories</p>\n                <p class=\"result-desc\">{{ favorite.yield }} servings</p>\n                <div class=\"c2a remove-btn\">\n                    <button ng-click=\"favoritesCtrl.fetchRecipeToRemove(favorite)\" class=\"btn btn-default c2a-btn recipe-button\" data-toggle=\"modal\" data-target=\"#remove-alert\" type=\"button\">\n                        Remove\n                        <span class=\"glyphicon glyphicon-trash\"></span>\n                    </button>\n                </div>\n            </div>\n        </li>\n    </ul>\n\n    <div ng-show=\"favoritesCtrl.empty\" class=\"empty\">\n        <h3>Favorites is empty.</h3>\n        <p>Find recipes <a href=\"#!/search\">here!</a></p>\n    </div>\n\n    <div id=\"remove-alert\" class=\"modal fade\" role=\"dialog\">\n        <div class=\"modal-dialog\">\n            <div class=\"modal-content\">\n                <div class=\"modal-body\">\n                    <div class=\"modal-wrapper\">\n                        <p>Are you sure you want to remove this recipe from your favorites?</p>\n                        <div class=\"c2a\">\n                            <button ng-click=\"favoritesCtrl.removeFromFavorites(favoritesCtrl.recipeToRemove)\" type=\"button\" class=\"btn btn-default c2a-btn confirm-btn\" data-dismiss=\"modal\">Yes</button>\n                            <button type=\"button\" class=\"btn btn-default c2a-btn confirm-btn\" data-dismiss=\"modal\">No</button>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n";

/***/ }),
/* 35 */
/***/ (function(module, exports) {

module.exports = "<navbar></navbar>\n\n<div class=\"wrapper\">\n    <div class=\"lg-screen-wrapper\">\n\n        <form class=\"entry-form\" role=\"form\">\n            <div class=\"input-group\">\n                <input ng-model=\"loginCtrl.credentials.username\"\n                    class=\"form-control\"\n                    placeholder=\"Enter username\"\n                    type=\"username\">\n            </div>\n            <div class=\"input-group\">\n                <input ng-model=\"loginCtrl.credentials.password\"\n                    class=\"form-control\"\n                    placeholder=\"Enter password\"\n                    type=\"password\">\n            </div>\n\n            <div class=\"c2a margin-above\">\n                <button ng-click=\"loginCtrl.login(loginCtrl.credentials)\"\n                    class=\"btn btn-default c2a-btn\"\n                    type=\"submit\">\n                    Login\n                </button>\n            </div>\n\n            <p class=\"alternative\">Don't have an account? Sign up <a href=\"#!/signup\">here.</a></p>\n        </form>\n\n        <div ng-hide=\"loginCtrl.success\" class=\"alert alert-danger margin-above\" role=\"alert\">\n            <span class=\"glyphicon glyphicon-exclamation-sign\"></span> {{ loginCtrl.errorMessage }}\n        </div>\n\n    </div>\n</div>\n";

/***/ }),
/* 36 */
/***/ (function(module, exports) {

module.exports = "<a id=\"top\"></a>\n<navbar></navbar>\n\n<div class=\"wrapper\">\n\n    <form role=\"form\" class=\"overflow-fix recipe-form\">\n\n        <div class=\"input-group search-input\">\n            <input ng-model=\"searchCtrl.query\"\n                class=\"form-control\"\n                placeholder=\"What do you want to eat?\" \n                type=\"text\">\n        </div>\n\n        <div class=\"c2a search-btn margin-above\">\n            <button ng-click=\"searchCtrl.search(searchCtrl.query)\"\n                class=\"btn btn-default c2a-btn\"\n                type=\"submit\">\n                Search\n                <span class=\"glyphicon glyphicon-search\"></span>\n            </button>\n        </div>\n\n    </form>\n\n    <ul ng-show=\"!searchCtrl.loading\" class=\"list-group recipe-list-group\">\n        <p ng-show=\"searchCtrl.noResults\" class=\"no-result\">Could not find any results.</p>\n        <li ng-repeat=\"result in searchCtrl.results\" class=\"list-items list-group-item\">\n            <div class=\"header\">\n                <h3 ng-click=\"searchCtrl.goToRecipe(result.recipe)\">{{ result.recipe.label }}</h3>\n            </div>\n\n            <img ng-src=\"{{ result.recipe.image }}\" class=\"recipe-image\">\n\n            <div class=\"recipe-right\">\n                <p>{{ result.recipe.calories | number:0 }} calories</p>\n                <p>{{ result.recipe.yield }} servings</p>\n                <div class=\"c2a favorite-btn\">\n                    <button ng-click=\"searchCtrl.addToFavorites(result.recipe)\"\n                        class=\"btn btn-default c2a-btn recipe-button\"\n                        data-toggle=\"modal\"\n                        data-target=\"#fav-alert\"\n                        type=\"button\">\n                        Favorite\n                        <span class=\"glyphicon glyphicon-heart\"></span>\n                    </button>\n                </div>\n            </div>\n        </li>\n\n    </ul>\n\n    <div ng-show=\"searchCtrl.loading\" class=\"spinner\">\n        <div class=\"bounce1\"></div>\n        <div class=\"bounce2\"></div>\n        <div class=\"bounce3\"></div>\n    </div>\n\n    <div class=\"c2a margin-above\">\n        <button ng-click=\"searchCtrl.goToTop()\"\n            ng-show=\"searchCtrl.populated()\"\n            class=\"btn btn-default c2a-btn margin-above\">\n            Back to Top\n        </button>\n        <button ng-click=\"searchCtrl.loadMore(searchCtrl.queryCache)\" ng-show=\"searchCtrl.populated()\" class=\"btn btn-default c2a-btn margin-above\">\n            Load More\n            <span ng-show=\"searchCtrl.loadingMore\" class=\"fa fa-circle-o-notch fa-spin\"></span>\n        </button>\n    </div>\n\n    <div id=\"fav-alert\" class=\"modal fade\" role=\"dialog\">\n        <div class=\"modal-dialog\">\n            <div class=\"modal-content\">\n                <div class=\"modal-body\">\n                    <div class=\"modal-wrapper\">\n                        <p>{{ searchCtrl.message }}</p>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>";

/***/ }),
/* 37 */
/***/ (function(module, exports) {

module.exports = "<navbar></navbar>\n\n<div class=\"wrapper\">\n\n    <div class=\"lg-screen-wrapper\">\n    \n        <form class=\"entry-form\" role=\"form\">\n\n            <div class=\"input-group\">\n                <input ng-model=\"shoppingListCtrl.newItem\"\n                    class=\"form-control\"\n                    placeholder=\"Add an item\"\n                    type=\"text\">\n            </div>\n\n            <div class=\"c2a margin-above\">\n                <button ng-click=\"shoppingListCtrl.addItem(shoppingListCtrl.newItem)\"\n                    class=\"btn btn-default c2a-btn\"\n                    type=\"submit\">\n                    Add\n                </button>\n            </div>\n                \n        </form>\n\n        <p ng-hide=\"shoppingListCtrl.empty\" class=\"margin-above\">Double-click to edit.</p>\n\n        <ul class=\"list-group shopping-list margin-above\">\n\n            <li ng-repeat=\"item in shoppingListCtrl.items\" class=\"list-group-item shopping-item\">\n\n                <div class=\"list-left\">\n                    <input ng-click=\"shoppingListCtrl.removeFromPool(item)\"\n                        type=\"checkbox\">\n                </div>\n\n                <div class=\"list-right\">\n                    <p ng-dblclick=\"shoppingListCtrl.activateEdit(item.id)\"\n                        ng-hide=\"shoppingListCtrl.toggleView(item.id)\"\n                        dbltap=\"shoppingListCtrl.activateEdit(item.id)\"\n                        ng-class=\"shoppingListCtrl.checkIfRemoved(item)\">\n                        {{ item.item }}\n                    </p>\n\n                    <input ng-show=\"shoppingListCtrl.toggleView(item.id)\"\n                        class=\"edit-input\"\n                        ng-blur=\"shoppingListCtrl.deactivateEdit()\"\n                        change=\"shoppingListCtrl.editItem(updatedItem)\"\n                        focus=\"shoppingListCtrl.toggleView(item.id)\"\n                        ng-model=\"updatedItem\" id=\"{{ item.id }}\"\n                        type=\"text\">\n                </div>\n\n            </li>\n\n        </ul>\n\n        <div ng-show=\"shoppingListCtrl.empty\" class=\"empty\">\n            <h3>Shopping list is empty.</h3>\n            <p>Find recipes <a href=\"#!/search\">here!</a></p>\n        </div>\n\n        <div ng-hide=\"shoppingListCtrl.empty\" class=\"c2a\">\n            <button type=\"button\"\n                data-toggle=\"modal\"\n                data-target=\"#remove-alert\"\n                class=\"btn btn-default c2a-btn\">\n                Remove items\n                <span class=\"glyphicon glyphicon-remove\"></span>\n            </button>\n        </div>\n    </div>\n\n    <div id=\"remove-alert\" class=\"modal fade\" role=\"dialog\">\n        <div class=\"modal-dialog\">\n            <div class=\"modal-content\">\n                <div class=\"modal-body\">\n                    <div class=\"modal-wrapper\">\n                        <div ng-hide=\"shoppingListCtrl.removeCount\">\n                            <p>There are no items to remove.</p>\n                        </div>\n                        <div ng-show=\"shoppingListCtrl.removeCount\">\n                            <p>Are you sure you want to remove these item?</p>\n                            <div class=\"c2a\">\n                                <button ng-click=\"shoppingListCtrl.removeItems(shoppingListCtrl.itemsPool)\"\n                                    type=\"button\"\n                                    class=\"btn btn-default c2a-btn confirm-btn\"\n                                    data-dismiss=\"modal\">\n                                    Yes\n                                </button>\n                                <button type=\"button\"\n                                    class=\"btn btn-default c2a-btn confirm-btn\"\n                                    data-dismiss=\"modal\">\n                                    No\n                                </button>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n\n";

/***/ }),
/* 38 */
/***/ (function(module, exports) {

module.exports = "<navbar></navbar>\n\n<div class=\"wrapper\">\n    <div class=\"lg-screen-wrapper\">\n\n        <form class=\"entry-form\" role=\"form\">\n\n            <div class=\"input-group\">\n                <input ng-model=\"signupCtrl.credentials.username\"\n                    class=\"form-control\"\n                    placeholder=\" Enter username\"\n                    type=\"username\">\n\n                <p class=\"requirement\">Must be 4 - 16 characters</p>\n            </div>\n            <div class=\"input-group\">\n                <input ng-model=\"signupCtrl.credentials.password\"\n                    class=\"form-control\"\n                    placeholder=\"Enter password\"\n                    type=\"password\">\n\n                <p class=\"requirement\">Must be 8 - 16 characters</p>\n            </div>\n\n            <div class=\"c2a margin-above\">\n                <button ng-click=\"signupCtrl.signup(signupCtrl.credentials)\"\n                    class=\"btn btn-default c2a-btn\"\n                    type=\"submit\">\n                    Sign Up\n                </button>\n            </div>\n\n            <p class=\"alternative\">Already have an account? Log in <a href=\"#!/login\">here.</a></p>\n\n        </form>\n\n        <div ng-hide=\"signupCtrl.success\" class=\"alert alert-danger margin-above\" role=\"alert\">\n            <span class=\"glyphicon glyphicon-exclamation-sign\"></span> {{ signupCtrl.errorMessage }}\n        </div> \n\n    </div>\n</div>\n";

/***/ })
],[18]);