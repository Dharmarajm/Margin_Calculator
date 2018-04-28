angular.module('Visa', [])

.controller('VisaStatusCtrl', function($scope,$state,$http,$rootScope) {

  $scope.Allvisa=$rootScope.OverAllData[0].visa_status;
  $scope.backVisa = function(value,name) {
  	$rootScope.visvalue=name;
  	$rootScope.visaStateValue=value;
  	$state.go("tab.consultant")
  }
   /* $rootScope.visame = name;
    $state.go("tab.consultant")
  }*/
})

