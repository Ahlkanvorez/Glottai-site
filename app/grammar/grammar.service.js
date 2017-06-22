(function () {
    "use strict";

    angular.module('grammar').factory('Grammar', ['$http', 'ServerConfig',
        ($http, ServerConfig) => {
            // TODO: Replace localhost with the proper server URL before deployment.
            const promise = $http.get(ServerConfig.grammarTablesUrl);
            return {
                get: (success, error) => {
                    return promise.then(success, error);
                }
            };
        }
    ]);
}());
