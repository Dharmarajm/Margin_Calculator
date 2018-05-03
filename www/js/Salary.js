angular.module('Salary', [])

.controller('SalaryCtrl', function($scope,$state,$http,$rootScope,$ionicLoading,$timeout) {


    if($rootScope.candidatename == "Consultant Name" ||  $rootScope.candidatename == undefined || $rootScope.candidatename == null || $rootScope.candidatename == ""){  
      $rootScope.candidatename="Consultant Name"; 
    }
    else{
      $rootScope.candidatename=$rootScope.candidatename;
    }


  $scope.SalarySliderEnd = function() {
    $ionicLoading.show({
       content: 'Loading',
       animation: 'fade-in',
       showBackdrop: true,
       maxWidth: 200,
       showDelay: 0
    });
    $rootScope.SalaryValue=$scope.salarySlider.min;
    $scope.hour=Math.round($scope.salarySlider.min/2080);
    $scope.bill=Math.round(($scope.hour/42)*100);
    $rootScope.doRefresh();   
  };

  

  $scope.PerdiemSliderEnd = function() {
    $ionicLoading.show({
       content: 'Loading',
       animation: 'fade-in',
       showBackdrop: true,
       maxWidth: 200,
       showDelay: 0
    });
    $rootScope.perdiemValue=$scope.perdiemSlider.min;
    $rootScope.doRefresh();   
  };

  $scope.perdiemSlider = {
    min: 0,
    max: 100.5,
    floor: 1,
    step: 0.5,
    precision: 1,
    onEnd: $scope.PerdiemSliderEnd
  }; 

  $scope.salarySlider = {
        min: 18000,
        max: 250000,
        floor: 18000,
        onEnd: $scope.SalarySliderEnd
  };


  if($rootScope.salaryText != null){
          $scope.salarySlider = {
            min: $rootScope.salaryText,
            max: 250000,
            floor: 18000,
            onEnd: $scope.SalarySliderEnd
          };

          $scope.hour=Math.round($scope.salarySlider.min/2080);
          $scope.bill=Math.round(($scope.hour/42)*100);
  }

  $scope.$watch('salarySlider.min',function(data){      
    $rootScope.salaryText=data;
  });


  if($rootScope.perdiemText != null){
            $scope.perdiemSlider = {
              min:$rootScope.perdiemText,
              max: 100.5,
              floor: 1,
              step: 0.5,
              precision: 1,
              onEnd: $scope.PerdiemSliderEnd
            }; 
  }

  $scope.$watch('perdiemSlider.min',function(data){      
     $rootScope.perdiemText=data;       
  });

  angular.element(document).ready(function () {
    $scope.$broadcast('rzSliderForceRender');
  });
  
    $scope.Salary=function(values){
       $ionicLoading.show({
        content: 'Loading',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
       });
        $rootScope.SalaryValue=values;
        $rootScope.doRefresh();   
    }




})