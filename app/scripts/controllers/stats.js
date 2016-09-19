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
    $scope.years = ["All Time", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016"];
    $scope.season = {year:2016};

    $scope.getStarted = function(){
      TeamService.allTeams().then(function(data){
        $scope.team_list = data;
        $scope.homeSelected= { value: data[0] };
        $scope.awaySelected = { value: data[1] };
        $scope.team1 = data[0];
        $scope.team2 = data[1];
        $scope.getRivalsInformation();
      });
    }

    $scope.onYearSelected = function(year){
      $scope.getRivalsInformation();
    }

    $scope.onAwaySelected = function(awayTeam){
      $scope.team2 = awayTeam;
      $scope.getRivalsInformation();

    }

    $scope.onHomeSelected = function(homeTeam){
      $scope.team1 = homeTeam;
      $scope.getRivalsInformation();
    }


    $scope.getRivalsInformation = function(){
      if($scope.season.year!="All Time"){
        $scope.stats_rivals_by_year($scope.team1.id, $scope.team2.id, $scope.season.year);
        $scope.stats_rivals_avg_run_and_rhe_by_year($scope.team1.id, $scope.team2.id, $scope.season.year);
      } else {
        $scope.stats_rivals_all_time($scope.team1.id,  $scope.team2.id);
        $scope.stats_rivals_avg_run_and_rhe_all_time($scope.team1.id,  $scope.team2.id);
      }
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

    $scope.stats_rivals_all_time = function(team1Id, team2Id){
      GameService.stats_rivals_all_time(team1Id, team2Id).then(function(data){
        $scope.list = data;
      });
    }

    $scope.stats_rivals_avg_run_and_rhe_all_time = function(team1Id, team2Id){
      GameService.stats_rivals_avg_run_and_rhe_all_time(team1Id, team2Id).then(function(data){
        $scope.statistics = data[0];
        $scope.team1 = $scope.statistics.home_team;
        $scope.team2 = $scope.statistics.away_team;
      });
    }

    $scope.getStarted();


  }]);
