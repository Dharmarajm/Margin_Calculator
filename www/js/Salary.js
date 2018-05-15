angular.module('Salary', [])

.controller('SalaryCtrl', function($scope,$state,$http,$rootScope,$ionicLoading,$timeout,$ionicPopup) {


    if($rootScope.candidatename == "Consultant Name" ||  $rootScope.candidatename == undefined || $rootScope.candidatename == null || $rootScope.candidatename == ""){  
      $rootScope.candidatename="Consultant Name"; 
    }
    else{
      $rootScope.candidatename=$rootScope.candidatename;
    }


   $rootScope.Coachmark_id=2;
   localStorage.setItem("coachmark",$rootScope.Coachmark_id);  

  $scope.SalarySliderEnd = function() {
    /*$ionicLoading.show({
       content: 'Loading',
       animation: 'fade-in',
       showBackdrop: true,
       maxWidth: 200,
       showDelay: 0
    });*/
    $rootScope.SalaryValue=$scope.salarySlider.min*2080;
    $scope.annual=Math.round($scope.salarySlider.min*2080);
    $scope.HoulyBill=$scope.salarySlider.min*100/$rootScope.adjRate;
    /*if($rootScope.adjRate == 0 || $rootScope.adjRate == null || $rootScope.adjRate == "" || $rootScope.adjRate == undefined){
      $scope.billrateSlider.min=0; 
    }else{
      $scope.billrateSlider.min=($scope.hour/$rootScope.adjRate)*100;
    }*/
    $rootScope.doRefresh();   
  };

  

  $scope.PerdiemSliderEnd = function() {
    /*$ionicLoading.show({
       content: 'Loading',
       animation: 'fade-in',
       showBackdrop: true,
       maxWidth: 200,
       showDelay: 0
    });*/
    $rootScope.perdiemValue=$scope.perdiemSlider.min;
    $rootScope.doRefresh();   
  };


  $scope.perdiemEdit=function(values){
    $rootScope.perdiemValue=values;
    $rootScope.doRefresh();
  }

  $scope.billrateSliderEnd = function() {
    /*$ionicLoading.show({
       content: 'Loading',
       animation: 'fade-in',
       showBackdrop: true,
       maxWidth: 200,
       showDelay: 0
    });*/
    $rootScope.billrateValue=$scope.billrateSlider.min;
    if($rootScope.adjRate == 0 || $rootScope.adjRate == null || $rootScope.adjRate == "" || $rootScope.adjRate == undefined){
      $scope.hour=0;
      
    }else{
      $scope.hour=($rootScope.adjRate/100)*$scope.billrateSlider.min;
    }
    /*$scope.salarySlider.min = $scope.hour*2080;*/
    $scope.annualBillSalary=Math.round($scope.hour*2080);
    $rootScope.SalaryValue=$scope.hour*2080;
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
        /*ceil: 250000,*/
        ceil: $rootScope.adjRate,
        precision:2,
        step:0.01,
        showSelectionBar: true,
        onEnd: $scope.SalarySliderEnd
  };

  $scope.billrateSlider = {
        min: 0,
        /*max: 250000,*/
        floor: 0,
        ceil: 100,
        step: 0.1,
        precision: 1,
        showSelectionBar: true,
        onEnd: $scope.billrateSliderEnd
  };


  if($rootScope.salaryText != null){
          $scope.salarySlider = {
            min: $rootScope.salaryText,
            /*max: 250000,*/
            floor: 0,
            /*ceil: 250000,*/
            ceil: $rootScope.adjRate,
            precision:2,
            step:0.01,
            showSelectionBar: true,
            onEnd: $scope.SalarySliderEnd
          };     
  }
  $scope.annual=Math.round($scope.salarySlider.min*2080);
  $scope.HoulyBill=$scope.salarySlider.min*100/$rootScope.adjRate;
  if($rootScope.adjRate == 0 || $rootScope.adjRate == null || $rootScope.adjRate == "" || $rootScope.adjRate == undefined){
    $scope.bill=0;
    
  }else{
    $scope.bill=($scope.annual/$rootScope.adjRate)*100;
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
  
  if($rootScope.billrateText != null){
            $scope.billrateSlider = {
              min:$rootScope.billrateText,
              /*max: 100.5,*/
              floor: 0,
              ceil: 100,
              step: 0.1,
              precision: 1,
              showSelectionBar: true,
              onEnd: $scope.billrateSliderEnd
            }; 

     if($rootScope.adjRate == 0 || $rootScope.adjRate == null || $rootScope.adjRate == "" || $rootScope.adjRate == undefined){
        $scope.hour=0;
        
      }else{
        $scope.hour=($rootScope.adjRate/100)*$scope.billrateSlider.min;
      }
      /*$scope.salarySlider.min = $scope.hour*2080;*/
      $scope.annualBillSalary=Math.round($scope.hour*2080)
      $rootScope.SalaryValue=$scope.hour*2080;       
  }

  $scope.$watch('billrateSlider.min',function(data){      
     $rootScope.billrateText=data;       
  });

  angular.element(document).ready(function () {
    $scope.$broadcast('rzSliderForceRender');
  });
  
  $scope.salaryEdit=function(values){
      $rootScope.SalaryValue=values*2080;
      $scope.annual=values*2080;
      $scope.HoulyBill=$scope.salarySlider.min*100/$rootScope.adjRate;
      
      if($rootScope.adjRate == 0 || $rootScope.adjRate == null || $rootScope.adjRate == "" || $rootScope.adjRate == undefined){
        $scope.bill=0;
        
      }else{
        $scope.bill=($scope.hour/$rootScope.adjRate)*100;
      }
      
      $rootScope.doRefresh();   
  }


  $scope.billedit=function(values){
      $rootScope.billrateValue=values;
      
      if($rootScope.adjRate == 0 || $rootScope.adjRate == null || $rootScope.adjRate == "" || $rootScope.adjRate == undefined){
        $scope.hour=0;
        
      }else{
        $scope.hour=($rootScope.adjRate/100)*$rootScope.billrateValue;
      }
      /*$scope.salarySlider.min = $scope.hour*2080;*/
      $scope.annualBillSalary=Math.round($scope.hour*2080)
      $rootScope.SalaryValue=$scope.hour*2080;
      $rootScope.doRefresh();  
  }
  
  /* New Code Begins here*/
  
  if($rootScope.salaryhract == "Dollar" || $rootScope.salaryhract==undefined || $rootScope.salaryhract==null || $rootScope.salaryhract==""){
    $scope.salaryTab='Tab1';
    localStorage.setItem('Item',$scope.salaryTab)
  }else{
    $scope.salaryTab='Tab2';
    localStorage.setItem('Item',$scope.salaryTab)
  }

  if(localStorage.getItem('Item')=='Tab2'){
    $scope.dollar = false;
    $scope.billrate = true;
    $rootScope.salaryhract = "% Bill Rate";
    if($rootScope.adjRate == 0 || $rootScope.adjRate == null || $rootScope.adjRate == "" || $rootScope.adjRate == undefined){
      $scope.hour=0;
    }else{
      $scope.hour=($rootScope.adjRate/100)*$scope.billrateSlider.min;
    }
    $scope.annualBillSalary=Math.round($scope.hour*2080)
    $rootScope.SalaryValue=$scope.hour*2080;
  }else{
    $scope.dollar = true;
    $scope.billrate = false;
    $rootScope.salaryhract = "Dollar";
    $scope.hour=$scope.salarySlider.min*2080;
    $rootScope.SalaryValue=$scope.salarySlider.min*2080;
  }
  $scope.New_Values=1;
  $scope.dollarButton = function() {
    $scope.dollar = true;
    $scope.billrate = false;
    $scope.salaryTab='Tab1';
    localStorage.setItem('Item',$scope.salaryTab)
    $rootScope.salaryhract = "Dollar";
    $scope.hour=$scope.salarySlider.min*2080;
    $rootScope.SalaryValue=$scope.salarySlider.min*2080;
    angular.element(document).ready(function () {
     $scope.$broadcast('rzSliderForceRender');
    });
    $rootScope.doRefresh();
  }

  $scope.billrateButton = function() {
    $scope.dollar = false;
    $scope.billrate = true;
    $scope.salaryTab='Tab2';
    localStorage.setItem('Item',$scope.salaryTab)
    $rootScope.salaryhract = "% Bill Rate"; 
    if($rootScope.adjRate == 0 || $rootScope.adjRate == null || $rootScope.adjRate == "" || $rootScope.adjRate == undefined){
      $scope.hour=0;
    }else{
      $scope.hour=($rootScope.adjRate/100)*$scope.billrateSlider.min;
    }
    $scope.annualBillSalary=Math.round($scope.hour*2080)
    $rootScope.SalaryValue=$scope.hour*2080;
    angular.element(document).ready(function () {
     $scope.$broadcast('rzSliderForceRender');
    });
    $rootScope.doRefresh();
  }

})





.directive('autosize', function($document) {
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