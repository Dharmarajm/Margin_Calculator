angular.module('Misc', [])

.controller('MiscCtrl', function($scope,$state,$http,$rootScope,$timeout) {
  $scope.misc_bill = true;
  $scope.value="billrate";
  $scope.MiscBill = function() {
    $scope.misc_bill = true;
    $scope.misc_hour = false;
    $scope.miscOne_time = false;
    $scope.value="billrate"
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
    $scope.value="onetime"
  }


   $scope.miscbillEnd = function() {
     $rootScope.miscValue=$scope.miscslider.min;
   };

  $scope.miscslider = {
    min: 1,
    max: 100,
    floor: 1,
    onEnd: $scope.miscbillEnd
  };






/*if($scope.miscdata.hour != ""){
  $scope.miscdata.hour= $scope.miscdata.hour;
}
else{
  $scope.miscdata.hour=""  
}
$scope.hourly=function(name){
 $scope.miscdata.hour=name; 
}


if($scope.miscdata.onetime != ""){
  $scope.miscdata.onetime= $scope.miscdata.onetime;
}
else{
  $scope.miscdata.onetime=""  
}
$scope.onetime=function(name){
 $scope.miscdata.onetime=name; 
}

*/
  $scope.miscdata={onetime:'',hour:''};
  $rootScope.misc=[];
  $scope.AddMisc=function(){
    if($scope.value == "billrate" ){
      $scope.selected_data=$rootScope.miscValue;
    }
    else if($scope.value == "onetime"){
      $scope.selected_data=$scope.miscdata.onetime; 
    }
    else if($scope.value == "hourly"){
      $scope.selected_data=$scope.miscdata.hour;
    }

      $rootScope.misc.push({
        "name":$scope.value,
        "value":$scope.selected_data
      })
      /*if($scope.miscdata.onetime == undefined && $scope.miscdata.hour == undefined && $rootScope.miscValue == undefined){
          $scope.table=false;
      }else{
          $scope.table=true;
      }
*/
    $scope.miscdata.onetime='';
    $scope.miscdata.hour='';
  }

  $scope.remove=function(index){
    $rootScope.misc.splice(index,1)
  }

  


})