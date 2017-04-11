'use strict';

angular.module('myApp').
directive('dbltap', dbltap).
directive('change', change).
directive('focus', focus).
directive('added', added);

function dbltap($timeout) {
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