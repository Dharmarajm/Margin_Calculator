angular.module('Salary', [])

.controller('SalaryCtrl', function($scope,$state,$http,$rootScope) {

 /* $scope.anual = true;
  $scope.anualButton = function() {
    $scope.hour = false;
    $scope.anual = true;
    $scope.bill = false;
  }
  $scope.hourlyButton = function() {
    $scope.hour = true;
    $scope.anual = false;
    $scope.bill = false;
  }

  $scope.billButton = function() {
    $scope.bill = true;
    $scope.anual = false;
    $scope.hour = false;
  }*/

  $scope.min = {
  	dollar: 18000,
    hourly: 1,
    rate: 1,
    perdiem:1
  }

  $scope.DollarSlider = {
    min: 18000,
    max: 250000,
    ceil: 250000,
    floor: 18000,
  };

  $scope.perdiemSlider = {
    min: 1,
    max: 100,
    ceil: 100,
    floor: 1,
  };



})