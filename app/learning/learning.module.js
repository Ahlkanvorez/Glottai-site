(function () {
    'use strict';

    angular.module('learning', [
        'ngResource', // for $http required in learning.stats.service.js
        'ngSanitize'
    ]);
}());