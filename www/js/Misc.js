angular.module('Misc', [])

.controller('MiscCtrl', function($scope,$state,$http,$rootScope) {
  $scope.misc_bill = true;
  $scope.MiscBill = function() {
    $scope.misc_bill = true;
    $scope.misc_hour = false;
    $scope.miscOne_time = false;
  }

  $scope.MiscHour = function() {
    $scope.misc_bill = false;
    $scope.misc_hour = true;
    $scope.miscOne_time = false;
  }

  $scope.MiscOne = function() {
    $scope.misc_bill = false;
    $scope.misc_hour = false;
    $scope.miscOne_time = true;
  }

  $scope.min = {
    mis_bill: 1
  }

  $scope.MiscbillSlide = {
    min: 1,
    max: 100,
    ceil: 100,
    floor: 1,
  };
})