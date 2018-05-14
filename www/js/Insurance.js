angular.module('Insurance', [])

.controller('InsuranceCtrl', function($scope,$state,$http,$rootScope,$ionicLoading,$timeout) {


    if($rootScope.candidatename == "Consultant Name" ||  $rootScope.candidatename == undefined || $rootScope.candidatename == null || $rootScope.candidatename == ""){  
      $rootScope.candidatename="Consultant Name"; 
    }
    else{
      $rootScope.candidatename=$rootScope.candidatename;
    }

    $rootScope.Coachmark_id=2;
   localStorage.setItem("coachmark",$rootScope.Coachmark_id);  
       

   if($rootScope.OverAllData[0].medical_employer== null || $rootScope.OverAllData[0].medical_employer == undefined || $rootScope.OverAllData[0].medical_employer == ""){
     $scope.medical= {single:0,couple:0,family:0,eandc:0}
   }
   else{
    $scope.medical = $rootScope.OverAllData[0].medical_employer;
   }

   if($rootScope.OverAllData[0].dental_employer == null || $rootScope.OverAllData[0].dental_employer == undefined || $rootScope.OverAllData[0].dental_employer ==""){
     $scope.dental={single:0,couple:0,family:0,eandc:0}
   }
   else{
    $scope.dental = $rootScope.OverAllData[0].dental_employer;
   }
	
  if($rootScope.medicalname == null || $rootScope.medicalname ==undefined){
    $scope.med_emp_contribution=0;
  }
  else{
    $scope.med_emp_contribution=$rootScope.OverAllData[0].medical_employee[$rootScope.medicalname]
  }
  if($rootScope.dentalname == null || $rootScope.dentalname == undefined){
    $scope.den_emp_contribution=0
  }
  else{
    $scope.den_emp_contribution=$rootScope.OverAllData[0].medical_employee[$rootScope.dentalname]
  }
	$scope.medicalButton=function(medical,name){
	 /*$ionicLoading.show({
        content: 'Loading',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
     });*/
     $rootScope.medicalvalue=medical;
     $rootScope.medicalname=name;
     $scope.med_emp_contribution=$rootScope.OverAllData[0].medical_employee[$rootScope.medicalname]
     $rootScope.doRefresh();
	}

  $scope.dentalButton=function(dental,name){
    /*$ionicLoading.show({
        content: 'Loading',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
     });*/
    $rootScope.dentalvalue=dental;  
    $rootScope.dentalname=name;
    $scope.den_emp_contribution=$rootScope.OverAllData[0].medical_employee[$rootScope.dentalname]
    $rootScope.doRefresh();   
  }


  if($rootScope.dentalname != null){
    if($rootScope.dentalname == 'single'){
     $scope.checked1=true;
    }
    if($rootScope.dentalname == 'couple'){
     $scope.checked2=true;
    }
    if($rootScope.dentalname == 'family'){
     $scope.checked3=true;
    }
    if($rootScope.dentalname == 'eandc'){
     $scope.checked4=true;
    }
    if($rootScope.dentalname == 'none'){
     $scope.checked5=true;
    }    
  }


  if($rootScope.medicalname != null){
    if($rootScope.medicalname == 'single'){
     $scope.checked11=true;
    }
    if($rootScope.medicalname == 'couple'){
     $scope.checked22=true;
    }
    if($rootScope.medicalname == 'family'){
     $scope.checked33=true;
    }
    if($rootScope.medicalname == 'eandc'){
     $scope.checked44=true;
    }
    if($rootScope.medicalname == 'none'){
     $scope.checked55=true;
    }    
  }

})