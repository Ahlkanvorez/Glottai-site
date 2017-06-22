(function () {
    'use strict';

    angular.module('learning').component('learning', {
        templateUrl: '/learning/learning.template.html',
        controller: ['$sanitize', '$scope', '$timeout', 'Stats', 'Cards',
            ($sanitize, $scope, $timeout, Stats, Cards) => {
                Cards.get(res => {
                    const cards = res.data;

                    // Record statistics on user learning progress, and send updates to the server when necessary.
                    Stats.get(res => {
                        $scope.stats = res.data;

                        $scope.guess = '';
                        $scope.answer = '';

                        var index = 0;
                        $scope.currentCard = cards[index];

                        // A list of words in the current deck including whether they've been
                        // seen before, and if they have, the degree to which they've been learned.
                        $scope.learnedWords = [];

                        var updateLearnedWords = () => {
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

                        updateLearnedWords();

                        // Returns an object indicating how correct the answer is, with two properties:
                        // ['correct'] is true if the given answer is when not considering case, and
                        // ['correct_case'] is true if the given answer is equal when considering case.
                        var checkAnswer = (guess, answer) => {
                            return {
                                correct: guess.toUpperCase() === answer.toUpperCase(),
                                correct_case: guess === answer
                            };
                        };

                        // Sets $scope.answer, which should be bound to the placeholder of the input box, to the correct answer
                        // for the designated timeout (in milliseconds), before resetting it to the empty string.
                        var showAnswer = (delay, answer) => {
                            $scope.answer = answer;
                            $timeout(function () {
                                $scope.answer = '';
                            }, delay);
                        };

                        // Displays the next card from the deck after the given delay.
                        var showNextCard = delay => {
                            $timeout(function () {
                                $scope.guess = '';
                                index = (index + 1) % cards.length;
                                $scope.currentCard = cards[index];
                            }, delay);
                        };

                        var updateStats = () => {
                            Stats.post($scope.stats, res => {
                                console.log('Stat update successful: ' + res);
                            }, err => {
                                console.log('Something broke: ');
                                console.log(err);
                            });
                        };

                        $scope.nextCard = () => {
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
                            updateStats();
                        };

                        // Indicates whether the current card has ever been successfully attempted.
                        $scope.isNewCard = () => {
                            return !$scope.stats.progress[$scope.currentCard.id];
                        };

                        $scope.seeTranslation = () => {
                            var p = document.getElementById('englishTranslationText');
                            p.textContent = $scope.currentCard.translation;
                            $timeout(() => {
                                p.textContent = '';
                            }, 3000);
                        };
                    }, err => {
                        console.log('Uh oh ... something went wrong while loading your learning stats: ');
                        console.log(err);
                    });
                }, err => {
                    console.log('Uh oh ... something went wrong while grabbing the cards: ');
                    console.log(err);
                });
            }
        ]
    });
}());
