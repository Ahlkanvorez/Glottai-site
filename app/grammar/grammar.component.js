(function () {
    'use strict';

    angular.module('grammar').component('grammar', {
        templateUrl: 'grammar/grammar.template.html',
        controller: ['$scope', 'Grammar',
            function ($scope, Grammar) {
                Grammar('Latin').getTables(res => {
                    const tables = res.data;

                    $scope.conjugations = [ tables.conjugations.first, tables.conjugations.second ];
                    $scope.declensions = [ tables.declensions.first, tables.declensions.second ];
                    $scope.conjugationClasses = {};
                    $scope.declensionClasses = {};
                    $scope.conjugationModels = {};
                    $scope.declensionModels = {};

                    $scope.check = value => {
                        // If the inputted text is correct, update the styles accordingly.
                        if ($scope.conjugationModels[value] === value) {
                            $scope.conjugationClasses[value] = 'correct';
                        } else {
                            $scope.conjugationClasses[value] = 'incorrect';
                        }
                    };
                }, err => {
                    console.log('Uh oh ... something bad happened.');
                    console.log(err);
                });
            }
        ]
    });
}());
