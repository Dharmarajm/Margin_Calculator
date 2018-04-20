angular.module('Consultant', [])

.controller('ConsultantCtrl', function($scope,$state,$http,$rootScope) {
 $scope.visaname = "Visa Status"
  $scope.visa = function() {
    $state.go("visaStatus")
  }
  $scope.netValue='Select Payment Term'
  $scope.selectNet=function(){
  	$state.go('net')
  }
})

.controller('NetCtrl',function($scope,$state,$http,$rootScope) {
	$scope.backNet=function(){
	  $state.go('tab.consultant')
	}
})