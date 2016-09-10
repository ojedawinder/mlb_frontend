'use strict';

/**
 * @ngdoc function
 * @name mlbApp.controller:StatsCtrl
 * @description
 * # StatsCtrl
 * Controller of the mlbApp
 */
angular.module('mlbApp')
  .controller('StatsCtrl', ['$scope', 'TeamService', 'GameService', function ($scope, TeamService, GameService) {
    var team1 = 111;
    var team2 = 141;
    var year = 2016;
    GameService.stats_rivals_by_year(team1, team2, year).then(function(data){
      $scope.list = data;
    });
  }]);
