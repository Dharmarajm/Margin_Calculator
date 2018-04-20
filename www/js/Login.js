angular.module('Login', [])

.controller('LoginCtrl', function($state,$scope,$http,$rootScope) {


  /*This is used to variable declaration using login page*/
  $scope.user = {
    email: '',
    password: ''
  }

  /*Click the login button to call the method  and check the response */
  $scope.login = function() {

     $state.go('dashboard');
   /* var data = {
      "email": $scope.user.email,
      "password": $scope.user.password
    };

    $http({
      method: 'post',
      url: CommonURL + '/recruiters/login',
      data: data
    }).then(function(response) {
      $state.go('dashboard');
    })
*/
  }

  /*This is dummy value for using footer*/ 
  $scope.marginPercentage = 45;
  $scope.marginDollar = 13.19;
  $scope.adjRate = 42;

  /*To click the logout button using All pages and redirect to Login*/
  $scope.logout = function() {
    $state.go("login")
    localStorage.clear();
  }

  // $scope.email = function() {
  //   alert("Cost Summary for James is send to your email.")
  //   $state.go("dashboard")
  // }

  


})