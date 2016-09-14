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

    $scope.year = 2016;

    $scope.getStarted = function(){
      TeamService.allTeams().then(function(data){
        $scope.team_list = data;
        $scope.homeSelected= { value: data[0] };
        $scope.awaySelected = { value: data[1] };
        $scope.team1 = data[0];
        $scope.team2 = data[1];
        $scope.stats_rivals_by_year($scope.team1.id, $scope.team2.id, $scope.year);
        $scope.stats_rivals_avg_run_and_rhe_by_year($scope.team1.id, $scope.team2.id, $scope.year);
      });
    }

    $scope.onAwaySelected = function(awayTeam){
      $scope.team2 = awayTeam;
      $scope.stats_rivals_by_year($scope.team1.id, awayTeam.id, $scope.year);
      $scope.stats_rivals_avg_run_and_rhe_by_year($scope.team1.id, awayTeam.id, $scope.year);
    }

    $scope.onHomeSelected = function(homeTeam){
      $scope.team1 = homeTeam;
      $scope.stats_rivals_by_year(homeTeam.id, $scope.team2.id, $scope.year);
      $scope.stats_rivals_avg_run_and_rhe_by_year(homeTeam.id, $scope.team2.id, $scope.year);
    }


    $scope.stats_rivals_by_year = function(team1Id, team2Id, year){
      GameService.stats_rivals_by_year(team1Id, team2Id, year).then(function(data){
        $scope.list = data;
      });
    }

    $scope.stats_rivals_avg_run_and_rhe_by_year = function(team1Id, team2Id, year){
      GameService.stats_rivals_avg_run_and_rhe_by_year(team1Id, team2Id, year).then(function(data){
        $scope.statistics = data[0];
        $scope.team1 = $scope.statistics.home_team;
        $scope.team2 = $scope.statistics.away_team;
      });
    }

    $scope.getStarted();


  }]);
