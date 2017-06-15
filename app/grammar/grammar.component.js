(function () {
    'use strict';

    angular.module('grammar').component('grammar', {
        templateUrl: 'grammar/grammar.template.html',
        controller: ['$scope',
            function ($scope) {
                // TODO: Pull this from a server using the async/await commands.
                const tables = {
                    declensions: {
                        first: {
                            name: "First Declension",
                            tables: [
                                {
                                    gender: "f.",
                                    data: [
                                        ["Nom./Voc.", "-a", "-ae"],
                                        ["Gen.", "-ae", "-ārum"],
                                        ["Dat.", "-ae", "-īs"],
                                        ["Acc.", "-am",  "-ās"],
                                        ["Abl.", "-ā",  "-īs"]
                                    ]
                                }
                            ]
                        },
                        second: {
                            name: "Second Declension",
                            tables: [
                                {
                                    gender: "m.",
                                    data: [
                                        ["Nom.", "-us/er", "-ī"],
                                        ["Gen.", "-ī", "-ōrum"],
                                        ["Dat.", "-ō", "-īs"],
                                        ["Acc.", "-um", "-ōs"],
                                        ["Abl.", "-ō", "-īs"],
                                        ["Voc.", "-e/er", "-ī"]
                                    ]
                                },
                                {
                                    gender: "n.",
                                    data: [
                                        ["Nom./Voc.", "-um", "-a"],
                                        ["Gen.", "-ī", "-ōrum"],
                                        ["Dat.", "-ō", "-īs"],
                                        ["Acc.", "-um", "-a"],
                                        ["Abl.", "-ō", "-īs"]
                                    ]
                                }
                            ]
                        }
                    },
                    conjugations: {
                        first: {
                            name: "First Conjugation",
                            theme: "-ā-",
                            tables: [
                                {
                                    tense: "Present",
                                    mood: "Indicative",
                                    voice: "Active",
                                    data: [
                                        ["1st", "-ō", "-āmus"],
                                        ["2nd", "-ās",  "-ātis"],
                                        ["3rd", "-at", "-ant"]
                                    ]
                                },
                                {
                                    tense: "Future",
                                    mood: "Indicative",
                                    voice: "Active",
                                    data: [
                                        ["1st", "-ābō", "-ābimus"],
                                        ["2nd", "-ābis", "-ābitis"],
                                        ["3rd", "-ābit", "-ābunt"]
                                    ]
                                }
                            ]
                        },
                        second: {
                            name: "Second Conjugation",
                            theme: "-ē-",
                            tables: [
                                {
                                    tense: "Present",
                                    mood: "Indicative",
                                    voice: "Active",
                                    data: [
                                        ["1st", "-eō", "-ēmus"],
                                        ["2nd", "-ēs", "-ētis"],
                                        ["3rd", "-et", "-ent"]
                                    ]
                                },
                                {
                                    tense: "Future",
                                    mood: "Indicative",
                                    voice: "Active",
                                    data: [
                                        ["1st", "-ēbō", "-ēbimus"],
                                        ["2nd", "-ēbis", "-ēbitis"],
                                        ["3rd", "-ēbit", "-ēbunt"]
                                    ]
                                }
                            ]
                        }
                    }
                };

                $scope.conjugations = [ tables.conjugations.first, tables.conjugations.second ];
                $scope.declensions = [ tables.declensions.first, tables.declensions.second ];
            }
        ]
    });
}());