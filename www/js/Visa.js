angular.module('Visa', [])

.controller('VisaStatusCtrl', function($scope,$state,$http,$rootScope,$ionicLoading,$timeout) {

  $scope.Allvisa=$rootScope.OverAllData[0].visa_status;
  $scope.backVisa = function(value,name) {
  	$ionicLoading.show({
        content: 'Loading',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
    });
  	$rootScope.visvalue=name;
  	$rootScope.visaStateValue=value;
  	$timeout(function() {
        $ionicLoading.hide();
    });
  	$state.go("tab.consultant")
  }
   /* $rootScope.visame = name;
    $state.go("tab.consultant")
  }*/
})

