angular.module('Summary', [])

.controller('SummaryCtrl', function($scope,$state,$http,$rootScope,$timeout,$ionicLoading,$ionicPopup) {

  /*$scope.email = function() {
    alert("Cost Summary for James is send to your email.")
    $state.go("dashboard")
  }*/


/*  $rootScope.bill_rate=0;
  $rootScope.client_fee=0;*/


      
    if($rootScope.candidatename == "Consultant Name" ||  $rootScope.candidatename == undefined || $rootScope.candidatename == null || $rootScope.candidatename == ""){  
      $rootScope.candidatename="Consultant Name"; 
    }
    else{
      $rootScope.candidatename=$rootScope.candidatename;
    }
  
  if($rootScope.cons != undefined){
    $rootScope.cons.bill_rate=$rootScope.cons.bill_rate;
    $rootScope.cons.client_fee=$rootScope.cons.client_fee;
  }else{
    $rootScope.cons={bill_rate:'',client_fee:''}  
  }

       var data ={
      "cost_calc":
        {
          "salary":$rootScope.SalaryValue,
          "bill_rate":$rootScope.cons.bill_rate,
          "client_fee":$rootScope.cons.client_fee,
          "visa_status":$rootScope.visaStateValue,
          "payment_term":$rootScope.netTerm,
          "pto_hours":$rootScope.ptoHrs,
          "state":$rootScope.relocation_value,
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
        url: CommonURL + '/recruiters/cost_calc',
        data: data
      }).then(function(response) {
            $scope.summary=response.data;    
      })



      $scope.email=function(){
            $ionicLoading.show({
               content: 'Loading',
               animation: 'fade-in',
               showBackdrop: true,
               maxWidth: 200,
               showDelay: 0
            });
            console.log($rootScope.OverAllData[0])  
            var data ={
                "cost_calc_email":{
                      "candidate_name":$rootScope.candidatename,
                      "salary":$scope.summary.salary,
                      "PTO":$scope.summary.pto,
                      "per_diem":$scope.summary.perdiem,
                      "adjusted_rate":$scope.summary.adjusted_rate,
                      "visa_status":$scope.summary.visa,
                      "medicalanddental":$scope.summary.med_den,
                      "state":$scope.summary.state_tax,
                      "relocation":$scope.summary.relo,
                      "medical_employee_contribution":$rootScope.OverAllData[0].medical_employee[$rootScope.medicalname],
                      "cental_employee_contribution":$rootScope.OverAllData[0].medical_employee[$rootScope.dentalname],
                      "company_name":$rootScope.company_Details.company_name,
                      "recruiter_name":$rootScope.recruiters_Details.first_name,
                      "recruiter_id":$rootScope.recruiters_Details.id,
                      "company_id":$rootScope.company_Details.id,
                      "corporate_insurance":$rootScope.OverAllData[0].corporate_insurance,
                      "finance_charge":$rootScope.OverAllData[0].financial_insurance,
                      "misc":$rootScope.misc,
                      "cost_recovery_month":$scope.summary.recovery_month,
                      "margin_rate":$scope.summary.margin_rate,
                      "margin_percent":$scope.summary.margin_percent,
                      "desired_margin_percent":$rootScope.OverAllData[0].desired_margin.desired_margin_percent,
                      "desired_margin_rate":$scope.summary.desired_margin,
                      "total":$scope.summary.total,
                      "location":$rootScope.locationval,
                      "federal_tax":$scope.summary.federal_taxes
                  }
                }
                $http({
                  method: 'post',
                  url: CommonURL + '/recruiters/cost_calc_email',
                  data: data
                }).then(function(response) {
                  $timeout(function() {
                    $ionicLoading.hide();
                  });
                  $rootScope.SalaryValue="";
                  $rootScope.cons.bill_rate="";
                  $rootScope.cons.client_fee="";
                  $rootScope.consultant == null;
                  $rootScope.candidatename=null;
                  $rootScope.ptoHrs="";
                  $rootScope.relocation_value="";
                  $rootScope.reLocationValue="";
                  $rootScope.medicalvalue="";
                  $rootScope.dentalvalue="";
                  $rootScope.perdiemValue="";
                  $rootScope.netTerm="";
                  $rootScope.netValue="Select Payment Term";
                  $rootScope.netval=null;
                  $rootScope.visaStateValue="";
                  $rootScope.visaname="";
                  $rootScope.visvalue="Select Visa Status";
                  $rootScope.relocation_name=null;
                  $rootScope.reloadText=null;
                  $rootScope.dentalvalue="";
                  $rootScope.dentalname=null;
                  $rootScope.medicalname=null;
                  $rootScope.medicalvalue="";
                  $rootScope.reloadmisc=null;
                  $rootScope.misc=null;
                  $rootScope.salaryText=null;
                  $rootScope.perdiemText=null;
                  $rootScope.lcamin="";
                  $rootScope.locationval="";
                  $rootScope.otherDays=0;
                  $rootScope.adjRate=0;
                  $rootScope.marginPercentage=null;
                  $rootScope.marginDollar=null;
                  $rootScope.ptoText=null;
                  $rootScope.hour_total=0;
                  $rootScope.relocation_notes="";
                  $rootScope.miscdata="";
                  
                      $scope.email=response.data;   
                      if($scope.email == true){
                         var alertPopup = $ionicPopup.alert({
                            title: "Success",
                            content: "Cost Summary send to your email"
                          })  
                        $state.go("dashboard")
                      }       
                })
      }      
	
})
      



