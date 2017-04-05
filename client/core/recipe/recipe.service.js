angular.module('core.recipe', []).
    factory('Recipe', ['$http',
        function($http) {
            return {
                search: search
            };

            function search(query, vm) {
                var url = {
                    path: 'https://api.edamam.com/search?',
                    query: 'q=' + query,
                    appId: 'app_id=0c0154a7',
                    appKey: 'app_key=1d068946dcf6f0d21684c8fcf727618d'
                };

                return $http.get(url.path + url.query + '&' + url.appId + '&' + url.appKey).
                    success(function(data) {
                        vm.results = data.hits;
                        vm.query = '';
                        vm.loading = false;
                        return data.hits;
                    }).
                    error(function(data) {
                        return data;
                    });
            }
        }
    ]);
