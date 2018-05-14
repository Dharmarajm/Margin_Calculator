angular.module('Summary', [])

.controller('SummaryCtrl', function($scope,$state,$http,$rootScope,$timeout,$ionicLoading,$ionicPopup) {

  /*$scope.email = function() {
    alert("Cost Summary for James is send to your email.")
    $state.go("dashboard")
  }*/
       /*if($rootScope.billrateText != null){
          if($rootScope.adjRate == 0 || $rootScope.adjRate == null || $rootScope.adjRate == "" || $rootScope.adjRate == undefined){
              $scope.hour=0;
            }else{
              $scope.hour=($rootScope.adjRate/100)*$rootScope.billrateText;
            }
            $rootScope.SalaryValue=$scope.hour*2080; 
       }
       if($rootScope.salaryText != null){
         $scope.hour=$rootScope.salaryText/2080;
        if($rootScope.adjRate == 0 || $rootScope.adjRate == null || $rootScope.adjRate == "" || $rootScope.adjRate == undefined){
          $scope.bill=0;
          
        }else{
          $scope.bill=($scope.hour/$rootScope.adjRate)*100;
        }
       }*/
     

$scope.recruiter=$rootScope.recruiters_Details.first_name;

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

   $rootScope.Coachmark_id=2;
   localStorage.setItem("coachmark",$rootScope.Coachmark_id);  
  
  if($rootScope.OverAllData[0].corporate_insurance == null || $rootScope.OverAllData[0].corporate_insurance == undefined || $rootScope.OverAllData[0].corporate_insurance ==""){
    $scope.corporateInsurance = 0 ;
  }
  else{
   $scope.corporateInsurance=$rootScope.OverAllData[0].corporate_insurance
  } 

  if($rootScope.OverAllData[0].financial_insurance == null || $rootScope.OverAllData[0].financial_insurance == undefined || $rootScope.OverAllData[0].financial_insurance ==""){
    $scope.financialInsurance = 0 ;
  }
  else{
   $scope.financialInsurance=$rootScope.OverAllData[0].financial_insurance;
  }     

       var data ={
      "cost_calc":
        {
          "company_id":$rootScope.company_Details.id,
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
          "corporate_insurance":$scope.corporateInsurance,
          "finance_charge":$scope.financialInsurance,
          "company_id":$rootScope.company_Details.id,
          "misc":$rootScope.misc
        }
      }
      
      $ionicLoading.show({
       content: 'Loading',
       animation: 'fade-in',
       showBackdrop: true,
       maxWidth: 200,
       showDelay: 0
      });

      $http({
        method: 'post',
        url: CommonURL + '/recruiters/cost_calc',
        data: data
      }).then(function(response) {
            $timeout(function() {
             $ionicLoading.hide();
            });
            $scope.summary=response.data;    
      },function(error){
        $timeout(function() {
         $ionicLoading.hide();
        });
        $scope.alertSumInt=$ionicPopup.alert({
          title: 'MARGINO',
          template: '<center>Failed to connect Server</center>'
        })
      })



      $scope.email=function(){

        if($rootScope.OverAllData[0].desired_margin == null || $rootScope.OverAllData[0].desired_margin == undefined || $rootScope.OverAllData[0].desired_margin== ""){
          $scope.desired_margin_percent=0

        }
        else{
          $scope.desired_margin_percent=$rootScope.OverAllData[0].desired_margin.desired_margin_percent;
        }

        if($rootScope.dentalname == null || $rootScope.dentalname==undefined || $rootScope.dentalname==""){
          $scope.dental_employee_contribution = 0;
        }
        else{
         $scope.dental_employee_contribution = $rootScope.OverAllData[0].dental_employee[$rootScope.dentalname]
        }

        if($rootScope.medicalname == null || $rootScope.medicalname==undefined || $rootScope.medicalname==""){
          $scope.medical_employee_contribution = 0;
        }
        else{
         $scope.medical_employee_contribution = $rootScope.OverAllData[0].medical_employee[$rootScope.medicalname]
        }

       
            $ionicLoading.show({
               content: 'Loading',
               animation: 'fade-in',
               showBackdrop: true,
               maxWidth: 200,
               showDelay: 0
            });
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
                      "medical_employee_contribution":$scope.medical_employee_contribution,
                      "dental_employee_contribution":$scope.dental_employee_contribution,
                      "company_name":$rootScope.company_Details.company_name,
                      "recruiter_name":$rootScope.recruiters_Details.first_name,
                      "recruiter_id":$rootScope.recruiters_Details.id,
                      "company_id":$rootScope.company_Details.id,
                      "corporate_insurance":$scope.corporateInsurance,
                      "finance_charge":$scope.financialInsurance,
                      "misc":$rootScope.misc,
                      "cost_recovery_month":$scope.summary.recovery_month,
                      "margin_rate":$scope.summary.margin_rate,
                      "margin_percent":$scope.summary.margin_percent,
                      "desired_margin_percent":$scope.desired_margin_percent,
                      "desired_margin_rate":$scope.summary.desired_margin,
                      "total":$scope.summary.total,
                      "location":$rootScope.relocation_name,
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
                  $rootScope.active_values="Standard"
                  $rootScope.ptovalue="";
                  $rootScope.ptoname=null;
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
                  $rootScope.billrateText=null;
                  $rootScope.salaryhract = "Dollar";
                  localStorage.removeItem('Item');
                  localStorage.removeItem('pto');
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
                      }       
                },function(error){
                    $timeout(function() {
                     $ionicLoading.hide();
                    });
                    $scope.sumalert=$ionicPopup.alert({
                      title: 'MARGINO',
                      template: '<center>Failed to connect Server</center>'
                    })
                })
      }      
	
})
      



