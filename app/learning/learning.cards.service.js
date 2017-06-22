(function () {
    "use strict";

    angular.module('learning').factory('Cards', ['$http', 'ServerConfig',
        ($http, ServerConfig) => {
            // TODO: Use the proper language tag for the desired context.
            var language = 'Latin';
            const promise = $http.get(ServerConfig.cardsUrl + language);
            return {
                get: (success, error) => {
                    return promise.then(success).catch(error);
                }
            };
        }
    ]);
}());
