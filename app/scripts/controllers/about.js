'use strict';

/**
 * @ngdoc function
 * @name mlbApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the mlbApp
 */
angular.module('mlbApp')
  .controller('AboutCtrl', ['$scope', 'TeamService', function ($scope, TeamService) {

    TeamService.allTeams().then(function(data){
      $scope.teams = data;
    });
  }]);
