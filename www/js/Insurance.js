angular.module('Insurance', [])

.controller('InsuranceCtrl', function($scope, $state, $http, $rootScope, $ionicLoading, $timeout) {

  /*This is used to top of the page in showin g consultant name*/
  if ($rootScope.candidatename == "Consultant Name" || $rootScope.candidatename == undefined || $rootScope.candidatename == null || $rootScope.candidatename == "") {
    $rootScope.candidatename = "Consultant Name";
  } else {
    $rootScope.candidatename = $rootScope.candidatename;
  }

  /*Coach mark value  set 2 its not showing in consultan page*/
  $rootScope.Coachmark_id = 2;
  localStorage.setItem("coachmark", $rootScope.Coachmark_id);

  /*This conditon used to Medical employer value defalut set zero or get database value*/
  if($rootScope.OverAllData[0].medical_employer == null || $rootScope.OverAllData[0].medical_employer == undefined || $rootScope.OverAllData[0].medical_employer == "") {
    $scope.medical = {
      single: 0,
      couple: 0,
      family: 0,
      eandc: 0
    }
  }
  else{
    $scope.medical = $rootScope.OverAllData[0].medical_employer;
  }

  /*This conditon used to dental employer value defalut set zero or get database value*/
  if($rootScope.OverAllData[0].dental_employer == null || $rootScope.OverAllData[0].dental_employer == undefined || $rootScope.OverAllData[0].dental_employer == "") {
    $scope.dental = {
      single: 0,
      couple: 0,
      family: 0,
      eandc: 0
    }
  }
  else{
    $scope.dental = $rootScope.OverAllData[0].dental_employer;
  }

  /*This conditon used to medical employee contribution value defalut set zero or get database value*/
  if($rootScope.medicalname == null || $rootScope.medicalname == undefined) {
    $scope.med_emp_contribution = 0;
  }
  else{
    $scope.med_emp_contribution = $rootScope.OverAllData[0].medical_employee[$rootScope.medicalname]
  }

  /*This conditon used to dental employee contribution value defalut set zero or get database value*/
  if($rootScope.dentalname == null || $rootScope.dentalname == undefined) {
    $scope.den_emp_contribution = 0
  }
  else {
    $scope.den_emp_contribution = $rootScope.OverAllData[0].medical_employee[$rootScope.dentalname]
  }

  /*To click the option the value passed in medical employer*/
  $scope.medicalButton = function(medical, name) {
    $rootScope.medicalvalue = medical;
    $rootScope.medicalname = name;
    $scope.med_emp_contribution = $rootScope.OverAllData[0].medical_employee[$rootScope.medicalname]
    $rootScope.doRefresh();
  }

  /*To click the option the value passed in dental employer*/
  $scope.dentalButton = function(dental, name) {
    $rootScope.dentalvalue = dental;
    $rootScope.dentalname = name;
    $scope.den_emp_contribution = $rootScope.OverAllData[0].medical_employee[$rootScope.dentalname]
    $rootScope.doRefresh();
  }

  /*This is used to dental option default checked condition*/
  if ($rootScope.dentalname != null) {
    if ($rootScope.dentalname == 'single') {
      $scope.checked1 = true;
    }
    if ($rootScope.dentalname == 'couple') {
      $scope.checked2 = true;
    }
    if ($rootScope.dentalname == 'family') {
      $scope.checked3 = true;
    }
    if ($rootScope.dentalname == 'eandc') {
      $scope.checked4 = true;
    }
    if ($rootScope.dentalname == 'none') {
      $scope.checked5 = true;
    }
  }

  /*This is used to medical option default checked condition*/
  if ($rootScope.medicalname != null) {
    if ($rootScope.medicalname == 'single') {
      $scope.checked11 = true;
    }
    if ($rootScope.medicalname == 'couple') {
      $scope.checked22 = true;
    }
    if ($rootScope.medicalname == 'family') {
      $scope.checked33 = true;
    }
    if ($rootScope.medicalname == 'eandc') {
      $scope.checked44 = true;
    }
    if ($rootScope.medicalname == 'none') {
      $scope.checked55 = true;
    }
  }

})