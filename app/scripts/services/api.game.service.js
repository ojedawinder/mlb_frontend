'use strict';

/**
 * @ngdoc function
 * @name mlbApp.service:GameService
 * @description
 * # GameService
 * Service for the Game
 */
angular.module('mlbApp')
  .constant('$apiUrl', 'http://localhost:3000/api/mlb/')
  .factory('GameService', ['$http', '$q', '$apiUrl', '$filter', '$rootScope', function($http, $q, $apiUrl, $filter, $rootScope) {

  var defaultSuccess = function(deferred, data, successCallback, doNotAddError) {
            if (data == undefined) { // server returns empty response
                deferred.reject();
            } else if (data.Status == "ERROR") {
                if (!doNotAddError)
                    $rootScope.SERVER_ERRORS.push({
                        type: 'server',
                        data: data
                    });

                deferred.reject(data.ErrorMessage);
            } else {
                if (successCallback)
                    successCallback();

                deferred.resolve(data);
            }
        };

        var defaultError = function(deferred, data, status, headers, config) {
            deferred.reject(status);
        };

  return {
          all_games: function () {
              var deferred = $q.defer();
              $http.jsonp($apiUrl+"all_games", {
                  params: params
              }).success(function(data) {
                  defaultSuccess(deferred, data);
              }).error(function(data, status, headers, config) {
                  defaultError(data, status, headers, config);
              });

              return deferred.promise;
          }
      };

  });
