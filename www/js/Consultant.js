angular.module('Consultant', [])

.controller('ConsultantCtrl', function($scope, $state, $http, $rootScope, $timeout, $ionicLoading, $ionicPopup) {

  /*This is used to billrate and clinetfee value is empty or not?*/
  if($rootScope.cons != undefined) {
    $rootScope.cons.bill_rate = $rootScope.cons.bill_rate;
    $rootScope.cons.client_fee = $rootScope.cons.client_fee;
  }
  else {
    $rootScope.cons = {
      bill_rate: '',
      client_fee: ''
    }
  }

  /*This condition used to adjusted rate value empty or not? in footer*/
  if ($rootScope.adjRate == "" || $rootScope.adjRate == 0 || $rootScope.adjRate == undefined || $rootScope.adjRate == null) {
    $rootScope.adjRate = 0;
  }

  /*This condition used to margin percentage value empty or not? in footer*/
  if ($rootScope.marginPercentage == "" || $rootScope.marginPercentage == undefined || $rootScope.marginPercentage == null || $rootScope.marginPercentage == 0) {
    $rootScope.marginPercentage = 0;
  }

  /*This condition used to margin dollar value empty or not? in footer*/
  if ($rootScope.marginDollar == "" || $rootScope.marginDollar == undefined || $rootScope.marginDollar == null || $rootScope.marginDollar == 0) {
    $rootScope.marginDollar = 0;
  }

  /*This is used guide for app by using coach marks */
  if (localStorage.getItem('coachmark') != 2 || localStorage.getItem('coachmark') == null) {
    var demoId = 1;
    $rootScope.Coachmark_id = 1;
    localStorage.setItem("coachmark", $rootScope.Coachmark_id);
  }

  switch (demoId) {
    case 1:
      if ($rootScope.active == true) {
        $rootScope.active = true;
        $rootScope.check_values = 'true';
        localStorage.setItem("checkbox", $rootScope.check_values);
        $rootScope.Coachmark_id = 2;
        localStorage.setItem("coachmark", $rootScope.Coachmark_id);
      } else if ($rootScope.active == false) {
        $rootScope.active = false;
        $rootScope.check_values = 'all';
        localStorage.setItem("checkbox", $rootScope.check_values);
        $scope.demoActive1 = true;
        $rootScope.Coachmark_id = 1;
        localStorage.setItem("coachmark", $rootScope.Coachmark_id);
      } else {
        $scope.demoActive1 = true;
        $rootScope.Coachmark_id = 1;
        localStorage.setItem("coachmark", $rootScope.Coachmark_id);
      }
      break;
  }



  /*This is common function in all pages with connect backend*/
  $rootScope.doRefresh = function() {
    var data = {
      "cost_calc": {
        "company_id": $rootScope.company_Details.id,
        "salary": $rootScope.SalaryValue,
        "bill_rate": $rootScope.cons.bill_rate,
        "client_fee": $rootScope.cons.client_fee,
        "visa_status": $rootScope.visaStateValue,
        "payment_term": $rootScope.netTerm,
        "pto_hours": $rootScope.New_Hrs_Values,
        "state": $rootScope.relocation_value,
        "relocation": $rootScope.reLocationValue,
        "medical": $rootScope.medicalvalue,
        "dental": $rootScope.dentalvalue,
        "per_diem": $rootScope.perdiemValue,
        "corporate_insurance": $rootScope.OverAllData[0].corporate_insurance,
        "finance_charge": $rootScope.OverAllData[0].financial_insurance,
        "company_id": $rootScope.company_Details.id,
        "misc": $rootScope.misc
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
      $scope.margin_values = response.data;
      $rootScope.adjRate = $scope.margin_values.adjusted_rate;
      $rootScope.marginPercentage = $scope.margin_values.margin_percent;
      $rootScope.marginDollar = $scope.margin_values.margin_rate;

      if ($rootScope.adjRate == "" || $rootScope.adjRate == 0) {
        $rootScope.adjRate = 0;
      }
      if ($rootScope.marginPercentage == "" || $rootScope.marginPercentage == undefined) {
        $rootScope.marginPercentage = 0;
      }
      if ($rootScope.marginDollar == "" || $rootScope.marginDollar == undefined) {
        $rootScope.marginDollar = 0;
      }

      $timeout(function() {
        $scope.$broadcast('scroll.refreshComplete');
      }, 2000);
    })
  }


  /*This is  checked into lcamin value empty or not?*/

  if ($rootScope.lcamin != "") {
    $rootScope.lcamin = $rootScope.lcamin
  } else {
    $rootScope.lcamin = ""
  }

  /*This is  defocus function using Consultant LCAmin value*/
  $scope.LcaMinChange = function(name) {
    $rootScope.lcamin = name;
  }

  /*This is declaration and using Location value*/
  if ($rootScope.locationval != "") {
    $rootScope.locationval = $rootScope.locationval
  } else {
    $rootScope.locationval = ""
  }

  /*This is  defocus function using Consultant Location value*/
  $scope.LocationChange = function(name) {
    $rootScope.locationval = name;
  }

  /*This is  defocus function using Consultant billrate value*/
  $scope.billvalues = function(values) {
    $rootScope.bill_rate = values;
    $rootScope.doRefresh();
  }

  /*This is  defocus function using Consultant Client_fee value*/
  $scope.clientvalues = function(values) {
    $rootScope.doRefresh();
    $rootScope.client_fee = values;
  }

  /*This condition used to Consultant name in top of all page */
  if($rootScope.consultant == undefined && $rootScope.consultant == null && $rootScope.consultant == "") {
    $rootScope.consultant = "";
  }
  else if($rootScope.candidatename == "Consultant Name") {
    $rootScope.consultant = "";
  }
  else {
    $rootScope.consultant = $rootScope.candidatename;
  }

  /*This is  defocus function using Consultant Consultant name*/
  $scope.namevalues = function(values) {
    $rootScope.candidatename = values;
  }

  /*This is checked into visname empty or not?*/
  if($rootScope.visvalue != null) {
    $scope.visaname = $rootScope.visvalue;
  }
  else {
    $scope.visaname = " Select Visa Status"
  }

  /*This is used to Visa page to select a new visa name*/  
  $scope.visa = function() {
    $rootScope.Coachmark_id = 2;
    localStorage.setItem("coachmark", $rootScope.Coachmark_id);
    $state.go("visaStatus")
  }
  
  /*This is cheked into Payment term value*/
  if ($rootScope.netval != null) {
    $scope.netValue = $rootScope.netval
  }
  else{
    $scope.netValue = 'Select Payment Term'
  }

  /*This is used payment term value in sect another page*/
  $scope.selectNet = function() {
    $rootScope.Coachmark_id = 2;
    localStorage.setItem("coachmark", $rootScope.Coachmark_id);
    $state.go('net')
  }


})



.controller('NetCtrl', function($scope, $state, $http, $rootScope, $ionicLoading, $timeout) {

  /*This is used to new payment term value select*/
  $scope.backNet = function(netvalue) {
    $rootScope.netval = netvalue;
    var splitTerm = netvalue.split("-")
    $rootScope.netTerm = splitTerm[1]
    $rootScope.doRefresh();
    $state.go('tab.consultant')
  }

})