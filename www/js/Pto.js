angular.module('Pto', [])

.controller('PtoCtrl', function($scope,$state,$http,$rootScope,$ionicLoading,$timeout) {

  if($rootScope.candidatename == "Consultant Name" ||  $rootScope.candidatename == undefined || $rootScope.candidatename == null || $rootScope.candidatename == ""){  
   $rootScope.candidatename="Consultant Name"; 
  }
  else{
    $rootScope.candidatename=$rootScope.candidatename;
  }

  if($rootScope.OverAllData[0].pto == null || $rootScope.OverAllData[0].pto == "" ||$rootScope.OverAllData[0].pto == undefined){
    $scope.ptoMsg="PTO is Waived";
    $scope.pto={days:0,hours:0};

  }
  else{
  	if($rootScope.active_values != null){  
      if($rootScope.active_values == 'Standard'){
       $rootScope.ptoHrs=$rootScope.OverAllData[0].pto.hours;
       $rootScope.getptoDays=$rootScope.OverAllData[0].pto.days;  
      }else if($rootScope.active_values == 'Other'){
        $rootScope.otherHrs=Math.round($rootScope.slider.min*8)
        $rootScope.ptoHrs=$rootScope.otherHrs;
        $rootScope.getptoDays=$rootScope.slider.min;
      }
    }else{
      $rootScope.ptoHrs=0;
      $rootScope.getptoDays=0;
    }
    $scope.pto=$rootScope.OverAllData[0].pto;
  }
  

   $rootScope.Coachmark_id=2;
   localStorage.setItem("coachmark",$rootScope.Coachmark_id);  

    

  
 /* console.log($scope.pto)*/
  /*$scope.standard = true;
  $scope.active_values="Standard";*/
  
  if($rootScope.active_values=="Standard" || $rootScope.active_values==undefined || $rootScope.active_values==null || $rootScope.active_values==""){
    $scope.ptoTab='Tab1';
    localStorage.setItem('pto',$scope.ptoTab)
  }else{
    $scope.ptoTab='Tab2';
    localStorage.setItem('pto',$scope.ptoTab)
  }

  $scope.standarButton = function() {
    $rootScope.active_values="Standard";
    $scope.standard = true;
    $scope.other = false;
    $scope.ptoTab='Tab1';
    angular.element(document).ready(function () {
     $scope.$broadcast('rzSliderForceRender');
    });
    $rootScope.ptoHrs=$scope.pto.hours;
    $rootScope.getptoDays=$scope.pto.days;
    $rootScope.New_Hrs_Values=$scope.pto.hours;
    $rootScope.doRefresh();
  }
  $scope.otherButton = function() {
    $rootScope.active_values="Other";
    $scope.standard = false;
    $scope.other = true;
    $scope.ptoTab='Tab2';
    angular.element(document).ready(function () {
     $scope.$broadcast('rzSliderForceRender');
    });
    $rootScope.otherHrs=Math.round($rootScope.slider.min*8)
    $rootScope.ptoHrs=$rootScope.otherHrs;
    $rootScope.getptoDays=$rootScope.slider.min;
    $rootScope.New_Hrs_Values= $rootScope.otherHrs;
    $rootScope.doRefresh();
  }

  if(localStorage.getItem('pto')=='Tab2'){
   $scope.standard = false;
   $scope.other = true;
   $rootScope.active_values="Other";
   if($rootScope.otherHrs == null || $rootScope.otherHrs == "" || $rootScope.otherHrs==undefined){
     $rootScope.otherHrs=0;
   }
   else{
     $rootScope.otherHrs=$rootScope.otherHrs
   }
  }else{
   $scope.standard = true;
   $scope.other = false;
   $rootScope.active_values="Standard";
  }

  $scope.myEndListener = function() {
    $rootScope.otherHrs=Math.round($rootScope.slider.min*8);
    //if($rootScope.ptoname == 'other'){
    $rootScope.ptoHrs=$rootScope.otherHrs;
    $rootScope.getptoDays=$rootScope.slider.min;
    $rootScope.New_Hrs_Values= $rootScope.otherHrs;
    $rootScope.doRefresh();  
    //}   
  };

   angular.element(document).ready(function () {
     $scope.$broadcast('rzSliderForceRender');
   }); 

  $rootScope.slider = {
    min: 0,
    // max: 250,
    floor: 0,
    ceil: 31,
    showSelectionBar: true,
    onEnd: $scope.myEndListener
  }

  $rootScope.disableslider = {
    min: $scope.pto.hours,
    floor: 0,
    ceil: 31,
    showSelectionBar: true,
    readOnly: true
  };

  if($rootScope.ptoText != null){
    $rootScope.slider = {
      min: $rootScope.ptoText,
      // max: 250,
      floor: 0,
      ceil: 31,
      showSelectionBar: true,
      onEnd: $scope.myEndListener
    };
    $rootScope.otherHrs=Math.round($rootScope.ptoText*8);
  }

  $scope.$watch('slider.min',function(data){      
     $rootScope.ptoText=data;
  });
  

  $scope.ptohours=function(values){
   /*$ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
   });*/
   $rootScope.ptoHrs=values;
   $rootScope.otherHrs=Math.round(values*8);
   $rootScope.doRefresh();
  }
 /* 
  $scope.ptobutton=function(medical,name){
     $rootScope.ptovalue=medical;
     $rootScope.ptoname=name;
     if($rootScope.ptoname == 'other'){
      $rootScope.ptoHrs=$rootScope.slider.min;
      $rootScope.otherDays=Math.round($rootScope.slider.min*8)
      $rootScope.getptoDays=$rootScope.otherDays;
      $rootScope.doRefresh();
    }else if($rootScope.ptoname == 'standard'){
      $rootScope.ptoHrs=$scope.pto.hours;
      $rootScope.getptoDays=$scope.pto.days;
      $rootScope.doRefresh();
    }
  }*/

})  


