(function () {
    "use strict";

    angular.module('learning').factory('Stats', ['$http',
        $http => {
            // TODO: Report the proper user ID for whoever is logged in to study.
            var userId = 1;
            const promise = $http.get('http://localhost:3000/learning-stats/' + userId);
            return {
                get: (success, error) => {
                    return promise.then(success, error);
                }
            }
        }
    ]);
}());