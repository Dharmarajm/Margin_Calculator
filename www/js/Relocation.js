angular.module('Relocation', [])

.controller('RelocationCtrl', function($scope,$state,$http,$rootScope) {
  $scope.min = {
    relocation: 0
  }

  $scope.minLocation = {
    min: 0,
    max: 10000,
    ceil: 10000,
    floor: 0,
  };

  $scope.selectState = function() {
    $state.go("location_states")
  }


})

.controller('LocationCtrl', function($scope,$state,$http,$rootScope) {
   $scope.backLocation = function() {
    $state.go("tab.relocation")
  }
})