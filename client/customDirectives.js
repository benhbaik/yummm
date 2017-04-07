'use strict';

angular.module('myApp').directive('dbltap',
    function() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                element.bind('touchstart', function(e) {
                    scope.$apply(attrs.dbltap);
                });
            }
        }
    }
)
