angular.module('Misc', [])

.controller('MiscCtrl', function($scope,$state,$http,$rootScope,$ionicLoading,$timeout,$ionicPopup) {

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

  /*
  if($rootScope.miscdata != undefined){
    $rootScope.miscdata.hour= $rootScope.miscdata.hour;
    $rootScope.miscdata.onetime= $rootScope.miscdata.onetime;
  }
  else{
    $rootScope.miscdata = { hour:"",onetime:"" };
  }*/

  /*$scope.hourly=function(name){
   $rootScope.miscdata.hour = name; 
  }
  

  $scope.onetime=function(name){
   $rootScope.miscdata.onetime=name; 
  }*/

  $rootScope.miscdata = { hour:"",onetime:"",mis_notes:""};

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

  $scope.minus=function(){
    $scope.plusbutton=true;
    $scope.container=false;
  }


  $scope.AddMisc=function(){
    if($scope.value == "One Time"){
      $scope.selected_data=$rootScope.miscdata.onetime; 
      $rootScope.miscdata.onetime="";
      $scope.disp_name="one_time";
    }
    else if($scope.value == "Hourly"){
      $scope.selected_data=$rootScope.miscdata.hour;
      $rootScope.miscdata.hour = "";
      $scope.disp_name="hourly" 
    }
    else
    {
      $scope.value="% Bill Rate"+"("+$scope.miscslider.min+")";
      $rootScope.reloadmisc=null;
      $scope.miscslider.min=0;
      $scope.disp_name="bill_rate"
      if($rootScope.hour_total == 0 ){
        $scope.selected_data=0;
      }
      else{
        $scope.selected_data=$rootScope.hour_total
      }

    }
    if($scope.selected_data == "" || $scope.selected_data == null || $scope.selected_data == undefined ){
      var alertPopup = $ionicPopup.alert({
          title: "MARGINO",
          content: "Enter a  value"
      })
    }
    else{
      $rootScope.misc.push({
        "name":$scope.disp_name,
        "disp_name":$scope.value,
        "value":$scope.selected_data,
        "notes":$rootScope.miscdata.mis_notes
      })
      $rootScope.miscdata.mis_notes="";
      $rootScope.hour_total=0;
      $scope.container=false;
      $scope.plusbutton=true;

    }
    $rootScope.doRefresh();
      
    
  }

  $scope.remove=function(index){
    $rootScope.misc.splice(index,1)
    $rootScope.doRefresh();
  }

  


})