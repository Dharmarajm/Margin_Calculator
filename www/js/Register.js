angular.module('Register', [])

.controller('RegisterCtrl', function($scope,$state,$http,$rootScope) {
	$scope.save = function() {
    	localStorage.setItem("user", 0)
    $state.go('login');
  }
})