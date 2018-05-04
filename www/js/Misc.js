angular.module('Misc', [])

.controller('MiscCtrl', function($scope,$state,$http,$rootScope,$ionicLoading,$timeout) {

    if($rootScope.candidatename == "Consultant Name" ||  $rootScope.candidatename == undefined || $rootScope.candidatename == null || $rootScope.candidatename == ""){  
      $rootScope.candidatename="Consultant Name"; 
    }
    else{
      $rootScope.candidatename=$rootScope.candidatename;
    }


  $scope.misc_bill = true;
  $scope.value="bill_rate";
  $scope.MiscBill = function() {
    $scope.misc_bill = true;
    $scope.misc_hour = false;
    $scope.miscOne_time = false;
    $scope.value="bill_rate"
  }

  $scope.MiscHour = function() {
    $scope.misc_bill = false;
    $scope.misc_hour = true;
    $scope.miscOne_time = false;
    $scope.value="hourly"
  }

  $scope.MiscOne = function() {
    $scope.misc_bill = false;
    $scope.misc_hour = false;
    $scope.miscOne_time = true;
    $scope.value="one_time"
  }
   
   if($rootScope.hour_total!=""){
     $rootScope.hour_total=$rootScope.hour_total;
   }else{
     $rootScope.hour_total=0;
   }
    
   $scope.miscbillEnd = function() {
    $ionicLoading.show({
        content: 'Loading',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
    });
    $rootScope.doRefresh();
     $rootScope.miscValue=$scope.miscslider.min;
     var hours_value=$rootScope.adjRate * $rootScope.miscValue;
     $rootScope.hour_total =  hours_value/100;
     
   };

  $scope.miscslider = {
    min: 0,
    max: 100,
    floor: 0,
    ceil: 100,
    onEnd: $scope.miscbillEnd
  };

  if($rootScope.reloadmisc != null){
         $scope.miscslider = {
            min: $rootScope.reloadmisc,
            max: 100,
            floor: 0,
            ceil: 100,
            onEnd: $scope.miscbillEnd
          }; 
  }

  $scope.$watch('miscslider.min',function(data){
     $rootScope.reloadmisc=data;
  });

  angular.element(document).ready(function () {
    $scope.$broadcast('rzSliderForceRender');
  });

  if($rootScope.miscdata != undefined){
    $rootScope.miscdata.hour= $rootScope.miscdata.hour;
    $rootScope.miscdata.onetime= $rootScope.miscdata.onetime;
  }
  else{
    $rootScope.miscdata = { "hour":"" };  
    $rootScope.miscdata = { "onetime":"" };
  }

  $scope.hourly=function(name){
   $rootScope.miscdata.hour = name; 
  }
  

  $scope.onetime=function(name){
   $rootScope.miscdata.onetime=name; 
  }

  if($rootScope.misc == undefined){
    $rootScope.misc=[];
  }else{
    $rootScope.misc=$rootScope.misc;
  }

  $scope.AddMisc=function(){
    if($scope.value == "bill_rate" ){
      $scope.selected_data=$rootScope.miscValue;
      $rootScope.reloadmisc=null;
      $scope.miscslider.min=0;
      $rootScope.miscValue=$scope.miscslider.min;
      $rootScope.hour_total=0;
    }
    else if($scope.value == "one_time"){
      $scope.selected_data=$rootScope.miscdata.onetime; 
      $rootScope.miscdata.onetime="";
    }
    else if($scope.value == "hourly"){
      $scope.selected_data=$rootScope.miscdata.hour;
      $rootScope.miscdata.hour = ""; 
    }
    if($scope.selected_data!=""){
      $rootScope.misc.push({
        "name":$scope.value,
        "value":$scope.selected_data
      })
    }
      /*if($scope.miscdata.onetime == undefined && $scope.miscdata.hour == undefined && $rootScope.miscValue == undefined){
          $scope.table=false;
      }else{
          $scope.table=true;
      }
}
*/
  }

  $scope.remove=function(index){
    $rootScope.misc.splice(index,1)
  }

  


})