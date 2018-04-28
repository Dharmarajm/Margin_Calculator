angular.module('Pto', [])

.controller('PtoCtrl', function($scope,$state,$http,$rootScope,$timeout) {
	
  $scope.pto=$rootScope.OverAllData[0].pto;
  $scope.standard = true;
  $scope.standarButton = function() {
    $scope.standard = true;
    $scope.other = false;
  }
  $scope.otherButton = function() {
    $scope.standard = false;
    $scope.other = true;
  }
  $scope.otherDays=0;
  $scope.myEndListener = function() {
    $rootScope.ptoHrs=$rootScope.slider.min;
    $scope.otherDays=Math.round($rootScope.slider.min/8);
    $rootScope.doRefresh();   
  };

  $rootScope.slider = {
    min: 1,
    max: 250,
    floor: 1,
    onEnd: $scope.myEndListener
  }

  

  


})  