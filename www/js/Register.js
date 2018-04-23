angular.module('Register', [])

.controller('RegisterCtrl', function($scope, $state, $http, $rootScope) {
  $scope.user = {
    email: '',
    active: '',
    password: '',
    confirm_password: ''
  }
  $scope.register = function() {
     $state.go('login');
    /*if ($scope.user.password != $scope.user.confirm_password) {
      alert("Password does not matching")
    } else {
      var data = {
        "email": $scope.user.email,
        "activation_code": $scope.user.acive,
        "password": $scope.user.password
      };
      $http({
        method: 'post',
        url: CommonURL + '/recruiters/login',
        data: data
      }).then(function(response) {
        if(response.data != false) {
          $state.go('login');
          console.log(response.data)
        } else {
          console.log(response.data)
        }


      })
    }*/
    /*localStorage.setItem("user", 0)*/
    /*$state.go('login');*/
  }



})