'use strict';

angular.module('detail', []).
    component('detail', {
        templateUrl: 'components/detail/detail.html',
        controllerAs: 'detailCtrl',
        controller: function() {
            console.log(detail);
        }
    });
