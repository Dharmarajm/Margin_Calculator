angular.module('Summary', [])

.controller('SummaryCtrl', function($scope,$state,$http,$rootScope,$timeout) {

  /*$scope.email = function() {
    alert("Cost Summary for James is send to your email.")
    $state.go("dashboard")
  }*/


/*  $rootScope.bill_rate=0;
  $rootScope.client_fee=0;*/
  
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
            var data ={
                "cost_calc_email":{
                      "candidate_name":$rootScope.candidatename,
                      "salary":$rootScope.SalaryValue,
                      "PTO":$rootScope.ptoHrs,
                      "per_diem":$rootScope.perdiemValue,
                      "adjusted_rate":$scope.summary.adjusted_rate,
                      "visa_status":$rootScope.visaStateValue,
                      "medicalanddental":$scope.summary.med_den,
                      "state":$rootScope.visaStateValue,
                      "relocation":$rootScope.reLocationValue,
                      "medical_and_dental_employer_contribution":$rootScope.OverAllData[0].medical_employee[$rootScope.medicalname]+$rootScope.OverAllData[0].medical_employee[$rootScope.dentalname],
                      "company_name":$rootScope.company_Details.company_name,
                      "recruiter_name":$rootScope.recruiters_Details.contact_first_name,
                      "recruiter_id":$rootScope.recruiters_Details.id,
                      "company_id":$rootScope.company_Details.id,
                      "corporate_insurance":$rootScope.OverAllData[0].corporate_insurance,
                      "finance_charge":$rootScope.OverAllData[0].financial_insurance,
                      "misc":$rootScope.misc,
                      "cost_recovery_month":$scope.summary.recovery_month,
                      "margin_rate":$scope.summary.margin_rate,
                      "margin_percent":$scope.summary.margin_percent,
                      "desired_margin_percent":$rootScope.OverAllData.desired_margin,
                      "location":$rootScope.locationval,
                      "federal_tax":$scope.summary.federal_taxes
                  }
                }
                $http({
                  method: 'post',
                  url: CommonURL + '/recruiters/cost_calc_email',
                  data: data
                }).then(function(response) {
                      $scope.email=response.data;   
                      if($scope.email == true){
                        alert("Cost Summary for "+$rootScope.candidatename+" is send to your email.")
                        $state.go("dashboard")
                      }       
                })
      }      
	
})
