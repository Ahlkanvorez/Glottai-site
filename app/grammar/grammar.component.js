(function () {
    'use strict';

    angular.module('grammar').component('grammar', {
        templateUrl: 'grammar/grammar.template.html',
        controller: ['$scope',
            function ($scope) {
                $scope.tables = {
                    declensions: {
                        first: {
                            name: "First Declension",
                            theme: "-ā-",
                            genders: ["f"],
                            table: [
                                "-a", "-ae", "-ae", "-am", "-ā", "-a",
                                "-ae", "-ārum", "-īs", "-ās", "-īs", "-ae"
                            ]
                        }
                    },
                    conjugations: {
                        first: {
                            name: "First Conjugation",
                            theme: "-ā-",
                            tense: "Present",
                            mood: "Indicative",
                            voice: "Active",
                            table: [
                                ["-ō", "-ās", "-at"],
                                ["-āmus", "-atis", "-ant"]
                            ]
                        }
                    }
                };

                $scope.tableData = [];

                $scope.displayConjugation = function (data) {

                };

                $scope.displayDeclension = function (data) {

                };
            }
        ]
    });
}());