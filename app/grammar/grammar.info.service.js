(() => {
    'use strict';

    var word = function (form) {
        var s = Object.create(form);

        return {
            getForm: () => form
        };
    };

    var noun = function (form, gender, number, grammaticalCase, declension) {
        var w = Object.create(word(form));
        w.getGender = () => gender;
        w.getNumber = () => number;
        w.getCase   = () => grammaticalCase;
        w.getDeclension = () => declension;
        return w;
    };

    var verb = function (form, person, number, tense, mood, voice, conjugation) {
        var v = Object.create(word(form));
        v.getPerson = () => person;
        v.getNumber = () => number;
        v.getTense  = () => tense;
        v.getMood   = () => mood;
        v.getVoice  = () => voice;
        v.getConjugation = () => conjugation;
        return v;
    };

    var conjugator = function (dictionary, tables) {
        var getVerbStem = (v) => {
            var conjugation = Object.create(tables.conjugations[v.getConjugation()]);

            const tables = conjugation.tables;
            for (table in tables) {
                if (tables.hasOwnProperty(table) && tables.tense === v.getTense() && tables.mood === v.getMood()
                        && tables.voice === v.getVoice()) {
                    // Lookup the current ending for this verb-form using its person, number, tense, mood, & voice.
                    var p = v.getPerson() === '1st' ? 0 : (v.getPerson() === '2nd' ? 1 : 2);
                    var n = v.getNumber() === 'Sg' ? 1 : 2;
                    // The current ending from the table excludes the '-' prefix in the table.
                    var currentEnding = tables[p][n].slice(1);
                    // The stem is the current form minus the ending.
                    return v.getForm().slice(0, v.getForm().length - currentEnding.length);
                }
            }
            // TODO: Make this a better exception.
            throw {
                error: 'No Such Conjugation',
                message: 'The given verb (' + v + ') could not be found in the grammar tables.'
            };
        };

        var getConjugation = (v) => {
            var conjugation = Object.create(tables.conjugations[v.getConjugation()]);
            var stem = getVerbStem(v);

            for (table in tables) {
                if (tables.hasOwnProperty(table)) {
                    // Map the verb grammar tables so that they show the forms of this verb instead of just endings
                    tables.table.data = tables.table.data.map(row => row.map(ending => {
                        // Only append endings, which are prefixed by '-', not the '1st', '2nd, '3rd' texts.
                        if (ending.charAt(0) === '-') {
                            // Remove the '-' prefix in the table endings prior to appending.
                            return stem + ending.slice(1);
                        } else {
                            // Leave the '1st', '2nd', '3rd' text in the table as is for labels.
                            return ending;
                        }
                    }));
                }
            }
            return conjugation;
        };

        var getPrincipalParts = (v) => {
            var conjugation = getConjugation(v);

            // TODO: Return an array [1spria, pai, 1speia, ppp]
        };

        var getDefinition = (v) => {
            var firstPrincipalPart = getPrincipalParts(v)[0];
            return dictionary[firstPrincipalPart];
        };

        return {
            getVerbStem: getVerbStem,
            getPrincipalParts: getPrincipalParts,
            getDefinition: getDefinition,
            getConjugation: getConjugation
        };
    };

    angular.module('grammar').factory('GrammarInfo', [
        () => {
            return (dictionary, tables) => {
                // Encapsulate the dictionary and tables as private members via closure, providing conjugation
                // and declension capabilities across the whole dictionary and provided grammar tables.
                return {
                    conjugator: conjugator(dictionary, tables),
                    declinator: []
                };
            };
        }
    ]);
}());
