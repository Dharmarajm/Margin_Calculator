angular.module('Register', [])

.controller('RegisterCtrl', function($scope, $state, $http, $rootScope,$ionicPlatform,$cordovaDevice,$ionicPopup,$ionicLoading,$timeout) {


  /*$ionicPlatform.ready(function() {
    
      var device = $cordovaDevice.getDevice();
      $scope.uuid = device.uuid;
      $scope.$apply();
  });*/

  document.addEventListener("deviceready", function () {

    var device = $cordovaDevice.getDevice();

    $scope.uuid = $cordovaDevice.getUUID();

  }, false);
  
  
  $scope.reg = {
    email: '',
    active: '',
    password: '',
    confirm_password: ''
  }

 /* $scope.uuid="1234"*/
 
  $scope.register = function() {
    if ($scope.reg.password != $scope.reg.confirm_password) {
        var alertPopup = $ionicPopup.alert({
          title: "MARIGINO",
          content: "Passwords do not match"
        })  
    } else {
      $ionicLoading.show({
       content: 'Loading',
       animation: 'fade-in',
       showBackdrop: true,
       maxWidth: 200,
       showDelay: 0
      });

      var data = {
        "email": $scope.reg.email,
        "activation_code": $scope.reg.active,
        "password": $scope.reg.password,
        "device_id": $scope.uuid
      };
      $http({
        method: 'post',
        url: CommonURL + '/recruiters/recuriter_register',
        data: data
      }).then(function(response) {
        $timeout(function() {
         $ionicLoading.hide();
        });
        if(response.data.data != 'Invalid User') {
          $scope.reg.email="";
          $scope.reg.active="";
          $scope.reg.password="";
          $scope.reg.confirm_password="";
          localStorage.setItem("user", 0)
          $state.go('login');
        } else {
          var alertPopup = $ionicPopup.alert({
          title: "MARGINO",
          content: "Invalid details"
        })  
        }


      })
    }
    /*localStorage.setItem("user", 0)*/
    /*$state.go('login');*/
  }



})

.controller('changePasswordCtrl',function($scope,$rootScope,$http,$state){
  
  $scope.change={new_password:'',old_password:''}
  $scope.ConfirmChange=function(){
    var data = {
      "recruiter_id": $rootScope.recruiters_Details.id,
      "old_password": $scope.change.old_password,
      "new_password": $scope.change.new_password
    };
    $http({
      method: 'post',
      url: CommonURL + '/recruiters/change_password',
      data: data
    }).then(function(response) {
      if(response.data.result != 'Invalid') {
        localStorage.setItem("user", 0)
        $state.go('login');
      } else {
        var alertPopup = $ionicPopup.alert({
          title: "MARGINO",
          content: "Invalid password "
        })  
      }
    })
  }


  $scope.cancel=function(){
    $state.go("dashboard")
  }
})