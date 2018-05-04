angular.module('Login', [])

.controller('LoginCtrl', function($state,$scope,$http,$rootScope,$ionicPopup,$ionicPopup,$ionicPlatform,$cordovaDevice,$ionicLoading,$timeout) {

  /*$ionicPlatform.ready(function() {
    
      var device = $cordovaDevice.getDevice();
      $scope.uuid = device.uuid;
      $scope.$apply();
  });*/

   document.addEventListener("deviceready", function () {

    var device = $cordovaDevice.getDevice();

    $scope.uuid = $cordovaDevice.getUUID();

   }, false);

  /*$scope.uuid="1234"*/

  /*This is used to variable declaration using login page*/
  $scope.user = {
    email: '',
    password: ''
  }

  /*Click the login button to call the method  and check the response */
  $scope.login = function() {
    $ionicLoading.show({
      content: 'Loading',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });
    /*$state.go('dashboard');*/
    var data = {
      "email": $scope.user.email,
      "password": $scope.user.password,
      "device_id":$scope.uuid
    };

    $http({
      method: 'post',
      url: CommonURL + '/recruiters/login',
      data: data
    }).then(function(response) {
      $timeout(function() {
        $ionicLoading.hide();
      });
      if(response.data != false){
        $rootScope.company_Details=response.data.company;
        $rootScope.recruiters_Details=response.data.recruiter;
        $state.go('dashboard');
      }else if (response.data.login == 'Disable'){
        var alertPopup = $ionicPopup.alert({
          title: "MARGINO",
          content: "Please contact your employer to activate your account"
        })  
      }
      else{
        var alertPopup = $ionicPopup.alert({
          title: "MARGINO",
          content: "Username or password is invalid"
        })        
        //$scope.user.email="";
        $scope.user.password="";
      }
      
    })

  }

  $scope.forgot=function(){
    if($scope.user.email == ""){
      var alertPopup = $ionicPopup.alert({
          title: "MARGINO",
          content: "Please enter email id"
        })
    }
    else{
      $ionicLoading.show({
       content: 'Loading',
       animation: 'fade-in',
       showBackdrop: true,
       maxWidth: 200,
       showDelay: 0
      });
      var data = {
        "email": $scope.user.email,
        "device_id":$scope.uuid
      };

      $http({
        method: 'post',
        url: CommonURL + '/recruiters/forget_password',
        data: data
      }).then(function(response) {
        $timeout(function() {
         $ionicLoading.hide();
        });
        if(response.data.result == "Invalid User"){
          var alertPopup = $ionicPopup.alert({
          title: "MARGINO",
          content: "Please enter valid email"
        })
        }
        else if(response.data.result == false){
          var alertPopup = $ionicPopup.alert({
          title: "MARGINO",
          content: "Please check your mail for registering the app on this device"
        })
          $state.go("register")
        }
        else{
          $rootScope.new_mail = $scope.user.email;
          $state.go("forgotPassword");
          
        }
        
      })
    }
  }

  /*To click the logout button using All pages and redirect to Login*/
    $scope.logout = function() {

        var confirmPopup = $ionicPopup.confirm({
            title: 'Exit MARGINO?',
            template: 'Are you sure want to logout?',
            buttons : [{
              text : 'Cancel',
              type : 'button-danger',
              }, {
              text : 'Ok',
              type : 'button-positive',
                onTap : function() {
                  //localStorage.clear();
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

                  $state.go('login');                             
                }
            }]
        })
    }

})

.controller('forgotCtrl',function($state,$http,$rootScope,$scope){
  $scope.forget={mail_id:$rootScope.new_mail,password:''}
  $scope.save=function(){
    $ionicLoading.show({
       content: 'Loading',
       animation: 'fade-in',
       showBackdrop: true,
       maxWidth: 200,
       showDelay: 0
    });

    var data = {
      "email": $scope.forget.mail_id,
      "new_password":$scope.forget.password
    };

    $http({
      method: 'post',
      url: CommonURL + '/recruiters/new_password_update',
      data: data
    }).then(function(response) {
      $timeout(function() {
        $ionicLoading.hide();
      });
      $state.go("login")
    })
  }
})