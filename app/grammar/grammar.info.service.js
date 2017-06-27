(() => {
    'use strict';

    const word = function (form) {
        const s = Object.create(String.prototype);
        s.getForm = () => form;
        return s;
    };

    const noun = function (raw) {
        const w = Object.create(word(raw.form));
        w.getGender = () => raw.gender;
        w.getNumber = () => raw.number;
        w.getCase   = () => raw.grammaticalCase;
        w.getDeclension = () => raw.declension;
        return w;
    };

    const verb = function (raw) {
        const v = Object.create(word(raw.form));
        v.getPerson = () => raw.person;
        v.getNumber = () => raw.number;
        v.getTense  = () => raw.tense;
        v.getMood   = () => raw.mood;
        v.getVoice  = () => raw.voice;
        v.getConjugation = () => raw.conjugation;
        return v;
    };

    const conjugator = function (dictionary, grammarTables) {
        const getVerbStem = rawV => {
            const v = verb(rawV);
            if (v.getConjugation().toLowerCase() === 'irregular') {
                console.log('The conjugation is irregular, and will be supported at a later date.');
            } else {
                const tables = grammarTables.conjugations[v.getConjugation().toLowerCase()].tables;
                for (var i = 0; i < tables.length; ++i) {
                    if (tables[i].tense === v.getTense() && tables[i].mood === v.getMood()
                            && tables[i].voice === v.getVoice()) {
                        const table = tables[i].data;
                        // Lookup the current ending for this verb-form using its person, number, tense, mood, & voice.
                        const p = v.getPerson() === '1st' ? 0 : (v.getPerson() === '2nd' ? 1 : 2);
                        const n = v.getNumber() === 'Sg' ? 0 : 1;
                        // The current ending from the table excludes the '-' prefix in the table.
                        const currentEnding = table[p][n].slice(1);
                        // The stem is the current form minus the ending.
                        return v.getForm().slice(0, v.getForm().length - currentEnding.length);
                    }
                }
            }
            // TODO: Make this a better exception.
            throw {
                error: 'NoSuchConjugation',
                message: 'The given verb (' + v + ') could not be found in the grammar tables.'
            };
        };

        // Returns an array of objects, each of which contain the associated tables for their indicated tense, mood,
        // and voice, where the values of each table are the properly conjugated forms of the value rawV.form
        // Finite forms are provided in tables under 'data', whereas infinite forms are provided as strings under
        // 'form', for each object in the array. All objects in the array together make up all the forms of a particular
        // verb, and thus can serve as a paradigm for a verb conjugation.
        const getConjugation = rawV => {
            const v = verb(rawV);
            const tables = grammarTables.conjugations[v.getConjugation().toLowerCase()].tables;
            const conjugation = [];
            const stem = getVerbStem(rawV);

            for (var i = 0; i < tables.length; ++i) {
                // Map the verb grammar tables so that they show the forms of this verb instead of just endings
                const appendEnding = ending => {
                    // Only append endings, which are prefixed by '-', not the '1st', '2nd, '3rd' texts.
                    if (ending.charAt(0) === '-') {
                        // Remove the '-' prefix in the table endings prior to appending.
                        return stem + ending.slice(1);
                    } else {
                        // Leave the '1st', '2nd', '3rd' text in the table as is for labels.
                        return ending;
                    }
                };
                conjugation[i] = {
                    tense: tables[i].tense,
                    mood: tables[i].mood,
                    voice: tables[i].voice
                };

                // If it has 'data', then it is not an infinitive.
                if (tables[i].hasOwnProperty('data')) {
                    conjugation[i].data = tables[i].data.map(row => row.map(appendEnding));
                } else {
                    conjugation[i].form = appendEnding(tables[i].ending);
                }
            }
            return conjugation;
        };

        const getPrincipalParts = v => {
            const conjugation = getConjugation(v);
            const stem = getVerbStem(v);

            const firstSgPresActInd = conjugation.filter(
                t => (t.tense === 'Present' && t.voice === 'Active' && t.mood === 'Indicative')
            )[0].data[0][1]; // data[0][1] is 1st person sg.
            const presActInf = conjugation.filter(
                t => (t.tense === 'Present' && t.voice === 'Active' && t.mood === 'Infinitive')
            )[0].form;
            const firstSgPerfActInd = conjugation.filter(
                t => (t.tense === 'Perfect' && t.voice === 'Active' && t.mood === 'Indicative')
            )[0].data[0][1]; // data[0][1] is 1st person sg.
            const nomSgNPerfPassPart = stem + '';
            return [firstSgPresActInd, presActInf, firstSgPerfActInd, nomSgNPerfPassPart];
        };

        const getDefinition = v => {
            // The definition of verb forms are listed under their second principal part.
            return dictionary.filter(t => t.form === getPrincipalParts(v)[1])[0].definition;
        };

        return {
            getVerbStem: getVerbStem,
            getPrincipalParts: getPrincipalParts,
            getDefinition: getDefinition,
            getConjugation: getConjugation
        };
    };

    // TODO: Implement the analogous object to 'conjugator' for declination of nouns and adjectives.

    angular.module('grammar').factory('GrammarInfo', [
        () => {
            return (dictionary, tables) => {
                if (!dictionary || !tables) {
                    throw {
                        name: 'InvalidArgumentException',
                        message: 'Both the dictionary and the grammar tables must be defined.'
                    };
                }

                // Encapsulate the dictionary and tables as private members via closure, providing conjugation
                // and declension capabilities across the whole dictionary and provided grammar tables.
                return {
                    conjugator: conjugator(dictionary, tables),
                    declinator: []
                };
            };
        }
    ]);
})();
