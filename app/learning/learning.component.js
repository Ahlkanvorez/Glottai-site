(function () {
    'use strict';

    angular.module('learning').component('learning', {
        templateUrl: '/learning/learning.template.html',
        controller: ['$sanitize', '$scope', '$timeout',
            function ($sanitize, $scope, $timeout) {
                // TODO: Ensure this list is sorted by ID.
                var cards = [
                    {
                        id: 0,
                        sentenceBefore: "",
                        sentenceAfter: "est?",
                        answer: "Quid",
                        grammar: "Nom.sg.n. Interrogative Pronoun",
                        english: "What",
                        translation: "What is it?"
                    },
                    {
                        id: 1,
                        sentenceBefore: "",
                        sentenceAfter: "est?",
                        answer: "Quis",
                        grammar: "Nom.sg.m. Interrogative Pronoun",
                        english: "Who",
                        translation: "Who is it?"
                    },
                    {
                        id: 2,
                        sentenceBefore: "hoc",
                        sentenceAfter: "placet",
                        answer: "mihi",
                        grammar: "1st person dat.sg.m. Reflexive Pronoun",
                        english: "(to/for) me",
                        translation: "This (thing) pleases me."
                    }
                ];

                // Record statistics on user learning progress
                // TODO: Pull this from the server, and send updates to the server.
                $scope.stats = {
                    language: 'Latin',
                    progress: [],
                    correct: [],
                    incorrect: []
                };

                $scope.guess = '';
                $scope.answer = '';

                var index = 0;
                $scope.currentCard = cards[index];

                // A list of words in the current deck including whether they've been
                // seen before, and if they have, the degree to which they've been learned.
                $scope.learnedWords = [];

                var updateLearnedWords = function () {
                    var words = [];
                    var progress = $scope.stats.progress;
                    for (var id = 0; id < cards.length; ++id) {
                        words.push({
                            form: cards[id].answer,
                            progress: progress[id] || 0,
                            seen: (progress[id] || 0) > 0
                        });
                    }
                    $scope.learnedWords = words;
                };

                // Returns an object indicating how correct the answer is, with two properties:
                // ['correct'] is true if the given answer is when not considering case, and
                // ['correct_case'] is true if the given answer is equal when considering case.
                var checkAnswer = function (guess, answer) {
                    return {
                        correct: guess.toUpperCase() === answer.toUpperCase(),
                        correct_case: guess === answer
                    };
                };

                // Sets $scope.answer, which should be bound to the placeholder of the input box, to the correct answer
                // for the designated timeout (in milliseconds), before resetting it to the empty string.
                var showAnswer = function (delay, answer) {
                    $scope.answer = answer;
                    $timeout(function () {
                        $scope.answer = '';
                    }, delay);
                };

                // Displays the next card from the deck after the given delay.
                var showNextCard = function (delay) {
                    $timeout(function () {
                        $scope.guess = '';
                        index = (index + 1) % cards.length;
                        $scope.currentCard = cards[index];
                    }, delay);
                };

                $scope.nextCard = function () {
                    var stats = $scope.stats,
                        id = $scope.currentCard.id,
                        status = checkAnswer($scope.guess, $scope.currentCard.answer);
                    if (status.correct) {
                        stats.correct.push({ card: $scope.currentCard });
                        stats.progress[id] = (stats.progress[id] + 1) || 1;
                        var delay = 0;
                        if (!status.correct_case) {
                            $scope.guess = '';
                            delay = 3000;
                        }
                        showAnswer(delay, $scope.currentCard.answer);
                        showNextCard(delay);
                        updateLearnedWords();
                    } else {
                        $scope.stats.incorrect.push({
                            card: $scope.currentCard,
                            answer: $scope.guess
                        });
                        $scope.guess = '';
                        showAnswer(3000, $scope.currentCard.answer);
                    }
                };

                // Indicates whether the current card has ever been successfully attempted.
                $scope.isNewCard = function () {
                    return !$scope.stats.progress[$scope.currentCard.id];
                };

                $scope.seeTranslation = function () {
                    var p = document.getElementById('englishTranslationText');
                    p.textContent = $scope.currentCard.translation;
                    $timeout(function () {
                        p.textContent = '';
                    }, 3000);
                }
            }
        ]
    });
}());