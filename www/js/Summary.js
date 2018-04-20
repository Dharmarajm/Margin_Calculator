angular.module('Summary', [])

.controller('SummaryCtrl', function($scope,$state,$http,$rootScope) {

  $scope.email = function() {
    alert("Cost Summary for James is send to your email.")
    $state.go("dashboard")
  }
	
})