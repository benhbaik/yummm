'use strict';

angular.module('myApp').
directive('dbltap', function() {
    var dbltapInteval = 300; // milliseconds
    var tapTime;
    var standingby = false;

    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.bind('touchend', function(e) {
                if (!standingby) {
                    tapTime = new Date().getTime();
                    standingby = true;

                    setTimeout(function() {
                        standingby = false;
                    }, dbltapInteval);
                }
                else if (standingby) {
                var secondTapTime = new Date().getTime();
                    standingby = false;
                        if ((secondTapTime - tapTime) < dbltapInteval) {
                        scope.$apply(attrs.dbltap);
                    }
                }
            });
        }
    }
}).
directive('change', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.bind('change', function(e) {
                scope.$apply(attrs.change);
            });
        }
    }
}).
directive('focus', function($timeout) {
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
    }
});
