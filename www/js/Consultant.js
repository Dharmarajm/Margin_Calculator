angular.module('Consultant', [])

.controller('ConsultantCtrl', function($scope,$state,$http,$rootScope,$timeout,$ionicLoading,$ionicPopup) {

/*if($rootScope.cons.bill_rate != "" || $rootScope.cons.client_fee != "" && $rootScope.cons.bill_rate !=undefined || $rootScope.cons.client_fee != undefined){
  $rootScope.cons.bill_rate=$rootScope.cons.bill_rate;
  $rootScope.cons.client_fee=$rootScope.cons.client_fee;
}
else{
  $rootScope.cons={bill_rate:'',client_fee:''}  
}*/

if($rootScope.cons != undefined){
   $rootScope.cons.bill_rate=$rootScope.cons.bill_rate;
  $rootScope.cons.client_fee=$rootScope.cons.client_fee;
}else{
  $rootScope.cons={bill_rate:'',client_fee:''}  
}
 
  if($rootScope.adjRate == "" || $rootScope.adjRate == 0 || $rootScope.adjRate==undefined || $rootScope.adjRate==null){
    $rootScope.adjRate=0;
  }
  if($rootScope.marginPercentage == "" || $rootScope.marginPercentage == undefined || $rootScope.marginPercentage == null || $rootScope.marginPercentage==0){
    $rootScope.marginPercentage=0;
  }
  if($rootScope.marginDollar =="" || $rootScope.marginDollar == undefined || $rootScope.marginDollar == null || $rootScope.marginDollar==0){
    $rootScope.marginDollar=0;
  }

  
    if(localStorage.getItem('coachmark') != 2 || localStorage.getItem('coachmark') == null){
      var demoId=1;
      $rootScope.Coachmark_id=1;
      localStorage.setItem("coachmark",$rootScope.Coachmark_id);
    }
    switch (demoId){      
          case 1:  
            if($rootScope.active == true){
                  $rootScope.active=true;
                  $rootScope.check_values='true';
                  localStorage.setItem("checkbox",$rootScope.check_values);      
                  $rootScope.Coachmark_id=2;
                  localStorage.setItem("coachmark",$rootScope.Coachmark_id);      
            }else if($rootScope.active == false){
                  $rootScope.active=false;
                  $rootScope.check_values='all';
                  localStorage.setItem("checkbox",$rootScope.check_values);
                  $scope.demoActive1 = true;      
                  $rootScope.Coachmark_id=1;
                  localStorage.setItem("coachmark",$rootScope.Coachmark_id);      
            }else{          
                  $scope.demoActive1 = true;      
                  $rootScope.Coachmark_id=1;
                  localStorage.setItem("coachmark",$rootScope.Coachmark_id);           
            }
            break; 
        }


        

 $rootScope.doRefresh =function() {
       var data ={
      "cost_calc":
        {
        "company_id":$rootScope.company_Details.id, 
        "salary":$rootScope.SalaryValue,
        "bill_rate":$rootScope.cons.bill_rate,
        "client_fee":$rootScope.cons.client_fee,
        "visa_status":$rootScope.visaStateValue,
        "payment_term":$rootScope.netTerm,
        "pto_hours":$rootScope.New_Hrs_Values,
        "state": $rootScope.relocation_value,
        "relocation":$rootScope.reLocationValue,
        "medical":$rootScope.medicalvalue,
        "dental":$rootScope.dentalvalue,
        "per_diem":$rootScope.perdiemValue,
        "corporate_insurance":$rootScope.OverAllData[0].corporate_insurance,
        "finance_charge":$rootScope.OverAllData[0].financial_insurance,
        "company_id":$rootScope.company_Details.id,
        "misc":$rootScope.misc
        }
      }
      $http({
        method: 'post',
        url: CommonURL + '/recruiters/margin_calc',
        data: data
      }).then(function(response) {
          /*$timeout(function() {
           $ionicLoading.hide();
          });*/
            $scope.margin_values=response.data;
            $rootScope.adjRate = $scope.margin_values.adjusted_rate;           
            $rootScope.marginPercentage=$scope.margin_values.margin_percent;
            $rootScope.marginDollar=$scope.margin_values.margin_rate;
  
            if($rootScope.adjRate == "" || $rootScope.adjRate == 0){
              $rootScope.adjRate=0;
            }
            if($rootScope.marginPercentage == "" || $rootScope.marginPercentage == undefined){
              $rootScope.marginPercentage=0;
            }
            if($rootScope.marginDollar =="" || $rootScope.marginDollar == undefined){
              $rootScope.marginDollar=0;
            }

           $timeout(function() {
              $scope.$broadcast('scroll.refreshComplete');
            }, 2000);
      },function(error){
        $rootScope.sumalert=$ionicPopup.alert({
          title: 'MARGINO',
          template: '<center>Failed to connect Server</center>'
        })
      })      
  }

if($rootScope.lcamin != ""){
  $rootScope.lcamin = $rootScope.lcamin 
}
else{
$rootScope.lcamin=""  
}
$scope.LcaMinChange=function(name){
 $rootScope.lcamin=name; 
}
if($rootScope.locationval != ""){
  $rootScope.locationval = $rootScope.locationval 
}
else{
$rootScope.locationval=""  
}

$scope.LocationChange=function(name){
 $rootScope.locationval=name; 
}
$scope.billvalues=function(values){
 /*if(values!='' && values!=null && values!=undefined){*/
   /*$ionicLoading.show({
       content: 'Loading',
       animation: 'fade-in',
       showBackdrop: true,
       maxWidth: 200,
       showDelay: 0
  });*/
  $rootScope.bill_rate=values;
  $rootScope.doRefresh();
 }

$scope.clientvalues=function(values){
 /*if(values!='' && values!=null && values!=undefined){ */
  /*$ionicLoading.show({
       content: 'Loading',
       animation: 'fade-in',
       showBackdrop: true,
       maxWidth: 200,
       showDelay: 0
  });*/
  $rootScope.doRefresh();
  $rootScope.client_fee=values;
  
}

if($rootScope.consultant == undefined && $rootScope.consultant == null && $rootScope.consultant == ""){  
  $rootScope.consultant=""; 
}else if($rootScope.candidatename == "Consultant Name"){
 $rootScope.consultant=""; 
}else{
 $rootScope.consultant=$rootScope.candidatename;
}

$scope.namevalues=function(values){
  //$rootScope.doRefresh();
  $rootScope.candidatename=values;
}

 
 if($rootScope.visvalue!=null ){
  $scope.visaname = $rootScope.visvalue;
 }else{
  $scope.visaname = " Select Visa Status" 
 }
 
  $scope.visa = function() {
    $rootScope.Coachmark_id=2;
    localStorage.setItem("coachmark",$rootScope.Coachmark_id);     
    $state.go("visaStatus")
  }
  if($rootScope.netval != null){
    $scope.netValue = $rootScope.netval
  }else{
    $scope.netValue='Select Payment Term'
  }
  $scope.selectNet=function(){
     $rootScope.Coachmark_id=2;
    localStorage.setItem("coachmark",$rootScope.Coachmark_id);
  	$state.go('net')
  }


  
  
 /* $scope.AllSave=function(){
    var data ={
    "cost_calc":
      {
      "bill_rate":$scope.cons.bill_rate,
      "client_fee":$scope.cons.client_fee,
      "visa_status":$rootScope.visaStateValue,
      "payment_term":$rootScope.netTerm,
      "pto_hours":$rootScope.ptoHrs,
      "state":$rootScope.visaStateValue,
      "relocation":$rootScope.reLocationValue,
      "medical":$rootScope.medicalvalue,
      "dental":$rootScope.dentalvalue,
      "misc":$rootScope.misc
      }
    }
    $http({
      method: 'post',
      url: CommonURL + '/recruiters/cost_calc',
      data: data
    }).then(function(response) {
      alert("Successfully")
    })

  }*/
})



.controller('NetCtrl',function($scope,$state,$http,$rootScope,$ionicLoading,$timeout) {
	

  $scope.backNet=function(netvalue){
    /*$ionicLoading.show({
       content: 'Loading',
       animation: 'fade-in',
       showBackdrop: true,
       maxWidth: 200,
       showDelay: 0
    });*/
    $rootScope.netval=netvalue;
    var splitTerm=netvalue.split("-")
    $rootScope.netTerm=splitTerm[1]
    $rootScope.doRefresh();
    	  $state.go('tab.consultant')
	}

})
