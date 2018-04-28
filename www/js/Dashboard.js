angular.module('Dashboard', [])

.controller('DashCtrl', function($scope,$state,$http,$rootScope) {
  $rootScope.company_name=$rootScope.company_Details.company_name;
  $http.get(CommonURL + "/recruiters/configuration_details?company_id=50")
    .then(function(response) {
        $rootScope.OverAllData = response.data;
   });
 
  $scope.start = function() {
    $state.go("tab.consultant")
  }

   $scope.boom = function(val) {
        console.log(val);
    };
})


