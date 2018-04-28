angular.module('Relocation', [])

.controller('RelocationCtrl', function($scope,$state,$http,$rootScope,$timeout) {
  
      $scope.relocation=$rootScope.OverAllData[0].relocation;

      $scope.locationValue = function() {
        $rootScope.reLocationValue=$scope.sliderRelocation.min;
        $rootScope.doRefresh();   
      };

      $scope.sliderRelocation = {
        min: 1000,
        max: $scope.relocation.relocation,
        floor: 1,
        onEnd: $scope.locationValue
      };  

     if($rootScope.reloadText != null){
         $scope.sliderRelocation = {
            min: $rootScope.reloadText,
            max: $scope.relocation.relocation,
            floor: 1,
            onEnd: $scope.locationValue
          }; 
     }

     $scope.$watch('sliderRelocation.min',function(data){
       $rootScope.reloadText=data;
    });


      if($rootScope.relocation_name != null){
        $scope.state_name=$rootScope.relocation_name;
      }else{
        $scope.state_name="SELECT STATE";
      }


      $scope.selectState = function() {
        $state.go("location_states")
      }

})

.controller('LocationCtrl', function($scope,$state,$http,$rootScope) {
  $scope.allState = $rootScope.OverAllData[0].state_tax;
   $scope.backLocation = function(state) {
    $rootScope.relocation_name=state.state_name;
    $rootScope.relocation_value=state.tax_per_hour;
    console.log(state)
    $state.go("tab.relocation")
  }
})