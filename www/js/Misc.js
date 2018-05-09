angular.module('Misc', [])

.controller('MiscCtrl', function($scope,$state,$http,$rootScope,$ionicLoading,$timeout) {

    if($rootScope.candidatename == "Consultant Name" ||  $rootScope.candidatename == undefined || $rootScope.candidatename == null || $rootScope.candidatename == ""){  
      $rootScope.candidatename="Consultant Name"; 
    }
    else{
      $rootScope.candidatename=$rootScope.candidatename;
    }

   $rootScope.Coachmark_id=2;
   localStorage.setItem("coachmark",$rootScope.Coachmark_id);  
        


  $scope.misc_bill = true;
  $scope.value="Bill Rate";
  $scope.MiscBill = function() {
    $scope.misc_bill = true;
    $scope.misc_hour = false;
    $scope.miscOne_time = false;
    $scope.value="Bill Rate"
  }

  $scope.MiscHour = function() {
    $scope.misc_bill = false;
    $scope.misc_hour = true;
    $scope.miscOne_time = false;
    $scope.value="Hourly"
  }

  $scope.MiscOne = function() {
    $scope.misc_bill = false;
    $scope.misc_hour = false;
    $scope.miscOne_time = true;
    $scope.value="One Time"
  }
    
   $scope.miscbillEnd = function() {
    /*$ionicLoading.show({
        content: 'Loading',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
    });*/
     $rootScope.miscValue=$scope.miscslider.min;
     var hours_value=$rootScope.adjRate * $rootScope.miscValue;
     $rootScope.hour_total =  hours_value/100;
     $rootScope.doRefresh();
   };

  $scope.miscslider = {
    min: 0,
    /*max: 100,*/
    floor: 0,
    ceil: 100,
    showSelectionBar: true,
    onEnd: $scope.miscbillEnd
  };

  /*if($rootScope.reloadmisc != null){
         $scope.miscslider = {
            min: $rootScope.reloadmisc,
            max: 100,
            floor: 0,
            ceil: 100,
            showSelectionBar: true,
            onEnd: $scope.miscbillEnd
          }; 
  }*/

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

  if($rootScope.hour_total == "" || $rootScope.hour_total == null || $rootScope.hour_total == undefined || $rootScope.hour_total == 0){
     $rootScope.hour_total=0;
  }else{
    $rootScope.miscValue=$scope.miscslider.min;
    var hours_value=$rootScope.adjRate * $rootScope.miscValue;
    $rootScope.hour_total =  hours_value/100;
    $rootScope.hour_total=$rootScope.hour_total;
  }

  if($rootScope.misc == undefined){
    $rootScope.misc=[];
  }else{
    $rootScope.misc=$rootScope.misc;
  }

  $scope.container=false;
  $scope.plusbutton=true;
  $scope.plus=function(){
    $scope.plusbutton=false;
    $scope.container=true;
  }


  $scope.AddMisc=function(){
    if($scope.value == "Bill Rate" ){
      $scope.value="% Bill Rate"+"("+$scope.miscslider.min+")";
      $scope.selected_data=$rootScope.miscValue;
      $rootScope.reloadmisc=null;
      $scope.miscslider.min=0;
      $rootScope.miscValue=$scope.miscslider.min;
      console.log($rootScope.hour_total)
      if($rootScope.hour_total > 0 ){
        $scope.selected_data=$rootScope.hour_total
      }
      else{
        $scope.selected_data=0;
      }

    }
    else if($scope.value == "One Time"){
      $scope.selected_data=$rootScope.miscdata.onetime; 
      $rootScope.miscdata.onetime="";
    }
    else if($scope.value == "Hourly"){
      $scope.selected_data=$rootScope.miscdata.hour;
      $rootScope.miscdata.hour = ""; 
    }
    else{
      if($scope.value != "Hourly" || $scope.value == "One Time"){
        $scope.value = "Bill Rate";
      }
    }

    if($scope.selected_data == "" || $scope.selected_data == null || $scope.selected_data == undefined ){
      alert("Enter a value")
    }
    else{
      $rootScope.misc.push({
        "name":$scope.value,
        "value":$scope.selected_data
      })
      $rootScope.hour_total=0;
      $scope.value = "Bill Rate";
      $scope.container=false;
      $scope.plusbutton=true;
    }
      
    
  }

  $scope.remove=function(index){
    $rootScope.misc.splice(index,1)
  }

  


})