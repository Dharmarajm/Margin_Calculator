angular.module('Pto', [])

.controller('PtoCtrl', function($scope,$state,$http,$rootScope,$ionicLoading,$timeout) {



if($rootScope.candidatename == "Consultant Name" ||  $rootScope.candidatename == undefined || $rootScope.candidatename == null || $rootScope.candidatename == ""){  
  $rootScope.candidatename="Consultant Name"; 
}
else{
  $rootScope.candidatename=$rootScope.candidatename;
}

	
  $scope.pto=$rootScope.OverAllData[0].pto;
  $scope.standard = true;
  $scope.standarButton = function() {
    $scope.standard = true;
    $scope.other = false;
    $rootScope.ptoHrs="";
  }
  $scope.otherButton = function() {
    $scope.standard = false;
    $scope.other = true;
    angular.element(document).ready(function () {
     $scope.$broadcast('rzSliderForceRender');
    }); 
  }
  
  if($rootScope.otherDays == null || $rootScope.otherDays == ""){
    $rootScope.otherDays=0;
  }
  else{
    $rootScope.otherDays=$rootScope.otherDays
  }
  $scope.myEndListener = function() {
    $rootScope.ptoHrs=$rootScope.slider.min;
    $rootScope.otherDays=Math.round($rootScope.slider.min/8);
    $rootScope.doRefresh();   
  };

  $rootScope.slider = {
    min: 0,
    max: 250,
    floor: 0,
    ceil: 250,
    onEnd: $scope.myEndListener
  }

  if($rootScope.ptoText != null){
    $rootScope.slider = {
      min: $rootScope.ptoText,
      max: 250,
      floor: 0,
      ceil: 250,
      onEnd: $scope.myEndListener
    };
    $rootScope.otherDays=Math.round($rootScope.ptoText/8);
  }

  $scope.$watch('slider.min',function(data){      
     $rootScope.ptoText=data;
  });
  

  $scope.ptohours=function(values){
   $ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
   });
   $rootScope.ptoHrs=values;
   $rootScope.doRefresh();
  }


})  


