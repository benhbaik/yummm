'use strict';

angular.module('myApp').
directive('dbltap', function($timeout) {
    var dbltapInteval = 300; // milliseconds
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
                    }, dbltapInteval);
                }
                else if (standby) {
                var secondTapTime = new Date().getTime();
                    standby = false;
                        if ((secondTapTime - tapTime) < dbltapInteval) {
                        scope.$apply(attrs.dbltap);
                    }
                }
            });
        }
    };
}).
directive('change', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.bind('change', function(e) {
                scope.$apply(attrs.change);
            });
        }
    };
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
    };
}).
directive('clearCheck', function() {
    return {
        restrict: 'A',
        link: function(scope, elements, attrs) {
            
        }
    };
});
