angular.module('Relocation', [])

.controller('RelocationCtrl', function($scope,$state,$http,$rootScope,$ionicLoading,$timeout,$ionicPopup) {
   
    if($rootScope.candidatename == "Consultant Name" ||  $rootScope.candidatename == undefined || $rootScope.candidatename == null || $rootScope.candidatename == ""){  
      $rootScope.candidatename="Consultant Name"; 
    }
    else{
      $rootScope.candidatename=$rootScope.candidatename;
    }
    if($rootScope.OverAllData[0].relocation == null || $rootScope.OverAllData[0].relocation == "" || $rootScope.OverAllData[0].relocation ==undefined){
      $scope.locMsg="Relocation is waived"
      $scope.relocation={relocation:0}
    }
    else{
      $scope.relocation=$rootScope.OverAllData[0].relocation;  
    }
    
   
    $scope.locationValue = function() {
      $rootScope.reLocationValue=$scope.sliderRelocation.min;
      $rootScope.doRefresh();   
    };


   $rootScope.Coachmark_id=2;
   localStorage.setItem("coachmark",$rootScope.Coachmark_id);  
      

    $scope.RelocateNote=function(name){
     $rootScope.relocation_notes=name; 
    }
   
    if($rootScope.relocation_notes != ""){
      $rootScope.relocation_notes = $rootScope.relocation_notes 
    }
    else{
    $rootScope.relocation_notes=""  
    }

    $scope.sliderRelocation = {
      min: 0,
      /*max: $scope.relocation.relocation,*/
      floor: 0,
      ceil: $scope.relocation.relocation,
      showSelectionBar: true,
      onEnd: $scope.locationValue
    };  

    if($rootScope.reloadText != null){
        $scope.sliderRelocation = {
           min: $rootScope.reloadText,
           /*max: $scope.relocation.relocation,*/
           floor: 0,
           ceil: $scope.relocation.relocation,
           showSelectionBar: true,
           onEnd: $scope.locationValue
         }; 
    }

    $scope.$watch('sliderRelocation.min',function(data){
      $rootScope.reloadText=data;
    });
    
    angular.element(document).ready(function () {
       $scope.$broadcast('rzSliderForceRender');
    });

    if($rootScope.relocation_name != null){
      $scope.state_name=$rootScope.relocation_name;
    }else{
      $scope.state_name="SELECT STATE";
    }


    $scope.selectState = function() {
      $state.go("location_states")
    }

    $scope.relocations=function(values){
     /*$ionicLoading.show({
      content: 'Loading',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
     });*/
      $scope.reLocationValue=values;
      $rootScope.doRefresh();   
    }

})

.controller('LocationCtrl', function($scope,$state,$http,$rootScope) {
  $scope.allState = $rootScope.OverAllData[0].state_tax;
   $scope.backLocation = function(state) {
    $rootScope.relocation_name=state.state_name;
    $rootScope.relocation_value=state.tax_per_hour;
    $state.go("tab.relocation")
    $rootScope.doRefresh();
  }
})