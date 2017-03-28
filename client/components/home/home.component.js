'use strict';

angular.module('home', []).
    component('home', {
        templateUrl: 'components/home/home.html',
        controller: function() {
            console.log("Home!");
        }
    });
