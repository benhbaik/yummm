'use strict';

angular.module('detail', ['core.state']).
    component('detail', {
        templateUrl: 'components/detail/detail.html',
        controllerAs: 'detailCtrl',
        controller: ['State',
            function(State) {
                var vm = this;
                vm.recipe = State.currentRecipe;
            }
        ]
    });
