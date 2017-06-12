(function() {
    'use strict';

    angular.module('learningView').component('learningView', {
        templateUrl: '/learningView/learningView.template.html',
        controller: ['$sanitize', '$scope', '$timeout',
            function ($sanitize, $scope, $timeout) {
                console.log('Learning view loaded.');
                const cards = [
                    {
                        id: 0,
                        sentenceBefore: "",
                        sentenceAfter: "est?",
                        answer: "Quid",
                        grammar: "Nom.sg.n.",
                        english: "What is it?"
                    },
                    {
                        id: 1,
                        sentenceBefore: "",
                        sentenceAfter: "est?",
                        answer: "Quis",
                        grammar: "Nom.sg.m.",
                        english: "Who is it?"
                    },
                    {
                        id: 2,
                        sentenceBefore: "hoc",
                        sentenceAfter: "placet",
                        answer: "mihi",
                        grammar: "1st person dat.sg.m. reflexive pronoun",
                        english: "this (thing) is pleasing to me."
                    }
                ];
                $scope.language = 'Latin';

                $scope.stats = {
                    progress: [],
                    correct: [],
                    incorrect: []
                };

                $scope.guess = '';
                $scope.answer = '';

                $scope.index = 0;

                $scope.currentCard = cards[$scope.index];
                $scope.nextCard = function () {
                    if ($scope.guess.toUpperCase() === $scope.currentCard.answer.toUpperCase()) {
                        $scope.stats.correct.push({
                            card: $scope.currentCard
                        });
                        if ($scope.stats.progress[$scope.currentCard.id]) {
                            $scope.stats.progress[$scope.currentCard.id]++;
                        } else {
                            $scope.stats.progress[$scope.currentCard.id] = 1;
                        }
                        var delay = 0;
                        if ($scope.guess !== $scope.currentCard.answer) {
                            $scope.guess = '';
                            $scope.answer = $scope.currentCard.answer;
                            delay = 3000;
                        }
                        $timeout(function () {
                            $scope.guess = '';
                            $scope.answer = '';
                            $scope.index = ($scope.index + 1) % cards.length;
                            $scope.currentCard = cards[$scope.index];
                        }, delay);
                    } else {
                        $scope.stats.incorrect.push({
                            card: $scope.currentCard,
                            answer: $scope.guess
                        });
                        $scope.guess = '';
                        $scope.answer = $scope.currentCard.answer;
                        $timeout(function () {
                            $scope.answer = '';
                        }, 3000);
                    }
                    console.log($scope.stats);
                    console.log($scope.currentCard);
                };
            }
        ]
    });
})();