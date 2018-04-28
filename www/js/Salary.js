angular.module('Salary', [])

.controller('SalaryCtrl', function($scope,$state,$http,$rootScope,$timeout) {

  $scope.SalarySliderEnd = function() {
    $rootScope.SalaryValue=$scope.salarySlider.min;
    $scope.hour=Math.round($scope.salarySlider.min/2080);
    $scope.bill=Math.round(($scope.hour/42)*100);
    $rootScope.doRefresh();   
  };

  $scope.salarySlider = {
    min: 18000,
    max: 250000,
    floor: 18000,
    onEnd: $scope.SalarySliderEnd
  };


  $scope.PerdiemSliderEnd = function() {
    $rootScope.perdiemValue=$scope.perdiemSlider.min;
    $rootScope.doRefresh();   
  };

  $scope.perdiemSlider = {
    min: 0.5,
    max: 100.5,
    floor: 1,
    step: 0.5,
    precision: 1,
    onEnd: $scope.PerdiemSliderEnd
  }; 



     if($rootScope.salaryText != null){
          $scope.salarySlider = {
            min: $rootScope.salaryText,
            max: 250000,
            floor: 18000,
            onEnd: $scope.SalarySliderEnd
          };
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





})