angular.module('Pto', [])

.controller('PtoCtrl', function($scope,$state,$http,$rootScope,$ionicLoading,$timeout) {

  if($rootScope.candidatename == "Consultant Name" ||  $rootScope.candidatename == undefined || $rootScope.candidatename == null || $rootScope.candidatename == ""){  
   $rootScope.candidatename="Consultant Name"; 
  }
  else{
    $rootScope.candidatename=$rootScope.candidatename;
  }

	if($rootScope.ptoname != null){  
    if($rootScope.ptoname == 'standard'){
     $scope.checkedstandard=true;
     $rootScope.ptoHrs=$rootScope.OverAllData[0].pto.hours;
     $rootScope.getptoDays=$rootScope.OverAllData[0].pto.days;  
    }else if($rootScope.ptoname == 'other'){
     $scope.checkedother=true;
     $rootScope.ptoHrs=$rootScope.slider.min;
      $rootScope.otherDays=Math.round($rootScope.slider.min/8)
      $rootScope.getptoDays=$rootScope.otherDays;
    }
  }else{
    $rootScope.ptoHrs=0;
    $rootScope.getptoDays=0;
  }
  

   $rootScope.Coachmark_id=2;
   localStorage.setItem("coachmark",$rootScope.Coachmark_id);  

    

  $scope.pto=$rootScope.OverAllData[0].pto;
  $scope.standard = true;
  $scope.standarButton = function() {
    $scope.standard = true;
    $scope.other = false;
    angular.element(document).ready(function () {
     $scope.$broadcast('rzSliderForceRender');
    });
  }
  $scope.otherButton = function() {
    $scope.standard = false;
    $scope.other = true;
    angular.element(document).ready(function () {
     $scope.$broadcast('rzSliderForceRender');
    });
  }
  
  if($rootScope.otherDays == null || $rootScope.otherDays == "" || $rootScope.otherDays==undefined){
    $rootScope.otherDays=0;
  }
  else{
    $rootScope.otherDays=$rootScope.otherDays
  }
  $scope.myEndListener = function() {
    $rootScope.otherDays=Math.round($rootScope.slider.min/8);
    if($rootScope.ptoname == 'other'){
     $rootScope.ptoHrs=$rootScope.slider.min; 
     $rootScope.getptoDays=$rootScope.otherDays;
     $rootScope.doRefresh();  
    }   
  };

   angular.element(document).ready(function () {
     $scope.$broadcast('rzSliderForceRender');
   }); 

  $rootScope.slider = {
    min: 0,
    // max: 250,
    floor: 0,
    ceil: 250,
    showSelectionBar: true,
    onEnd: $scope.myEndListener
  }

  $rootScope.disableslider = {
    min: $rootScope.OverAllData[0].pto.hours,
    floor: 0,
    ceil: 250,
    showSelectionBar: true,
    readOnly: true
  };

  if($rootScope.ptoText != null){
    $rootScope.slider = {
      min: $rootScope.ptoText,
      // max: 250,
      floor: 0,
      ceil: 250,
      showSelectionBar: true,
      onEnd: $scope.myEndListener
    };
    $rootScope.otherDays=Math.round($rootScope.ptoText/8);
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
   $rootScope.otherDays=Math.round(values/8);
   $rootScope.doRefresh();
  }
  
  $scope.ptobutton=function(medical,name){
     $rootScope.ptovalue=medical;
     $rootScope.ptoname=name;
     if($rootScope.ptoname == 'other'){
      $rootScope.ptoHrs=$rootScope.slider.min;
      $rootScope.otherDays=Math.round($rootScope.slider.min/8)
      $rootScope.getptoDays=$rootScope.otherDays;
      $rootScope.doRefresh();
    }else if($rootScope.ptoname == 'standard'){
      $rootScope.ptoHrs=$scope.pto.hours;
      $rootScope.getptoDays=$scope.pto.days;
      $rootScope.doRefresh();
    }
  }

})  


