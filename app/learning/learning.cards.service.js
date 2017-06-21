(function () {
    "use strict";

    angular.module('learning').factory('Cards', ['$http',
        $http => {
            // TODO: Use the proper language tag for the desired context.
            var language = 'Latin';
            const promise = $http.get('http://localhost:3000/cards/' + language);
            return {
                get: (success, error) => {
                    return promise.then(success, error);
                }
            }
        }
    ]);
}());