angular.module('Visa', [])

.controller('VisaStatusCtrl', function($scope,$state,$http,$rootScope) {
  $scope.backVisa = function(name) {
    $rootScope.visame = name;
    $state.go("tab.consultant")
  }
})

