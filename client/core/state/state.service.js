'use strict';

angular.module('core.state', []).
    factory('State', function() {
        return {
            currentRecipe: {}
        };
    });
// TODO integrate more into state service
