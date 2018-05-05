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
    $scope.hour=$scope.salarySlider.min/2080;
    if($rootScope.adjRate == 0 || $rootScope.adjRate == null || $rootScope.adjRate == "" || $rootScope.adjRate == undefined){
      $scope.bill=0;
      
    }else{
      $scope.bill=($scope.hour/$rootScope.adjRate)*100;
    }
    
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
    /*max: 100.5,*/
    floor: 0,
    ceil: 100.5,
    step: 0.5,
    precision: 1,
    showSelectionBar: true,
    onEnd: $scope.PerdiemSliderEnd
  }; 

  $scope.salarySlider = {
        min: 0,
        /*max: 250000,*/
        floor: 0,
        ceil: 250000,
        showSelectionBar: true,
        onEnd: $scope.SalarySliderEnd
  };


  if($rootScope.salaryText != null){
          $scope.salarySlider = {
            min: $rootScope.salaryText,
            /*max: 250000,*/
            floor: 0,
            ceil: 250000,
            showSelectionBar: true,
            onEnd: $scope.SalarySliderEnd
          };     
  }

  $scope.hour=$scope.salarySlider.min/2080;
  if($rootScope.adjRate == 0 || $rootScope.adjRate == null || $rootScope.adjRate == "" || $rootScope.adjRate == undefined){
    $scope.bill=0;
    
  }else{
    $scope.bill=($scope.hour/$rootScope.adjRate)*100;
  }
    

  $scope.$watch('salarySlider.min',function(data){      
    $rootScope.salaryText=data;
  });


  if($rootScope.perdiemText != null){
            $scope.perdiemSlider = {
              min:$rootScope.perdiemText,
              /*max: 100.5,*/
              floor: 0,
              ceil: 100.5,
              step: 0.5,
              precision: 1,
              showSelectionBar: true,
              onEnd: $scope.PerdiemSliderEnd
            }; 
  }

  $scope.$watch('perdiemSlider.min',function(data){      
     $rootScope.perdiemText=data;       
  });

  angular.element(document).ready(function () {
    $scope.$broadcast('rzSliderForceRender');
  });
  
  $scope.salaryEdit=function(values){
      $rootScope.SalaryValue=values;
      $scope.hour=values/2080;
      if($rootScope.adjRate == 0 || $rootScope.adjRate == null || $rootScope.adjRate == "" || $rootScope.adjRate == undefined){
        $scope.bill=0;
        
      }else{
        $scope.bill=($scope.hour/$rootScope.adjRate)*100;
      }
      
      $rootScope.doRefresh();   
  }

}).directive('autosize', function($document) {
  return {
    require: 'ngModel',
    link: function(scope, element, attrs, ctrl) {
      var placeholder, span, resize;
    
      placeholder = element.attr('placeholder') || '';  
      
      span = angular.element('<span></span>');
      span[0].style.cssText = getComputedStyle(element[0]).cssText;
      span.css('display', 'none')
          .css('visibility', 'hidden')
          .css('width', 'auto');
      
      $document.find('body').append(span);
    
      resize = function(value) {
        if (value.length < placeholder.length) {
          value = placeholder;
        }
        span.text(value);
        span.css('display', '');
        try {
          element.css('width', span.prop('offsetWidth') + 'px');
        }
        finally {
          span.css('display', 'none');
        }
      };
      
      ctrl.$parsers.unshift(function(value) {
        resize(value);
        return value;
      });
      
      ctrl.$formatters.unshift(function(value) {
        resize(value);
        return value;
      })
    }
  };
});