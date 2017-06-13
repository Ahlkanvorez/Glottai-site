/**
 * Created by robertmitchell on 6/8/17.
 */
(function () {
    'use strict';

    angular.module('glottaiApp').config(['$locationProvider', '$routeProvider',
        function($locationProvider, $routeProvider) {
            $locationProvider.html5Mode({ enabled: true, requireBase: true });

            $routeProvider
                .when('/learn', {
                    template: '<learning></learning>'
                }).when('/', {
                    template: '<about></about>'
                }).otherwise({
                    redirectTo: '/'
                });
        }]
    );
})();