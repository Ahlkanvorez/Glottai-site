(function () {
    "use strict";

    angular.module('learning').factory('Stats', ['$http', 'ServerConfig',
        ($http, ServerConfig) => {
            // TODO: Report the proper user ID for whoever is logged in to study.
            var userId = "1";
            const promise = $http.get(ServerConfig.statsUrl + userId);
            return {
                get: (success, error) => {
                    return promise.then(success).catch(error);
                },
                post: (data, success, error) => {
                    $http.post(ServerConfig.statsUrl + userId, { stats: data }).then(success).catch(error);
                }
            };
        }
    ]);
}());
