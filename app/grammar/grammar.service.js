(function () {
    "use strict";

    angular.module('grammar').factory('Grammar', ['$http', 'ServerConfig',
        ($http, ServerConfig) => {
            return language => {
                const tablesPromise = $http.get(ServerConfig.grammarTablesUrl + '/' + language);
                const wordsPromise = $http.get(ServerConfig.dictionaryUrl + '/' + language);
                return {
                    getTables: (success, error) => tablesPromise.then(success).catch(error),
                    getWords: (success, error) => wordsPromise.then(success).catch(error)
                };
            };
        }
    ]);
}());
