(function () {
    'use strict';

    angular.module('glottaiApp').constant('ServerConfig', {
        grammarTablesUrl: 'http://localhost:3000/grammar-tables',
        dictionaryUrl: 'http://localhost:3000/dictionary',
        cardsUrl: 'http://localhost:3000/cards/',
        statsUrl: 'http://localhost:3000/learning-stats/'
    });
}());
