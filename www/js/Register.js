angular.module('Register', [])

.controller('RegisterCtrl', function($scope, $state, $http, $rootScope,$ionicPlatform,$cordovaDevice) {


  /*$ionicPlatform.ready(function() {
    $scope.$apply(function() {
      var device = $cordovaDevice.getDevice();
      $scope.uuid = device.uuid;
      console.log(device,$scope.uuid);
    });
  });*/
  
  $scope.user = {
    email: '',
    active: '',
    password: '',
    confirm_password: ''
  }
  

 /* alert($cordovaDevice.getUUID());
  console.log($cordovaDevice.getUUID())*/
 
  $scope.register = function() {
    if ($scope.user.password != $scope.user.confirm_password) {
      alert("Password does not matching")
    } else {
      var data = {
        "email": $scope.user.email,
        "activation_code": $scope.user.active,
        "password": $scope.user.password,
        "device_id":"12345"
      };
      $http({
        method: 'post',
        url: CommonURL + '/recruiters/recuriter_register',
        data: data
      }).then(function(response) {
        if(response.data.data != 'Invalid User') {
          localStorage.setItem("user", 0)
          $state.go('login');
        } else {
          alert("Your Email id or Activation code is invalid")
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
        alert("Old password is wrong")
      }
    })
  }


  $scope.cancel=function(){
    $state.go("dashboard")
  }
})