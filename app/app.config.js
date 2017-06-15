(function () {
    'use strict';

    angular.module('glottaiApp').config(['$locationProvider', '$routeProvider',
        function($locationProvider, $routeProvider) {
            $locationProvider.html5Mode({ enabled: true, requireBase: true });

            $routeProvider
                .when('/learn', {
                    template: '<learning></learning>'
                }).when('/grammar', {
                    template: '<grammar></grammar>'
                }).when('/', {
                    template: '<about></about>'
                }).otherwise({
                    redirectTo: '/'
                });
        }]
    );
}());