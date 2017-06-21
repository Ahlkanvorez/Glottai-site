(function () {
    "use strict";

    angular.module('grammar').factory('Grammar', ['$http',
        function ($http) {
            // TODO: Replace localhost with the proper server URL before deployment.
            const promise = $http.get('http://localhost:3000/grammar-tables');
            return {
                get: function (successCallback, errorCallback) {
                    return promise.then(successCallback, errorCallback);
                }
            }
        }
    ]);
}());